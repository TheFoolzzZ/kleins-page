"use client";

import { motion } from "framer-motion";
import { cn } from "@/components/ui";
import { useTheme } from "@/components/ThemeProvider";

/**
 * SectionHeader — theme-aware section title.
 * cyber: numbered terminal style `[02] // PROJECTS`
 * paper: clean editorial style with small overline + serif title
 */
export default function SectionHeader({
    index,
    title,
    subtitle,
    className,
    align = "left",
}) {
    const { theme } = useTheme();
    const paper = theme === "paper";

    return (
        <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.4 }}
            className={cn(
                "mb-12 md:mb-16",
                align === "center" && "text-center",
                className
            )}
        >
            {paper ? (
                <div className={cn(align === "center" && "flex flex-col items-center")}>
                    {index && (
                        <span className="font-mono text-xs tracking-[0.3em] uppercase text-primary mb-3 block">
                            {index} — {subtitle ? "" : title}
                        </span>
                    )}
                    <h2 className="font-serif-display text-4xl md:text-5xl text-foreground leading-tight">
                        {title}
                    </h2>
                    <div
                        className="mt-4 h-px w-16 bg-primary/60"
                        aria-hidden="true"
                    />
                    {subtitle && (
                        <p className="mt-4 text-secondary text-base md:text-lg">
                            {subtitle}
                        </p>
                    )}
                </div>
            ) : (
                <>
                    <div
                        className={cn(
                            "flex items-center gap-4",
                            align === "center" && "justify-center"
                        )}
                    >
                        {index && (
                            <span className="font-mono text-sm md:text-base text-primary/70 tracking-widest">
                                [{index}]
                            </span>
                        )}
                        <span className="font-mono text-primary/60 text-lg select-none" aria-hidden="true">
                            {"//"}
                        </span>
                        <h2 className="font-mono text-2xl md:text-4xl font-bold tracking-wider text-foreground uppercase">
                            {title}
                        </h2>
                        <div
                            className={cn(
                                "h-px flex-1 bg-gradient-to-r from-[var(--panel-border)] to-transparent",
                                align === "center" && "hidden"
                            )}
                            aria-hidden="true"
                        />
                    </div>
                    {subtitle && (
                        <p className="mt-3 text-secondary text-base md:text-lg font-medium">
                            {subtitle}
                        </p>
                    )}
                </>
            )}
        </motion.div>
    );
}

