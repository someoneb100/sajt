import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Title } from "./Title";
import { vratiSadrzaj } from "../utils/VratiSadrzaj";
import { dohvatiSadrzaj } from "../utils/DohvatiSadrzaj";

export const Obavestenja = () => {
  const [obavestenja, setObavestenja] = useState([]);

  useEffect(() => {
    const context = require.context("../data/obavestenja", false, /\.json$/);
    const data = dohvatiSadrzaj(context, true);
    setObavestenja(data);
  }, []);

  const [selectedTag, setSelectedTag] = useState("");

  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const tagFromUrl = params.get("selectedTag");
    if (tagFromUrl) {
      setSelectedTag(tagFromUrl); // Set the selected tag from the URL
    }
  }, [location]);

  const tagoviFilter = [
    ...new Set(obavestenja.flatMap((obavestenje) => obavestenje.tagovi)),
  ].sort();

  
  const navigate = useNavigate();

  const handleTagChange = (tag) => {
    setSelectedTag(tag);
    
    navigate({
      pathname: "/obavestenja",
      search: `?selectedTag=${tag}`,
    });
  };

  return (
    <div className="pl-[15%] pr-[15%] bg-[#F7F8F9] pb-12 w-full">
      <Title content={"Обавештења"} />
      <select
        onChange={(e) => handleTagChange(e.target.value)}
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
                {obavestenje.tagovi.length > 0 &&
                  obavestenje.tagovi.map((tag) => (
                    <button
                      key={tag}
                      onClick={() => handleTagChange(tag)}
                      className="bg-gray-200 text-gray-600 text-xs py-1 px-3 rounded-full mr-2 hover:bg-gray-300"
                    >
                      {tag}
                    </button>
                  ))}
                <p className="text-gray-600 mb-2 leading-relaxed mb-6">
                  {vratiSadrzaj({ content: obavestenje.opis })}
                </p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};
