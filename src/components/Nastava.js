import React, { useEffect, useState } from "react";
import { vratiSadrzaj } from "../utils/VratiSadrzaj";
import { vratiSezonu } from "../utils/VratiSezonu";
import { dohvatiSadrzaj } from "../utils/DohvatiSadrzaj";
import { Title } from "./Title";
import { useNavigate } from "react-router-dom"; // Import useNavigate

export const Nastava = () => {
  const [activeSemester, setActiveSemester] = useState("letnji");
  const [kursevi, setKursevi] = useState({ letnji: [], zimski: [] });
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate(); // Initialize navigate

  useEffect(() => {
    const initialSeason = vratiSezonu();
    setActiveSemester(initialSeason);
  }, []);

  useEffect(() => {
    const contextLetnji = require.context(`../data/kursevi/letnji`, false, /\.json$/);
    const contextZimski =  require.context(`../data/kursevi/zimski`, false, /\.json$/);

    setKursevi({
      letnji: dohvatiSadrzaj(contextLetnji),
      zimski: dohvatiSadrzaj(contextZimski),
    });
  }, []);

  // Function to handle tag click
  const handleTagClick = (tag) => {
    navigate(`/obavestenja?selectedTag=${tag}`); // Navigate to the obavestenja page with the selectedTag query parameter
  };

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
        {kursevi[activeSemester].slice(0, 3).map((kurs, index) => (
          <div key={index} className="bg-white rounded-lg shadow p-6">
            <h2 className="text-red-600 font-semibold text-lg mb-2">
              {kurs.naslov}
            </h2>
            <p className="text-sm text-gray-500 mb-4">{kurs.datum}</p>
            <p className="text-gray-700 text-sm mb-4 line-clamp-[7] overflow-hidden text-ellipsis">
              {vratiSadrzaj({ content: kurs.opis })}
            </p>
            <div className="flex space-x-2 mb-4">
              {kurs.tagovi.map((tag, tagIndex) => (
                <span
                  key={tagIndex}
                  className="bg-gray-200 text-gray-600 text-xs py-1 px-3 rounded-full cursor-pointer"
                  onClick={() => handleTagClick(tag)} // Make the tag clickable
                >
                  {tag}
                </span>
              ))}
            </div>
            <a
              href={kurs.link}
              className="inline-block text-[#22A8C5] border border-[#22A8C5] hover:bg-blue-50 py-2 px-4 rounded-md text-sm font-semibold"
            >
              Иди на курс →
            </a>
          </div>
        ))}

        {isOpen &&
          kursevi[activeSemester].slice(3).map((kurs, index) => (
            <div key={`extra-${index}`} className="bg-white rounded-lg shadow p-6">
              <h2 className="text-red-600 font-semibold text-lg mb-2">
                {kurs.naslov}
              </h2>
              <p className="text-sm text-gray-500 mb-4">16:15 12.12.2012.</p>
              <p className="text-gray-700 text-sm mb-4 line-clamp-[7] overflow-hidden text-ellipsis">
                {vratiSadrzaj({ content: kurs.opis })}
              </p>
              <div className="flex space-x-2 mb-4">
                {kurs.tagovi.map((tag, tagIndex) => (
                  <span
                    key={tagIndex}
                    className="bg-gray-200 text-gray-600 text-xs py-1 px-3 rounded-full cursor-pointer"
                    onClick={() => handleTagClick(tag)} // Make the tag clickable
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <a
                href={kurs.link}
                className="inline-block text-[#22A8C5] border border-[#22A8C5] hover:bg-blue-50 py-2 px-4 rounded-md text-sm font-semibold"
              >
                Иди на курс →
              </a>
            </div>
          ))}
      </div>

      {kursevi[activeSemester].length > 3 && !isOpen && (
        <div className="flex justify-center mt-8">
          <button
            onClick={() => setIsOpen(true)}
            className="text-red-600 border border-red-600 py-2 px-6 rounded-md"
          >
            Старије →
          </button>
        </div>
      )}
    </div>
  );
};
