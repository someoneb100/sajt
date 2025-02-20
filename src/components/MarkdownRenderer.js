import React from "react";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";

export const MarkdownRenderer = ({ content }) => {
    return (
        <ReactMarkdown
            className="prose prose-lg max-w-none text-gray-700"
            rehypePlugins={[rehypeRaw]}
            components={{
                a: ({ node, ...props }) => (
                    // eslint-disable-next-line jsx-a11y/anchor-has-content
                    <a className="text-blue-600 underline hover:text-blue-800 visited:text-purple-600" {...props} />
                )
            }}
        >
            {content}
        </ReactMarkdown>
    );
};