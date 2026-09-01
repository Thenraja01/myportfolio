import { ExternalLink, Github } from "lucide-react";

export function ProjectLinks({ github, liveDemo }) {
  // Validate liveDemo URL: do not render if empty string, "\"\"", null, undefined
  const hasValidDemo =
    liveDemo &&
    typeof liveDemo === "string" &&
    liveDemo.trim() !== "" &&
    liveDemo.trim() !== '""' &&
    liveDemo.trim() !== "\"\"";

  const hasValidGithub =
    github && typeof github === "string" && github.trim() !== "";

  return (
    <div className="flex items-center gap-3 pt-4 border-t border-slate-900">
      {hasValidGithub && (
        <a
          href={github}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono font-semibold text-slate-300 hover:text-white hover:border-indigo-500/50 transition-all"
        >
          <Github size={14} /> Code
        </a>
      )}

      {hasValidDemo && (
        <a
          href={liveDemo}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600/20 border border-indigo-500/30 text-xs font-mono font-bold text-indigo-300 hover:bg-indigo-600 hover:text-white transition-all shadow-md"
        >
          <ExternalLink size={14} /> Live Demo
        </a>
      )}
    </div>
  );
}
