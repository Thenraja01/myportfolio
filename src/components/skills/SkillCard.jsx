"use client";
import { TiltCard } from "@/components/3d/TiltCard";
import { Badge } from "@/components/ui/Badge";
import { Code2, Server, Cpu, Terminal, Sparkles, Brain } from "lucide-react";

const categoryIcons = {
  frontendDevelopment: Code2,
  backendAndDatabases: Server,
  aiToolsAndEmergingTech: Sparkles,
  devOpsAndTools: Terminal,
  programmingAndCSConcepts: Cpu,
  softSkills: Brain,
};

const categoryTitles = {
  frontendDevelopment: "Frontend",
  backendAndDatabases: "Backend & Databases",
  aiToolsAndEmergingTech: "AI & Emerging Tech",
  devOpsAndTools: "DevOps & Tools",
  programmingAndCSConcepts: "Programming & CS",
  softSkills: "Soft Skills",
};

export function SkillCard({ categoryKey, skills }) {
  const Icon = categoryIcons[categoryKey] || Code2;
  const title = categoryTitles[categoryKey] || categoryKey;

  return (
    <TiltCard maxTilt={4}>
      <div className="glass-card-morphism p-6 rounded-3xl h-full flex flex-col justify-between space-y-4 text-slate-900 dark:text-slate-100 transition-colors shadow-xl">
        <div className="flex items-center gap-3 border-b border-slate-200/80 dark:border-slate-800/80 pb-4">
          <div className="p-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-600 dark:text-cyan-400">
            <Icon size={20} />
          </div>
          <h3 className="font-mono font-bold text-slate-900 dark:text-slate-100 text-sm sm:text-base transition-colors">
            {title}
          </h3>
        </div>

        <div className="flex flex-wrap gap-2 pt-2">
          {skills.map((skill) => (
            <Badge key={skill} variant="default" className="text-xs font-semibold">
              {skill}
            </Badge>
          ))}
        </div>
      </div>
    </TiltCard>
  );
}
