"use client";
import { useState } from "react";
import Link from "next/link";
import { TiltCard } from "@/components/3d/TiltCard";
import { Badge } from "@/components/ui/Badge";
import { ProjectLinks } from "./ProjectLinks";
import { parseGitHubUrl } from "@/lib/github/client";
import { ArrowRight, Sparkles, FolderCode, Loader2 } from "lucide-react";

export function ProjectCard({ project }) {
  const [isOpening, setIsOpening] = useState(false);

  // Prefetch README on hover so case study opens fast
  const handlePrefetch = () => {
    if (!project.github) return;
    const repoInfo = parseGitHubUrl(project.github);
    if (repoInfo?.owner && repoInfo?.repo) {
      // Warm up API cache
      fetch(`/api/readme?owner=${encodeURIComponent(repoInfo.owner)}&repo=${encodeURIComponent(repoInfo.repo)}`, {
        priority: "low",
      }).catch(() => {});
    }
  };

  const handleLinkClick = () => {
    setIsOpening(true);
  };

  const projectUrl = `/projects/${project.id}`;

  return (
    <TiltCard maxTilt={5}>
      <div className="glass-card-morphism p-6 sm:p-8 rounded-3xl h-full flex flex-col justify-between space-y-6 group hover:border-cyan-400/60 transition-all duration-300 text-slate-900 dark:text-slate-100 shadow-xl">
        <div className="space-y-4">
          {/* Category & Status */}
          <div className="flex items-center justify-between">
            <Badge variant={project.category === "AI" ? "purple" : "default"}>
              {project.category === "AI" && <Sparkles size={12} className="inline mr-1" />}
              {project.category || "Full Stack"}
            </Badge>

            {project.status && (
              <span className="text-[10px] font-mono uppercase px-2.5 py-1 rounded-md bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 font-bold">
                ● {project.status}
              </span>
            )}
          </div>

          {/* Project Title */}
          <Link
            href={projectUrl}
            onMouseEnter={handlePrefetch}
            onFocus={handlePrefetch}
            onClick={handleLinkClick}
            className="block group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors"
          >
            <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 font-mono tracking-tight flex items-center gap-2 transition-colors">
              <FolderCode size={20} className="text-cyan-600 dark:text-cyan-400 shrink-0" />
              {project.name}
            </h3>
          </Link>

          {/* Description */}
          <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-sans line-clamp-3 transition-colors font-medium">
            {project.description}
          </p>

          {/* Tech stack tags */}
          <div className="flex flex-wrap gap-1.5 pt-2">
            {project.technologies?.map((tech) => (
              <span
                key={tech}
                className="px-2.5 py-1 rounded-lg bg-white/80 dark:bg-slate-900 border border-slate-300 dark:border-slate-800 text-[11px] font-mono text-slate-800 dark:text-slate-300 font-semibold transition-colors shadow-xs"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Links and detail link */}
        <div className="space-y-4 pt-2 border-t border-slate-200/80 dark:border-slate-800/80">
          <ProjectLinks github={project.github} liveDemo={project.liveDemo} />

          <Link
            href={projectUrl}
            onMouseEnter={handlePrefetch}
            onFocus={handlePrefetch}
            onClick={handleLinkClick}
            className="inline-flex items-center gap-1.5 text-xs font-mono text-cyan-600 dark:text-cyan-400 hover:text-cyan-700 dark:hover:text-cyan-300 font-bold group/btn transition-colors"
          >
            {isOpening ? (
              <>
                <Loader2 size={14} className="animate-spin text-cyan-600 dark:text-cyan-400" />
                <span>Opening Case Study...</span>
              </>
            ) : (
              <>
                <span>View Full Case Study</span>
                <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
              </>
            )}
          </Link>
        </div>
      </div>
    </TiltCard>
  );
}
