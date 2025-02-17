import { useEffect, useState } from "react";
import { Title } from "./Title";
import { fetchMarkdown } from "../utils/FetchMarkdown";

function Footer() {
  const [content, setContent] = useState({ attributes: [] });

  useEffect(() => {
    const loadMarkdown = async () => {
      const parsedContent = await fetchMarkdown("/sajt/data/biografija.md");
      setContent(parsedContent);
    };

    loadMarkdown();
  }, []);

  return (
    <footer className="bg-white text-white text-left px-[15%] py-12">
      <Title content={"Контакт информације"} />
      {content.attributes && content.attributes.length > 0 ? (
        content.attributes.map((kontakt) => (
          <div key={kontakt.key} className="mb-6">
            <p className="text-base text-[#1E1818] mb-2">{kontakt.key}</p>
            <p className="text-base text-[#1E1818] font-semibold">
              {kontakt.value}
            </p>
          </div>
        ))
      ) : (
        <p>No contact information available</p>
      )}
    </footer>
  );
}

export default Footer;
