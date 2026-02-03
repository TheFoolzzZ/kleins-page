"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { cn } from "@/components/ui";

const navItems = [
    { name: "HOME", href: "#home" },
    { name: "RECOMMEND", href: "#recommend" },
    { name: "PROJECTS", href: "#projects" },
    { name: "ARTICLES", href: "#articles" },
    { name: "ABOUT", href: "#about" },
];

export default function Navbar() {
    const [activeSection, setActiveSection] = useState("home");
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const sections = navItems.map((item) => item.name.toLowerCase());
            const scrollPosition = window.scrollY + window.innerHeight / 2;

            for (const section of sections) {
                const element = document.getElementById(section);
                if (element) {
                    const { offsetTop, offsetHeight } = element;
                    if (
                        scrollPosition >= offsetTop &&
                        scrollPosition < offsetTop + offsetHeight
                    ) {
                        setActiveSection(section);
                    }
                }
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleScrollTo = (e, href) => {
        e.preventDefault();
        const targetId = href.replace("#", "");
        const element = document.getElementById(targetId);
        if (element) {
            // Adjust offset for fixed header
            const headerOffset = 80;
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth"
            });
        }
        setIsMobileMenuOpen(false);
    };

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-border/50 h-20 flex items-center">
            <div className="container mx-auto px-4 md:px-12 flex justify-between items-center max-w-[1280px]">
                {/* Logo Area */}
                <Link href="/" className="flex items-center gap-2 group" onClick={(e) => handleScrollTo(e, "#home")}>
                    <span className="text-xl">🔶</span>
                    <span className="font-bold text-lg tracking-tight">克莱恩的AI搭子</span>
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center gap-8">
                    {navItems.map((item) => {
                        const isActive = activeSection === item.name.toLowerCase();
                        return (
                            <a
                                key={item.name}
                                href={item.href}
                                onClick={(e) => handleScrollTo(e, item.href)}
                                className={cn(
                                    "text-sm font-medium tracking-wide transition-all duration-200 relative",
                                    isActive ? "text-primary scale-110" : "text-foreground hover:text-primary"
                                )}
                            >
                                {item.name}
                                {isActive && (
                                    <motion.div
                                        layoutId="underline"
                                        className="absolute -bottom-1 left-0 right-0 h-[2px] bg-primary"
                                    />
                                )}
                            </a>
                        );
                    })}
                </div>

                {/* Mobile Menu Toggle */}
                <button
                    className="md:hidden p-2"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    {isMobileMenuOpen ? <X /> : <Menu />}
                </button>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden absolute top-20 left-0 right-0 bg-white border-b border-border overflow-hidden shadow-lg"
                    >
                        <div className="flex flex-col p-4 space-y-4">
                            {navItems.map((item) => (
                                <a
                                    key={item.name}
                                    href={item.href}
                                    onClick={(e) => handleScrollTo(e, item.href)}
                                    className={cn(
                                        "text-lg font-medium p-2 block",
                                        activeSection === item.name.toLowerCase() ? "text-primary" : "text-foreground"
                                    )}
                                >
                                    {item.name}
                                </a>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
