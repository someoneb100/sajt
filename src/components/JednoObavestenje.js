import { vratiSadrzaj } from "../utils/VratiSadrzaj";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

export const JednoObavestenje = () => {
    const { id } = useParams();
    const [obavestenje, setObavestenje] = useState({});

    useEffect(() => {
        const context = require.context('../data/obavestenja', false, /\.json$/);
        const data = context(`./${id}.json`);
        setObavestenje(data);
    }, [id]);

    if (!obavestenje) {
        return <div>Loading...</div>;
    }

    return (
        <div className="px-4 md:pl-[15%] md:pr-[15%] bg-[#F7F8F9] pb-12 w-full">
            <h1 className="text-[#c52233] font-semibold text-3xl md:text-5xl leading-[36px] md:leading-[56px] pb-6">
                {obavestenje.naslov}
            </h1>
            <div className="mx-auto bg-white shadow-lg rounded-lg p-4">
                <div className="relative">
                    <p className="text-gray-700 text-sm md:text-base">
                        {vratiSadrzaj({ content: obavestenje.opis })}
                    </p>
                    <div className="clear-both h-0" />
                </div>
            </div>
        </div>

    );
};
