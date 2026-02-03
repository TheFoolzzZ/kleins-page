"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar, Tag, Clock, Share2 } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { useRouter, useParams } from "next/navigation";
import MarkdownPreview from "@/components/MarkdownPreview";

export default function ArticleDetailPage() {
    const [article, setArticle] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();
    const params = useParams();

    useEffect(() => {
        async function fetchArticle() {
            if (!supabase || !params.id) return;

            const { data, error } = await supabase
                .from("articles")
                .select("*")
                .eq("id", params.id)
                .single();

            if (data) {
                setArticle(data);
            }
            setIsLoading(false);
        }
        fetchArticle();
    }, [params.id]);

    if (isLoading) {
        return (
            <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
                <div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
            </div>
        );
    }

    if (!article) {
        return (
            <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center text-white">
                <h1 className="text-4xl font-bold mb-4">Article Not Found</h1>
                <button
                    onClick={() => router.push("/")}
                    className="flex items-center gap-2 text-primary hover:underline"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Back to Home
                </button>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-zinc-950 text-white">
            {/* Header */}
            <header className="fixed top-0 left-0 right-0 z-50 bg-zinc-950/80 backdrop-blur-xl border-b border-zinc-800">
                <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
                    <button
                        onClick={() => router.push("/")}
                        className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors"
                    >
                        <ArrowLeft className="w-5 h-5" />
                        <span className="hidden sm:inline">Back to Home</span>
                    </button>

                    <button
                        onClick={() => {
                            navigator.clipboard.writeText(window.location.href);
                            alert("Link copied!");
                        }}
                        className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors"
                    >
                        <Share2 className="w-4 h-4" />
                        <span className="hidden sm:inline">Share</span>
                    </button>
                </div>
            </header>

            {/* Main Content */}
            <main className="pt-24 pb-16">
                <article className="max-w-4xl mx-auto px-6">
                    {/* Meta Info */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-8"
                    >
                        {/* Tags */}
                        <div className="flex flex-wrap gap-2 mb-4">
                            {article.categories?.map(cat => (
                                <span
                                    key={cat}
                                    className="px-3 py-1 bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-wider rounded-full"
                                >
                                    {cat}
                                </span>
                            ))}
                        </div>

                        {/* Title */}
                        <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                            {article.title}
                        </h1>

                        {/* Date & Reading Time */}
                        <div className="flex items-center gap-6 text-zinc-400 text-sm">
                            <div className="flex items-center gap-2">
                                <Calendar className="w-4 h-4" />
                                {article.published_at}
                            </div>
                            <div className="flex items-center gap-2">
                                <Tag className="w-4 h-4" />
                                {article.tag_number}
                            </div>
                            <div className="flex items-center gap-2">
                                <Clock className="w-4 h-4" />
                                {Math.ceil((article.content?.length || 0) / 500)} min read
                            </div>
                        </div>
                    </motion.div>

                    {/* Cover Image */}
                    {article.image_url && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="mb-12 rounded-2xl overflow-hidden border border-zinc-800"
                        >
                            <img
                                src={article.image_url}
                                alt={article.title}
                                className="w-full h-auto"
                            />
                        </motion.div>
                    )}

                    {/* Content */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-8 md:p-12"
                    >
                        {article.content ? (
                            <MarkdownPreview content={article.content} />
                        ) : (
                            <p className="text-zinc-400 text-lg leading-relaxed">
                                {article.summary}
                            </p>
                        )}
                    </motion.div>

                    {/* Footer Navigation */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="mt-12 pt-8 border-t border-zinc-800 flex justify-between items-center"
                    >
                        <button
                            onClick={() => router.push("/")}
                            className="flex items-center gap-2 text-zinc-400 hover:text-primary transition-colors"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            Back to Articles
                        </button>
                    </motion.div>
                </article>
            </main>
        </div>
    );
}
