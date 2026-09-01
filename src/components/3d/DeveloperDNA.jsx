"use client";
import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useSkills } from "@/context/SkillsContext";
import { Cpu, Code2, Server, Database, Zap, Container } from "lucide-react";

export function DeveloperDNA() {
  const isReduced = useReducedMotion();
  const { technicalSkills } = useSkills();

  // Extract real skills from Firebase Realtime DB
  const aiSkill = technicalSkills?.aiToolsAndEmergingTech?.[0] || "AI/ML";
  const reactSkill = technicalSkills?.frontendDevelopment?.find((s) => s.includes("React")) || "React.js";
  const nodeSkill = technicalSkills?.backendAndDatabases?.find((s) => s.includes("Node")) || "Node.js";
  const dbSkill = technicalSkills?.backendAndDatabases?.find((s) => s.includes("MongoDB")) || "MongoDB";
  const pythonSkill = technicalSkills?.backendAndDatabases?.find((s) => s.includes("FastAPI")) || "FastAPI";
  const devopsSkill = technicalSkills?.devOpsAndTools?.find((s) => s.includes("Docker")) || "Docker";

  const dnaNodes = [
    {
      id: "ai",
      label: aiSkill,
      icon: Cpu,
      emoji: "🤖",
      accent: "text-purple-400 border-purple-500/40 bg-purple-950/60",
      align: "left",
    },
    {
      id: "react",
      label: reactSkill,
      icon: Code2,
      accent: "text-cyan-400 border-cyan-500/40 bg-cyan-950/60",
      align: "right",
    },
    {
      id: "node",
      label: nodeSkill,
      icon: Server,
      accent: "text-emerald-400 border-emerald-500/40 bg-emerald-950/60",
      align: "left",
    },
    {
      id: "mongodb",
      label: dbSkill,
      icon: Database,
      accent: "text-green-400 border-green-500/40 bg-green-950/60",
      align: "right",
    },
    {
      id: "fastapi",
      label: pythonSkill,
      icon: Zap,
      accent: "text-teal-400 border-teal-500/40 bg-teal-950/60",
      align: "left",
    },
    {
      id: "docker",
      label: devopsSkill,
      icon: Container,
      accent: "text-blue-400 border-blue-500/40 bg-blue-950/60",
      align: "right",
    },
  ];

  return (
    <div className="relative w-full max-w-sm mx-auto p-6 rounded-3xl glass-panel border border-slate-800 bg-slate-950/70 backdrop-blur-2xl shadow-2xl overflow-hidden card-3d">
      {/* Glow background */}
      <div className="absolute -top-24 -left-24 w-48 h-48 bg-purple-600/20 rounded-full blur-3xl" />
      <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-indigo-600/20 rounded-full blur-3xl" />

      {/* Header Badge */}
      <div className="text-center mb-8 relative z-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-mono uppercase tracking-widest font-bold">
          <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse" />
          <span>DEVELOPER DNA</span>
        </div>
      </div>

      {/* Strand Visualizer */}
      <div className="relative z-10 space-y-6">
        {dnaNodes.map((node, index) => {
          const isLeft = node.align === "left";
          const NodeIcon = node.icon;

          return (
            <div key={node.id} className="relative">
              <motion.div
                initial={{ opacity: 0, x: isLeft ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`flex items-center gap-3 ${
                  isLeft ? "justify-start" : "justify-end"
                }`}
              >
                <div
                  className={`inline-flex items-center gap-2.5 px-4 py-2.5 rounded-2xl border backdrop-blur-xl shadow-lg transition-transform hover:scale-105 ${node.accent}`}
                >
                  {node.emoji ? (
                    <span className="text-base">{node.emoji}</span>
                  ) : (
                    <NodeIcon size={18} />
                  )}
                  <span className="font-mono text-xs font-bold tracking-tight">
                    {node.label}
                  </span>
                </div>
              </motion.div>

              {/* Connecting Strand Line */}
              {index < dnaNodes.length - 1 && (
                <div className="my-2 flex justify-center text-indigo-500/40 font-mono text-sm select-none">
                  {isLeft ? (
                    <motion.span
                      animate={isReduced ? {} : { opacity: [0.3, 1, 0.3], y: [0, 2, 0] }}
                      transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
                      className="font-bold text-indigo-400 tracking-widest"
                    >
                      ╲
                    </motion.span>
                  ) : (
                    <motion.span
                      animate={isReduced ? {} : { opacity: [0.3, 1, 0.3], y: [0, 2, 0] }}
                      transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
                      className="font-bold text-purple-400 tracking-widest"
                    >
                      ╱
                    </motion.span>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
