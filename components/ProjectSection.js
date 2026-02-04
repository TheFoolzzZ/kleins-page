"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { supabase } from "@/lib/supabase";

export default function ProjectSection() {
    const [projects, setProjects] = useState([]);

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

    if (projects.length === 0) return null;

    return (
        <section id="projects" className="py-24 bg-transparent relative">
            <div className="container mx-auto px-4 md:px-12 max-w-[1440px]">
                <div className="flex items-center gap-4 mb-16">
                    <div className="w-1 h-8 bg-primary"></div>
                    <h2 className="text-3xl font-bold tracking-wide text-foreground">PROJECTS <span className="text-secondary font-normal text-xl ml-4">项目作品</span></h2>
                </div>

                {/* Horizontal Scroll Container */}
                <div className="flex gap-6 overflow-x-auto pb-12 snap-x snap-mandatory scrollbar-thin scrollbar-track-transparent scrollbar-thumb-[rgba(90,140,255,0.3)]">
                    {projects.map((project, index) => (
                        <motion.div
                            key={project.id}
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="flex-none w-[85vw] md:w-[calc(25%-18px)] snap-center group"
                        >
                            <a
                                href={project.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block h-full border border-[var(--panel-border)] rounded-2xl overflow-hidden neo-card transition-all duration-300 hover:border-primary hover:shadow-xl"
                            >
                                {/* Image Area */}
                                <div className="h-48 relative overflow-hidden neo-media">
                                    {(() => {
                                        const imageUrl = project.image_url ||
                                            (project.tag === 'DEV-01' ? '/project-covers/global-markets.png' :
                                                project.tag === 'DEV-02' ? '/project-covers/lottery-life.png' : null);

                                        return imageUrl ? (
                                            <img src={imageUrl} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-4xl">
                                                💻
                                            </div>
                                        );
                                    })()}
                                    <div className="absolute top-4 left-4">
                                        <span className="inline-block px-2 py-1 text-xs font-bold rounded neo-chip">
                                            {project.tag}
                                        </span>
                                    </div>
                                </div>

                                {/* Content Area */}
                                <div className="p-6 flex flex-col h-[calc(100%-12rem)]">
                                    <h3 className="text-xl font-bold text-foreground mb-2 line-clamp-1">{project.title}</h3>
                                    <p className="text-secondary text-sm mb-6 line-clamp-2 flex-grow">{project.description}</p>

                                    <div className="flex items-center text-primary font-bold text-sm tracking-wide mt-auto">
                                        VIEW PROJECT
                                        <ArrowUpRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                                    </div>
                                </div>
                            </a>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
