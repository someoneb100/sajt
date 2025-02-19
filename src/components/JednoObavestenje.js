import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { SinglePage } from "./SinglePage";
import matter from "gray-matter";

export const JednoObavestenje = () => {
	const { id } = useParams();
	const [obavestenje, setObavestenje] = useState(null);

	useEffect(() => {
		const fetchObavestenje = async () => {
			const context = require.context(`../data/obavestenja/`, false, /\.md$/)
			const response = await fetch(context(`./${id}.md`));
			const text = await response.text();
			const { content, data } = matter(text);

			setObavestenje({...data, content: content, id: id});
	};

	fetchObavestenje();
	}, [id]);

	if (!obavestenje) {
        return <div className="px-4 md:pl-[15%] md:pr-[15%] bg-[#F7F8F9] pb-12 w-full"></div>;
    }

	return (
		<SinglePage
			title={obavestenje.naslov}
			content={obavestenje.content}
		/>
	)
};
