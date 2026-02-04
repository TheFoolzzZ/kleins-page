"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, X, Calendar } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

// Color palette for article cards
const cardColors = ["neo-media", "neo-media-alt", "neo-media", "neo-media-alt"];

export default function ArticleSection() {
    const [articles, setArticles] = useState([]);
    const [showArchiveModal, setShowArchiveModal] = useState(false);
    const [allArticles, setAllArticles] = useState([]);
    const router = useRouter();

    useEffect(() => {
        async function fetchArticles() {
            if (!supabase) return;

            const { data, error } = await supabase
                .from("articles")
                .select("*")
                .order("published_at", { ascending: false })
                .limit(8);

            if (data) {
                setArticles(data);
            }
        }
        fetchArticles();
    }, []);

    const fetchAllArticles = async () => {
        if (!supabase) return;

        const { data, error } = await supabase
            .from("articles")
            .select("id, title, published_at")
            .order("published_at", { ascending: false });

        if (data) {
            setAllArticles(data);
            setShowArchiveModal(true);
        }
    };

    // Group articles by year for the archive modal
    const groupedArticles = allArticles.reduce((acc, article) => {
        const year = new Date(article.published_at).getFullYear();
        if (!acc[year]) acc[year] = [];
        acc[year].push(article);
        return acc;
    }, {});

    const formatDate = (dateStr) => {
        const date = new Date(dateStr);
        return `${String(date.getMonth() + 1).padStart(2, '0')}/${String(date.getDate()).padStart(2, '0')}`;
    };

    // Determine layout based on article count
    const shouldScroll = articles.length > 4;

    return (
        <>
            <section id="articles" className="py-24 bg-transparent">
                <div className="container mx-auto px-4 md:px-12 max-w-[1440px]">
                    <div className="flex justify-between items-end mb-16">
                        <div className="flex items-center gap-4">
                            <div className="w-4 h-4 bg-primary"></div>
                            <h2 className="text-3xl font-bold tracking-wide">
                                LATEST TRANSMISSIONS
                                <span className="text-secondary font-normal text-xl ml-4 block md:inline mt-2 md:mt-0">
                                    最新文章
                                </span>
                            </h2>
                        </div>
                        <button
                            onClick={fetchAllArticles}
                            className="hidden md:flex items-center font-bold hover:text-primary transition-colors text-foreground/80"
                        >
                            VIEW ALL <ArrowUpRight className="ml-2 w-4 h-4" />
                        </button>
                    </div>

                    {/* Articles Container - Grid or Horizontal Scroll */}
                    <div className={
                        shouldScroll
                            ? "flex gap-6 overflow-x-auto pb-6 snap-x snap-mandatory scrollbar-thin scrollbar-track-transparent scrollbar-thumb-[rgba(90,140,255,0.3)]"
                            : "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
                    }>
                        {articles.map((article, index) => (
                            <motion.article
                                key={article.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.05 }}
                                onClick={() => router.push(`/articles/${article.id}`)}
                                className={`group cursor-pointer flex flex-col h-full border border-[var(--panel-border)] rounded-lg overflow-hidden transition-all hover:shadow-lg hover:border-primary/50 neo-card ${shouldScroll ? "flex-none w-[85vw] md:w-[calc(25%-18px)] snap-center" : ""
                                    }`}
                            >
                                {/* Image Area */}
                                <div className={`h-48 w-full ${article.image_url ? "" : cardColors[index % cardColors.length]} relative border-b border-[var(--panel-border)] overflow-hidden`}>
                                    {article.image_url ? (
                                        <img
                                            src={article.image_url}
                                            alt={article.title}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-4xl opacity-20">
                                            📄
                                        </div>
                                    )}
                                    <div className="absolute top-4 left-4 px-2 py-1 text-xs font-mono border border-[var(--panel-border)] neo-panel">
                                        {article.tag_number}
                                    </div>
                                </div>

                                <div className="p-6 flex flex-col flex-grow">
                                    <div className="flex gap-2 mb-4 flex-wrap">
                                        {article.categories?.map(cat => (
                                            <span key={cat} className="px-2 py-0.5 text-xs font-bold uppercase tracking-wider neo-pill">
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

                                    <div className="pt-4 border-t border-[var(--panel-border)] flex justify-between items-center text-sm text-secondary">
                                        <span className="text-secondary font-mono">📅 {article.published_at}</span>
                                        <span className="font-bold flex items-center group-hover:translate-x-1 transition-transform">
                                            READ <ArrowUpRight className="ml-1 w-3 h-3" />
                                        </span>
                                    </div>
                                </div>
                            </motion.article>
                        ))}
                    </div>

                    <div className="mt-8 text-center md:hidden">
                        <button
                            onClick={fetchAllArticles}
                            className="inline-flex items-center font-bold hover:text-primary transition-colors text-foreground/80"
                        >
                            VIEW ALL ARTICLES <ArrowUpRight className="ml-2 w-4 h-4" />
                        </button>
                    </div>
                </div>
            </section>

            {/* Archive Modal */}
            <AnimatePresence>
                {showArchiveModal && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4"
                    >
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                            onClick={() => setShowArchiveModal(false)}
                        />

                        {/* Modal Content */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="relative rounded-2xl shadow-2xl w-full max-w-2xl max-h-[80vh] overflow-hidden neo-modal"
                        >
                            {/* Header */}
                            <div className="sticky top-0 border-b border-[var(--panel-border)] px-6 py-4 flex items-center justify-between">
                                <h2 className="text-2xl font-bold">ALL ARCHIVES</h2>
                                <button
                                    onClick={() => setShowArchiveModal(false)}
                                    className="p-2 hover:bg-white/10 rounded-full transition-colors"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            {/* Content */}
                            <div className="p-6 overflow-y-auto max-h-[calc(80vh-80px)]">
                                {Object.keys(groupedArticles)
                                    .sort((a, b) => b - a)
                                    .map(year => (
                                        <div key={year} className="mb-8">
                                            <h3 className="text-lg font-bold text-primary mb-4 flex items-center gap-2">
                                                <Calendar className="w-4 h-4" />
                                                {year}
                                            </h3>
                                            <div className="space-y-2">
                                                {groupedArticles[year].map(article => (
                                                    <button
                                                        key={article.id}
                                                        onClick={() => {
                                                            setShowArchiveModal(false);
                                                            router.push(`/articles/${article.id}`);
                                                        }}
                                                        className="w-full text-left px-4 py-3 neo-panel hover:border-primary/40 border border-transparent rounded-lg transition-all flex items-center gap-4 group"
                                                    >
                                                        <span className="text-secondary font-mono text-sm w-12">
                                                            {formatDate(article.published_at)}
                                                        </span>
                                                        <span className="font-medium group-hover:text-primary transition-colors flex-1">
                                                            {article.title}
                                                        </span>
                                                        <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    ))}

                                {allArticles.length === 0 && (
                                    <div className="text-center py-12 text-secondary">
                                        No articles yet. Start writing!
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
