import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Title } from "./Title";
import { MarkdownRenderer } from "./MarkdownRenderer";
import { dohvatiSadrzaj } from "../utils/DohvatiSadrzaj";
import { MoreButton, Tag } from "./Buttons";

export const Obavestenja = () => {
  const [obavestenja, setObavestenja] = useState([]);
  const [selectedTag, setSelectedTag] = useState("");

  useEffect(() => {
    const fetchObavestenja = async () => {
      try {
        const context = require.context("../data/obavestenja", false, /\.md$/);
        const data = await dohvatiSadrzaj(context, true, true);
        setObavestenja(data);
      } catch (error) {
        console.error("Greška pri učitavanju obaveštenja:", error);
      }
    };
    fetchObavestenja();
  }, []);


  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const tagFromUrl = params.get("selectedTag");
    if (tagFromUrl) {
      setSelectedTag(tagFromUrl);
    }
  }, [location]);

  const tagoviFilter = [
    ...new Set(obavestenja.flatMap((obavestenje) => obavestenje.tagovi)),
  ].sort();

  return (
    <div className="pl-[15%] pr-[15%] bg-[#F7F8F9] pb-12 w-full">
      <Title content={"Обавештења"} />
      <select
        onChange={(e) => setSelectedTag(e.target.value)}
        value={selectedTag}
        className="border border-gray-300 rounded-md py-2 px-4 bg-white focus:outline-none min-w-[150px]"
      >
        <option value="" selected={selectedTag === ""}>
          Филтрирај по тагу
        </option>
        {tagoviFilter.map((tag) => (
          <option key={tag} value={tag}>
            {tag}
          </option>
        ))}
      </select>

      <div className="mt-4">
        {obavestenja
          .filter(
            (obavestenje) =>
              selectedTag === "" || obavestenje.tagovi.includes(selectedTag)
          )
          .map((obavestenje) => (
            <div key={obavestenje.id} className="bg-white rounded-2xl mb-4 p-6">
              <div className="flex">
                <h3 className="text-[#C52233] text-base font-bold mb-2">
                  {obavestenje.naslov}
                </h3>
                {obavestenje.datum && (
                  <p className="float-right ml-auto text-[#8C8C8C] text-base">
                    {obavestenje.datum}
                  </p>
                )}
              </div>
              <div>
                  <div className="text-gray-600 mb-2 leading-relaxed mb-2">
                  <MarkdownRenderer content={obavestenje.content} className="text-gray-600 mb-2 leading-relaxed mb-6"/>
                  </div>
                  <div className="text-gray-600 mb-4 leading-relaxed mb-6">
                  {obavestenje.tagovi.length > 0 &&
                  obavestenje.tagovi.map((tag) => (
                    <Tag key={tag} text={tag} />
                  ))}
                  </div>
                <MoreButton href={`/sajt/#/obavestenja/${obavestenje.id}`} className="block mt-4" />
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};
