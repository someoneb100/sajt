import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import matter from "gray-matter";

import { SinglePage } from "./SinglePage";

export const JedanBlog = () => {
	const { id } = useParams();
	const [blog, setBlog] = useState(null);

	useEffect(() => {
		const fetchBlog = async () => {
			const context = require.context(`../data/blogovi/`, false, /\.md$/)
			const response = await fetch(context(`./${id}.md`));
			const text = await response.text();
			const { content, data } = matter(text);

			setBlog({...data, content: content, id: id});
	};

		fetchBlog();
	}, [id]);

	if (!blog) {
		return <div className="px-4 md:pl-[15%] md:pr-[15%] bg-[#F7F8F9] pb-12 w-full"></div>;
	}

	return (
		<SinglePage
			title={blog.naslov}
			image={{ href: blog.slika, alt: blog.naslov }}
			content={blog.content}
			download={null}
		/>
	);
};
