"use client";

import { useState, useEffect } from "react";
import { useTheme } from "@/context/ThemeContext";

export function Scene3DBackground() {
  const { isDark } = useTheme();
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });

  // Interactive mouse tilt effect for 3D depth
  useEffect(() => {
    const handleMouseMove = (e) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * 20; // -10px to +10px
      const y = (e.clientY / innerHeight - 0.5) * 20;
      setMouseOffset({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const shapes = [
    { type: "cube", top: "10%", left: "6%", size: 56, dur: "20s", delay: "0s", spin: "18s", rx: "35deg" },
    { type: "ring", top: "22%", left: "82%", size: 140, dur: "24s", delay: "-4s", spin: "28s", rx: "65deg" },
    { type: "orb", top: "52%", left: "10%", size: 100, dur: "22s", delay: "-8s", spin: "20s" },
    { type: "cube", top: "68%", left: "70%", size: 48, dur: "26s", delay: "-2s", spin: "16s", rx: "50deg" },
    { type: "ring", top: "6%", left: "48%", size: 90, dur: "19s", delay: "-6s", spin: "24s", rx: "40deg" },
    { type: "orb", top: "35%", left: "90%", size: 70, dur: "21s", delay: "-10s", spin: "22s" },
    { type: "cube", top: "85%", left: "25%", size: 60, dur: "25s", delay: "-5s", spin: "20s", rx: "45deg" },
  ];

  return (
    <div
      className={`scene-3d-bg fixed inset-0 pointer-events-none z-0 overflow-hidden transition-colors duration-700 ${
        isDark
          ? "bg-slate-950 text-slate-100"
          : "bg-gradient-to-br from-slate-50 via-indigo-50/40 to-sky-50 text-slate-900"
      }`}
      aria-hidden="true"
      style={{
        transform: `translate3d(${mouseOffset.x * 0.5}px, ${mouseOffset.y * 0.5}px, 0px)`,
        transition: "transform 0.2s ease-out",
      }}
    >
      {/* Dynamic Ambient Glow Orbs */}
      <div
        className={`absolute top-1/4 -left-32 w-96 h-96 rounded-full blur-[120px] transition-all duration-700 pointer-events-none ${
          isDark
            ? "bg-indigo-600/25 opacity-70"
            : "bg-indigo-400/20 opacity-80"
        }`}
      />
      <div
        className={`absolute bottom-1/3 -right-32 w-96 h-96 rounded-full blur-[140px] transition-all duration-700 pointer-events-none ${
          isDark
            ? "bg-purple-600/20 opacity-60"
            : "bg-purple-300/30 opacity-70"
        }`}
      />
      <div
        className={`absolute top-2/3 left-1/3 w-80 h-80 rounded-full blur-[100px] transition-all duration-700 pointer-events-none ${
          isDark
            ? "bg-cyan-500/15 opacity-50"
            : "bg-cyan-300/25 opacity-60"
        }`}
      />

      {/* Perspective Drifting Grid */}
      <div className={`scene-3d-grid ${isDark ? "opacity-50" : "opacity-30"}`} />

      {/* Floating 3D Objects */}
      {shapes.map((s, i) => (
        <div
          key={i}
          className={`shape-3d shape-${s.type}`}
          style={{
            top: s.top,
            left: s.left,
            "--size": `${s.size}px`,
            "--dur": s.dur,
            "--delay": s.delay,
            "--spin-dur": s.spin,
            "--rx": s.rx || "25deg",
            opacity: isDark ? undefined : 0.65,
          }}
        >
          <div className="shape-3d-inner" />
        </div>
      ))}
    </div>
  );
}
