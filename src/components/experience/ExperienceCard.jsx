"use client";
import { forwardRef } from "react";
import { MapPin, Calendar, ExternalLink, CheckCircle2, Sparkles } from "lucide-react";

export const ExperienceCard = forwardRef(function ExperienceCard(
  { exp, className = "", style = {} },
  ref
) {
  if (!exp) return null;

  const visibleResponsibilities = exp.responsibilities ? exp.responsibilities.slice(0, 3) : [];
  const extraCount = exp.responsibilities ? Math.max(0, exp.responsibilities.length - 3) : 0;
  const skillsList = exp.skills || ["React.js", "Node.js", "Express.js", "MongoDB", "Tailwind CSS"];

  return (
    <div
      ref={ref}
      style={{
        ...style,
        borderColor: `${exp.color}80`,
        boxShadow: `0 0 35px ${exp.color}25`,
      }}
      className={`glass-card-morphism relative w-full max-w-[680px] p-5 sm:p-6 rounded-3xl border-2 transition-all duration-300 shadow-2xl text-slate-900 dark:text-slate-100 overflow-hidden ${className}`}
    >
      {/* Top Header Row */}
      <div className="flex items-center justify-between gap-3 pb-2.5 border-b border-slate-200/80 dark:border-slate-800/80">
        <div className="flex items-center gap-2 flex-wrap">
          <span
            className="font-mono text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-lg border"
            style={{
              backgroundColor: `${exp.color}20`,
              borderColor: `${exp.color}50`,
              color: exp.color,
            }}
          >
            {exp.number} — {exp.company}
          </span>

          {exp.isCurrent && (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-[11px] font-mono font-bold text-emerald-600 dark:text-emerald-400">
              <Sparkles size={11} className="animate-spin" />
              <span>CURRENT</span>
            </span>
          )}
        </div>

        {exp.companyUrl && (
          <a
            href={exp.companyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1 rounded-xl bg-white/80 dark:bg-slate-800/80 hover:bg-white dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-300 dark:border-slate-700/80 transition-colors inline-flex items-center gap-1.5 text-xs font-mono font-bold shrink-0 shadow-sm"
          >
            <span>Visit</span>
            <ExternalLink size={13} />
          </a>
        )}
      </div>

      {/* Role Title & Meta Info */}
      <div className="pt-2.5 space-y-1">
        <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-slate-100 font-mono tracking-tight leading-snug">
          {exp.role}
        </h3>

        <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-slate-700 dark:text-slate-300 font-semibold">
          <div className="flex items-center gap-1.5">
            <Calendar size={13} style={{ color: exp.color }} />
            <span>{exp.duration}</span>
          </div>

          <div className="flex items-center gap-1.5">
            <MapPin size={13} style={{ color: exp.color }} />
            <span>{exp.location}</span>
          </div>
        </div>
      </div>

      {/* Responsibilities (Max 3 Items) */}
      {visibleResponsibilities.length > 0 && (
        <div className="mt-3 pt-2.5 border-t border-slate-200/80 dark:border-slate-800/70 space-y-1.5">
          <div className="text-[10px] font-mono uppercase tracking-wider text-slate-600 dark:text-slate-400 font-bold flex items-center justify-between">
            <span>KEY RESPONSIBILITIES</span>
            {extraCount > 0 && (
              <span className="text-indigo-600 dark:text-indigo-400 text-[10px] lowercase font-semibold">
                +{extraCount} more highlights
              </span>
            )}
          </div>

          <ul className="space-y-1">
            {visibleResponsibilities.map((resp, idx) => (
              <li key={idx} className="flex items-start gap-2 text-xs sm:text-xs text-slate-800 dark:text-slate-200 font-sans leading-relaxed font-medium">
                <CheckCircle2 size={14} className="shrink-0 mt-0.5" style={{ color: exp.color }} />
                <span>{resp}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Tech Stack Badges */}
      <div className="mt-3 pt-2.5 border-t border-slate-200/80 dark:border-slate-800/60 flex flex-wrap gap-1.5 items-center">
        {skillsList.slice(0, 6).map((skill, idx) => (
          <span
            key={idx}
            className="px-2 py-0.5 rounded-md bg-white/80 dark:bg-slate-950/90 border border-slate-300 dark:border-slate-800 text-[10px] sm:text-[11px] font-mono text-slate-800 dark:text-slate-300 font-semibold shadow-sm"
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
});
