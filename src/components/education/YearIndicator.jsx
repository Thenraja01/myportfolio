import { forwardRef } from "react";

export const YearIndicator = forwardRef(function YearIndicator(
  { initialYear = "2019 – 2020" },
  ref
) {
  return (
    <div className="inline-flex items-center gap-3 px-6 py-2.5 rounded-full bg-white/90 dark:bg-slate-900/90 border border-indigo-300 dark:border-indigo-500/30 backdrop-blur-xl shadow-xl transition-colors">
      <span className="w-2 h-2 rounded-full bg-indigo-500 dark:bg-indigo-400 animate-pulse" />
      <span
        ref={ref}
        className="font-mono text-sm sm:text-base font-extrabold text-indigo-600 dark:text-indigo-300 tracking-wider transition-opacity duration-300"
      >
        {initialYear}
      </span>
    </div>
  );
});
