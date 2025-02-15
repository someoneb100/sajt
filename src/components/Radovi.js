import { Title } from "./Title";
import data from "../data/websiteData.json";
import Preuzmi from "../shared/Preuzmi.png";

export const Radovi = () => {
	return (
		<>
			<div className="bg-[#F7F8F9] pl-[15%] pr-[15%]">
				<Title content={"Радови"} />
				<div className="flex flex-col gap-y-4">
					{data.radovi.map((rad) => {
						console.log(rad);
						return (
							<>
								<div className="bg-white rounded-lg p-4 mb-4 shadow-sm flex flex-col gap-y-6">
									<div className="flex justify-between items-center mb-2">
										<h3 className={`text-lg font-bold `}>{rad.naslov}</h3>
										<span className="text-sm text-gray-500">{rad.datum}</span>
									</div>
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
