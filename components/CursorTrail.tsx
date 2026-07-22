"use client";

import { useEffect, useRef } from "react";
import { useTheme } from "@/components/ThemeProvider";

/**
 * CursorTrail — a glowing rainbow "energy ribbon" that follows the pointer.
 * Renders on a full-screen canvas with additive blending so strokes bloom
 * like the neon swirl in the reference. Cyber theme only; paper stays clean.
 * Respects reduced-motion, coarse pointers, and low-end devices.
 */
export default function CursorTrail() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { theme } = useTheme();

  useEffect(() => {
    if (theme !== "cyber") return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

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

    // --- sizing ---
    let width = 0;
    let height = 0;
    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };
    resize();
    window.addEventListener("resize", resize);

    // --- trail state ---
    // Sample raw pointer positions; strands are rendered along this path.
    type Pt = { x: number; y: number };
    const points: Pt[] = [];
    const MAX_PTS = 40;
    let lastX: number | null = null;
    let lastY: number | null = null;
    let hue = 0;
    let phase = 0;
    let intensity = 0; // fades in on move, out when idle
    let raf = 0;

    const onMove = (e: PointerEvent) => {
      const x = e.clientX;
      const y = e.clientY;
      if (lastX === null || lastY === null) {
        lastX = x;
        lastY = y;
        points.push({ x, y });
        return;
      }
      // only record when moved enough to keep the path smooth
      if (Math.hypot(x - lastX, y - lastY) > 2) {
        points.push({ x, y });
        if (points.length > MAX_PTS) points.shift();
        lastX = x;
        lastY = y;
      }
      intensity = 1;
    };

    window.addEventListener("pointermove", onMove);

    // Catmull-Rom → smooth polyline through the sampled points
    const smooth = (pts: Pt[]): Pt[] => {
      if (pts.length < 3) return pts.slice();
      const out: Pt[] = [];
      for (let i = 0; i < pts.length - 1; i += 1) {
        const p0 = pts[Math.max(0, i - 1)];
        const p1 = pts[i];
        const p2 = pts[i + 1];
        const p3 = pts[Math.min(pts.length - 1, i + 2)];
        const SEG = 4;
        for (let t = 0; t < SEG; t += 1) {
          const u = t / SEG;
          const u2 = u * u;
          const u3 = u2 * u;
          out.push({
            x:
              0.5 *
              (2 * p1.x +
                (-p0.x + p2.x) * u +
                (2 * p0.x - 5 * p1.x + 4 * p2.x - p3.x) * u2 +
                (-p0.x + 3 * p1.x - 3 * p2.x + p3.x) * u3),
            y:
              0.5 *
              (2 * p1.y +
                (-p0.y + p2.y) * u +
                (2 * p0.y - 5 * p1.y + 4 * p2.y - p3.y) * u2 +
                (-p0.y + 3 * p1.y - 3 * p2.y + p3.y) * u3),
          });
        }
      }
      out.push(pts[pts.length - 1]);
      return out;
    };

    const STRANDS = 6;

    const draw = () => {
      raf = requestAnimationFrame(draw);
      ctx.clearRect(0, 0, width, height);

      hue = (hue + 1.6) % 360;
      phase += 0.08;
      // ease intensity toward 0 so the trail fades when the pointer idles
      intensity *= 0.94;
      if (points.length < 2 || intensity < 0.02) {
        if (intensity < 0.02) points.length = 0;
        return;
      }

      const path = smooth(points);
      const n = path.length;
      if (n < 2) return;

      ctx.globalCompositeOperation = "lighter";
      ctx.lineCap = "round";
      ctx.lineJoin = "round";

      for (let s = 0; s < STRANDS; s += 1) {
        const strandHue = (hue + s * 26) % 360;
        const latOffset = (s - (STRANDS - 1) / 2) * 4; // px separation
        const phaseOff = phase + s * 0.9;

        for (let pass = 0; pass < 2; pass += 1) {
          const glow = pass === 0;
          ctx.strokeStyle = glow
            ? `hsla(${strandHue}, 100%, 65%, ${0.12 * intensity})`
            : `hsla(${strandHue}, 100%, 74%, ${0.7 * intensity})`;
          ctx.lineWidth = glow ? 4.5 : 1.3;
          ctx.beginPath();
          for (let i = 0; i < n; i += 1) {
            const p = path[i];
            const t = i / (n - 1); // 0 tail → 1 head
            // perpendicular direction for lateral spread
            const nxt = path[Math.min(n - 1, i + 1)];
            const dx = nxt.x - p.x;
            const dy = nxt.y - p.y;
            const len = Math.hypot(dx, dy) || 1;
            const nx = -dy / len;
            const ny = dx / len;
            const wobble = Math.sin(phaseOff + t * 6) * 2.5;
            // strands converge near the head (t→1), spread at the tail
            const spread = (1 - t) * latOffset + wobble * (1 - t);
            const x = p.x + nx * spread;
            const y = p.y + ny * spread;
            if (i === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
          }
          ctx.stroke();
        }
      }

      ctx.globalCompositeOperation = "source-over";
    };
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
      document.body.classList.remove("reduce-effects");
    };
  }, [theme]);

  if (theme !== "cyber") return null;

  return (
    <canvas
      ref={canvasRef}
      id="cursor-trail-layer"
      aria-hidden="true"
      style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 3 }}
    />
  );
}
