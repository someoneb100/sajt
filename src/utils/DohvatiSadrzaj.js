import {parse, isValid} from "date-fns"

export function dohvatiSadrzaj(context, sortDate = false, desc = true, extension = '.json'){
    const data = context.keys().map((path => {
        const name = path.split('/').pop().replace(extension, '');
        const data = context(path);
        return {...data, "id" : name};
    }))

    if(!sortDate){
        return data;
    }

    const getDate = (date) => {
      const formats = ["HH:mm dd.MM.yyyy.", "dd.MM.yyyy."];
  
      for (const format of formats) {
          const parsedDate = parse(date, format, new Date());
          if (isValid(parsedDate)) {
              return parsedDate;
          }
      }
  
      return new Date("Invalid");
  };

    const sortedData = data.filter((item) => {
        const currentDate = new Date();
        const itemDate = getDate(item.datum);
        console.log("date: ", itemDate)
        return itemDate <= currentDate;
      })
      .sort((a, b) => {
        const dateA = getDate(a.datum);
        const dateB = getDate(b.datum);
        return desc ? (dateB - dateA) : (dateA - dateB);
      });

      return sortedData;
}