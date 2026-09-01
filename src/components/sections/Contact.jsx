"use client";

import { useUser } from "@/context/UserContext";
import { ContactForm } from "@/components/contact/ContactForm";
import { Mail, MapPin, Github, Linkedin, Twitter, Sparkles, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function Contact() {
  const { personalInfo } = useUser();

  return (
    <section id="contact" className="py-20 relative">
      {/* Back to Home Link */}
      <div className="max-w-6xl mx-auto mb-6">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-mono text-slate-400 hover:text-purple-400 transition-colors"
        >
          <ArrowLeft size={14} /> Back to Home
        </Link>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Column: Let's talk Header & Info */}
        <div className="lg:col-span-5 space-y-8">
          {/* Status Pill Badge */}
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-400 text-xs font-mono font-semibold">
              <Sparkles size={13} className="text-purple-400" />
              <span>Open to opportunities</span>
            </div>
          </div>

          {/* Headline & Subtitle */}
          <div className="space-y-4">
            <h2 className="text-5xl sm:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              Let&apos;s <span className="bg-gradient-to-r from-purple-500 via-indigo-500 to-pink-500 bg-clip-text text-transparent">talk</span>
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-base sm:text-lg leading-relaxed font-sans max-w-md">
              Have a project in mind or just want to say hi? Fill out the form and I&apos;ll get back to you as soon as possible.
            </p>
          </div>

          {/* Contact Details (Email & Location) */}
          <div className="space-y-4 pt-2">
            {personalInfo.email && (
              <a
                href={`mailto:${personalInfo.email}`}
                className="flex items-center gap-4 p-4 rounded-2xl bg-white/70 dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800/80 text-slate-800 dark:text-slate-200 hover:border-purple-500/40 transition-all group shadow-sm"
              >
                <div className="p-3 rounded-xl bg-purple-500/10 text-purple-400 group-hover:scale-110 transition-transform">
                  <Mail size={20} />
                </div>
                <div>
                  <div className="text-[10px] font-mono text-slate-500 dark:text-slate-400 uppercase font-bold tracking-wider">
                    EMAIL
                  </div>
                  <div className="font-semibold text-slate-900 dark:text-slate-100 text-sm">
                    {personalInfo.email}
                  </div>
                </div>
              </a>
            )}

            {personalInfo.location && (
              <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/70 dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800/80 text-slate-800 dark:text-slate-200 shadow-sm">
                <div className="p-3 rounded-xl bg-purple-500/10 text-purple-400">
                  <MapPin size={20} />
                </div>
                <div>
                  <div className="text-[10px] font-mono text-slate-500 dark:text-slate-400 uppercase font-bold tracking-wider">
                    LOCATION
                  </div>
                  <div className="font-semibold text-slate-900 dark:text-slate-100 text-sm">
                    {personalInfo.location || "Remote / Worldwide"}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Social Icons */}
          <div className="space-y-3 pt-2">
            <div className="text-xs font-mono uppercase text-slate-500 dark:text-slate-400 font-bold tracking-wider">
              SOCIALS
            </div>
            <div className="flex items-center gap-3">
              {personalInfo.github && (
                <a
                  href={personalInfo.github}
                  target="_blank"
                  rel="noreferrer"
                  className="p-3 rounded-2xl bg-white/80 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:text-purple-500 hover:border-purple-500/40 transition-all shadow-sm"
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
                  className="p-3 rounded-2xl bg-white/80 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:text-purple-500 hover:border-purple-500/40 transition-all shadow-sm"
                  aria-label="LinkedIn"
                >
                  <Linkedin size={18} />
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Dark Form Card */}
        <div className="lg:col-span-7">
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
