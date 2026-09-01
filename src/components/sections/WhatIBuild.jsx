"use client";
import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { TiltCard } from "@/components/3d/TiltCard";
import { Code, Cpu, Zap } from "lucide-react";

export default function WhatIBuild() {
  const capabilities = [
    {
      icon: Code,
      title: "FULL STACK APPLICATIONS",
      description:
        "End-to-end web applications engineered with MERN Stack, Next.js, and Python FastAPI. Clean REST architectures and responsive interfaces.",
      tags: ["React.js", "Node.js", "MongoDB", "Express.js"],
      color: "from-blue-500/20 to-cyan-500/10",
      accent: "text-cyan-600 dark:text-cyan-400",
    },
    {
      icon: Cpu,
      title: "AI-POWERED SYSTEMS",
      description:
        "Intelligent web solutions incorporating OpenAI API, LLM prompt engineering, candidate screening ATS, and predictive IoT systems like CropWhisper.",
      tags: ["OpenAI API", "AI/ML", "FastAPI", "Python"],
      color: "from-purple-500/20 to-indigo-500/10",
      accent: "text-purple-600 dark:text-purple-400",
    },
    {
      icon: Zap,
      title: "SCALABLE & REAL-TIME APPS",
      description:
        "High-performance real-time applications with Socket.io, stateful backend pipelines, and interactive developer tools.",
      tags: ["Socket.io", "JWT Auth", "Docker", "Firebase"],
      color: "from-pink-500/20 to-rose-500/10",
      accent: "text-pink-600 dark:text-pink-400",
    },
  ];

  return (
    <section className="py-20 relative">
      <SectionHeading
        badge="CAPABILITIES"
        title="WHAT I BUILD"
        subtitle="Specialized in building full-stack platforms, AI integrations, and real-time systems."
      />

      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        {capabilities.map((item, idx) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.15 }}
          >
            <TiltCard maxTilt={5}>
              <Card className="h-full flex flex-col justify-between space-y-6 relative overflow-hidden group">
                <div
                  className={`absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br ${item.color} rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500`}
                />

                <div className="space-y-4 relative z-10">
                  <div
                    className={`w-12 h-12 rounded-2xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex items-center justify-center ${item.accent} transition-colors shadow-sm`}
                  >
                    <item.icon size={24} />
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 font-mono tracking-tight transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-sm text-slate-700 dark:text-slate-400 leading-relaxed font-sans transition-colors">
                    {item.description}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2 pt-4 border-t border-slate-200 dark:border-slate-800 relative z-10">
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-[11px] font-mono text-slate-700 dark:text-slate-400 transition-colors"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </Card>
            </TiltCard>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
