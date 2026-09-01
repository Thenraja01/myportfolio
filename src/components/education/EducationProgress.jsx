import { forwardRef } from "react";

export const EducationProgress = forwardRef(function EducationProgress(
  { total = 3, onSelectIndex },
  ref
) {
  return (
    <div
      ref={ref}
      className="flex flex-col items-center gap-2 bg-white/90 dark:bg-slate-950/80 px-5 py-2.5 rounded-full border border-slate-300 dark:border-slate-800/80 shadow-lg backdrop-blur-md transition-colors"
    >
      <div id="edu-counter-text" className="font-mono text-xs font-bold text-slate-600 dark:text-slate-400 tracking-widest uppercase">
        <span className="text-indigo-600 dark:text-indigo-400">01</span> / 03
      </div>

      {/* Progress Dots */}
      <div className="flex items-center gap-2">
        {Array.from({ length: total }).map((_, index) => (
          <button
            key={index}
            id={`edu-dot-${index}`}
            onClick={() => onSelectIndex && onSelectIndex(index)}
            aria-label={`Jump to milestone ${index + 1}`}
            className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
              index === 0
                ? "w-8 bg-gradient-to-r from-indigo-500 to-purple-500 shadow-md shadow-indigo-500/50"
                : "w-2 bg-slate-300 dark:bg-slate-800 hover:bg-indigo-400"
            }`}
          />
        ))}
      </div>
    </div>
  );
});
