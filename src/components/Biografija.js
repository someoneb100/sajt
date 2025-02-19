import { Buffer } from "buffer";
import { useState, useEffect } from "react";
import matter from "gray-matter";
import { SinglePage } from "./SinglePage";
import Profilna from "../shared/profilnaSlika.png";
import Bio from "../data/biografija.md"

export const Biografija = () => {
    const [bioContent, setBioContent] = useState("");

    useEffect(() => {
		window.Buffer = window.Buffer || Buffer;
        fetch(Bio)
            .then((res) => res.text())
            .then((text) => {
                const { content, } = matter(text);
                setBioContent(content);
            });
    }, []);

    return (
        <SinglePage
            title={"Biografija"}
            image={{ href: Profilna, alt: "Петар Ђорђевић" }}
            content={bioContent}
            download={{ href: "/sajt/Petar_Djordjevic_CV.pdf", text: "Преузми радну биографију" }}
        />
    );
};
