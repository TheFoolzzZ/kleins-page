"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Send, Eye, Edit3, Tag, Image, Type, ArrowLeft, Check } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import MarkdownPreview from "@/components/MarkdownPreview";

export default function EditorPage() {
    const router = useRouter();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    // Form state
    const [title, setTitle] = useState("");
    const [coverUrl, setCoverUrl] = useState("");
    const [tags, setTags] = useState("");
    const [content, setContent] = useState("");

    // Check authentication on mount
    useEffect(() => {
        const authenticated = sessionStorage.getItem("admin_authenticated");
        if (authenticated !== "true") {
            router.push("/admin/secret");
        } else {
            setIsAuthenticated(true);
        }
    }, [router]);

    const handlePublish = async () => {
        if (!title.trim() || !content.trim()) {
            alert("Title and content are required");
            return;
        }

        setIsSubmitting(true);

        try {
            if (!supabase) {
                throw new Error("Database connection unavailable");
            }

            // Generate summary from first 150 chars of content
            const summary = content.replace(/[#*`\[\]]/g, "").substring(0, 150) + "...";

            // Generate tag number
            const tagNumber = `LOG_${Date.now().toString().slice(-6)}`;

            // Parse tags into array
            const categoriesArray = tags.split(",").map(t => t.trim().toUpperCase()).filter(Boolean);

            const { error } = await supabase.from("articles").insert({
                title,
                summary,
                content,
                tag_number: tagNumber,
                categories: categoriesArray.length > 0 ? categoriesArray : ["GENERAL"],
                image_url: coverUrl || null,
                published_at: new Date().toISOString().split("T")[0],
            });

            if (error) throw error;

            setShowSuccess(true);

            // Reset form after delay
            setTimeout(() => {
                setTitle("");
                setCoverUrl("");
                setTags("");
                setContent("");
                setShowSuccess(false);
            }, 2000);

        } catch (err) {
            console.error("Publish error:", err);
            alert("Failed to publish: " + err.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
                <div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-zinc-950 text-white">
            {/* Header */}
            <header className="fixed top-0 left-0 right-0 z-50 bg-zinc-950/80 backdrop-blur-xl border-b border-zinc-800">
                <div className="max-w-[1600px] mx-auto px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => router.push("/")}
                            className="p-2 hover:bg-zinc-800 rounded-lg transition-colors"
                        >
                            <ArrowLeft className="w-5 h-5" />
                        </button>
                        <div className="flex items-center gap-2">
                            <Edit3 className="w-5 h-5 text-primary" />
                            <span className="font-bold text-lg">Write New Article</span>
                        </div>
                    </div>

                    <button
                        onClick={handlePublish}
                        disabled={isSubmitting || !title.trim()}
                        className="flex items-center gap-2 px-6 py-2.5 bg-primary hover:bg-primary/90 disabled:bg-zinc-700 disabled:cursor-not-allowed rounded-xl font-bold transition-all"
                    >
                        {isSubmitting ? (
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        ) : showSuccess ? (
                            <>
                                <Check className="w-5 h-5" />
                                Published!
                            </>
                        ) : (
                            <>
                                <Send className="w-5 h-5" />
                                Publish
                            </>
                        )}
                    </button>
                </div>
            </header>

            {/* Main Content */}
            <div className="pt-20 flex h-screen">
                {/* Left Panel - Editor */}
                <div className="w-1/2 border-r border-zinc-800 flex flex-col">
                    {/* Meta Fields */}
                    <div className="p-6 border-b border-zinc-800 space-y-4">
                        {/* Title */}
                        <div className="flex items-center gap-3">
                            <Type className="w-5 h-5 text-zinc-500" />
                            <input
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="Article Title..."
                                className="flex-1 bg-transparent text-2xl font-bold placeholder:text-zinc-600 focus:outline-none"
                            />
                        </div>

                        {/* Cover URL */}
                        <div className="flex items-center gap-3">
                            <Image className="w-5 h-5 text-zinc-500" />
                            <input
                                type="text"
                                value={coverUrl}
                                onChange={(e) => setCoverUrl(e.target.value)}
                                placeholder="Cover image URL (optional)..."
                                className="flex-1 bg-transparent text-sm text-zinc-300 placeholder:text-zinc-600 focus:outline-none font-mono"
                            />
                        </div>

                        {/* Tags */}
                        <div className="flex items-center gap-3">
                            <Tag className="w-5 h-5 text-zinc-500" />
                            <input
                                type="text"
                                value={tags}
                                onChange={(e) => setTags(e.target.value)}
                                placeholder="Tags (comma separated): AI, Dev, Tutorial..."
                                className="flex-1 bg-transparent text-sm text-zinc-300 placeholder:text-zinc-600 focus:outline-none"
                            />
                        </div>
                    </div>

                    {/* Markdown Editor */}
                    <div className="flex-1 p-6 overflow-hidden">
                        <textarea
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            placeholder="Write your article in Markdown...

# Heading 1
## Heading 2

**Bold text** and *italic text*

![Image description](https://your-image-url.com/image.jpg)

- List item 1
- List item 2

> Blockquote

`inline code`

```
code block
```"
                            className="w-full h-full bg-zinc-900/50 border border-zinc-800 rounded-xl p-6 text-zinc-200 placeholder:text-zinc-600 focus:outline-none focus:border-zinc-700 resize-none font-mono text-sm leading-relaxed"
                            style={{ fontFamily: "'JetBrains Mono', 'Fira Code', monospace" }}
                        />
                    </div>
                </div>

                {/* Right Panel - Preview */}
                <div className="w-1/2 flex flex-col">
                    <div className="p-6 border-b border-zinc-800 flex items-center gap-2">
                        <Eye className="w-5 h-5 text-zinc-500" />
                        <span className="text-zinc-500 text-sm font-medium">Live Preview</span>
                    </div>
                    <div className="flex-1 p-6 overflow-y-auto bg-zinc-900/30">
                        <MarkdownPreview
                            content={content}
                            title={title}
                            coverUrl={coverUrl}
                        />
                    </div>
                </div>
            </div>

            {/* Success Toast */}
            {showSuccess && (
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 50 }}
                    className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-green-500/90 text-white px-6 py-3 rounded-xl flex items-center gap-2 shadow-lg"
                >
                    <Check className="w-5 h-5" />
                    Article published successfully!
                </motion.div>
            )}
        </div>
    );
}
