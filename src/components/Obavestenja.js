import { Title } from "./Title";
import data from "../data/websiteData.json";
import { useState } from "react";
import { vratiSadrzaj } from "../utils/VratiSadrzaj";

export const Obavestenja = () => {
	const [selectedTag, setSelectedTag] = useState("");
	const tagoviFilter = [
		...new Set(data.obavestenja.flatMap((obavestenje) => obavestenje.tagovi)),
	];

	console.log(selectedTag);
	return (
		<div className="pl-[15%] pr-[15%] bg-[#F7F8F9] pb-12 w-full">
			<Title content={"Биографија"} />
			<select
				onChange={(e) => setSelectedTag(e.target.value)}
				className="border border-gray-300 rounded-md py-2 px-4 bg-white focus:outline-none min-w-[150px]">
				<option value="" selected={selectedTag === ""}>
					Филтрирај по тагу
				</option>
				{tagoviFilter.map((tag) => (
					<option>{tag}</option>
				))}
			</select>

			<div className="mt-4">
				{data.obavestenja
					.filter(
						(obavestenje) =>
							selectedTag === "" || obavestenje.tagovi.includes(selectedTag)
					)
					.map((obavestenje, index) => (
						<div className="bg-white rounded-2xl mb-4 p-6">
							<div className="flex">
								<h3 className="text-[#C52233] text-base font-bold mb-2">
									{obavestenje.naslov}
								</h3>
								{obavestenje.datum && (
									<p className="float-right ml-auto text-[#8C8C8C] text-base">
										{obavestenje.datum}
									</p>
								)}
							</div>
							<div>
								{obavestenje.tagovi.length > 0 &&
									obavestenje.tagovi.map((tag) => (
										<span className="bg-gray-200 text-gray-600 text-xs py-1 px-3 rounded-full mr-2">
											{tag}
										</span>
									))}
								<p className="text-gray-600 mb-2 leading-relaxed mb-6">
									{vratiSadrzaj({ content: obavestenje.opis })}
								</p>
							</div>
						</div>
					))}
			</div>
		</div>
	);
};
