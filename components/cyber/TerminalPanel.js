"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Terminal } from "lucide-react";
import { cn } from "@/components/ui";
import TerminalTyping from "./TerminalTyping";
import { useTheme } from "@/components/ThemeProvider";

/**
 * FeaturedPanel — theme-aware.
 * cyber: a fake shell window that "boots" then lists projects as commands.
 * paper: a quiet editorial card listing featured work.
 */
export default function TerminalPanel({ projects = [], onOpen }) {
    const { theme } = useTheme();
    const featured = projects.slice(0, 4);

    if (theme === "paper") {
        return (
            <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="relative w-full max-w-xl neo-card rounded-2xl overflow-hidden border border-[var(--panel-border)]"
            >
                <div className="px-6 md:px-8 pt-7 pb-2">
                    <p className="font-mono text-xs tracking-[0.3em] uppercase text-primary">
                        Featured Work
                    </p>
                    <h3 className="font-serif-display text-3xl mt-2 text-foreground">
                        精选作品
                    </h3>
                </div>
                <ul className="px-3 md:px-4 pb-4">
                    {featured.map((p, i) => (
                        <li key={p.id}>
                            <button
                                onClick={() => onOpen?.(p)}
                                className="group w-full text-left px-3 md:px-4 py-4 flex items-baseline gap-4 border-b border-[var(--panel-border)] last:border-b-0 hover:bg-black/[0.02] transition-colors cursor-pointer rounded-lg"
                            >
                                <span className="font-mono text-xs text-secondary/60 shrink-0">
                                    0{i + 1}
                                </span>
                                <span className="flex-1 min-w-0">
                                    <span className="font-serif-display text-lg text-foreground group-hover:text-primary transition-colors block truncate">
                                        {p.title}
                                    </span>
                                    <span className="text-secondary text-sm line-clamp-1">
                                        {p.description}
                                    </span>
                                </span>
                                <ArrowUpRight className="w-4 h-4 text-primary opacity-0 group-hover:opacity-100 transition-opacity shrink-0 self-center" />
                            </button>
                        </li>
                    ))}
                </ul>
            </motion.div>
        );
    }

    const bootLines = [
        "$ klein --init",
        "loading neural interface .......... OK",
        "syncing featured_projects .......... OK",
        `found ${featured.length} modules. rendering →`,
    ];

    return (
        <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="relative w-full max-w-xl neo-card rounded-2xl overflow-hidden scanlines border border-[var(--panel-border)]"
        >
            {/* Window chrome */}
            <div className="flex items-center gap-2 px-4 py-3 border-b border-[var(--panel-border)] bg-black/30">
                <span className="w-3 h-3 rounded-full bg-[#ff5f57]/80" aria-hidden="true" />
                <span className="w-3 h-3 rounded-full bg-[#febc2e]/80" aria-hidden="true" />
                <span className="w-3 h-3 rounded-full bg-[#28c840]/80" aria-hidden="true" />
                <div className="ml-3 flex items-center gap-2 text-secondary text-xs font-mono">
                    <Terminal className="w-3.5 h-3.5" />
                    klein@ai-lab: ~/featured
                </div>
                <div className="ml-auto flex items-center gap-1.5 font-mono text-[10px] text-emerald-400">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60" />
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
                    </span>
                    ONLINE
                </div>
            </div>

            {/* Body */}
            <div className="p-5 md:p-6 font-mono text-sm md:text-[15px]">
                <TerminalTyping
                    lines={bootLines}
                    speed={16}
                    className="text-secondary/90"
                    showCursor={featured.length === 0}
                />

                {featured.length > 0 && (
                    <motion.ul
                        initial="hidden"
                        animate="show"
                        variants={{
                            hidden: {},
                            show: { transition: { staggerChildren: 0.12, delayChildren: 2.2 } },
                        }}
                        className="mt-5 space-y-2"
                    >
                        {featured.map((p, i) => (
                            <motion.li
                                key={p.id}
                                variants={{
                                    hidden: { opacity: 0, x: -8 },
                                    show: { opacity: 1, x: 0 },
                                }}
                            >
                                <button
                                    onClick={() => onOpen?.(p)}
                                    className={cn(
                                        "group w-full text-left px-3 py-2.5 rounded-lg border border-transparent",
                                        "hover:border-[var(--panel-border)] hover:bg-white/5 transition-colors",
                                        "flex items-center gap-3 cursor-pointer"
                                    )}
                                >
                                    <span className="text-primary/60 select-none">
                                        {String(i + 1).padStart(2, "0")}:
                                    </span>
                                    <span className="neo-chip px-1.5 py-0.5 text-[10px] font-bold rounded shrink-0">
                                        {p.tag}
                                    </span>
                                    <span className="text-foreground group-hover:text-primary transition-colors truncate flex-1">
                                        {p.title}
                                    </span>
                                    <ArrowUpRight className="w-4 h-4 text-primary opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                                </button>
                            </motion.li>
                        ))}
                    </motion.ul>
                )}

                {featured.length > 0 && (
                    <div className="mt-4 text-secondary/70">
                        <span className="text-primary">$</span> ./open{" "}
                        <span className="text-secondary/50"># hover a module & click to launch</span>
                        <span className="term-cursor" aria-hidden="true" />
                    </div>
                )}
            </div>

            {/* Decorative glow */}
            <div
                className="pointer-events-none absolute -top-24 -right-24 w-64 h-64 rounded-full bg-[var(--glow-cyan)] blur-3xl"
                aria-hidden="true"
            />
        </motion.div>
    );
}
