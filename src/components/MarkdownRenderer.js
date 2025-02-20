import React from "react";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

export const MarkdownRenderer = ({ content }) => {
    return (
        <ReactMarkdown
            className="prose prose-lg max-w-none text-gray-700"
            rehypePlugins={[rehypeRaw]}
            components={{
                p: ({ node, ...props }) => (
                    // eslint-disable-next-line jsx-a11y/anchor-has-content
                    <div><p {...props} /><br/></div>
                ),
                a: ({ node, ...props }) => (
                    // eslint-disable-next-line jsx-a11y/anchor-has-content
                    <a className="text-blue-600 underline hover:text-blue-800 visited:text-purple-600" {...props} />
                ),
                h1: ({ node, ...props }) => (
                    // eslint-disable-next-line jsx-a11y/heading-has-content
                    <div><h1 className="text-[#c52233] text-4xl font-bold" {...props} /><br/><br/></div>
                ),
                h2: ({ node, ...props }) => (
                    // eslint-disable-next-line jsx-a11y/heading-has-content
                    <div><h2 className="text-[#c52233] text-3xl font-bold" {...props} /><br/></div>
                ),
                h3: ({ node, ...props }) => (
                    // eslint-disable-next-line jsx-a11y/heading-has-content
                    <h3 className="text-[#c52233] text-2xl font-bold" {...props} />
                ),
                h4: ({ node, ...props }) => (
                    // eslint-disable-next-line jsx-a11y/heading-has-content
                    <h4 className="text-[#c52233] text-xl font-bold" {...props} />
                ),
                h5: ({ node, ...props }) => (
                    // eslint-disable-next-line jsx-a11y/heading-has-content
                    <h5 className="text-[#c52233] text-lg font-bold" {...props} />
                ),
                h6: ({ node, ...props }) => (
                    // eslint-disable-next-line jsx-a11y/heading-has-content
                    <h6 className="text-[#c52233] text-base font-bold" {...props} />
                ),
                code({ inline, className, children, ...props }) {
                    const match = /language-(\w+)/.exec(className || "");
                    return !inline && match ? (
                        <SyntaxHighlighter style={oneDark} language={match[1]} PreTag="div" {...props}>
                            {String(children).replace(/\n$/, "")}
                        </SyntaxHighlighter>
                    ) : (
                        <code className="bg-gray-200 px-1 rounded" {...props}>
                            {children}
                        </code>
                    );
                },
            }}
        >
            {content}
        </ReactMarkdown>
    );
};
