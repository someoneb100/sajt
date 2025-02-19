import React, { useEffect, useState } from "react";
import { vratiSadrzaj } from "../utils/VratiSadrzaj";
import { vratiSezonu } from "../utils/VratiSezonu";
import { dohvatiSadrzaj } from "../utils/DohvatiSadrzaj";
import { Title } from "./Title";
import { MoreButton, Tag } from "./Buttons";

export const Nastava = () => {
  const [activeSemester, setActiveSemester] = useState("letnji");

  useEffect(() => {
    const initialSeason = vratiSezonu();
    setActiveSemester(initialSeason);
  }, []);

  const [kursevi, setKursevi] = useState({ letnji: [], zimski: [] });

  useEffect(() => {
    const contextLetnji = require.context(`../data/kursevi/letnji`, false, /\.json$/);
    const contextZimski = require.context(`../data/kursevi/zimski`, false, /\.json$/);

    setKursevi({
      letnji: dohvatiSadrzaj(contextLetnji),
      zimski: dohvatiSadrzaj(contextZimski),
    });
  }, []);

  return (
    <div className="pr-[15%] pl-[15%] bg-[#F7F8F9] h-[70%] pb-6">
      <Title content={"Настава"} />

      <div className="inline-flex gap-x-2 p-1 mb-2 items-center border border-gray-300 rounded-md overflow-hidden">
        <button
          onClick={() => setActiveSemester("letnji")}
          className={`px-4 h-8 text-base font-semibold rounded-lg ${
            activeSemester === "letnji"
              ? "bg-red-600 border border-red-600 text-white"
              : "text-gray-500 border border-gray-200"
          }`}
        >
          Летњи
        </button>
        <div className="w-px h-6 bg-gray-300"></div>
        <button
          onClick={() => setActiveSemester("zimski")}
          className={`px-4 h-8 text-base font-semibold rounded-lg ${
            activeSemester === "zimski"
              ? "bg-red-600 border border-red-600 text-white"
              : "text-gray-500 border border-gray-200"
          }`}
        >
          Зимски
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {kursevi[activeSemester].map((kurs, index) => (
          <div key={index} className="bg-white rounded-lg shadow p-6 flex flex-col">
          <h2 className="text-red-600 font-semibold text-lg mb-2">
            {kurs.naslov}
          </h2>
          <p className="text-sm text-gray-500 mb-4">{kurs.datum}</p>
          <p className="text-gray-700 text-sm mb-4 line-clamp-[7] overflow-hidden text-ellipsis">
            {vratiSadrzaj({ content: kurs.opis })}
          </p>
          <div className="flex space-x-2 mb-4">
            {kurs.tagovi.map((tag) => (
              <Tag key={tag} text={tag} />
            ))}
          </div>
          <MoreButton href={kurs.link} text="Иди на курс" className="mt-auto" />
        </div>
        
        ))}
      </div>
    </div>
  );
};
