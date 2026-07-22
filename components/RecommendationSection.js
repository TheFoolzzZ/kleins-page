"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import SectionHeader from "@/components/cyber/SectionHeader";
import { useTheme } from "@/components/ThemeProvider";

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
    const { theme } = useTheme();
    const paper = theme === "paper";

    if (paper) {
        return (
            <section id="recommend" className="bg-transparent text-foreground relative z-10">
                <div className="container mx-auto px-4 md:px-12 max-w-[1280px] w-full">
                    <SectionHeader
                        index="01"
                        title="Everyday Tools"
                        subtitle="产品推荐 — 我的日常 AI 装备库"
                    />

                    <ul className="border-t border-[var(--panel-border)]">
                        {recommendations.map((item, index) => (
                            <motion.li
                                key={item.name}
                                initial={{ opacity: 0, y: 16 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-60px" }}
                                transition={{ duration: 0.4, delay: index * 0.06 }}
                                className="border-b border-[var(--panel-border)]"
                            >
                                <a
                                    href={item.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group flex items-center gap-6 md:gap-10 py-7 md:py-9"
                                >
                                    <span className="font-mono text-xs text-secondary/60 shrink-0 w-8">
                                        0{index + 1}
                                    </span>
                                    <div className="w-10 h-10 rounded-lg flex items-center justify-center overflow-hidden border border-[var(--panel-border)] neo-panel shrink-0">
                                        <Image
                                            src={`https://www.google.com/s2/favicons?domain=${new URL(item.url).hostname}&sz=128`}
                                            alt={`${item.name} icon`}
                                            width={24}
                                            height={24}
                                            className="rounded-sm"
                                            unoptimized={true}
                                        />
                                    </div>
                                    <h3 className="font-serif-display text-3xl md:text-4xl text-foreground group-hover:text-primary transition-colors shrink-0">
                                        {item.name}
                                    </h3>
                                    <span className="hidden md:block flex-1 h-px bg-[var(--panel-border)]" aria-hidden="true" />
                                    <p className="text-secondary text-sm md:text-base flex-shrink-0">
                                        {item.description}
                                    </p>
                                    <ArrowUpRight className="w-5 h-5 text-primary opacity-0 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all shrink-0" />
                                </a>
                            </motion.li>
                        ))}
                    </ul>
                </div>
            </section>
        );
    }

    return (
        <section id="recommend" className="pt-10 pb-16 bg-transparent text-foreground relative z-10">
            <div className="container mx-auto px-4 md:px-12 max-w-[1280px]">
                <SectionHeader
                    index="01"
                    title="Recommend"
                    subtitle="产品推荐 — 我的日常 AI 装备库"
                />

                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    {recommendations.map((item, index) => (
                        <motion.a
                            key={index}
                            href={item.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group relative block p-6 border border-[var(--panel-border)] rounded-xl neo-card glow-border transition-all duration-300 hover:-translate-y-1"
                            whileHover={{ y: -4 }}
                        >
                            <div className="mb-6 flex justify-between items-start">
                                <div className="w-12 h-12 rounded-lg flex items-center justify-center overflow-hidden border border-[var(--panel-border)] neo-panel">
                                    <Image
                                        src={`https://www.google.com/s2/favicons?domain=${new URL(item.url).hostname}&sz=128`}
                                        alt={`${item.name} icon`}
                                        width={32}
                                        height={32}
                                        className="rounded-sm"
                                        unoptimized={true}
                                    />
                                </div>
                                <span className="font-mono text-[10px] text-secondary/60">
                                    0{index + 1}
                                </span>
                            </div>

                            <div className="space-y-2">
                                <h3 className="font-mono text-lg font-bold group-hover:text-primary transition-colors">{item.name}</h3>
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
