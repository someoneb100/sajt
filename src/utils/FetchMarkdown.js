import frontMatter from "front-matter";

export const fetchMarkdown = async (url) => {
  try {
    const res = await fetch(url);
    const text = await res.text();
    const parsed = frontMatter(text);
    const fileName = url.split('/').pop().replace('.md', '');
    return {...parsed, index: fileName};
  } catch (err) {
    console.error("Error loading markdown:", err);
    return { attributes: {}, body: "", index: null };
  }
};