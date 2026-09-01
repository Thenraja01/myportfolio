"use client";
import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TiltCard } from "@/components/3d/TiltCard";
import { User, Smartphone, Cpu, Sparkles, CheckCircle2, ArrowRight } from "lucide-react";
import { useSkills } from "@/context/SkillsContext";

export default function AIEngineering() {
  const { technicalSkills } = useSkills();
  const aiSkills = technicalSkills?.aiToolsAndEmergingTech || [];

  const pipelineNodes = [
    {
      id: "user",
      title: "USER / CLIENT",
      subtitle: "Input Prompt & Request",
      icon: User,
      color: "from-blue-500/20 to-cyan-500/10",
      accent: "text-cyan-400",
    },
    {
      id: "app",
      title: "APPLICATION LAYER",
      subtitle: "Next.js / FastAPI Middleware",
      icon: Smartphone,
      color: "from-indigo-500/20 to-purple-500/10",
      accent: "text-indigo-400",
    },
    {
      id: "processing",
      title: "AI PROCESSING",
      subtitle: "Prompt Design & Sanitization",
      icon: Cpu,
      color: "from-purple-500/20 to-pink-500/10",
      accent: "text-purple-400",
    },
    {
      id: "llm",
      title: "LLM / AI API",
      subtitle: "OpenAI API & Google AI",
      icon: Sparkles,
      color: "from-pink-500/20 to-rose-500/10",
      accent: "text-pink-400",
    },
    {
      id: "response",
      title: "RESPONSE ENGINE",
      subtitle: "Structured AI Recommendations",
      icon: CheckCircle2,
      color: "from-emerald-500/20 to-teal-500/10",
      accent: "text-emerald-400",
    },
  ];

  return (
    <section className="py-20 relative overflow-hidden">
      <SectionHeading
        badge="AI/ML WORKFLOW"
        title="AI ENGINEERING PIPELINE"
        subtitle="Architecting intelligent application flows with OpenAI API, Google AI, and prompt pipelines."
      />

      {/* 3D Floating Pipeline Assembly */}
      <div className="mt-16 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center">
          {pipelineNodes.map((node, idx) => (
            <div key={node.id} className="relative flex flex-col items-center">
              <motion.div
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.15, duration: 0.5 }}
                className="w-full"
              >
                <TiltCard maxTilt={6}>
                  <div className="glass-panel p-5 rounded-3xl border border-slate-800/80 bg-slate-950/80 backdrop-blur-xl flex flex-col items-center text-center space-y-3 relative overflow-hidden group">
                    <div className={`p-3 rounded-2xl bg-slate-900 border border-slate-800 ${node.accent}`}>
                      <node.icon size={24} />
                    </div>
                    <div>
                      <h4 className="font-mono text-xs font-bold text-slate-200 uppercase tracking-tight">
                        {node.title}
                      </h4>
                      <p className="text-[11px] text-slate-400 font-sans mt-1">
                        {node.subtitle}
                      </p>
                    </div>
                  </div>
                </TiltCard>
              </motion.div>

              {/* Arrow Connector for desktop */}
              {idx < pipelineNodes.length - 1 && (
                <div className="hidden md:block absolute -right-3 top-1/2 -translate-y-1/2 z-20 text-indigo-500/50">
                  <ArrowRight size={18} />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* AI Capabilities Badges */}
        <div className="mt-12 p-6 rounded-3xl glass-panel border border-slate-800 bg-slate-950/40 text-center space-y-4">
          <h4 className="font-mono text-xs uppercase text-indigo-400 font-bold tracking-widest">
            ENGINEERED WITH REAL AI STACK
          </h4>
          <div className="flex flex-wrap items-center justify-center gap-2">
            {aiSkills.map((skill) => (
              <span
                key={skill}
                className="px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-mono"
              >
                ✦ {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
