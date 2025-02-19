
import { useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Preuzmi from "../shared/Preuzmi.png";

export const MoreButton = ({text="Види више", href}) => {
    return (
        <a
            href={href}
            className="inline-block text-[#22A8C5] hover:bg-blue-50 py-2 px-4  text-sm font-medium mt-auto border border-[#22A8C5] rounded-lg shadow-md self-start w-fit"
        >
            {text} →
        </a>
    )
}

export const DownloadButton = ({ text = "Преузми", href }) => {
    return (
        <a
            href={href}
            className="inline-flex items-center text-[#22A8C5] hover:bg-blue-50 py-2 px-4 text-sm font-medium mt-auto border border-[#22A8C5] rounded-lg shadow-md self-start w-fit"
        >
            {text} 
            <img src={Preuzmi} alt="download" className="ml-2 w-4 h-4" />
        </a>
    );
};


export const Tag = ({ text, selectedTag, handleTagChange }) => {
  const navigate = useNavigate();
  

  const handleTagClick = useCallback((tag) => {
    navigate({
      pathname: "/obavestenja",
      search: `?selectedTag=${tag}`,
    });
  }, [navigate]);

  useEffect(() => {
    if (selectedTag) {
      handleTagClick(selectedTag)
    }
  }, [selectedTag, handleTagClick]);

  return (
    <button
      onClick={() => handleTagChange? handleTagChange(text) : handleTagClick(text)}
      className="bg-gray-200 text-gray-600 text-xs py-1 px-3 rounded-full mr-2 hover:bg-gray-300"
    >
      {text}
    </button>
  );
};
