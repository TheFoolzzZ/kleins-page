"use client";

import { useEffect, useState, useRef } from "react";
import { cn } from "@/components/ui";

/**
 * TerminalTyping — types out lines of text like a shell, char by char.
 * `lines` is an array of strings; each is typed then a newline follows.
 * Respects prefers-reduced-motion by rendering everything instantly.
 */
export default function TerminalTyping({
    lines = [],
    speed = 24,
    startDelay = 300,
    className,
    lineClassName,
    showCursor = true,
    loop = false,
    onDone,
}) {
    const [text, setText] = useState("");
    const doneRef = useRef(false);

    useEffect(() => {
        const prefersReduced =
            typeof window !== "undefined" &&
            window.matchMedia("(prefers-reduced-motion: reduce)").matches;

        const full = lines.join("\n");

        if (prefersReduced) {
            setText(full);
            if (!doneRef.current) {
                doneRef.current = true;
                onDone?.();
            }
            return;
        }

        let cancelled = false;
        let timeout;

        const typeFrom = (startIndex) => {
            let i = startIndex;
            const step = () => {
                if (cancelled) return;
                if (i <= full.length) {
                    setText(full.slice(0, i));
                    i++;
                    // Pause briefly on newlines for a natural shell cadence
                    const ch = full[i - 1];
                    const delay = ch === "\n" ? speed * 14 : speed;
                    timeout = setTimeout(step, delay);
                } else {
                    if (!doneRef.current) {
                        doneRef.current = true;
                        onDone?.();
                    }
                    if (loop) {
                        timeout = setTimeout(() => {
                            if (cancelled) return;
                            doneRef.current = false;
                            setText("");
                            typeFrom(0);
                        }, 4000);
                    }
                }
            };
            timeout = setTimeout(step, startDelay);
        };

        typeFrom(0);
        return () => {
            cancelled = true;
            clearTimeout(timeout);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [lines.join(""), speed, startDelay, loop]);

    return (
        <pre
            className={cn(
                "font-mono whitespace-pre-wrap break-words leading-relaxed",
                className
            )}
            aria-label={lines.join(" ")}
        >
            {text.split("\n").map((line, i) => (
                <div key={i} className={lineClassName}>
                    {line}
                </div>
            ))}
            {showCursor && <span className="term-cursor" aria-hidden="true" />}
        </pre>
    );
}
