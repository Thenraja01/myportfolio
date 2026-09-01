"use client";
import { useUser } from "@/context/UserContext";
import { Github, Linkedin, Mail, ArrowUp } from "lucide-react";

export default function Footer() {
  const { personalInfo } = useUser();

  return (
    <footer className="w-full bg-slate-950 border-t border-slate-900 pt-16 pb-12 text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-8">
        {/* Left identity */}
        <div className="space-y-2 text-center md:text-left">
          <h3 className="text-xl font-bold text-slate-100 font-mono tracking-tight">
            {personalInfo.name}
          </h3>
          <p className="text-sm text-slate-400 font-mono">
            {personalInfo.title}
          </p>
        </div>

        {/* Socials */}
        <div className="flex items-center gap-4">
          {personalInfo.github && (
            <a
              href={personalInfo.github}
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className="p-3 rounded-full bg-slate-900 border border-slate-800 text-slate-300 hover:text-indigo-400 hover:border-indigo-500/50 transition-all"
            >
              <Github size={18} />
            </a>
          )}
          {personalInfo.linkedin && (
            <a
              href={personalInfo.linkedin}
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="p-3 rounded-full bg-slate-900 border border-slate-800 text-slate-300 hover:text-indigo-400 hover:border-indigo-500/50 transition-all"
            >
              <Linkedin size={18} />
            </a>
          )}
          {personalInfo.email && (
            <a
              href={`mailto:${personalInfo.email}`}
              aria-label="Email"
              className="p-3 rounded-full bg-slate-900 border border-slate-800 text-slate-300 hover:text-indigo-400 hover:border-indigo-500/50 transition-all"
            >
              <Mail size={18} />
            </a>
          )}
        </div>

        {/* Copyright & Back to Top */}
        <div className="flex items-center gap-6">
          <span className="text-xs font-mono text-slate-500">
            © {new Date().getFullYear()} {personalInfo.name}. All rights reserved.
          </span>

          <a
            href="#"
            className="p-3 rounded-full bg-indigo-600/20 border border-indigo-500/30 text-indigo-400 hover:bg-indigo-600 hover:text-white transition-all shadow-lg"
            aria-label="Back to top"
          >
            <ArrowUp size={18} />
          </a>
        </div>
      </div>
    </footer>
  );
}
