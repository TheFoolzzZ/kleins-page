"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, ArrowLeft, ArrowRight, FolderGit2 } from "lucide-react";
import { supabase } from "@/lib/supabase";
import SectionHeader from "@/components/cyber/SectionHeader";
import { useTheme } from "@/components/ThemeProvider";
import { cn } from "@/components/ui";

function coverFor(project) {
    return (
        project.image_url ||
        (project.tag === "DEV-01"
            ? "/project-covers/global-markets.png"
            : project.tag === "DEV-02"
              ? "/project-covers/lottery-life.png"
              : null)
    );
}

export default function ProjectSection() {
    const [projects, setProjects] = useState([]);
    const { theme } = useTheme();

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

    if (projects.length === 0) return null;

    if (theme === "paper") {
        return <PaperShowcase projects={projects} />;
    }

    return <CyberShowcase projects={projects} />;
}

/* ============================================================
   PAPER — editorial showcase: one project at a time, large image
   ============================================================ */
function PaperShowcase({ projects }) {
    const [index, setIndex] = useState(0);
    const [paused, setPaused] = useState(false);
    const count = projects.length;
    const timerRef = useRef(null);

    const go = useCallback(
        (next) => setIndex((i) => (next + count) % count),
        [count]
    );

    // Auto-advance every 6s unless paused or reduced-motion
    useEffect(() => {
        const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (paused || reduced || count <= 1) return;
        timerRef.current = setInterval(() => {
            setIndex((i) => (i + 1) % count);
        }, 6000);
        return () => clearInterval(timerRef.current);
    }, [paused, count]);

    const project = projects[index];
    const imageUrl = coverFor(project);

    return (
        <section
            id="projects"
            className="bg-transparent relative"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
        >
            <div className="container mx-auto px-4 md:px-12 max-w-[1280px] w-full">
                <SectionHeader
                    index="02"
                    title="Selected Work"
                    subtitle="项目作品 — 一些我在 AI 时代捣鼓出来的东西"
                />

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
                    {/* Image */}
                    <div className="lg:col-span-7 relative">
                        <AnimatePresence mode="wait">
                            <motion.a
                                key={project.id}
                                href={project.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -12 }}
                                transition={{ duration: 0.45, ease: "easeOut" }}
                                className="block relative rounded-2xl overflow-hidden border border-[var(--panel-border)] shadow-[0_20px_60px_rgba(31,28,25,0.12)] group"
                            >
                                <div className="aspect-[4/3] w-full neo-media">
                                    {imageUrl ? (
                                        <img
                                            src={imageUrl}
                                            alt={project.title}
                                            className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-secondary/40">
                                            <FolderGit2 className="w-16 h-16" strokeWidth={1} />
                                        </div>
                                    )}
                                </div>
                                <span className="absolute top-5 left-5 neo-chip px-2.5 py-1 text-[10px] font-bold rounded">
                                    {project.tag}
                                </span>
                            </motion.a>
                        </AnimatePresence>

                        {/* offset frame accent */}
                        <div
                            className="absolute -inset-3 -z-10 rounded-2xl border border-[var(--panel-border)]"
                            aria-hidden="true"
                        />
                    </div>

                    {/* Text */}
                    <div className="lg:col-span-5">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={project.id}
                                initial={{ opacity: 0, y: 16 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.4, ease: "easeOut" }}
                            >
                                <p className="font-mono text-xs tracking-[0.3em] text-primary mb-4">
                                    {String(index + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
                                </p>
                                <h3 className="font-serif-display text-4xl md:text-5xl leading-[1.08] text-foreground mb-5">
                                    {project.title}
                                </h3>
                                <p className="text-secondary text-base md:text-lg leading-relaxed mb-8 max-w-md">
                                    {project.description}
                                </p>
                                <a
                                    href={project.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 text-primary font-medium border-b border-primary/40 pb-1 hover:gap-3 transition-all"
                                >
                                    查看项目 <ArrowUpRight className="w-4 h-4" />
                                </a>
                            </motion.div>
                        </AnimatePresence>

                        {/* Controls */}
                        <div className="mt-12 flex items-center gap-4">
                            <button
                                onClick={() => go(index - 1)}
                                aria-label="Previous project"
                                className="p-2.5 rounded-full neo-control-btn"
                            >
                                <ArrowLeft className="w-4 h-4" />
                            </button>
                            <div className="flex gap-2">
                                {projects.map((_, i) => (
                                    <button
                                        key={i}
                                        onClick={() => go(i)}
                                        aria-label={`Go to project ${i + 1}`}
                                        className={cn(
                                            "h-1.5 rounded-full transition-all duration-300",
                                            i === index
                                                ? "w-8 bg-primary"
                                                : "w-3 bg-[var(--panel-border)] hover:bg-primary/50"
                                        )}
                                    />
                                ))}
                            </div>
                            <button
                                onClick={() => go(index + 1)}
                                aria-label="Next project"
                                className="p-2.5 rounded-full neo-control-btn"
                            >
                                <ArrowRight className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

/* ============================================================
   CYBER — neon showcase: one project at a time, HUD accents
   ============================================================ */
function CyberShowcase({ projects }) {
    const [index, setIndex] = useState(0);
    const [paused, setPaused] = useState(false);
    const count = projects.length;
    const timerRef = useRef(null);

    const go = useCallback(
        (next) => setIndex(() => ((next % count) + count) % count),
        [count]
    );

    useEffect(() => {
        const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (paused || reduced || count <= 1) return;
        timerRef.current = setInterval(() => {
            setIndex((i) => (i + 1) % count);
        }, 6000);
        return () => clearInterval(timerRef.current);
    }, [paused, count]);

    const project = projects[index];
    const imageUrl = coverFor(project);

    return (
        <section
            id="projects"
            className="py-24 bg-transparent relative"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
        >
            <div className="container mx-auto px-4 md:px-12 max-w-[1280px]">
                <SectionHeader
                    index="02"
                    title="Projects"
                    subtitle="项目作品 — 一些我在 AI 时代捣鼓出来的东西"
                />

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
                    {/* Image panel */}
                    <div className="lg:col-span-7 relative">
                        <AnimatePresence mode="wait">
                            <motion.a
                                key={project.id}
                                href={project.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                initial={{ opacity: 0, x: 24 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -18 }}
                                transition={{ duration: 0.4, ease: "easeOut" }}
                                className="block relative rounded-2xl overflow-hidden neo-card scanlines border border-[var(--panel-border)] group glow-border"
                            >
                                <div className="aspect-[16/10] w-full neo-media">
                                    {imageUrl ? (
                                        <img
                                            src={imageUrl}
                                            alt={project.title}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-secondary/40">
                                            <FolderGit2 className="w-16 h-16" strokeWidth={1} />
                                        </div>
                                    )}
                                </div>
                                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                                {/* corner brackets */}
                                <CornerBrackets />
                                <div className="absolute top-4 left-4 flex items-center gap-2">
                                    <span className="neo-chip px-2 py-1 text-[10px] font-bold rounded">
                                        {project.tag}
                                    </span>
                                </div>
                                <span className="absolute bottom-4 right-4 font-mono text-[10px] text-primary/80 tracking-widest">
                                    {String(index + 1).padStart(2, "0")}/{String(count).padStart(2, "0")}
                                </span>
                            </motion.a>
                        </AnimatePresence>

                        {/* ambient glow */}
                        <div
                            className="pointer-events-none absolute -inset-6 -z-10 rounded-3xl bg-[var(--glow-cyan)] blur-3xl opacity-60"
                            aria-hidden="true"
                        />
                    </div>

                    {/* Text panel */}
                    <div className="lg:col-span-5">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={project.id}
                                initial={{ opacity: 0, y: 16 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.35, ease: "easeOut" }}
                            >
                                <p className="font-mono text-xs tracking-[0.3em] text-primary mb-4">
                                    [{String(index + 1).padStart(2, "0")}] {"//"} module
                                </p>
                                <h3 className="font-mono text-3xl md:text-4xl font-bold leading-tight text-foreground mb-5">
                                    {project.title}
                                </h3>
                                <p className="text-secondary text-base leading-relaxed mb-8 max-w-md">
                                    {project.description}
                                </p>
                                <a
                                    href={project.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 font-mono text-sm font-bold text-primary border border-primary/40 rounded-lg px-4 py-2.5 hover:bg-primary/10 transition-colors glow-border"
                                >
                                    ./open <ArrowUpRight className="w-4 h-4" />
                                </a>
                            </motion.div>
                        </AnimatePresence>

                        {/* Controls */}
                        <div className="mt-12 flex items-center gap-4">
                            <button
                                onClick={() => go(index - 1)}
                                aria-label="Previous project"
                                className="p-2.5 rounded-full neo-control-btn"
                            >
                                <ArrowLeft className="w-4 h-4" />
                            </button>
                            <div className="flex gap-2">
                                {projects.map((_, i) => (
                                    <button
                                        key={i}
                                        onClick={() => go(i)}
                                        aria-label={`Go to project ${i + 1}`}
                                        className={cn(
                                            "h-1.5 rounded-full transition-all duration-300",
                                            i === index
                                                ? "w-8 bg-primary shadow-[0_0_10px_var(--panel-glow-strong)]"
                                                : "w-3 bg-[var(--panel-border)] hover:bg-primary/50"
                                        )}
                                    />
                                ))}
                            </div>
                            <button
                                onClick={() => go(index + 1)}
                                aria-label="Next project"
                                className="p-2.5 rounded-full neo-control-btn"
                            >
                                <ArrowRight className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

function CornerBrackets() {
    const base = "absolute w-5 h-5 border-primary/70 pointer-events-none";
    return (
        <>
            <span className={`${base} top-3 left-3 border-t-2 border-l-2`} aria-hidden="true" />
            <span className={`${base} top-3 right-3 border-t-2 border-r-2`} aria-hidden="true" />
            <span className={`${base} bottom-3 left-3 border-b-2 border-l-2`} aria-hidden="true" />
            <span className={`${base} bottom-3 right-3 border-b-2 border-r-2`} aria-hidden="true" />
        </>
    );
}
