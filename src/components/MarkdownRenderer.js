import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkFrontmatter from "remark-frontmatter";
import rehypeRaw from "rehype-raw";

const MarkdownRenderer = ({ content }) => {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm, remarkFrontmatter]}
      rehypePlugins={[rehypeRaw]}
    >
      {content.body}
    </ReactMarkdown>
  );
};

export default MarkdownRenderer;
