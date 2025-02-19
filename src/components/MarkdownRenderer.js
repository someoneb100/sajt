import React from "react";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";

export const MarkdownRenderer = ({ content }) => {
    return (
        <ReactMarkdown
            className="prose prose-lg max-w-none text-gray-700"
            rehypePlugins={[rehypeRaw]} // Allows rendering of raw HTML
        >
            {content}
        </ReactMarkdown>
    );
};

