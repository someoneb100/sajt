import { vratiSadrzaj } from "../utils/VratiSadrzaj";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

export const JedanBlog = () => {
	const { id } = useParams();
	const [blog, setBlog] = useState(null);

	useEffect(() => {
		const context = require.context('../data/blogovi', false, /\.json$/);
		const blogData = context(`./${id}.json`);
		setBlog(blogData);
	}, [id]);

	if (!blog) {
		return <div>Loading...</div>;
	}

	return (
		<div className="px-4 md:pl-[15%] md:pr-[15%] bg-[#F7F8F9] pb-12 w-full">
			<h1 className="text-[#c52233] font-semibold text-3xl md:text-5xl leading-[36px] md:leading-[56px] pb-6">
				{blog.naslov}
			</h1>
			<div className="mx-auto bg-white shadow-lg rounded-lg p-4">
				<div className="relative">
					<img
						src={blog.slika}
						alt={blog.naslov}
						className="w-[160px] md:w-[250px] rounded-lg float-left mr-4 mb-2"
					/>
					<p className="text-gray-700 text-sm md:text-base">
						{vratiSadrzaj({ content: blog.opis })}
					</p>
				</div>
			</div>
		</div>

	);
};
