import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Title } from "./Title";
import { vratiSadrzaj } from "../utils/VratiSadrzaj";

export const Obavestenja = () => {
  const [obavestenja, setObavestenja] = useState([]);
  const [selectedTag, setSelectedTag] = useState("");

  const location = useLocation(); // Get the current URL
  const navigate = useNavigate(); // For updating the URL

  // This function loads the notifications and applies the query parameters
  useEffect(() => {
    const loadObavestenja = () => {
      const context = require.context("../data/obavestenja", false, /\.json$/);
      const blogFiles = context.keys();
      const data = blogFiles
        .map((filePath) => {
          const fileName = filePath.split("/").pop().replace(".json", "");
          const data = context(filePath);
          return { ...data, id: fileName };
        })
        .filter((item) => {
          const currentDate = new Date();
          const itemDate = new Date(item.datum);
          return itemDate <= currentDate;
        })
        .sort((a, b) => {
          const dateA = new Date(a.datum);
          const dateB = new Date(b.datum);
          return dateB - dateA;
        });

      setObavestenja(data);
    };

    loadObavestenja();
  }, []);

  // Extract query parameters from the URL
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

  const handleTagChange = (e) => {
    const tag = e.target.value;
    setSelectedTag(tag);
    // Update the URL query parameter when the tag is changed
    navigate({
      pathname: "/obavestenja", // The current route
      search: `?selectedTag=${tag}`, // Add the query string
    });
  };

  return (
    <div className="pl-[15%] pr-[15%] bg-[#F7F8F9] pb-12 w-full">
      <Title content={"Обавештења"} />
      <select
        onChange={handleTagChange}
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
          .map((obavestenje, index) => (
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
                    <span key={tag} className="bg-gray-200 text-gray-600 text-xs py-1 px-3 rounded-full mr-2">
                      {tag}
                    </span>
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
