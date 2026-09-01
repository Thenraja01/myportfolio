"use client";
import { useEffect, useState, useRef } from "react";

/* ─── Theme token maps ─────────────────────────────────────────────────── */
const THEMES = {
  dark: {
    bg: "bg-slate-950",
    grid: "opacity-[0.04]",
    ring: "border-indigo-500/30 border-t-indigo-400",
    glow: "bg-indigo-500/20",
    title: "text-slate-100",
    subtitle: "text-indigo-400",
    bar: "bg-indigo-500",
    barTrack: "bg-slate-800",
    dot: "bg-indigo-400",
    scanline: "from-indigo-500/0 via-indigo-400/8 to-indigo-500/0",
  },
  light: {
    bg: "bg-slate-50",
    grid: "opacity-[0.06]",
    ring: "border-indigo-400/40 border-t-indigo-600",
    glow: "bg-indigo-400/10",
    title: "text-slate-900",
    subtitle: "text-indigo-600",
    bar: "bg-indigo-600",
    barTrack: "bg-slate-200",
    dot: "bg-indigo-600",
    scanline: "from-indigo-600/0 via-indigo-500/6 to-indigo-600/0",
  },
  brand: {
    bg: "bg-gradient-to-br from-indigo-950 via-purple-950 to-slate-950",
    grid: "opacity-[0.05]",
    ring: "border-purple-400/40 border-t-purple-300",
    glow: "bg-purple-500/25",
    title: "text-white",
    subtitle: "text-purple-300",
    bar: "bg-gradient-to-r from-indigo-400 to-purple-400",
    barTrack: "bg-white/10",
    dot: "bg-purple-300",
    scanline: "from-purple-500/0 via-purple-300/10 to-purple-500/0",
  },
  glass: {
    bg: "bg-slate-900/80 backdrop-blur-2xl",
    grid: "opacity-[0.05]",
    ring: "border-white/20 border-t-white/60",
    glow: "bg-white/10",
    title: "text-white",
    subtitle: "text-slate-300",
    bar: "bg-white/70",
    barTrack: "bg-white/10",
    dot: "bg-white/70",
    scanline: "from-white/0 via-white/6 to-white/0",
  },
};

/* ─── Word drop animation helper ──────────────────────────────────────── */
function WordDrop({ word, delay, theme }) {
  const t = THEMES[theme] || THEMES.dark;
  return (
    <span
      className={`inline-block ${t.subtitle}`}
      style={{
        animation: `wordDrop 0.55s cubic-bezier(0.22,1,0.36,1) ${delay}ms both`,
      }}
    >
      {word}&nbsp;
    </span>
  );
}

/* ─── Main PortfolioSplashLoader ────────────────────────────────────────── */
/**
 * @param {object} props
 * @param {string}  props.title       – Main headline (from Firebase /loaderConfig/title)
 * @param {string}  props.subtitle    – Tagline text (from Firebase /loaderConfig/subtitle)
 * @param {"dark"|"light"|"brand"|"glass"} props.bgTheme
 * @param {number}  props.duration    – ms before onComplete fires
 * @param {boolean} props.isPreview   – disables onComplete (for admin preview)
 * @param {function} props.onComplete – called when splash finishes
 */
export default function PortfolioSplashLoader({
  title = "THEN RAJA M",
  subtitle = "Full Stack · AI-Integrated Engineer",
  bgTheme = "dark",
  duration = 2400,
  isPreview = false,
  onComplete,
}) {
  const t = THEMES[bgTheme] || THEMES.dark;
  const [progress, setProgress] = useState(0);
  const [titleVisible, setTitleVisible] = useState(false);
  const [subtitleVisible, setSubtitleVisible] = useState(false);
  const [barActive, setBarActive] = useState(false);
  const rafRef = useRef(null);
  const startRef = useRef(null);

  const subtitleWords = subtitle.split(" ");

  /* ── Progress bar animation ── */
  useEffect(() => {
    const animate = (ts) => {
      if (!startRef.current) startRef.current = ts;
      const elapsed = ts - startRef.current;
      const pct = Math.min((elapsed / duration) * 100, 100);
      setProgress(pct);
      if (pct < 100) {
        rafRef.current = requestAnimationFrame(animate);
      } else if (!isPreview && onComplete) {
        setTimeout(onComplete, 200);
      }
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [duration, isPreview, onComplete]);

  /* ── Staggered reveal ── */
  useEffect(() => {
    const t1 = setTimeout(() => setTitleVisible(true), 180);
    const t2 = setTimeout(() => setSubtitleVisible(true), 480);
    const t3 = setTimeout(() => setBarActive(true), 600);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);

  return (
    <>
      {/* Keyframe injection */}
      <style>{`
        @keyframes wordDrop {
          from { opacity: 0; transform: perspective(400px) rotateX(-90deg) translateY(-12px); }
          to   { opacity: 1; transform: perspective(400px) rotateX(0deg)  translateY(0px); }
        }
        @keyframes scanMove {
          0%   { top: -10%; }
          100% { top: 110%; }
        }
        @keyframes titleSlide {
          from { opacity: 0; transform: translateY(20px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0px) scale(1); }
        }
        @keyframes glowPulse {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50%       { opacity: 0.6; transform: scale(1.15); }
        }
        @keyframes dotBounce {
          0%, 80%, 100% { transform: scaleY(0.4); opacity: 0.4; }
          40%            { transform: scaleY(1.0); opacity: 1; }
        }
      `}</style>

      <div
        className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden select-none ${t.bg}`}
      >
        {/* Grid overlay */}
        <div
          className={`absolute inset-0 pointer-events-none ${t.grid}`}
          style={{
            backgroundImage: `
              linear-gradient(to right, currentColor 1px, transparent 1px),
              linear-gradient(to bottom, currentColor 1px, transparent 1px)
            `,
            backgroundSize: "48px 48px",
            color: bgTheme === "light" ? "#64748b" : "#ffffff",
          }}
        />

        {/* Scanline sweep */}
        <div
          className={`absolute left-0 right-0 h-24 bg-gradient-to-b ${t.scanline} pointer-events-none`}
          style={{ animation: `scanMove ${(duration * 0.9) / 1000}s linear infinite` }}
        />

        {/* Glow orb behind spinner */}
        <div
          className={`absolute w-48 h-48 rounded-full ${t.glow} blur-3xl pointer-events-none`}
          style={{ animation: "glowPulse 2s ease-in-out infinite" }}
        />

        {/* ── Spinner ── */}
        <div className="relative z-10 flex flex-col items-center gap-10">
          <div className="relative">
            <div className={`w-16 h-16 rounded-full border-2 animate-spin ${t.ring}`} />
            <div className={`absolute inset-2 rounded-full ${t.glow} blur-md`} />
          </div>

          {/* ── Title ── */}
          <div className="text-center space-y-3">
            {titleVisible && (
              <h1
                className={`font-mono text-xl sm:text-3xl font-black tracking-[0.2em] uppercase ${t.title}`}
                style={{ animation: "titleSlide 0.6s cubic-bezier(0.22,1,0.36,1) both" }}
              >
                {title}
              </h1>
            )}

            {/* ── Subtitle words drop in ── */}
            {subtitleVisible && (
              <p className="font-mono text-xs sm:text-sm font-semibold tracking-widest uppercase overflow-hidden">
                {subtitleWords.map((word, i) => (
                  <WordDrop
                    key={`${word}-${i}`}
                    word={word}
                    delay={i * 90}
                    theme={bgTheme}
                  />
                ))}
              </p>
            )}
          </div>

          {/* ── Progress bar ── */}
          {barActive && (
            <div className="w-48 sm:w-64 space-y-2">
              <div className={`w-full h-[3px] rounded-full ${t.barTrack} overflow-hidden`}>
                <div
                  className={`h-full rounded-full transition-all ease-linear ${t.bar}`}
                  style={{ width: `${progress}%` }}
                />
              </div>

              {/* Bouncing dots */}
              <div className="flex items-end justify-center gap-1 h-3">
                {[0, 1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className={`w-1 h-3 rounded-full ${t.dot}`}
                    style={{
                      animation: `dotBounce 1s ease-in-out ${i * 100}ms infinite`,
                    }}
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Corner label */}
        <div className={`absolute bottom-6 right-6 font-mono text-[9px] uppercase tracking-widest opacity-30 ${t.title}`}>
          Portfolio v2.0
        </div>
      </div>
    </>
  );
}
