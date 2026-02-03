"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const articles = [
    {
        tag: "LOG_001",
        categories: ["WAYTOAGI", "AI SOP"],
        title: "Skills火了，但我...",
        summary: "文章针对当前AI领域流行的Skills热潮...",
        date: "2026/01/15",
        imageColor: "bg-blue-50"
    },
    {
        tag: "LOG_002",
        categories: ["AI EFF", "GOOGLE"],
        title: "写方案没思路？我用 notebooklm...",
        summary: "本文作者分享了自己利用Google N...",
        date: "2026/01/13",
        imageColor: "bg-green-50"
    },
    {
        tag: "LOG_003",
        categories: ["DEVOPS", "CLAUDE"],
        title: "别折腾环境了！用zcf一键搞定Claude...",
        summary: "本文介绍了一种使用zcf工具快速...",
        date: "2026/01/08",
        imageColor: "bg-purple-50"
    }
];

export default function ArticleSection() {
    return (
        <section id="articles" className="py-24 bg-white">
            <div className="container mx-auto px-4 md:px-12 max-w-[1280px]">
                <div className="flex justify-between items-end mb-16">
                    <div className="flex items-center gap-4">
                        <div className="w-4 h-4 bg-black"></div>
                        <h2 className="text-3xl font-bold tracking-wide">LATEST TRANSMISSIONS <span className="text-secondary font-normal text-xl ml-4 block md:inline mt-2 md:mt-0">最新文章</span></h2>
                    </div>
                    <a href="#" className="hidden md:flex items-center font-bold hover:text-primary transition-colors">
                        VIEW ALL <ArrowUpRight className="ml-2 w-4 h-4" />
                    </a>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {articles.map((article, index) => (
                        <article key={index} className="group cursor-pointer flex flex-col h-full border border-border rounded-lg overflow-hidden transition-all hover:shadow-lg">
                            {/* Image Area */}
                            <div className={`h-48 w-full ${article.imageColor} relative border-b border-border p-6`}>
                                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-2 py-1 text-xs font-mono border border-border">
                                    {article.tag}
                                </div>
                                <div className="w-full h-full flex items-center justify-center text-4xl opacity-20">
                                    📄
                                </div>
                            </div>

                            <div className="p-6 flex flex-col flex-grow">
                                <div className="flex gap-2 mb-4 flex-wrap">
                                    {article.categories.map(cat => (
                                        <span key={cat} className="px-2 py-0.5 bg-gray-100 text-xs font-bold text-secondary uppercase tracking-wider">
                                            [{cat}]
                                        </span>
                                    ))}
                                </div>

                                <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors line-clamp-2">
                                    {article.title}
                                </h3>
                                <p className="text-secondary text-sm mb-6 flex-grow line-clamp-3">
                                    {article.summary}
                                </p>

                                <div className="pt-4 border-t border-border flex justify-between items-center text-sm">
                                    <span className="text-secondary font-mono">📅 {article.date}</span>
                                    <span className="font-bold flex items-center group-hover:translate-x-1 transition-transform">
                                        READ <ArrowUpRight className="ml-1 w-3 h-3" />
                                    </span>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>

                <div className="mt-8 text-center md:hidden">
                    <a href="#" className="inline-flex items-center font-bold hover:text-primary transition-colors">
                        VIEW ALL ARTILES <ArrowUpRight className="ml-2 w-4 h-4" />
                    </a>
                </div>
            </div>
        </section>
    )
}
