"use client";
import { experienceMilestones } from "./CareerTrainSection";

export function RailwayTrack({ activeIndex = 0, onSelectStation }) {
  return (
    <div className="relative w-full max-w-2xl mx-auto py-1 sm:py-2 select-none">
      {/* Background Track Line */}
      <div className="absolute top-[13px] sm:top-[15px] left-0 right-0 h-1 bg-slate-800/80 rounded-full" />

      {/* Progressive Active Track Segment */}
      <div
        className="absolute top-[13px] sm:top-[15px] left-0 h-1 rounded-full transition-all duration-500 shadow-md"
        style={{
          width: `${(activeIndex / Math.max(1, experienceMilestones.length - 1)) * 100}%`,
          backgroundColor: experienceMilestones[activeIndex]?.color || "#6366f1",
          boxShadow: `0 0 10px ${experienceMilestones[activeIndex]?.color || "#6366f1"}`,
        }}
      />

      {/* Railway Stations Grid */}
      <div className="relative z-10 flex items-center justify-between px-2 sm:px-4">
        {experienceMilestones.map((exp, index) => {
          const isActive = index === activeIndex;
          const isPassed = index <= activeIndex;

          return (
            <div
              key={exp.id || index}
              onClick={() => onSelectStation && onSelectStation(index)}
              className="flex flex-col items-center gap-0.5 cursor-pointer group"
            >
              {/* Station Node Marker */}
              <div
                className={`relative w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center font-mono text-[10px] sm:text-xs font-bold transition-all duration-300 border ${
                  isActive
                    ? "scale-110 ring-2 ring-opacity-40 shadow-md"
                    : isPassed
                    ? "bg-slate-900 text-slate-300 border-slate-700"
                    : "bg-slate-950 text-slate-600 border-slate-800"
                }`}
                style={
                  isActive
                    ? {
                        backgroundColor: exp.color,
                        borderColor: "#ffffff",
                        color: "#ffffff",
                        boxShadow: `0 0 14px ${exp.color}`,
                      }
                    : {}
                }
              >
                <span>{exp.number}</span>

                {/* Active Station Ping Effect */}
                {isActive && (
                  <span
                    className="absolute -inset-1 rounded-full animate-ping opacity-75"
                    style={{ border: `2px solid ${exp.color}` }}
                  />
                )}
              </div>

              {/* Station Company Name & Current Badge */}
              <div className="text-center flex flex-col items-center">
                <span
                  className={`text-[9px] sm:text-[10px] font-mono font-bold tracking-tight block transition-colors duration-300 ${
                    isActive ? "text-slate-100" : "text-slate-500 group-hover:text-slate-400"
                  }`}
                >
                  {exp.company}
                </span>

                {exp.isCurrent && (
                  <span className="text-[8px] font-mono font-extrabold text-emerald-400 uppercase tracking-tighter mt-0.5 px-1 py-0.2 rounded bg-emerald-500/10 border border-emerald-500/30">
                    ● CURRENT
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
