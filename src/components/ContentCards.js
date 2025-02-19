//datum
//bgcolor
//border na dugmetu
//dugme type
//dugme?
import React from "react";
import { vratiSadrzaj } from "../utils/VratiSadrzaj";
import { MoreButton } from "./Buttons";

function ContentCards({
	naslov,
	sadrzaj,
	bg = "white",
	btnText,
	datum,
	link,
}) {
	return (
		<div
			className={`p-6 ${
				bg === "siva" ? "bg-[#F0F0F0]" : "bg-white"
			} rounded-2xl`}>
			<div className="flex">
				<h3 className="text-[#C52233] text-base font-bold mb-2">{naslov}</h3>
				{datum && (
					<p className="float-right ml-auto text-[#8C8C8C] text-base">
						{datum}
					</p>
				)}
			</div>

			<p className="text-gray-600 mb-2 leading-relaxed mb-6">
				{vratiSadrzaj({ content: sadrzaj })}
			</p>
			<MoreButton href={link} text={btnText} />
		</div>
	);
}

export default ContentCards;
