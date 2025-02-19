import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { SinglePage } from "./SinglePage";

export const JednoObavestenje = () => {
	const { id } = useParams();
	const [obavestenje, setObavestenje] = useState(null);

	useEffect(() => {
		const context = require.context('../data/obavestenja', false, /\.json$/);
		const data = context(`./${id}.json`);
		setObavestenje(data);
	}, [id]);

	if (!obavestenje) {
        return <div>Loading...</div>;
    }

	return (
		<SinglePage
			title={obavestenje.naslov}
			content={obavestenje.opis}
		/>
	)
};
