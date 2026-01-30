"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";

interface MarkdownRendererProps {
    content: string;
}

export default function MarkdownRenderer({ content }: MarkdownRendererProps) {
    return (
        <div className="prose prose-invert prose-pre:bg-surface-2 prose-pre:border prose-pre:border-surface-3 max-w-none">
            <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeHighlight]}
                components={{
                    h1: ({ children }) => <h1 className="text-3xl font-bold mb-6 mt-10 text-white font-display">{children}</h1>,
                    h2: ({ children }) => <h2 className="text-2xl font-bold mb-4 mt-8 text-white font-display border-b border-surface-3 pb-2">{children}</h2>,
                    h3: ({ children }) => <h3 className="text-xl font-bold mb-3 mt-6 text-white font-display">{children}</h3>,
                    p: ({ children }) => <p className="text-text-secondary leading-relaxed mb-4">{children}</p>,
                    ul: ({ children }) => <ul className="list-disc pl-6 mb-4 space-y-2 text-text-secondary">{children}</ul>,
                    ol: ({ children }) => <ol className="list-decimal pl-6 mb-4 space-y-2 text-text-secondary">{children}</ol>,
                    li: ({ children }) => <li className="text-text-secondary">{children}</li>,
                    code: ({ children, className }) => {
                        const isInline = !className;
                        return isInline ? (
                            <code className="bg-surface-2 px-1.5 py-0.5 rounded text-primary-300 text-sm font-mono">
                                {children}
                            </code>
                        ) : (
                            <code className={className}>{children}</code>
                        );
                    },
                    blockquote: ({ children }) => (
                        <blockquote className="border-l-4 border-primary-500 bg-surface-1 px-6 py-4 italic my-6 rounded-r-xl">
                            {children}
                        </blockquote>
                    ),
                    a: ({ href, children }) => (
                        <a href={href} target="_blank" rel="noopener noreferrer" className="text-primary-400 hover:text-primary-300 underline underline-offset-4 transition-colors">
                            {children}
                        </a>
                    ),
                }}
            >
                {content}
            </ReactMarkdown>
        </div>
    );
}
