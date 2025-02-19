import { vratiSadrzaj } from "../utils/VratiSadrzaj";
import { Title } from "./Title";
import biografija from "../data/biografija.json";
import Porfilna from "../shared/profilnaSlika.png";
import { DownloadButton } from "./Buttons";

export const Biografija = () => {
	return (
		<div className="px-4 md:pl-[15%] md:pr-[15%] bg-[#F7F8F9] pb-12 w-full">
			<Title content={"Биографија"} />
			<div className="mx-auto bg-white shadow-lg rounded-lg p-4">
				<div className="relative">
					<img
						src={Porfilna}
						alt="Petar Đorđević"
						className="w-[160px] md:w-[250px] rounded-lg float-left mr-4 mb-2"
					/>
					<p className="text-gray-700 text-sm md:text-base">
						{vratiSadrzaj({ content: biografija })}
					</p>
				</div>
				<div className="mt-4 text-right flex justify-center md:justify-end">
					<DownloadButton href="/sajt/Petar_Djordjevic_CV.pdf" text="Преузми радну биографију" />
				</div>
			</div>
		</div>
	);
};
