"use client";
import { forwardRef, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { MapPin, Calendar, ExternalLink, CheckCircle2, Sparkles } from "lucide-react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export const ExperienceCard = forwardRef(function ExperienceCard(
  { exp, className = "", style = {} },
  ref
) {
  const cardRef = useRef(null);
  const isReduced = useReducedMotion();
  const [isHovered, setIsHovered] = useState(false);

  // Mouse tracking motion values for 3D tilt & specular glare
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const springConfig = { damping: 20, stiffness: 260 };
  const rotateX = useSpring(useTransform(mouseY, [0, 1], [8, -8]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [0, 1], [-8, 8]), springConfig);
  const scale = useSpring(isHovered ? 1.02 : 1, springConfig);

  // Specular glare position
  const glareX = useTransform(mouseX, [0, 1], ["0%", "100%"]);
  const glareY = useTransform(mouseY, [0, 1], ["0%", "100%"]);

  const handleMouseMove = (e) => {
    if (isReduced || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => {
    setIsHovered(false);
    mouseX.set(0.5);
    mouseY.set(0.5);
  };

  if (!exp) return null;

  const visibleResponsibilities = exp.responsibilities ? exp.responsibilities.slice(0, 3) : [];
  const extraCount = exp.responsibilities ? Math.max(0, exp.responsibilities.length - 3) : 0;
  const skillsList = exp.skills || ["React.js", "Node.js", "Express.js", "MongoDB", "Tailwind CSS"];
  const accentColor = exp.color || "#6366f1";

  return (
    <div
      ref={ref}
      style={{ perspective: "1000px" }}
      className={`relative w-full max-w-[680px] ${className}`}
    >
      <style>{`
        @keyframes neon-conic-spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .animate-conic-neon {
          animation: neon-conic-spin 8s linear infinite;
        }
      `}</style>

      {/* 3D Tilting Card Container */}
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          ...style,
          rotateX: isReduced ? 0 : rotateX,
          rotateY: isReduced ? 0 : rotateY,
          scale: isReduced ? 1 : scale,
          transformStyle: "preserve-3d",
        }}
        className="relative rounded-[2rem] p-[2px] transition-shadow duration-500 overflow-hidden select-none"
      >
        {/* Conic-Gradient Neon Rotating Perimeter Border */}
        <div
          className="absolute -inset-[100%] animate-conic-neon pointer-events-none opacity-50 group-hover:opacity-100 transition-opacity"
          style={{
            background: `conic-gradient(from 0deg at 50% 50%, transparent 0deg, ${accentColor} 60deg, transparent 120deg, transparent 180deg, ${accentColor} 240deg, transparent 300deg, transparent 360deg)`,
            filter: "blur(2px)",
          }}
        />

        {/* Ambient Bloom Glow behind card */}
        <div
          className="absolute inset-0 rounded-[2rem] opacity-20 group-hover:opacity-45 blur-xl transition-opacity duration-500 pointer-events-none"
          style={{ backgroundColor: accentColor }}
        />

        {/* Main Frosted Glass Card Body */}
        <div
          style={{ transformStyle: "preserve-3d" }}
          className="relative rounded-[calc(2rem-2px)] p-6 sm:p-7 bg-white/95 dark:bg-slate-950/90 backdrop-blur-2xl border border-slate-200/90 dark:border-white/10 text-slate-900 dark:text-slate-100 shadow-2xl overflow-hidden transition-colors"
        >
          {/* Dynamic Specular Spotlight Sheen */}
          {isHovered && !isReduced && (
            <motion.div
              className="absolute inset-0 pointer-events-none transition-opacity duration-300"
              style={{
                background: `radial-gradient(circle 350px at ${glareX.get()} ${glareY.get()}, ${accentColor}18, transparent 70%)`,
              }}
            />
          )}

          {/* Layer 1: Header Row (Depth 30px) */}
          <div
            style={{ transform: isReduced ? "none" : "translateZ(30px)" }}
            className="flex items-center justify-between gap-3 pb-3 border-b border-slate-200/80 dark:border-white/10 relative z-10"
          >
            <div className="flex items-center gap-2 flex-wrap">
              <span
                className="font-mono text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-xl border backdrop-blur-md shadow-xs transition-transform"
                style={{
                  backgroundColor: `${accentColor}15`,
                  borderColor: `${accentColor}40`,
                  color: accentColor,
                  boxShadow: `0 0 10px ${accentColor}20`,
                }}
              >
                {exp.number} — {exp.company}
              </span>

              {exp.isCurrent && (
                <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/40 text-[11px] font-mono font-bold text-emerald-600 dark:text-emerald-400 shadow-xs animate-pulse">
                  <Sparkles size={11} className="text-emerald-500 dark:text-emerald-400" />
                  <span>CURRENT</span>
                </span>
              )}
            </div>

            {exp.companyUrl && (
              <a
                href={exp.companyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-white/10 hover:bg-slate-200 dark:hover:bg-white/15 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-white/15 transition-all inline-flex items-center gap-1.5 text-xs font-mono font-bold shrink-0 shadow-2xs hover:scale-105 active:scale-95"
              >
                <span>Visit</span>
                <ExternalLink size={13} />
              </a>
            )}
          </div>

          {/* Layer 2: Role & Metadata (Depth 22px) */}
          <div
            style={{ transform: isReduced ? "none" : "translateZ(22px)" }}
            className="pt-3.5 space-y-2 relative z-10"
          >
            <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white font-mono tracking-tight leading-snug transition-colors">
              {exp.role}
            </h3>

            <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-slate-600 dark:text-slate-300 font-semibold transition-colors">
              <div className="flex items-center gap-1.5">
                <Calendar size={13} style={{ color: accentColor }} />
                <span>{exp.duration}</span>
              </div>

              <div className="flex items-center gap-1.5">
                <MapPin size={13} style={{ color: accentColor }} />
                <span>{exp.location}</span>
              </div>
            </div>
          </div>

          {/* Layer 3: Responsibilities (Depth 16px) */}
          {visibleResponsibilities.length > 0 && (
            <div
              style={{ transform: isReduced ? "none" : "translateZ(16px)" }}
              className="mt-4 pt-3 border-t border-slate-200/80 dark:border-white/10 space-y-2 relative z-10"
            >
              <div className="text-[10px] font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400 font-bold flex items-center justify-between">
                <span>KEY CONTRIBUTIONS</span>
                {extraCount > 0 && (
                  <span
                    className="text-[10px] lowercase font-semibold"
                    style={{ color: accentColor }}
                  >
                    +{extraCount} more highlights
                  </span>
                )}
              </div>

              <ul className="space-y-1.5">
                {visibleResponsibilities.map((resp, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-2 text-xs text-slate-800 dark:text-slate-200 font-sans leading-relaxed font-medium transition-colors"
                  >
                    <CheckCircle2
                      size={14}
                      className="shrink-0 mt-0.5"
                      style={{ color: accentColor }}
                    />
                    <span>{resp}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Layer 4: Tech Stack Chips (Depth 12px) */}
          <div
            style={{ transform: isReduced ? "none" : "translateZ(12px)" }}
            className="mt-4 pt-3 border-t border-slate-200/80 dark:border-white/10 flex flex-wrap gap-1.5 items-center relative z-10"
          >
            {skillsList.slice(0, 6).map((skill, idx) => (
              <span
                key={idx}
                className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 border border-slate-200 dark:border-white/10 text-[10px] sm:text-[11px] font-mono text-slate-800 dark:text-slate-200 font-semibold shadow-2xs transition-all hover:-translate-y-0.5"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
});
