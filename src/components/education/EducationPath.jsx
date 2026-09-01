import { forwardRef } from "react";
import { GraduationCap } from "lucide-react";

export const SVG_PATH_D = "M 180 80 C 480 80, 720 90, 820 180 C 920 280, 600 360, 320 440 C 140 510, 480 620, 720 680 C 880 720, 980 780, 1100 800";

export const EducationPath = forwardRef(function EducationPath(props, ref) {
  return (
    <div className="absolute inset-0 pointer-events-none z-0 flex items-center justify-center">
      <svg
        viewBox="0 0 1200 800"
        className="w-full h-full max-w-6xl max-h-[85vh] overflow-visible opacity-70"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <linearGradient id="eduPathGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.9" />
            <stop offset="50%" stopColor="#8b5cf6" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.9" />
          </linearGradient>

          <filter id="eduNodeGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Base Track S-Curve Line */}
        <path
          d={SVG_PATH_D}
          fill="none"
          stroke="#f59e0b"
          strokeWidth="3.5"
          className="opacity-70"
        />

        {/* GSAP Controlled Active Animated Stroke Line */}
        <path
          ref={ref}
          d={SVG_PATH_D}
          fill="none"
          stroke="url(#eduPathGradient)"
          strokeWidth="4.5"
          strokeLinecap="round"
        />

        {/* Graduation Cap Node 1 (Top Curve) */}
        <g transform="translate(520, 120)">
          <circle r="20" className="fill-white dark:fill-slate-900 stroke-indigo-500 stroke-2 drop-shadow-md" />
          <foreignObject x="-10" y="-10" width="20" height="20">
            <GraduationCap size={18} className="text-indigo-600 dark:text-indigo-400" />
          </foreignObject>
        </g>

        {/* Graduation Cap Node 2 (Middle Curve) */}
        <g transform="translate(520, 420)">
          <circle r="20" className="fill-white dark:fill-slate-900 stroke-purple-500 stroke-2 drop-shadow-md" />
          <foreignObject x="-10" y="-10" width="20" height="20">
            <GraduationCap size={18} className="text-purple-600 dark:text-purple-400" />
          </foreignObject>
        </g>
      </svg>
    </div>
  );
});
