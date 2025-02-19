import matter from "gray-matter";
import { parse, isValid } from "date-fns";
import { Buffer } from "buffer";

window.Buffer = window.Buffer || Buffer;

export async function dohvatiSadrzaj(context, sortDate = false, desc = true, extension = ".md") {
    const paths = context.keys();

    const data = await Promise.all(
        paths.map(async (path) => {
            const name = path.split("/").pop().replace(extension, "");
            const realPath = context(path);
            const fileContent = await fetch(realPath).then((res) => res.text());
            const { content, data } = matter(fileContent);

            return { ...data, content: content, id: name };
        })
    );
    
    if (!sortDate) {
        return data;
    }

    const getDate = (date) => {
        if (!date) {
            return new Date("Invalid");
        }

        const formats = ["HH:mm dd.MM.yyyy.", "dd.MM.yyyy."];

        for (const format of formats) {
            const parsedDate = parse(date, format, new Date());
            if (isValid(parsedDate)) {
                return parsedDate;
            }
        }

        return new Date("Invalid");
    };

    const sortedData = data
        .filter((item) => {
            const currentDate = new Date();
            const itemDate = getDate(item.datum);
            return itemDate <= currentDate;
        })
        .sort((a, b) => {
            const dateA = getDate(a.datum);
            const dateB = getDate(b.datum);
            return desc ? dateB - dateA : dateA - dateB;
        });

    return sortedData;
}
