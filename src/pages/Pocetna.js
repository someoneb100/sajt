// src/pages/Home.js
import React from "react";
import ContentCards from "../components/ContentCards";
import data from "../data/websiteData.json";
import Profilna from "../shared/profilnaSlika.png";
import { Title } from "../components/Title";
import { NavLink } from "react-router-dom";
import { vratiSezonu } from "../utils/VratiSezonu";

function Pocetna() {
	const kursevi = data.kursevi[vratiSezonu()];
	return (
		<>
			<div className="grid grid-cols-1 md:grid-cols-2 px-4 md:px-[15%] pt-16 bg-[#F7F8F9]">
				<div className="order-2 md:order-1">
					<div className="m-0 bg-[#F7F8F9]">
						<Title content={"Добродошли!"} />
					</div>
					<div className="flex flex-col gap-y-5 pb-12">
						<div className="text-base text-[#1e1818]">
							<p>Проф. др. мр. Лорем Ипсум</p>
							<p>Катедра за рачунарство и информатику</p>
						</div>
						<div className="text-base text-[#8c8c8c]">
							<p>Универзитет у Београду</p>
							<p>Математички факултет</p>
						</div>
						<div className="mt-20 flex flex-col gap-y-2">
							<p className="text-base font-semibold">Последње новости</p>
							<ContentCards
								naslov={data.obavestenja[data.obavestenja.length - 1].naslov}
								sadrzaj={data.obavestenja[data.obavestenja.length - 1].opis}
								bg="bela"
								btnText={"Види више →"}
								btnBorder={false}
								link={`${window.location.origin}/obavestenja`}
							/>
						</div>
					</div>
				</div>
				<div className="flex justify-center md:justify-end rounded-2xl order-1 md:order-2">
					<img
						src={Profilna}
						className="w-full sm:h-[100%] l-h:[60%] xl:h-auto h-auto p-4 md:p-8 aspect-video rounded-[40px] object-cover"
					/>
				</div>
			</div>
			<div className="bg-white pb-12 px-4 md:px-[15%]">
				<Title content={"Курсеви"} />
				<div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6">
					<ContentCards
						btnText={"Иди на курс →"}
						bg="siva"
						btnBorder
						naslov={kursevi[kursevi.length - 1].naslov}
						sadrzaj={kursevi[kursevi.length - 1].opis}
						datum={kursevi[kursevi.length - 1].datum}
					/>
					<div className="flex flex-col gap-y-6">
						<ContentCards
							btnText={"Иди на курс →"}
							bg="siva"
							btnBorder
							naslov={kursevi[kursevi.length - 2].naslov}
							sadrzaj={kursevi[kursevi.length - 2].opis}
							datum={kursevi[kursevi.length - 2].datum}
						/>
						<ContentCards
							btnText={"Иди на курс →"}
							bg="siva"
							btnBorder
							naslov={kursevi[kursevi.length - 3].naslov}
							sadrzaj={kursevi[kursevi.length - 3].opis}
							datum={kursevi[kursevi.length - 3].datum}
						/>
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
					<ContentCards
						btnText={"Види више →"}
						btnColorRed
						datum={data.obavestenja[data.obavestenja.length - 1].datum}
						naslov={data.obavestenja[data.obavestenja.length - 1].naslov}
						sadrzaj={data.obavestenja[data.obavestenja.length - 1].opis}
						bg="bela"
						link={`/obavestenja`}
					/>
					<ContentCards
						btnText={"Види више →"}
						btnColorRed
						datum={data.obavestenja[data.obavestenja.length - 2].datum}
						naslov={data.obavestenja[data.obavestenja.length - 2].naslov}
						sadrzaj={data.obavestenja[data.obavestenja.length - 2].opis}
						bg="bela"
						link={`/obavestenja`}
					/>
					<ContentCards
						btnText={"Види више →"}
						btnColorRed
						datum={data.obavestenja[data.obavestenja.length - 3].datum}
						naslov={data.obavestenja[data.obavestenja.length - 3].naslov}
						sadrzaj={data.obavestenja[data.obavestenja.length - 3].opis}
						bg="bela"
						link={`/obavestenja`}
					/>
				</div>
			</div>
		</>
	);
}

export default Pocetna;
