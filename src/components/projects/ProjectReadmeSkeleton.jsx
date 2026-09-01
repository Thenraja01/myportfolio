"use client";
import { BookOpen, Loader2 } from "lucide-react";

export function ProjectReadmeSkeleton() {
  return (
    <div className="glass-panel p-6 sm:p-10 rounded-3xl border border-slate-800/90 bg-slate-950/70 backdrop-blur-xl shadow-2xl space-y-8 animate-pulse">
      {/* Skeleton Header Bar */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-800/80">
        <div className="flex items-center gap-2.5">
          <BookOpen size={18} className="text-indigo-400/60" />
          <div className="h-4 w-48 bg-slate-800/80 rounded-md" />
        </div>
        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-mono">
          <Loader2 size={12} className="animate-spin text-indigo-400" />
          <span>Loading documentation...</span>
        </div>
      </div>

      {/* README Document Header Skeleton */}
      <div className="space-y-4 pt-2">
        <div className="h-8 w-3/4 bg-slate-800/90 rounded-xl" />
        <div className="h-4 w-full bg-slate-800/60 rounded-md" />
        <div className="h-4 w-5/6 bg-slate-800/60 rounded-md" />
      </div>

      {/* Heading 2 Skeleton */}
      <div className="space-y-3 pt-4 border-t border-slate-900">
        <div className="h-6 w-1/3 bg-slate-800/80 rounded-lg" />
        <div className="h-4 w-full bg-slate-800/60 rounded-md" />
        <div className="h-4 w-11/12 bg-slate-800/60 rounded-md" />
        <div className="h-4 w-4/5 bg-slate-800/60 rounded-md" />
      </div>

      {/* Code Block Container Skeleton */}
      <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800/80 space-y-2.5">
        <div className="flex justify-between items-center pb-2 border-b border-slate-800/60">
          <div className="h-3 w-20 bg-slate-800 rounded" />
          <div className="h-3 w-12 bg-slate-800 rounded" />
        </div>
        <div className="h-4 w-2/3 bg-slate-800/70 rounded font-mono" />
        <div className="h-4 w-1/2 bg-slate-800/70 rounded font-mono" />
        <div className="h-4 w-3/4 bg-slate-800/70 rounded font-mono" />
      </div>

      {/* Feature Bullet List Skeleton */}
      <div className="space-y-3 pt-2">
        <div className="h-6 w-1/4 bg-slate-800/80 rounded-lg" />
        <div className="space-y-2 pl-4">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-indigo-500/40" />
            <div className="h-4 w-5/6 bg-slate-800/60 rounded-md" />
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-indigo-500/40" />
            <div className="h-4 w-3/4 bg-slate-800/60 rounded-md" />
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-indigo-500/40" />
            <div className="h-4 w-4/5 bg-slate-800/60 rounded-md" />
          </div>
        </div>
      </div>
    </div>
  );
}
