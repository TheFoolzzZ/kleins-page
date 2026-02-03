"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function MarkdownPreview({ content, title, coverUrl }) {
    return (
        <div className="prose prose-invert prose-lg max-w-none">
            {/* Title */}
            {title && (
                <h1 className="text-3xl font-bold text-white mb-4 border-b border-zinc-700 pb-4">
                    {title}
                </h1>
            )}

            {/* Cover Image */}
            {coverUrl && (
                <div className="mb-6 rounded-lg overflow-hidden">
                    <img
                        src={coverUrl}
                        alt="Cover"
                        className="w-full h-auto object-cover"
                        onError={(e) => {
                            e.target.style.display = 'none';
                        }}
                    />
                </div>
            )}

            {/* Markdown Content */}
            <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                    img: ({ node, ...props }) => (
                        <img
                            {...props}
                            className="rounded-lg max-w-full h-auto my-4"
                            loading="lazy"
                        />
                    ),
                    a: ({ node, ...props }) => (
                        <a
                            {...props}
                            className="text-primary hover:underline"
                            target="_blank"
                            rel="noopener noreferrer"
                        />
                    ),
                    code: ({ node, inline, ...props }) => (
                        inline ? (
                            <code {...props} className="bg-zinc-800 px-1.5 py-0.5 rounded text-sm font-mono text-primary" />
                        ) : (
                            <code {...props} className="block bg-zinc-800 p-4 rounded-lg overflow-x-auto font-mono text-sm" />
                        )
                    ),
                    blockquote: ({ node, ...props }) => (
                        <blockquote {...props} className="border-l-4 border-primary pl-4 italic text-zinc-400" />
                    ),
                    h1: ({ node, ...props }) => (
                        <h1 {...props} className="text-2xl font-bold text-white mt-8 mb-4" />
                    ),
                    h2: ({ node, ...props }) => (
                        <h2 {...props} className="text-xl font-bold text-white mt-6 mb-3" />
                    ),
                    h3: ({ node, ...props }) => (
                        <h3 {...props} className="text-lg font-semibold text-white mt-4 mb-2" />
                    ),
                    p: ({ node, ...props }) => (
                        <p {...props} className="text-zinc-300 leading-relaxed mb-4" />
                    ),
                    ul: ({ node, ...props }) => (
                        <ul {...props} className="list-disc list-inside text-zinc-300 space-y-2 mb-4" />
                    ),
                    ol: ({ node, ...props }) => (
                        <ol {...props} className="list-decimal list-inside text-zinc-300 space-y-2 mb-4" />
                    ),
                    table: ({ node, ...props }) => (
                        <div className="overflow-x-auto mb-4">
                            <table {...props} className="min-w-full border border-zinc-700" />
                        </div>
                    ),
                    th: ({ node, ...props }) => (
                        <th {...props} className="bg-zinc-800 px-4 py-2 text-left text-white font-semibold border border-zinc-700" />
                    ),
                    td: ({ node, ...props }) => (
                        <td {...props} className="px-4 py-2 text-zinc-300 border border-zinc-700" />
                    ),
                }}
            >
                {content || "*开始输入内容...*"}
            </ReactMarkdown>
        </div>
    );
}
