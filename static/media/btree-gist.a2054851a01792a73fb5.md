---
slika: https://miro.medium.com/v2/resize:fit:960/0*KJj6qwztviy1YpTw.jpg
naslov: Комплексни услови у PostgreSQL бази коришћењем btree_gist индекса
opis: Имате споре упите или сложене услове конзистентности? BTREE_GiST проширује индексирање и оптимизује претрагу за разне типове података.
datum: 07.03.2025.
---
[`btree_gist`](https://www.postgresql.org/docs/current/btree-gist.html) је PostgreSQL екстензија која омогућава коришћење GiST индекса за типове података који иначе користе Б-стабло.
Она проширује могућности индексирања тако што подржава операторе `=`, `<`, `>`, `<=`, `>=`, као и `ORDER BY`, али у оквиру GiST механизма.

Основна сврха `btree_gist` је да омогући индексирање за хетерогене упите, где је потребно комбиновати различите критеријуме у једном индексу. На пример, ако имате просторне податке и желите да их филтрирате по временском интервалу или некој нумеричкој вредности, btree_gist вам дозвољава да све те услове покријете једним индексом уместо да правите засебне.

Ипак, `btree_gist` нема све оптимизације класичног Б-стабла – мада подржава исте операторе, није толико ефикасан за једноставне случајеве где се користе само `=` или `ORDER BY` без додатних услова, тако да се његова употреба не препоручује увек, нити треба да замени обичне индексе. Његова предност је што омогућава сложене индексе који могу обухватити различите типове података и операторе у једном индексу.

Овде ћемо видети неке од потенцијалних примена оваквог индекса.

# Како спречити да се у истом кавезу налазе животиње различите врсте?

У зоолошком врту, сваки кавез може да садржи само једну врсту животиње. Међутим, не желимо да ограничимо табелу тако да само једна животиња може бити у кавезу – дозволили бисмо да више различитих врста животиња буду у различитим кавезима, и дозволили бисмо више јединки исте врсте заједно у кавезу, али ни под разно нећемо хтети да заједно буду две различите животиње. Класични индекси, као што је `UNIQUE`, не могу да реше овај проблем јер ми не тражимо једноставан бројни кључ, нити је у питању композитни кључ где само више колона треба да се пореди по једнакости, већ желимо да проверимо сложене услове који укључују више поља.

```sql
CREATE TABLE zoo (
    name    TEXT PRIMARY KEY
    cage    INTEGER NOT NULL,
    animal  TEXT NOT NULL
);

```

## Решење: EXCLUDE USING GIST

Решење је коришћење `EXCLUDE USING GIST` у комбинацији са операторима за упоређивање.
У овом случају, користићемо `WITH =` за проверу да ли је кавез већ заузет, и `WITH <>` за проверу да ли је животиња друге врсте већ унутар тог кавеза. На тај начин, можемо спречити унос дуплираних врста животиња у исти кавез.

```sql
CREATE EXTENSION btree_gist; -- Komanda kojom uključujemo btree_gist u bazu

CREATE TABLE zoo (
    name    TEXT PRIMARY KEY
    cage    INTEGER NOT NULL,
    animal  TEXT NOT NULL,

    -- Sada navodimo kompleksni uslov
    -- Kod kojeg ako su svi poduslovi ispunjeni dolazi do kolizije i ne dozvoljava se unos
    -- Može se desiti poklapanje po jednom ili nekim poduslovima, ali ako je po svim odbija se
    EXCLUDE USING GIST (
        cage    WITH =, -- Dva reda ne mogu imati isti (=) broj kaveza
        animal  WITH <> -- Dva reda ne mogu imati različitu (<>) vrstu životinje
    )
    -- Kada se spoji dobijemo da dva reda ne mogu imati isti broj kaveza i različitu vrstu životinje
);

INSERT INTO zoo VALUES('Ana', 123, 'zebra');
INSERT INTO zoo VALUES('Bob', 124, 'lav'); -- Može jer ne postoji ni jedan red sa istim brojem kaveza
INSERT INTO zoo VALUES('Chriss', 123, 'zebra'); -- Može jer su u istom kavezu ista vrsta
INSERT INTO zoo VALUES('David', 123, 'lav'); -- Ovo NEĆE proći jer je u kavezu 123 zebra

```

# Како спречити преклапање термина запослених?

Приликом чувања заказаних термина, потребно је осигурати да један запослени нема више термина који се временски преклапају. Традиционални `UNIQUE` индекс није довољан, јер треба спречити преклапање унутар временског интервала, а не само за тачно једну вредност. Ако имамо већ унет термин:

```sql
CREATE TABLE IF NOT EXISTS appointment (
    uid                 BIGSERIAL PRIMARY KEY,
    employee_uid        BIGINT NOT NULL REFERENCES employee(uid),
    customer_uid        BIGINT NOT NULL REFERENCES customer(uid),
    start_time          TIMESTAMP NOT NULL,
    end_time            TIMESTAMP NOT NULL,
    description         TEXT,

    CONSTRAINT appointment_chk_start_before_end
        CHECK (start_time < end_time)
);

INSERT INTO appointment (employee_uid, customer_uid, start_time, end_time, description) 
VALUES (1, 101, '2024-03-10 10:00', '2024-03-10 11:00', 'Pregled pacijenta'),
       (1, 102, '2024-03-10 10:30', '2024-03-10 11:30', 'Kontrolni pregled');
```

овај унос би требао бити одбијен јер се временски интервал (10:30 - 11:30) преклапа са постојећим (10:00 - 11:00) за истог запосленог.
Поред `btree_gist` требаће нам још један једноставан концепт: [`range`](https://www.postgresql.org/docs/current/rangetypes.html).

## Шта је range?

PostgreSQL подржава `range` типове који омогућавају рад са континуираним интервалима, као што су бројевни интервали (`numrange`) и временски периоди (`tsrange`). Ово олакшава проверу преклапања, садржаја и других интервалних операција.

```sql
-- Operator @> proverava da li je desni operand potpuno sadržan u levom operandu
SELECT int4range(10, 20) @> 3; -- FALSE
SELECT int4range(10, 20) @> 15; -- TRUE
SELECT int4range(10, 20) @> int4range(3, 15); -- FALSE
SELECT int4range(10, 20) @> int4range(11, 15); -- FALSE

-- Zagrade () i [] se koriste da se naglasi da li je interval otvoren ili zatvoren
SELECT int4range(10, 20) @> 10; -- FALSE
SELECT int4range[10, 20) @> 10; -- TRUE
SELECT int4range(10, 20) @> 20; -- FALSE
SELECT int4range(10, 20] @> 20; -- TRUE


-- Operator && proverava da li postoji preklapanje
SELECT numrange(11.1, 22.2) && numrange(20.0, 30.0); -- TRUE
SELECT numrange(11.1, 22.2) && numrange(25.0, 30.0); -- FALSE

-- Dohvata gornju granicu
SELECT upper(int8range(15, 25)); -- 25

-- Računa presek
SELECT int4range(10, 20) * int4range(15, 25) -- int4range(15, 20);
```

## Решење: btree_gist и tsrange

Не могу постојати 2 реда тако да:
- Имају исти број запосленог
- Имају термине који се преклапају

```sql
CREATE TABLE IF NOT EXISTS appointment (
    uid                 BIGSERIAL PRIMARY KEY,
    employee_uid        BIGINT NOT NULL REFERENCES employee(uid),
    customer_uid        BIGINT NOT NULL REFERENCES customer(uid),
    start_time          TIMESTAMP NOT NULL,
    end_time            TIMESTAMP NOT NULL,
    description         TEXT,

    CONSTRAINT appointment_chk_start_before_end
        CHECK (start_time < end_time),
    -- Ne sme isti zaposleni imati 2 termina koji se preklapaju
    EXCLUDE USING GIST (
        -- Zaposleni se porede po jednakosti operatorom =
        employee_uid                    WITH =,
        -- Definišemo da se vremenski intervali porede po preklapanju operatorom &&
        tsrange(start_time, end_time)   WITH &&
    )
);
```

Поред тога што у табели сада не могу да постоје термини који се преклапају, индекс омогућава ефикасно дохватање свих термина из неког одређеног интервала:

```sql
SELECT * FROM appointment
WHERE   employee_uid = 1
AND     tsrange('2024-03-10 08:00', '2024-03-10 12:00') @> tsrange(start_time, end_time);
```

# Убрзање претраге за велики број података по времену и простору

У бази података са великим бројем редова, често се врше упити који траже податке у одређеним временским интервалима или на основу растојања од неке тачке. На пример, база може да чува информације о локацијама и временским оквирима за различите догађаје или активности, а корисници често траже догађаје који су се десили у одређеном времену и на некој локацији у оквиру одређеног радијуса. Ово је ситуација где нама није потребно да уведемо неко ограничење над подацима, већ само желимо индекс по којем можемо претраживати податке. Уместо `EXCLUDE USING GIST` овај пут ћемо индекс направити директно.

## Решење: btree_gist и PostGIS

Како би ова претрага била што бржа, али и ефикасна по простору (с обзиром на велику количину података), најбоље решење је коришћење индекса који комбинује временске интервале и географске информације (нпр. радијус од неке тачке). За ову врсту претраге можемо користити PostgreSQL са `PostGIS` екстензијом и btree_gist индексе. `PostGIS` је изузетно велика екстензија па овде неће бити детаљно објашњена, ал је довољно рећи да је специјализована за рад са географским подацима.

Користићемо `tsrange` за рад са временским интервалима и `geography` тип за географске координате (локализација). Индексираћемо оба ова поља са `btree_gist`, што ће омогућити брже упите за оба критеријума: временске интервале и растојање.

```sql
CREATE TABLE events (
    id SERIAL PRIMARY KEY,
    event_name TEXT,
    event_time TSRANGE,            -- Vremenski interval (početak i kraj događaja)
    location GEOGRAPHY(POINT, 4326) -- Lokacija kao tačka (geografska širina i dužina)
);

CREATE INDEX events_gist_idx ON events USING GIST (event_time, location);
```

Помоћу овог индекса можемо ефикасно претраживати и по времену и по простору:

```sql
SELECT * FROM events
-- Dogadjaj preseca interval i desio se negde izmedju prvog i petog u martu 2025
WHERE '[2025-03-01 00:00, 2025-03-05 23:59]'::tsrange && event_time 
-- Dogadjaj se desio u radijusu od 1000m od specifikovane tačke
AND ST_DWithin(location, 'POINT(44.8175 20.4632)'::geography, 1000); 
```