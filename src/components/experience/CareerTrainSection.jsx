"use client";
import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { useExperience } from "@/context/ExperienceContext";
import {
  Briefcase,
  MapPin,
  Calendar,
  ExternalLink,
  ChevronRight,
  Zap,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const roleColors = [
  {
    accent: "from-cyan-500 to-blue-600",
    glow: "rgba(6,182,212,0.3)",
    dot: "#06b6d4",
    badge: "bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border-cyan-400/30",
    icon: "bg-gradient-to-br from-cyan-400 to-blue-600",
  },
  {
    accent: "from-violet-500 to-purple-600",
    glow: "rgba(139,92,246,0.3)",
    dot: "#8b5cf6",
    badge: "bg-violet-500/10 text-violet-600 dark:text-violet-400 border-violet-400/30",
    icon: "bg-gradient-to-br from-violet-400 to-purple-600",
  },
  {
    accent: "from-emerald-500 to-teal-600",
    glow: "rgba(16,185,129,0.3)",
    dot: "#10b981",
    badge: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-400/30",
    icon: "bg-gradient-to-br from-emerald-400 to-teal-600",
  },
  {
    accent: "from-rose-500 to-pink-600",
    glow: "rgba(244,63,94,0.3)",
    dot: "#f43f5e",
    badge: "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-400/30",
    icon: "bg-gradient-to-br from-rose-400 to-pink-600",
  },
];

function ExperienceCard3D({ exp, index, color, isLast }) {
  const cardRef = useRef(null);
  const isEven = index % 2 === 0;

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;

    // Slide up on scroll-down, slide back down on scroll-up
    gsap.fromTo(
      el,
      {
        opacity: 0,
        y: 80,
        rotateX: 18,
        scale: 0.92,
        transformPerspective: 900,
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 88%",
          end: "top 40%",
          toggleActions: "play none none reverse",
        },
      }
    );
  }, []);

  return (
    <div
      className="relative flex gap-6 md:gap-10"
      style={{ perspective: "900px" }}
    >
      {/* Left spine */}
      <div className="flex flex-col items-center shrink-0 pt-1">
        {/* Glowing dot */}
        <div
          className="relative z-10 w-5 h-5 rounded-full ring-4 ring-white dark:ring-slate-950 shadow-xl shrink-0"
          style={{ background: color.dot, boxShadow: `0 0 16px ${color.glow}` }}
        >
          <span className="absolute inset-0 rounded-full animate-ping opacity-40"
            style={{ background: color.dot }} />
        </div>
        {/* Connector line */}
        {!isLast && (
          <div className="flex-1 w-px bg-gradient-to-b from-slate-300 dark:from-slate-700 to-transparent mt-2" />
        )}
      </div>

      {/* Card */}
      <div ref={cardRef} className="flex-1 pb-14">
        <div
          className="glass-card-morphism rounded-2xl overflow-hidden group"
          style={{ boxShadow: `0 12px 40px -12px ${color.glow}, 0 2px 8px rgba(0,0,0,0.06)` }}
        >
          {/* Gradient top bar */}
          <div className={`h-1 w-full bg-gradient-to-r ${color.accent}`} />

          <div className="p-5 md:p-6">
            {/* Header row */}
            <div className="flex items-start justify-between gap-3 flex-wrap">
              <div className="flex items-center gap-3">
                {/* Company icon */}
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center shadow-lg shrink-0 ${color.icon}`}>
                  <Briefcase size={18} className="text-white" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white leading-tight">
                    {exp.role}
                  </h3>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    {exp.companyUrl ? (
                      <a
                        href={exp.companyUrl}
                        target="_blank"
                        rel="noreferrer"
                        className={`text-xs font-semibold bg-gradient-to-r ${color.accent} bg-clip-text text-transparent inline-flex items-center gap-0.5 hover:underline`}
                      >
                        {exp.company}
                        <ExternalLink size={10} />
                      </a>
                    ) : (
                      <span className={`text-xs font-semibold bg-gradient-to-r ${color.accent} bg-clip-text text-transparent`}>
                        {exp.company}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Badges */}
              <div className="flex flex-wrap gap-1.5 items-center">
                <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-mono font-bold border ${color.badge}`}>
                  <Calendar size={9} />
                  {exp.duration}
                </span>
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-mono font-bold border bg-slate-100/70 dark:bg-slate-800/70 border-slate-300/50 dark:border-slate-700/50 text-slate-500 dark:text-slate-400">
                  <MapPin size={9} />
                  {exp.location}
                </span>
                {exp.duration.includes("Present") && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold border border-emerald-400/40 bg-emerald-50/70 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 animate-pulse">
                    ● Current
                  </span>
                )}
              </div>
            </div>

            {/* Responsibilities */}
            <ul className="mt-4 space-y-2">
              {exp.responsibilities.map((r, i) => (
                <li key={i} className="flex items-start gap-2 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  <ChevronRight
                    size={12}
                    className="mt-0.5 shrink-0"
                    style={{ color: color.dot }}
                  />
                  <span>{r}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* 3D depth bottom shadow panel */}
          <div
            className={`h-1.5 w-full opacity-60 bg-gradient-to-r ${color.accent}`}
            style={{ filter: "blur(4px)" }}
          />
        </div>
      </div>
    </div>
  );
}

export function CareerTrainSection() {
  const sectionRef = useRef(null);
  const spineRef = useRef(null);
  const isReduced = useReducedMotion();
  const { workExperience: experiences } = useExperience();

  useEffect(() => {
    if (isReduced || !spineRef.current || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Animate the left vertical spine line drawing downward on scroll
      gsap.fromTo(
        spineRef.current,
        { scaleY: 0, transformOrigin: "top center" },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 65%",
            end: "bottom 35%",
            scrub: 1,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [isReduced]);

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="relative py-20 overflow-hidden scroll-mt-28"
    >
      {/* Ambient background blobs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-1/3 right-1/4 w-72 h-72 rounded-full bg-cyan-500/8 dark:bg-cyan-500/10 blur-3xl" />
        <div className="absolute bottom-1/3 left-1/4 w-64 h-64 rounded-full bg-purple-500/8 dark:bg-purple-500/10 blur-3xl" />
      </div>

      {/* Section heading */}
      <div className="relative z-10 text-center px-4 mb-14">
        <SectionHeading
          badge="CAREER JOURNEY"
          title="WORK EXPERIENCE"
          subtitle="Real-world engineering across startups, agencies, and training roles."
        />
      </div>

      {/* Timeline body */}
      <div className="relative max-w-3xl mx-auto px-6 md:px-8">

        {/* Vertical spine (animated draw) */}
        <div
          ref={spineRef}
          className="absolute left-[1.85rem] md:left-[2.1rem] top-0 bottom-0 w-px bg-gradient-to-b from-cyan-400 via-violet-400 via-emerald-400 to-rose-400 opacity-30 dark:opacity-40"
          style={{ transformOrigin: "top center" }}
        />

        {/* Experience cards */}
        <div className="flex flex-col">
          {experiences.map((exp, index) => (
            <ExperienceCard3D
              key={exp.id}
              exp={exp}
              index={index}
              color={roleColors[index % roleColors.length]}
              isLast={index === experiences.length - 1}
            />
          ))}
        </div>

        {/* Footer: "More to Come" marker */}
        <div className="flex flex-col items-start gap-2 pl-0">
          <div className="flex items-center gap-4 ml-[-2px]">
            <div
              className="w-5 h-5 rounded-full ring-4 ring-white dark:ring-slate-950 flex items-center justify-center"
              style={{ background: "linear-gradient(135deg,#06b6d4,#8b5cf6)" }}
            >
              <Zap size={9} className="text-white" />
            </div>
            <div className="glass-card-morphism rounded-full px-5 py-2 flex items-center gap-2 border border-cyan-400/25 shadow-lg shadow-cyan-500/10">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              <span className="text-xs font-bold text-slate-700 dark:text-slate-300 font-mono tracking-widest uppercase">
                Growing · More to Come
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
