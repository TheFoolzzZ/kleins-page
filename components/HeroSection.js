"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { ArrowRight, ArrowLeft, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui";
import { supabase } from "@/lib/supabase";

export default function HeroSection() {
    const [projects, setProjects] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(true);

    useEffect(() => {
        async function fetchProjects() {
            if (!supabase) return;

            const { data, error } = await supabase
                .from('projects')
                .select('*')
                .order('created_at', { ascending: false });

            if (data) {
                setProjects(data);
            }
        }
        fetchProjects();
    }, []);

    useEffect(() => {
        let interval;
        if (isPlaying && projects.length > 0) {
            interval = setInterval(() => {
                setCurrentIndex((prev) => (prev + 1) % projects.length);
            }, 3000);
        }
        return () => clearInterval(interval);
    }, [isPlaying, projects.length]);

    const handleNext = () => {
        if (projects.length === 0) return;
        setCurrentIndex((prev) => (prev + 1) % projects.length);
        setIsPlaying(false);
    };

    const handlePrev = () => {
        if (projects.length === 0) return;
        setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length);
        setIsPlaying(false);
    };

    // Show nothing if no projects loaded yet to avoid hydration mismatch layout shift
    // Or show a loading skeleton. For now, we just start rendering when data is there or empty array.
    const currentProject = projects[currentIndex];

    return (
        <section
            id="home"
            className="min-h-screen pt-20 flex items-center relative overflow-hidden bg-transparent"
        >
            <div className="container mx-auto px-4 md:px-12 grid grid-cols-1 md:grid-cols-2 gap-12 items-center max-w-[1280px]">

                {/* Left Content */}
                <div className="space-y-8 relative z-10">
                    <div className="flex items-center gap-2 text-primary font-bold neo-label">
                        <span className="w-8 h-[2px] bg-primary block"></span>
                        AI EXPLORER 2026
                    </div>

                    <h1 className="text-6xl md:text-7xl font-bold leading-[1.1] tracking-tight text-shadow">
                        HELLO<span className="text-primary inline-block w-4 h-4 md:w-5 md:h-5 bg-primary ml-1 align-baseline lg:align-middle"></span>
                    </h1>

                    <div className="space-y-4">
                        <h2 className="text-3xl md:text-5xl font-bold text-foreground">
                            我是克莱恩，<br />
                            <span className="relative">
                                AI 时代的探索者
                                <svg className="absolute -bottom-2 left-0 w-full h-3 text-primary/30" viewBox="0 0 100 10" preserveAspectRatio="none">
                                    <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="3" fill="none" />
                                </svg>
                            </span>
                        </h2>
                        <p className="text-xl md:text-2xl text-secondary font-medium">
                            一个干了多年研发的 B 端产品经理
                        </p>
                    </div>

                    <blockquote className="border-l-4 border-primary pl-6 py-2 text-lg text-secondary/80 italic max-w-lg">
                        "The difference between just getting it done and doing it right is often <strong>just a little bit more effort</strong>."
                    </blockquote>

                    <div className="flex items-center gap-4 text-xl font-medium text-foreground">
                        <span className="w-1 h-8 bg-primary block"></span>
                        拥抱AI，给你的人生提提效。
                    </div>

                    <div className="flex flex-wrap gap-4 pt-4">
                        <Button size="lg" className="rounded-full text-base neo-glow-btn" onClick={() => document.getElementById("articles")?.scrollIntoView({ behavior: 'smooth' })}>
                            查看博客 <ArrowRight className="ml-2 w-4 h-4 rotate-90" />
                        </Button>
                        <Button size="lg" variant="outline" className="rounded-full text-base neo-outline-btn" onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: 'smooth' })}>
                            查看 AI 作品 <ArrowUpRight className="ml-2 w-4 h-4" />
                        </Button>
                    </div>

                    {/* Social Icons Placeholder */}
                    <div className="flex gap-4 text-2xl pt-4 opacity-50">
                        <span>💬</span><span>📕</span><span>🎵</span><span>🐙</span><span>📺</span>
                    </div>
                </div>

                {/* Right Carousel: Book Flip Effect */}
                <div
                    className="relative h-[400px] md:h-[500px] w-full flex items-center justify-center perspective-[1000px]"
                    onMouseEnter={() => setIsPlaying(false)}
                    onMouseLeave={() => setIsPlaying(true)}
                >
                    <div className="relative w-full max-w-[320px] md:max-w-[380px] aspect-[3/4]">
                        <AnimatePresence initial={false}>
                            {projects.map((project, index) => {
                                if (index !== currentIndex) return null;

                                return (
                                    <motion.div
                                        key={project.id}
                                        className="absolute inset-0 rounded-2xl shadow-2xl border border-[var(--panel-border)] p-6 flex flex-col justify-between neo-card overflow-hidden cursor-pointer"
                                        initial={{ x: "100%", opacity: 0, scale: 0.9, rotateY: -10 }}
                                        animate={{ x: "0%", opacity: 1, scale: 1, rotateY: 0 }}
                                        exit={{ x: "-20%", opacity: 0, scale: 0.9, rotateY: 10 }}
                                        transition={{ duration: 0.6, ease: "easeOut" }}
                                        style={{ zIndex: 10 }}
                                        onClick={() => window.open(project.url, '_blank')}
                                    >
                                        <div className="space-y-4">
                                            <div className="flex justify-between items-start">
                                                <span className="px-2 py-1 text-xs font-bold rounded neo-chip">{project.tag}</span>
                                                <span className="text-primary neo-icon" aria-hidden="true">
                                                    <svg
                                                        className="w-8 h-8"
                                                        viewBox="0 0 24 24"
                                                        fill="none"
                                                    >
                                                        <path
                                                            d="M4 8.5l8-4 8 4v7l-8 4-8-4v-7z"
                                                            stroke="currentColor"
                                                            strokeWidth="1.5"
                                                            strokeLinejoin="round"
                                                        />
                                                        <path
                                                            d="M8.2 10.8l3.8-2.2 3.8 2.2v4.4l-3.8 2.2-3.8-2.2v-4.4z"
                                                            stroke="currentColor"
                                                            strokeWidth="1.3"
                                                            strokeLinejoin="round"
                                                        />
                                                        <circle cx="12" cy="12" r="1.2" fill="currentColor" />
                                                    </svg>
                                                </span>
                                            </div>
                                            <div>
                                                <h3 className="text-2xl font-bold mb-2">{project.title}</h3>
                                                <p className="text-secondary mb-4">{project.description}</p>
                                                <div className="w-full h-32 rounded-lg mb-4 flex items-center justify-center text-secondary overflow-hidden neo-media">
                                                    {(() => {
                                                        const imageUrl = project.image_url ||
                                                            (project.tag === 'DEV-01' ? '/project-covers/global-markets.png' :
                                                                project.tag === 'DEV-02' ? '/project-covers/lottery-life.png' : null);

                                                        return imageUrl ? (
                                                            <img src={imageUrl} className="w-full h-full object-cover" />
                                                        ) : (
                                                            "Project Preview"
                                                        );
                                                    })()}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex justify-between items-center border-t border-[var(--panel-border)] pt-4 text-secondary">
                                            <span className="font-bold text-sm">DETAILS</span>
                                            <ArrowUpRight className="w-5 h-5" />
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </AnimatePresence>

                        {/* Stack/Depth effect placeholders behind */}
                        <div className="absolute top-2 right-[-10px] w-full h-full neo-card-alt rounded-2xl border border-[var(--panel-border)] shadow-lg -z-10 rotate-2 opacity-60"></div>
                        <div className="absolute top-4 right-[-20px] w-full h-full neo-card-alt rounded-2xl border border-[var(--panel-border)] shadow-md -z-20 rotate-3 opacity-30"></div>
                    </div>

                    {/* Controls */}
                    <div className="absolute bottom-0 md:bottom-10 right-0 md:right-10 flex gap-2 z-50">
                        <button onClick={handlePrev} className="p-2 rounded-full neo-control-btn transition-colors">
                            <ArrowLeft className="w-4 h-4" />
                        </button>
                        <button onClick={handleNext} className="p-2 rounded-full neo-control-btn transition-colors">
                            <ArrowRight className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}
