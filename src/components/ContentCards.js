import React from "react";
import { MoreButton } from "./Buttons";
import { MarkdownRenderer } from "./MarkdownRenderer";

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
			} rounded-2xl flex flex-col h-full`}>
			<div className="flex">
				<h3 className="text-[#C52233] text-base font-bold mb-2">{naslov}</h3>
				{datum && (
					<p className="ml-auto text-[#8C8C8C] text-base">{datum}</p>
				)}
			</div>
			<div className="flex space-x-2 mb-4">
				<MarkdownRenderer content={sadrzaj} className="flex space-x-2 mb-4" />
			</div>

			<div className="mt-auto"  >
				<MoreButton href={link} text={btnText} />
			</div>
		</div>
	);
}

export default ContentCards;
