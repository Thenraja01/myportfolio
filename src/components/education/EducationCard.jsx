import { forwardRef } from "react";
import { GraduationCap, Award, Calendar } from "lucide-react";

export const EducationCard = forwardRef(function EducationCard(
  { edu, className = "", style = {}, isActive = true },
  ref
) {
  return (
    <div
      ref={ref}
      style={style}
      className={`glass-card-morphism relative w-64 sm:w-72 p-4 sm:p-5 rounded-3xl transition-all duration-500 shadow-xl flex flex-col items-start space-y-3 text-slate-900 dark:text-slate-100 ${
        isActive
          ? "border-cyan-400/80 dark:border-cyan-400/80 shadow-cyan-500/20 ring-2 ring-cyan-500/40 scale-100 opacity-100 z-30"
          : "opacity-40 scale-95 z-10 hover:opacity-80 hover:scale-98"
      } ${className}`}
    >
      {/* Top Year Badge */}
      <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-600 dark:text-cyan-400 text-[11px] font-mono font-bold">
        <Calendar size={12} />
        <span>{edu.duration}</span>
      </div>

      {/* Main Content: Degree & School */}
      <div className="space-y-1">
        <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100 font-mono tracking-tight leading-snug">
          {edu.degree}
        </h3>

        <p className="text-xs font-semibold text-purple-600 dark:text-purple-400 font-sans">
          {edu.institution}
        </p>
      </div>

      {/* Grade / Percentage Pill at Bottom */}
      {(edu.cgpa || edu.percentage) && (
        <div className="pt-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-white/70 dark:bg-slate-800/80 border border-slate-300/80 dark:border-slate-700 text-slate-800 dark:text-slate-200 text-[11px] font-mono font-bold shadow-xs">
            <Award size={13} className="text-amber-500" />
            <span>{edu.cgpa ? `CGPA: ${edu.cgpa}` : `Percentage: ${edu.percentage}`}</span>
          </div>
        </div>
      )}
    </div>
  );
});
