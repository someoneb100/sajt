import { Title } from "./Title";
import { useState, useEffect } from "react";
import { vratiSadrzaj } from "../utils/VratiSadrzaj";

export const Obavestenja = () => {
	const [obavestenja, setObavestenja] = useState([]);
		
	useEffect(() => {
		const loadObavestenja= () => {
			// Using Webpack's require.context to dynamically import all .json files from the folder
			const context = require.context('../data/obavestenja', false, /\.json$/); // Adjust the path accordingly
			const blogFiles = context.keys(); // This will return an array of file paths

			// Dynamically require each JSON file
			const data = blogFiles.map((filePath) => {
				const fileName = filePath.split('/').pop().replace('.json', '');
				const data = context(filePath); // Load the JSON data from the file

				// Add the 'id' property dynamically based on the file name
				return { ...data, id: fileName };
			}).sort((a, b) => {
				const dateA = new Date(a.datum); // Convert 'datum' to Date object for comparison
				const dateB = new Date(b.datum); // Convert 'datum' to Date object for comparison

				return dateB - dateA; // Sorting in descending order (latest first)
			});

			setObavestenja(data); // Update state with the imported JSON files
		};

		loadObavestenja();
	}, []);

	const [selectedTag, setSelectedTag] = useState("");
	const tagoviFilter = [
		...new Set(obavestenja.flatMap((obavestenje) => obavestenje.tagovi)),
	];

	return (
		<div className="pl-[15%] pr-[15%] bg-[#F7F8F9] pb-12 w-full">
			<Title content={"Обавештења"} />
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
				{obavestenja
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
