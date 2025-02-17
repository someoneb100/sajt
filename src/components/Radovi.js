import React, { useState, useEffect } from "react"; // Import useState and useEffect here
import { Title } from "./Title";
import Preuzmi from "../shared/Preuzmi.png";

export const Radovi = () => {
	const [radovi, setRadovi] = useState([]);
	
	  useEffect(() => {
		const loadRadovi= () => {
		  // Using Webpack's require.context to dynamically import all .json files from the folder
		  const context = require.context('../data/radovi', false, /\.json$/); // Adjust the path accordingly
		  const blogFiles = context.keys(); // This will return an array of file paths
	
		  // Dynamically require each JSON file
		  const data = blogFiles.map((filePath) => {
			const fileName = filePath.split('/').pop().replace('.json', '');
			const data = context(filePath); // Load the JSON data from the file
	
			// Add the 'id' property dynamically based on the file name
			return { ...data, id: fileName };
		  });
	
		  setRadovi(data); // Update state with the imported JSON files
		};
	
		loadRadovi();
	  }, []);

	return (
		<>
			<div className="bg-[#F7F8F9] pl-[15%] pr-[15%]">
				<Title content={"Радови"} />
				<div className="flex flex-col gap-y-4">
					{radovi.map((rad) => {
						return (
							<>
								<div className="bg-white rounded-lg p-4 mb-4 shadow-sm flex flex-col gap-y-6">
									<div className="flex justify-between items-center mb-2">
										<h3 className={`text-lg font-bold `}>{rad.naslov}</h3>
										<span className="text-sm text-gray-500">{rad.datum}</span>
									</div>
									<p className="text-gray-500">{rad.autor}</p>
									<p className="text-gray-700">{rad.opis}</p>
									<a href={rad.publicLink} target="_blank" rel="noreferrer" download>
										<button className="bg-white flex gap-x-2  border border-[#22A8C5] text-[#22A8C5] font-semibold text-sm px-4 py-2 rounded-lg shadow-md hover:bg-blue-50">
											Преузми рад <img src={Preuzmi} alt={rad.naslov}/>
										</button>
									</a>
								</div>
							</>
						);
					})}
				</div>
			</div>
		</>
	);
};
