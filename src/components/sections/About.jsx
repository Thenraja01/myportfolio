"use client";
import { motion } from "framer-motion";
import { useUser } from "@/context/UserContext";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { Code2, Cpu } from "lucide-react";

export default function About() {
  const { objective, loading } = useUser();

  return (
    <section id="about" className="py-20 relative">
      <SectionHeading
        badge="ABOUT ME"
        title="Engineering Impactful Digital Solutions"
        subtitle="Full Stack Developer & AI-Integrated Engineer dedicated to building scalable, user-centric web applications."
      />

      <div className="mt-12 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Card className="space-y-6 p-8 sm:p-10">
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100 font-mono text-center sm:text-left transition-colors">
              Professional Mission & Objective
            </h3>

            <p className="text-slate-700 dark:text-slate-300 text-base sm:text-lg leading-relaxed font-sans transition-colors">
              {objective}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-200 dark:border-slate-800/80">
              <div className="p-5 rounded-2xl bg-slate-50/80 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800/80 flex items-start gap-4 transition-colors">
                <div className="p-3 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 shrink-0">
                  <Code2 size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-slate-200 text-base transition-colors">Full-Stack Core</h4>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1 leading-normal transition-colors">
                    MERN Stack, FastAPI, REST API Design & Real-Time Socket Applications
                  </p>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-slate-50/80 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800/80 flex items-start gap-4 transition-colors">
                <div className="p-3 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400 shrink-0">
                  <Cpu size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-slate-200 text-base transition-colors">AI Integration</h4>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1 leading-normal transition-colors">
                    OpenAI API, Prompt Engineering, Predictive Models & Smart Workflows
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
