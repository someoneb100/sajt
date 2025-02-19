import React, { useState, useEffect } from "react"; // Import useState and useEffect here
import { Title } from "./Title";
import { useNavigate } from "react-router-dom";

export const Blog = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const loadBlogs = () => {
      // Using Webpack's require.context to dynamically import all .json files from the folder
      const context = require.context('../data/blogovi', false, /\.json$/); // Adjust the path accordingly
      const blogFiles = context.keys(); // This will return an array of file paths

      // Dynamically require each JSON file
      const blogsData = blogFiles.map((filePath) => {
        const fileName = filePath.split('/').pop().replace('.json', '');
        const blogData = context(filePath); // Load the JSON data from the file

        // Add the 'id' property dynamically based on the file name
        return { ...blogData, id: fileName };
      }).filter((item) => {
        const currentDate = new Date();
        const itemDate = new Date(item.datum);
        return itemDate <= currentDate;
      })
      .sort((a, b) => {
        const dateA = new Date(a.datum);
        const dateB = new Date(b.datum);
        return dateB - dateA;
      });;

      setBlogs(blogsData); // Update state with the imported JSON files
    };

    loadBlogs();
  }, []);

  const navigate = useNavigate();

  return (
    <div className="px-4 md:pl-[15%] md:pr-[15%] bg-[#F7F8F9] pb-12 w-full">
      <Title content={"Блог"} />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {blogs.map((blog, index) => (
          <div
            key={index}
            className="w-full sm:w-auto border border-gray-200 rounded-lg shadow-lg overflow-hidden bg-white">
            <img
              src={blog.slika}
              alt={blog.naslov}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold text-red-600 mb-2">
                {blog.naslov}
              </h3>
              <p className="text-sm text-gray-700 mb-3 line-clamp-[4] overflow-hidden text-ellipsis">
                {blog.opis}
              </p>
              <div className="flex flex-col sm:flex-row items-start sm:items-center">
                <p className="text-sm text-gray-500 mb-3 sm:mb-0">
                  {blog.datum}
                </p>
                <button
                  onClick={() => navigate(`/blog/${blog.id}`)}
                  className="text-[#22A8C5] text-sm sm:ml-auto font-medium hover:cursor-pointer hover:text-[#1B86A0]">
                  Видети више →
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
