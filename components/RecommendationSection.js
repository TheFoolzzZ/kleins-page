
"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";

const recommendations = [
    {
        name: "Raycast",
        description: "全能的 AI 助手",
        url: "https://www.raycast.com",
    },
    {
        name: "Typeless",
        description: "AI 驱动的效率工具",
        url: "https://www.typeless.com",
    },
    {
        name: "Gemini",
        description: "Google AI 助手",
        url: "https://gemini.google.com",
    },
    {
        name: "Kimi",
        description: "国产 AI 长文本助手",
        url: "https://kimi.moonshot.cn",
    }
];

export default function RecommendationSection() {
    return (
        <section id="recommend" className="py-20 bg-background text-foreground relative z-10">
            <div className="container mx-auto px-4 md:px-12 max-w-[1280px]">
                <div className="flex items-center gap-4 mb-12">
                    <div className="w-1 h-8 bg-primary"></div>
                    <h2 className="text-3xl font-bold tracking-wide">RECOMMEND <span className="text-secondary font-normal text-xl ml-4">产品推荐</span></h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    {recommendations.map((item, index) => (
                        <motion.a
                            key={index}
                            href={item.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group relative block p-6 border border-border rounded-xl bg-white transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                            whileHover={{ y: -4 }}
                        >
                            <div className="mb-6 flex justify-between items-start">
                                <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden border border-gray-200">
                                    <Image
                                        src={`https://www.google.com/s2/favicons?domain=${new URL(item.url).hostname}&sz=128`}
                                        alt={`${item.name} icon`}
                                        width={32}
                                        height={32}
                                        className="rounded-sm"
                                        unoptimized={true}
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <h3 className="text-xl font-bold group-hover:text-primary transition-colors">{item.name}</h3>
                                <p className="text-secondary text-sm">{item.description}</p>
                            </div>

                            {/* Hover Arrow */}
                            <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity">
                                <ArrowUpRight className="w-5 h-5 text-primary" />
                            </div>
                        </motion.a>
                    ))}
                </div>
            </div>
        </section>
    );
}
