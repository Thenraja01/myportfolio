"use client";
import { useState } from "react";
import { Check, Copy } from "lucide-react";

export function CodeBlock({ language, code }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Copy failed:", err);
    }
  };

  return (
    <div className="my-6 rounded-2xl bg-slate-950 border border-slate-800/90 overflow-hidden shadow-2xl font-mono text-xs sm:text-sm">
      {/* Code Header */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-slate-900/90 border-b border-slate-800">
        <span className="text-slate-400 font-mono text-xs uppercase tracking-wider">
          {language || "code"}
        </span>

        <button
          onClick={handleCopy}
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-mono transition-all border border-slate-700/50"
          aria-label="Copy code block"
        >
          {copied ? (
            <>
              <Check size={14} className="text-emerald-400" />
              <span className="text-emerald-400 font-bold">Copied</span>
            </>
          ) : (
            <>
              <Copy size={14} />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>

      {/* Code Content */}
      <pre className="p-4 overflow-x-auto text-slate-200 leading-relaxed font-mono">
        <code>{code}</code>
      </pre>
    </div>
  );
}
