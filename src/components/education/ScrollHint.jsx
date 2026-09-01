import { forwardRef } from "react";
import { ChevronDown } from "lucide-react";

export const ScrollHint = forwardRef(function ScrollHint(props, ref) {
  return (
    <div
      ref={ref}
      className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-950/80 border border-slate-800/80 text-slate-400 font-mono text-xs uppercase tracking-widest pointer-events-none backdrop-blur-md shadow-lg transition-opacity duration-300"
    >
      <span>SCROLL TO EXPLORE</span>
      <ChevronDown size={14} className="animate-bounce text-indigo-400" />
    </div>
  );
});
