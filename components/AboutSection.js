"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, X } from "lucide-react";
import { Button } from "@/components/ui";

const friendLinks = [
    { name: "WayToAGI", url: "https://www.waytoagi.com" },
    { name: "LangChain", url: "https://www.langchain.com/" },
    { name: "OpenAI", url: "https://openai.com" },
    { name: "Vercel", url: "https://vercel.com" }
];

export default function AboutSection() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <footer id="about" className="bg-[#111] text-white pt-24 pb-8 relative overflow-hidden">
            <div className="container mx-auto px-4 md:px-12 max-w-[1280px]">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-20 mb-24">
                    {/* Left: Next Steps */}
                    <div className="space-y-8">
                        <h4 className="text-primary font-bold tracking-widest uppercase text-sm">■ NEXT STEPS</h4>
                        <h2 className="text-5xl md:text-6xl font-bold">Start a Project</h2>
                        <p className="text-gray-400 text-xl max-w-md leading-relaxed">
                            与AI交朋友，跟着大熊一起AI，拒绝焦虑！<br />
                            有好的想法？我们一起聊聊。
                        </p>
                        <div className="pt-4">
                            <Button
                                size="lg"
                                className="bg-white text-black hover:bg-gray-200 rounded-full px-8 text-lg font-bold"
                                onClick={() => setIsModalOpen(true)}
                            >
                                CONTACT ME <ArrowUpRight className="ml-2 w-5 h-5" />
                            </Button>
                        </div>
                    </div>

                    {/* Right: Friends */}
                    <div className="space-y-8">
                        <h4 className="text-gray-500 font-bold tracking-widest uppercase text-sm">FRIENDS</h4>
                        <ul className="space-y-6">
                            {friendLinks.map((link) => (
                                <li key={link.name}>
                                    <a
                                        href={link.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="group flex items-center justify-between text-2xl font-bold text-gray-300 hover:text-white transition-colors border-b border-gray-800 pb-4"
                                    >
                                        {link.name}
                                        <ArrowUpRight className="w-6 h-6 opacity-0 group-hover:opacity-100 transition-opacity text-primary" />
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-gray-500 text-sm">
                    <p>© 2026 克莱恩. All Rights Reserved.</p>
                    <p className="mt-2 md:mt-0">备案号: XXX</p>
                </div>
            </div>

            {/* QRCode Modal */}
            <AnimatePresence>
                {isModalOpen && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsModalOpen(false)}
                            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                        />
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 20 }}
                            className="relative bg-white rounded-2xl p-8 max-w-sm w-full shadow-2xl z-10 text-center"
                        >
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors text-black"
                            >
                                <X className="w-5 h-5" />
                            </button>

                            <h3 className="text-xl font-bold text-black mb-6">扫码添加微信</h3>
                            <div className="bg-gray-100 w-48 h-48 mx-auto rounded-lg flex items-center justify-center mb-4">
                                {/* QRCode Placeholder */}
                                <div className="grid grid-cols-2 gap-2 p-4">
                                    <div className="w-16 h-16 bg-black"></div>
                                    <div className="w-16 h-16 bg-black"></div>
                                    <div className="w-16 h-16 bg-black"></div>
                                    <div className="w-16 h-16 bg-black"></div>
                                </div>
                            </div>
                            <p className="text-gray-500 text-sm">
                                请注明来意
                            </p>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </footer>
    );
}
