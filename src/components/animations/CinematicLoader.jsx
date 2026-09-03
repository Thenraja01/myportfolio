"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Terminal, 
  Cpu, 
  Sparkles, 
  Code2, 
  Layers, 
  ArrowRight,
  Zap,
  Globe2
} from "lucide-react";
import "./LoaderStyles.css";

const TECH_BADGES = [
  "Next.js 15",
  "React 19",
  "Node.js",
  "FastAPI",
  "TailwindCSS",
  "AI & LLMs",
  "MongoDB",
  "TypeScript"
];

const PRODUCTIVITY_TAGS = [
  "Turning ideas into scalable architecture...",
  "Building high-performance web systems...",
  "Integrating intelligent AI workflows...",
  "Crafting clean, production-ready code..."
];

export default function CinematicLoader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [tagIndex, setTagIndex] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  // Fast smooth progress counter (0 -> 100 in ~2 seconds)
  useEffect(() => {
    const isReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (isReduced) {
      onComplete?.();
      return;
    }

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsCompleted(true);
          return 100;
        }
        // Accelerating curve
        const step = prev < 30 ? 3 : prev < 75 ? 4 : prev < 95 ? 3 : 2;
        return Math.min(prev + step, 100);
      });
    }, 45);

    return () => clearInterval(interval);
  }, [onComplete]);

  // Rotate productive mottos
  useEffect(() => {
    const tagInterval = setInterval(() => {
      setTagIndex((prev) => (prev + 1) % PRODUCTIVITY_TAGS.length);
    }, 700);
    return () => clearInterval(tagInterval);
  }, []);

  // Automatic completion trigger when 100% reached
  useEffect(() => {
    if (isCompleted) {
      const timer = setTimeout(() => {
        onComplete?.();
      }, 400);
      return () => clearTimeout(timer);
    }
  }, [isCompleted, onComplete]);

  // Allow immediate skip via keypress or click
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code === "Space" || e.code === "Enter" || e.code === "Escape") {
        onComplete?.();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onComplete]);

  return (
    <motion.div
      className="bento-loader-root"
      initial={{ opacity: 1 }}
      exit={{ 
        opacity: 0, 
        scale: 0.97, 
        filter: "blur(8px)",
        transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } 
      }}
    >
      {/* Dynamic Ambient Glows */}
      <div className="bento-ambient-glow glow-indigo" />
      <div className="bento-ambient-glow glow-cyan" />
      <div className="bento-grid-backdrop" />

      {/* Main Glass Bento Grid Container */}
      <div className="relative z-10 w-full max-w-2xl px-4 py-8">
        <motion.div
          className="bento-card p-6 sm:p-8"
          initial={{ opacity: 0, y: 20, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          {/* Header Row: Status Indicator & Skip Button */}
          <div className="flex items-center justify-between pb-6 border-b border-white/10">
            <div className="flex items-center gap-2.5">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400" />
              </span>
              <span className="text-xs font-mono tracking-wider text-slate-200 uppercase font-semibold">
                System Active · Madurai, IN
              </span>
            </div>

            <button
              onClick={() => onComplete?.()}
              className="text-xs font-mono text-white-300 hover:text-white px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/15 border border-white/15 transition-all flex items-center gap-1.5 cursor-pointer shadow-sm"
            >
              <span className="font-semibold">Skip</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Main Identity Tile */}
          <div className="py-6 space-y-2.5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 text-xs font-semibold shadow-inner">
              <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
              <span>Full Stack & AI Engineer</span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white flex items-center gap-3">
              <span>Then Raja M</span>
            </h1>

            <div className="h-6 flex items-center font-mono text-xs sm:text-sm text-white-300">
              <Terminal className="w-4 h-4 mr-2 text-cyan-400 shrink-0" />
              <AnimatePresence mode="wait">
                <motion.span
                  key={tagIndex}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  transition={{ duration: 0.2 }}
                  className="truncate text-white-100 font-medium"
                >
                  {PRODUCTIVITY_TAGS[tagIndex]}
                </motion.span>
              </AnimatePresence>
              <span className="bento-cursor" />
            </div>
          </div>

          {/* Bento Sub-Grid: High Contrast Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 pb-6">
            
            {/* Tile 1: Performance */}
            <div className="bento-card-subtle p-3.5 flex flex-col justify-between">
              <div className="flex items-center justify-between text-white-300 mb-1">
                <span className="text-[11px] font-mono uppercase font-semibold">Performance</span>
                <Zap className="w-4 h-4 text-amber-400" />
              </div>
              <div className="text-2xl font-black text-white tracking-tight">
                99.9<span className="text-sm text-emerald-400 font-bold ml-0.5">%</span>
              </div>
              <span className="text-[11px] text-white-300 font-mono font-medium">Optimized & Fast</span>
            </div>

            {/* Tile 2: Architecture */}
            <div className="bento-card-subtle p-3.5 flex flex-col justify-between">
              <div className="flex items-center justify-between text-white-300 mb-1">
                <span className="text-[11px] font-mono uppercase font-semibold">Architecture</span>
                <Layers className="w-4 h-4 text-indigo-400" />
              </div>
              <div className="text-2xl font-black text-white tracking-tight">
                Modern
              </div>
              <span className="text-[11px] text-white-300 font-mono font-medium">Clean & Scalable</span>
            </div>

            {/* Tile 3: Availability */}
            <div className="bento-card-subtle p-3.5 flex flex-col justify-between">
              <div className="flex items-center justify-between text-white-300 mb-1">
                <span className="text-[11px] font-mono uppercase font-semibold">Status</span>
                <Globe2 className="w-4 h-4 text-cyan-400" />
              </div>
              <div className="text-2xl font-black text-emerald-400 tracking-tight">
                Available
              </div>
              <span className="text-[11px] text-white-300 font-mono font-medium">Open for Work</span>
            </div>

          </div>

          {/* Tech Stack High-Contrast Pills */}
          <div className="pt-2 pb-6">
            <div className="text-[11px] font-mono text-white-300 uppercase mb-2.5 flex items-center gap-1.5 font-semibold">
              <Code2 className="w-3.5 h-3.5 text-indigo-400" />
              <span>Core Stack Arsenal</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {TECH_BADGES.map((badge, idx) => (
                <span
                  key={idx}
                  className="bento-tech-pill text-xs px-3 py-1.5 rounded-lg text-white-100"
                >
                  {badge}
                </span>
              ))}
            </div>
          </div>

          {/* Bottom Progress Bar & Precision Counter */}
          <div className="pt-4 border-t border-white/10 space-y-2.5">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-slate-300 flex items-center gap-1.5 font-medium">
                <Cpu className="w-3.5 h-3.5 text-cyan-400" />
                <span>{progress === 100 ? "Ready to Launch" : "Initializing Portfolio Modules"}</span>
              </span>
              <span className="font-extrabold text-white text-sm">{progress}%</span>
            </div>

            {/* Progress Track with Vivid Shimmer */}
            <div className="relative w-full h-2.5 rounded-full bg-slate-800 border border-white/10 overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-indigo-500 via-cyan-400 to-emerald-400 shimmer-effect relative"
                style={{ width: `${progress}%` }}
                transition={{ ease: "linear" }}
              />
            </div>
          </div>

          {/* Footer Tip */}
          <div className="mt-4 text-center">
            <p className="text-[11px] font-mono text-slate-400">
              Press <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-slate-200 border border-white/20 font-semibold">Space</kbd> or click anywhere to enter
            </p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
