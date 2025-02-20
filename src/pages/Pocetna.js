import React, { useState, useEffect } from "react";
import ContentCards from "../components/ContentCards";
import Profilna from "../shared/profilnaSlika.png";
import { Title } from "../components/Title";
import { vratiSezonu } from "../utils/VratiSezonu";
import { dohvatiSadrzaj } from "../utils/DohvatiSadrzaj";
import { MoreButton } from "../components/Buttons";

function Pocetna() {
	const [obavestenja, setObavestenja] = useState([]);
		
	useEffect(() => {
		const fetchObavestenja = async () => {
		  try {
			const context = require.context("../data/obavestenja", false, /\.md$/);
			const data = await dohvatiSadrzaj(context, true, true);
			setObavestenja(data.slice(0,3));
		  } catch (error) {
			console.error("Greška pri učitavanju obaveštenja:", error);
		  }
		};
		fetchObavestenja();
	  }, []);

	const [kursevi, setKursevi] = useState([]);

	useEffect(() => {
		const fetchCourses = async () => {
		  try {
			// eslint-disable-next-line eqeqeq
			const context = vratiSezonu() == "letnji" ?
				require.context(`../data/kursevi/letnji`, false, /\.md$/) :
				require.context(`../data/kursevi/zimski`, false, /\.md$/) ;
	
			const data = await dohvatiSadrzaj(context);
			setKursevi(data);
		  } catch (error) {
			console.error("Greška pri učitavanju kurseva:", error);
		  }
		};
	
		fetchCourses();
	  }, []);

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
							{obavestenja[0] ? (
								<ContentCards
									naslov={obavestenja[0].naslov}
									sadrzaj={obavestenja[0].content}
									bg="bela"
									btnText={"Види више"}
									btnBorder={false}
									datum={obavestenja[0].datum}
									link={`${window.location.origin}/sajt/#/obavestenja/${obavestenja[0].id}`}
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
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					{kursevi.map((kurs) => (
						<div key={kurs.id} className="h-full">
						<ContentCards
							btnText={"Иди на курс"}
							bg="siva"
							btnBorder
							naslov={kurs.naslov}
							sadrzaj={kurs.opis}
							datum={kurs.datum}
							link={kurs.link}
						/>
						</div>
					))}
				</div>
			</div>
			<div className="px-4 md:px-[15%] bg-[#F7F8F9] pb-12">
				<div className="flex flex-col md:flex-row items-center md:justify-between p-4 rounded-lg">
					<Title content={"Обавештења"} />
					<MoreButton href="/sajt/#/obavestenja" text="Види сва обавештења" />
				</div>
				<div className="flex flex-col gap-y-6">
					{obavestenja.map((obavestenje) => 
						obavestenje && (
							<ContentCards
							key={obavestenje.id}
							btnText={"Види више"}
							btnColorRed
							datum={obavestenje.datum}
							naslov={obavestenje.naslov}
							sadrzaj={obavestenje.content}
							bg="bela"
							link={`${window.location.origin}/sajt/#/obavestenja/${obavestenje.id}`}
							/>
						)
					)}
				</div>
			</div>
		</>
	);
}

export default Pocetna;
