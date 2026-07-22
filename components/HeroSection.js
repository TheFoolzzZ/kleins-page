"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import {
    ArrowRight,
    ArrowUpRight,
    Github,
    MessageSquare,
    Music,
    Tv,
    BookOpen,
    Cpu,
} from "lucide-react";
import { Button } from "@/components/ui";
import { supabase } from "@/lib/supabase";
import TerminalPanel from "@/components/cyber/TerminalPanel";
import { useTheme } from "@/components/ThemeProvider";

const socials = [
    { label: "WeChat", icon: MessageSquare, href: "#" },
    { label: "Blog", icon: BookOpen, href: "#articles" },
    { label: "Music", icon: Music, href: "#" },
    { label: "GitHub", icon: Github, href: "#" },
    { label: "Video", icon: Tv, href: "#" },
];

export default function HeroSection() {
    const [projects, setProjects] = useState([]);
    const { theme } = useTheme();
    const paper = theme === "paper";

    useEffect(() => {
        async function fetchProjects() {
            if (!supabase) return;
            const { data } = await supabase
                .from("projects")
                .select("*")
                .order("priority", { ascending: true })
                .order("created_at", { ascending: true });
            if (data) setProjects(data);
        }
        fetchProjects();
    }, []);

    const scrollTo = (id) =>
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

    return (
        <section
            id="home"
            className={`min-h-[92vh] pt-28 pb-16 flex items-center relative overflow-hidden bg-transparent ${paper ? "" : "dot-grid"}`}
        >
            <div className="container mx-auto px-4 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-14 items-center max-w-[1280px] relative z-10">
                {/* Left Content */}
                <div className="space-y-8">
                    <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                        className={`flex items-center gap-3 text-xs md:text-sm uppercase ${
                            paper
                                ? "font-mono text-primary tracking-[0.3em]"
                                : "font-mono text-primary tracking-[0.3em]"
                        }`}
                    >
                        <Cpu className="w-4 h-4" />
                        <span className="w-8 h-px bg-primary/70" />
                        {paper ? "AI Explorer · 2026" : "system.online // AI_EXPLORER_2026"}
                    </motion.div>

                    <div className="space-y-4">
                        {paper ? (
                            <>
                                <motion.h1
                                    initial={{ opacity: 0, y: 16 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.45, delay: 0.08 }}
                                    className="font-serif-display text-6xl md:text-7xl leading-[1.05]"
                                >
                                    你好，我是
                                    <br />
                                    克莱恩<span className="text-primary">。</span>
                                </motion.h1>
                                <motion.p
                                    initial={{ opacity: 0, y: 16 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.45, delay: 0.16 }}
                                    className="font-serif-display italic text-2xl md:text-3xl text-secondary"
                                >
                                    AI 时代的探索者
                                </motion.p>
                                <motion.p
                                    initial={{ opacity: 0, y: 16 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.45, delay: 0.24 }}
                                    className="text-base md:text-lg text-secondary max-w-md leading-relaxed"
                                >
                                    一个干了多年研发的 B 端产品经理，相信好的工具值得被认真打磨。
                                </motion.p>
                            </>
                        ) : (
                            <>
                                <motion.h1
                                    initial={{ opacity: 0, y: 16 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.45, delay: 0.08 }}
                                    className="text-6xl md:text-7xl font-bold leading-[1.05] tracking-tight"
                                >
                                    HELLO<span className="neon-text">_</span>
                                </motion.h1>

                                <motion.h2
                                    initial={{ opacity: 0, y: 16 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.45, delay: 0.16 }}
                                    className="text-3xl md:text-5xl font-bold text-foreground"
                                >
                                    我是克莱恩，
                                    <br />
                                    <span className="neon-text">AI 时代的探索者</span>
                                </motion.h2>

                                <motion.p
                                    initial={{ opacity: 0, y: 16 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.45, delay: 0.24 }}
                                    className="font-mono text-base md:text-lg text-secondary"
                                >
                                    <span className="text-primary">~</span> 一个干了多年研发的
                                    B 端产品经理
                                </motion.p>
                            </>
                        )}
                    </div>

                    <motion.blockquote
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.45, delay: 0.3 }}
                        className={`pl-5 py-1 max-w-lg ${
                            paper
                                ? "border-l-2 border-primary/60 font-serif-display italic text-lg md:text-xl text-foreground/80"
                                : "border-l-2 border-primary/70 text-base md:text-lg text-secondary/80 italic"
                        }`}
                    >
                        &quot;The difference between just getting it done and doing
                        it right is often{" "}
                        <strong className={paper ? "text-primary font-medium not-italic" : "text-foreground not-italic"}>
                            just a little bit more effort
                        </strong>
                        .&quot;
                    </motion.blockquote>

                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.45, delay: 0.36 }}
                        className="flex flex-wrap gap-4 pt-2"
                    >
                        <Button
                            size="lg"
                            className="rounded-full text-base neo-glow-btn"
                            onClick={() => scrollTo("articles")}
                        >
                            查看博客 <ArrowRight className="ml-2 w-4 h-4 rotate-90" />
                        </Button>
                        <Button
                            size="lg"
                            variant="outline"
                            className="rounded-full text-base neo-outline-btn"
                            onClick={() => scrollTo("projects")}
                        >
                            查看 AI 作品 <ArrowUpRight className="ml-2 w-4 h-4" />
                        </Button>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.45, delay: 0.44 }}
                        className="flex gap-3 pt-2"
                    >
                        {socials.map(({ label, icon: Icon, href }) => (
                            <a
                                key={label}
                                href={href}
                                aria-label={label}
                                onClick={
                                    href.startsWith("#")
                                        ? (e) => {
                                              e.preventDefault();
                                              scrollTo(href.slice(1));
                                          }
                                        : undefined
                                    }
                                className="p-2.5 rounded-lg border border-[var(--panel-border)] text-secondary hover:text-primary hover:border-primary/60 transition-colors glow-border"
                            >
                                <Icon className="w-4 h-4" />
                            </a>
                        ))}
                    </motion.div>
                </div>

                {/* Right: Terminal showing featured projects */}
                <div className="flex items-center justify-center lg:justify-end">
                    <TerminalPanel
                        projects={projects}
                        onOpen={(p) => p.url && window.open(p.url, "_blank")}
                    />
                </div>
            </div>
        </section>
    );
}
