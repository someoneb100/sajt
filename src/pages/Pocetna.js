import React, { useState, useEffect } from "react";
import ContentCards from "../components/ContentCards";
import Profilna from "../shared/profilnaSlika.png";
import { Title } from "../components/Title";
import { NavLink } from "react-router-dom";
import { vratiSezonu } from "../utils/VratiSezonu";

function Pocetna() {
	const [activeSemester, setActiveSemester] = useState("letnji");
	const [sviKursevi, setKursevi] = useState({ letnji: [], zimski: [] });

	useEffect(() => {
		const initialSeason = vratiSezonu();
		setActiveSemester(initialSeason);
	}, []);

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
			}).filter((item) => {
				const currentDate = new Date(); // Get the current date and time
				const itemDate = new Date(item.datum); // Convert 'datum' to Date object for comparison
				return itemDate <= currentDate; // Keep only items with 'datum' <= current date
			  }).sort((a, b) => {
				const dateA = new Date(a.datum); // Convert 'datum' to Date object for comparison
				const dateB = new Date(b.datum); // Convert 'datum' to Date object for comparison

				return dateA - dateB; // Sorting in ascending order (latest last)
			});

			setObavestenja(data); // Update state with the imported JSON files
		};

		loadObavestenja();
	}, []);

	useEffect(() => {
		const loadLetnji = () => {
			try {
				const context = require.context(`../data/kursevi/letnji`, false, /\.json$/);
				return context.keys().map((filePath) => {
					const fileName = filePath.split('/').pop().replace('.json', '');
					return { ...context(filePath), id: fileName };
				});
			} catch (error) {
				console.error(`Greška pri učitavanju podataka za letnji:`, error);
				return [];
			}
		};

		const loadZimski = () => {
			try {
				const context = require.context(`../data/kursevi/zimski`, false, /\.json$/);
				return context.keys().map((filePath) => {
					const fileName = filePath.split('/').pop().replace('.json', '');
					return { ...context(filePath), id: fileName };
				});
			} catch (error) {
				console.error(`Greška pri učitavanju podataka za zimski:`, error);
				return [];
			}
		};
	
		setKursevi({
			letnji: loadLetnji(),
			zimski: loadZimski(),
		});
	}, []);

	const kursevi = sviKursevi[activeSemester];

	// Sigurno dobijanje poslednjeg kursa ili obavestenja
	const getLastElement = (arr) => {
		if (arr && arr.length > 0) {
			return arr[arr.length - 1];
		}
		return null; // Vraća null ako nema elemenata
	};

	// Bezbedno uzimanje poslednjih kurseva i obaveštenja
	const lastCourse = getLastElement(kursevi);
	const secondLastCourse = kursevi.length > 1 ? kursevi[kursevi.length - 2] : null;
	const thirdLastCourse = kursevi.length > 2 ? kursevi[kursevi.length - 3] : null;

	const lastObavestenje = getLastElement(obavestenja);
	const secondLastObavestenje = obavestenja.length > 1 ? obavestenja[obavestenja.length - 2] : null;
	const thirdLastObavestenje = obavestenja.length > 2 ? obavestenja[obavestenja.length - 3] : null;

	return (
		<>
			<div className="grid grid-cols-1 2xl:grid-cols-3 px-4 md:px-[15%] pt-16 bg-[#F7F8F9]">
				<div className="order-2 2xl:order-1 2xl:col-span-2">
					<div className="m-0 bg-[#F7F8F9]">
						<Title content={"Добродошли!"} />
					</div>
					<div className="flex flex-col gap-y-5 pb-12">
						<div className="text-base text-[#1e1818]">
							<p>Петар Ђорђевић</p>
							<p>Катедра за рачунарство и информатику</p>
						</div>
						<div className="text-base text-[#8c8c8c]">
							<p>Универзитет у Београду</p>
							<p>Математички факултет</p>
						</div>
						<div className="mt-20 flex flex-col gap-y-2">
							<p className="text-base font-semibold">Последње новости</p>
							{lastObavestenje ? (
								<ContentCards
									naslov={lastObavestenje.naslov}
									sadrzaj={lastObavestenje.opis}
									bg="bela"
									btnText={"Види више →"}
									btnBorder={false}
									link={`${window.location.origin}/obavestenja`}
								/>
							) : (
								<p>Нема обавештења</p>
							)}
						</div>
					</div>
				</div>
				<div className="hidden 2xl:flex justify-center 2xl:justify-end rounded-2xl order-1 2xl:order-2 2xl:col-span-1">
					<img
						src={Profilna} alt="Petar Đorđević"
						className="w-full sm:h-[100%] 2xl:h-auto h-auto p-4 2xl:p-8 aspect-video rounded-[40px] object-cover"
					/>
				</div>
			</div>

			<div className="bg-white pb-12 px-4 md:px-[15%]">
				<Title content={"Курсеви"} />
				<div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6">
					{lastCourse ? (
						<ContentCards
							btnText={"Иди на курс →"}
							bg="siva"
							btnBorder
							naslov={lastCourse.naslov}
							sadrzaj={lastCourse.opis}
							datum={lastCourse.datum}
						/>
					) : (
						<p>Нема курсева</p>
					)}
					<div className="flex flex-col gap-y-6">
						{secondLastCourse && (
							<ContentCards
								btnText={"Иди на курс →"}
								bg="siva"
								btnBorder
								naslov={secondLastCourse.naslov}
								sadrzaj={secondLastCourse.opis}
								datum={secondLastCourse.datum}
							/>
						)}
						{thirdLastCourse && (
							<ContentCards
								btnText={"Иди на курс →"}
								bg="siva"
								btnBorder
								naslov={thirdLastCourse.naslov}
								sadrzaj={thirdLastCourse.opis}
								datum={thirdLastCourse.datum}
							/>
						)}
					</div>
				</div>
			</div>
			<div className="px-4 md:px-[15%] bg-[#F7F8F9] pb-12">
				<div className="flex flex-col md:flex-row items-center md:justify-between p-4 rounded-lg">
					<Title content={"Обавештења"} />
					<NavLink
						to={"/obavestenja"}
						className="text-[#22A8C5] font-bold border border-[#22A8C5] px-4 py-2 mb-4 md:mb-0 rounded-lg hover:bg-blue-50 flex items-center">
						Види сва обавештења →
					</NavLink>
				</div>
				<div className="flex flex-col gap-y-6">
					{lastObavestenje && (
						<ContentCards
							btnText={"Види више →"}
							btnColorRed
							datum={lastObavestenje.datum}
							naslov={lastObavestenje.naslov}
							sadrzaj={lastObavestenje.opis}
							bg="bela"
							link={`/obavestenja`}
						/>
					)}
					{secondLastObavestenje && (
						<ContentCards
							btnText={"Види више →"}
							btnColorRed
							datum={secondLastObavestenje.datum}
							naslov={secondLastObavestenje.naslov}
							sadrzaj={secondLastObavestenje.opis}
							bg="bela"
							link={`/obavestenja`}
						/>
					)}
					{thirdLastObavestenje && (
						<ContentCards
							btnText={"Види више →"}
							btnColorRed
							datum={thirdLastObavestenje.datum}
							naslov={thirdLastObavestenje.naslov}
							sadrzaj={thirdLastObavestenje.opis}
							bg="bela"
							link={`/obavestenja`}
						/>
					)}
				</div>
			</div>
		</>
	);
}

export default Pocetna;
