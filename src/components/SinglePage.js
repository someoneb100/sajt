import { Title } from "./Title";
import { DownloadButton } from "./Buttons";
import { vratiSadrzaj } from "../utils/VratiSadrzaj";

export const SinglePage = ({ 
    title, 
    image, 
    content, 
    download 
}) => {
	return (
		<div className="px-4 md:pl-[15%] md:pr-[15%] bg-[#F7F8F9] pb-12 w-full">
			<Title content={title} />
			<div className="mx-auto bg-white shadow-lg rounded-lg p-4">
				<div className="relative">
					{image && <img
						src={image.href}
						alt={image.alt}
						className="w-[160px] md:w-[250px] rounded-lg float-left mr-4 mb-2"
					/>}
					<p className="text-gray-700 text-sm md:text-base">
						{vratiSadrzaj({ content: content })}
					</p>
                    <div className="clear-both h-0" />
				</div>
				<div className="mt-4 text-right flex justify-center md:justify-end">
                {download && <DownloadButton href={download.href} text={download.text} />}
				</div>
			</div>
		</div>
	);
};
