import React, { useState, useEffect } from "react";
import { Title } from "./Title";
import { dohvatiSadrzaj } from "../utils/DohvatiSadrzaj";
import { MoreButton } from "./Buttons";

export const Blog = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const loadBlogs = async () => {
      const context = require.context("../data/blogovi", false, /\.md$/);
      const blogsData = await dohvatiSadrzaj(context, true);
      setBlogs(blogsData);
    };

    loadBlogs();
  }, []);

  return (
    <div className="px-4 md:pl-[15%] md:pr-[15%] bg-[#F7F8F9] pb-12 w-full">
      <Title content={"Блог"} />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {blogs.map((blog, index) => (
          <div key={index} className="w-full sm:w-auto border border-gray-200 rounded-lg shadow-lg overflow-hidden bg-white flex flex-col">
            <img src={blog.slika} alt={blog.naslov} className="w-full h-48 object-cover" />
            <div className="p-4 flex flex-col flex-grow">
              <h3 className="text-lg font-semibold text-red-600 mb-2">
                {blog.naslov}
              </h3>
              <p className="text-sm text-gray-700 mb-3 line-clamp-[4] overflow-hidden text-ellipsis">
                {blog.opis}
              </p>
              <p className="text-sm text-gray-500 mb-3">
                {blog.datum}
              </p>
              <div className="mt-auto self-end">
                <MoreButton href={`/sajt/#/blog/${blog.id}`} />
              </div>
            </div>
          </div>        
        ))}
      </div>
    </div>
  );
};
