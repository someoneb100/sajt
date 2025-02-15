import { vratiSadrzaj } from "../utils/VratiSadrzaj";
// import { Title } from "./Title";
import data from "../data/websiteData.json";
import { useParams } from "react-router-dom";

export const JedanBlog = () => {
	const { id } = useParams();

	const blog = data.blogovi.find((blog) => blog.id === id);

	return (
		<div className="px-4 md:pl-[15%] md:pr-[15%] bg-[#F7F8F9] pb-12 w-full">
			<h1 className="text-[#c52233] font-semibold text-3xl md:text-5xl leading-[36px] md:leading-[56px] pb-6">
				{blog.naslov}
			</h1>
			<div className="mx-auto bg-white shadow-lg rounded-lg p-4">
				<div className="flex flex-col md:flex-row gap-4">
					<div className="max-w-full md:max-w-[420px] rounded-lg overflow-hidden flex-shrink-0">
						<img
							src={blog.slika}
							alt={blog.naslov}
							className="object-cover w-full h-full"
						/>
					</div>
					<div className="flex flex-col">
						<div className="flex-1">
							<p className="text-gray-700 text-sm md:text-base">
								{vratiSadrzaj({ content: blog.opis })}
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
