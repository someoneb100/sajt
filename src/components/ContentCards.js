//datum
//bgcolor
//border na dugmetu
//dugme type
//dugme?
import React from "react";
import { NavLink } from "react-router-dom";
import { vratiSadrzaj } from "../utils/VratiSadrzaj";

function ContentCards({
	naslov,
	sadrzaj,
	btnBorder = false,
	bg = "white",
	btnText,
	datum,
	btnColorRed = false,
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
			<NavLink
				to={link}
				className={`text-[#22A8C5]   font-bold  py-2 rounded ${
					btnBorder ? "border border-[#22A8C5]  px-4 hover:bg-blue-50" : ""
				} ${btnColorRed ? "text-[#C52233]" : "hover:text-[#1B86A0]"}`}>
				{btnText}
			</NavLink>
		</div>
	);
}

export default ContentCards;
