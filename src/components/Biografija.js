import { SinglePage } from "./SinglePage";
import Profilna from "../shared/profilnaSlika.png"
import Bio from "../data/biografija.json"

export const Biografija = () => {
	return (
		<SinglePage
			title="Biografija"
			image={{ href: Profilna, alt: "Петар Ђорђевић" }}
			content={Bio}
			download={{ href: "/sajt/Petar_Djordjevic_CV.pdf", text: "Преузми радну биографију"}}
		/>
	)
	
};
