import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { SinglePage } from "./SinglePage";

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
		<SinglePage
			title={blog.naslov}
			image={{href: blog.slika, alt: blog.naslov}}
			content={blog.opis}
			download={null}
		/>
	)
};
