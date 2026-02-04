"use client";

import { useEffect, useRef } from "react";

export default function CursorTrail() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );
    const coarsePointer = window.matchMedia("(pointer: coarse)");
    const nav = navigator as Navigator & { deviceMemory?: number };
    const lowEndDevice =
      (typeof nav.deviceMemory === "number" && nav.deviceMemory <= 4) ||
      (typeof navigator.hardwareConcurrency === "number" &&
        navigator.hardwareConcurrency <= 4);

    const reduceEffects =
      prefersReducedMotion.matches || coarsePointer.matches || lowEndDevice;
    document.body.classList.toggle("reduce-effects", reduceEffects);

    if (reduceEffects) return;

    let lastTime = 0;
    let lastX = 0;
    let lastY = 0;
    const throttleMs = 24;

    const handleMove = (event: PointerEvent) => {
      const now = performance.now();
      if (now - lastTime < throttleMs) return;
      const dx = event.clientX - lastX;
      const dy = event.clientY - lastY;
      if (lastX === 0 && lastY === 0) {
        lastX = event.clientX;
        lastY = event.clientY;
        lastTime = now;
        return;
      }
      lastX = event.clientX;
      lastY = event.clientY;
      lastTime = now;

      const speed = Math.hypot(dx, dy);
      if (speed < 2) return;

      const count = Math.min(12, Math.max(4, Math.floor(speed / 4)));
      for (let i = 0; i < count; i += 1) {
        const dot = document.createElement("span");
        const scatter = 8 + Math.random() * 14;
        const size = 3 + Math.random() * 5;
        dot.className = "cursor-dot";
        dot.style.left = `${event.clientX + (Math.random() - 0.5) * scatter}px`;
        dot.style.top = `${event.clientY + (Math.random() - 0.5) * scatter}px`;
        dot.style.width = `${size}px`;
        dot.style.height = `${size}px`;
        dot.style.opacity = `${0.55 + Math.random() * 0.35}`;

        container.appendChild(dot);
        dot.addEventListener("animationend", () => {
          dot.remove();
        });
      }
    };

    window.addEventListener("pointermove", handleMove);
    return () => {
      window.removeEventListener("pointermove", handleMove);
      document.body.classList.remove("reduce-effects");
    };
  }, []);

  return <div ref={containerRef} id="cursor-trail-layer" aria-hidden="true" />;
}
