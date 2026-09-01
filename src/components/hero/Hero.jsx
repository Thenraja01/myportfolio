"use client";
import { motion } from "framer-motion";
import { ArrowRight, Download, Github, Linkedin } from "lucide-react";
import { useUser } from "@/context/UserContext";
import { useProjects } from "@/context/ProjectsContext";
import { Button } from "@/components/ui/Button";
import { Photo3DEnvironment } from "@/components/3d/Photo3DEnvironment";
import { useTheme } from "@/context/ThemeContext";

export default function Hero() {
  const { personalInfo } = useUser();
  const { projectCount } = useProjects();
  const { isDark } = useTheme();

  const shortSummary =
    "Full Stack & AI Engineer crafting high-performance MERN & Python web applications, intelligent automation, and scalable real-time systems.";

  return (
    <section className="relative min-h-[90vh] flex flex-col justify-center pt-28 pb-16 overflow-hidden">
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Column: Heading & CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="lg:col-span-7 space-y-6 text-center lg:text-left"
        >
          {/* Status Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-500 dark:text-indigo-400 text-xs font-mono uppercase tracking-widest font-semibold">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
            </span>
            <span>AVAILABLE FOR OPPORTUNITIES</span>
          </div>

          {/* Name & Headline */}
          <div className="space-y-3">
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100 transition-colors">
              {personalInfo.name}
            </h1>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 dark:from-indigo-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
              {personalInfo.title}
            </h2>
          </div>

          {/* Short summary */}
          <p className="text-slate-700 dark:text-slate-300 text-base sm:text-lg max-w-2xl mx-auto lg:mx-0 leading-relaxed font-sans transition-colors">
            {shortSummary}
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
            <a href="#projects">
              <Button variant="primary" size="lg">
                View My Projects <ArrowRight size={18} />
              </Button>
            </a>

            <a href={personalInfo.resume || "/Then_Raja_Resume.docx"} target="_blank" rel="noopener noreferrer">
              <Button variant="secondary" size="lg">
                <Download size={18} /> Resume
              </Button>
            </a>

            {/* Social Icons */}
            <div className="flex items-center gap-2 pl-2">
              {personalInfo.github && (
                <a
                  href={personalInfo.github}
                  target="_blank"
                  rel="noreferrer"
                  className="p-3 rounded-full bg-white/80 dark:bg-slate-900 border border-slate-300 dark:border-slate-800 text-slate-700 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-slate-100 hover:border-indigo-500/40 shadow-sm transition-all"
                  aria-label="GitHub"
                >
                  <Github size={18} />
                </a>
              )}
              {personalInfo.linkedin && (
                <a
                  href={personalInfo.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="p-3 rounded-full bg-white/80 dark:bg-slate-900 border border-slate-300 dark:border-slate-800 text-slate-700 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-slate-100 hover:border-indigo-500/40 shadow-sm transition-all"
                  aria-label="LinkedIn"
                >
                  <Linkedin size={18} />
                </a>
              )}
            </div>
          </div>

          {/* Quick Metrics */}
          <div className="pt-6 grid grid-cols-3 gap-4 border-t border-slate-200 dark:border-slate-900 max-w-lg mx-auto lg:mx-0 transition-colors">
            <div>
              <div className="text-2xl font-bold text-slate-900 dark:text-slate-100 font-mono transition-colors">
                {projectCount}+
              </div>
              <div className="text-xs text-slate-500 dark:text-slate-400 font-mono uppercase">
                Projects Built
              </div>
            </div>
            <div>
              <div className="text-2xl font-bold text-slate-900 dark:text-slate-100 font-mono transition-colors">
                3+
              </div>
              <div className="text-xs text-slate-500 dark:text-slate-400 font-mono uppercase">
                Internships
              </div>
            </div>
            <div>
              <div className="text-2xl font-bold text-slate-900 dark:text-slate-100 font-mono transition-colors">
                11
              </div>
              <div className="text-xs text-slate-500 dark:text-slate-400 font-mono uppercase">
                Certifications
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right Column: Profile Image with 3D Environment */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="lg:col-span-5 flex justify-center lg:justify-end"
        >
          <Photo3DEnvironment
            src="/images/user1.jpg"
            alt={personalInfo.name}
            imageClassName="w-64 h-80 sm:w-72 sm:h-96"
          />
        </motion.div>
      </div>
    </section>
  );
}
