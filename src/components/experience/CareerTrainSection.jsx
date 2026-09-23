"use client";
import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { useExperience } from "@/context/ExperienceContext";
import {
  MapPin,
  Calendar,
  Sparkles,
  CheckCircle2,
  ArrowUpRight,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const DEFAULT_EXPERIENCES = [
  {
    id: "exp-1",
    number: "01",
    company: "Cognifyz Technologies",
    role: "Full Stack Web Developer",
    duration: "Dec 2024 - Present",
    location: "Remote / India",
    isCurrent: true,
    companyUrl: "https://cognifyz.com",
    color: "#06b6d4", // Cyan
    accentGradient: "from-cyan-500 to-blue-600",
    responsibilities: [
      "Architected scalable RESTful and GraphQL microservices with Node.js, Express, and modern asynchronous patterns.",
      "Engineered high-performance, responsive web interfaces using React.js, Next.js, and Framer Motion with sub-second page loads.",
      "Optimized MongoDB aggregations, schema indexing, and database queries, achieving a 40% reduction in API response times.",
      "Implemented secure JWT authentication, role-based access control (RBAC), and robust rate-limiting security layers.",
    ],
    skills: ["React.js", "Next.js", "Node.js", "Express.js", "MongoDB", "Tailwind CSS", "REST APIs"],
  },
  {
    id: "exp-2",
    number: "02",
    company: "Unified Mentor",
    role: "Full Stack Web Developer Intern",
    duration: "2024",
    location: "Remote",
    isCurrent: false,
    companyUrl: "https://unifiedmentor.com",
    color: "#8b5cf6", // Violet
    accentGradient: "from-violet-500 to-purple-600",
    responsibilities: [
      "Developed interactive full-stack web applications following modular component patterns and clean architecture standards.",
      "Integrated third-party APIs, webhooks, and payment gateways with comprehensive error handling and loading fallbacks.",
      "Collaborated in agile sprint cycles, conducting code reviews and participating in daily technical standups.",
    ],
    skills: ["MERN Stack", "JavaScript (ES6+)", "REST APIs", "Git", "Redux", "CSS3"],
  },
  {
    id: "exp-3",
    number: "03",
    company: "Teachnook",
    role: "Web Development Trainee",
    duration: "2023",
    location: "Bengaluru, India",
    isCurrent: false,
    companyUrl: "https://teachnook.com",
    color: "#10b981", // Emerald
    accentGradient: "from-emerald-500 to-teal-600",
    responsibilities: [
      "Mastered foundational full-stack web architecture, DOM manipulation, responsive CSS layouts, and modern ES6+ paradigms.",
      "Built real-world client-side projects with dynamic UI interactions, form validations, and asynchronous state flows.",
      "Earned top technical certification for exceptional project execution and problem-solving velocity.",
    ],
    skills: ["HTML5", "CSS3", "JavaScript", "Responsive Design", "Bootstrap", "Git"],
  },
];

export function CareerTrainSection() {
  const containerRef = useRef(null);
  const isReduced = useReducedMotion();
  const { workExperience } = useExperience();

  // Merge Firebase data with rich fallback definitions
  const experiences = (workExperience && workExperience.length > 0)
    ? workExperience.map((exp, idx) => ({
        ...DEFAULT_EXPERIENCES[idx % DEFAULT_EXPERIENCES.length],
        ...exp,
        number: exp.number || `0${idx + 1}`,
        color: exp.color || DEFAULT_EXPERIENCES[idx % DEFAULT_EXPERIENCES.length].color,
        accentGradient: DEFAULT_EXPERIENCES[idx % DEFAULT_EXPERIENCES.length].accentGradient,
      }))
    : DEFAULT_EXPERIENCES;

  const [activeIndex, setActiveIndex] = useState(0);
  const [bulletRevealCount, setBulletRevealCount] = useState(1);
  const progressBarRef = useRef(null);
  const progressLabelRef = useRef(null);

  const totalMilestones = experiences.length;

  useEffect(() => {
    if (isReduced || !containerRef.current) return;

    const totalSteps = totalMilestones;
    const scrollDistance = Math.max(1000, totalSteps * 450);

    const trigger = ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top top",
      end: `+=${scrollDistance}`,
      pin: true,
      pinSpacing: true,
      scrub: 0.8,
      onUpdate: (self) => {
        const rawProgress = self.progress; // 0 to 1

        // Update progress bar and label directly via DOM (0 React re-renders)
        if (progressBarRef.current) {
          progressBarRef.current.style.width = `${Math.max(5, rawProgress * 100)}%`;
        }

        // Calculate milestone index
        const indexFloat = rawProgress * totalSteps;
        const currentIdx = Math.min(totalSteps - 1, Math.floor(indexFloat));

        if (progressLabelRef.current) {
          progressLabelRef.current.innerText = `${Math.round(rawProgress * 100)}% · MILESTONE ${currentIdx + 1} OF ${totalSteps}`;
        }

        // Calculate sub-progress within current milestone for line-by-line bullet reveal
        const intraProgress = (indexFloat - currentIdx);
        const currentExp = experiences[currentIdx];
        const bulletsCount = currentExp?.responsibilities?.length || 3;
        const revealed = Math.max(1, Math.min(bulletsCount, Math.ceil(intraProgress * (bulletsCount + 0.15))));

        // Only update React state when values actually change
        setActiveIndex((prev) => (prev !== currentIdx ? currentIdx : prev));
        setBulletRevealCount((prev) => (prev !== revealed ? revealed : prev));
      },
    });

    return () => {
      trigger.kill();
    };
  }, [isReduced, totalMilestones, experiences]);

  const activeExp = experiences[activeIndex] || experiences[0];
  const accentColor = activeExp.color || "#06b6d4";

  return (
    <section
      id="experience"
      ref={containerRef}
      className="relative min-h-[92vh] max-h-screen w-full flex flex-col justify-between py-6 sm:py-8 overflow-hidden select-none"
    >
      {/* Dynamic Background Ambient Light Beams */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            backgroundColor: accentColor,
            opacity: [0.06, 0.12, 0.06],
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-16 -right-16 w-80 h-80 rounded-full blur-3xl transition-colors duration-700"
        />
        <motion.div
          animate={{
            backgroundColor: accentColor,
            opacity: [0.04, 0.10, 0.04],
            scale: [1.1, 1, 1.1],
          }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -bottom-16 -left-16 w-80 h-80 rounded-full blur-3xl transition-colors duration-700"
        />
      </div>

      {/* Top Header & Milestone Switcher */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-200/80 dark:border-white/10">
          <div className="flex items-center gap-3">
            <span className="text-[10px] font-mono font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20">
              CAREER TELEMETRY
            </span>
            <h2 className="text-xl sm:text-2xl font-black tracking-tight text-black dark:text-white font-sans">
              WORK EXPERIENCE
            </h2>
          </div>

          {/* Interactive Milestone Indicator Bar */}
          <div className="flex items-center gap-1.5 flex-wrap">
            {experiences.map((exp, idx) => {
              const isActive = idx === activeIndex;
              const isPassed = idx < activeIndex;

              return (
                <button
                  key={exp.id || idx}
                  onClick={() => {
                    setActiveIndex(idx);
                    setBulletRevealCount(exp.responsibilities?.length || 3);
                  }}
                  className={`group relative px-2.5 py-1 rounded-lg text-[11px] font-mono font-bold transition-all duration-200 flex items-center gap-1.5 cursor-pointer shrink-0 ${
                    isActive
                      ? "text-white shadow-md scale-105"
                      : isPassed
                      ? "text-primary-theme bg-tertiary-theme hover:bg-secondary-theme border border-theme-subtle"
                      : "text-muted-theme bg-tertiary-theme hover:bg-secondary-theme border border-theme-subtle"
                  }`}
                  style={
                    isActive
                      ? {
                          backgroundColor: exp.color,
                          boxShadow: `0 0 14px ${exp.color}50`,
                        }
                      : {}
                  }
                >
                  <span>{exp.number}</span>
                  <span className="hidden md:inline-block max-w-[100px] truncate">
                    {exp.company}
                  </span>
                  {isActive && (
                    <motion.span
                      layoutId="activeSpotlightDot"
                      className="w-1.5 h-1.5 rounded-full bg-white animate-ping"
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Center Stage: Split-Flex Teleprompter Layout for 100% Screen Visibility */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 py-2 sm:py-4 flex-1 flex flex-col justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeExp.id || activeIndex}
            initial={{ opacity: 0, y: 18, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -18, filter: "blur(6px)" }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-8 items-start relative w-full"
          >
            {/* Background Watermark Numeral */}
            <div
              className="absolute right-2 -top-6 text-7xl sm:text-8xl md:text-9xl font-mono font-black select-none pointer-events-none opacity-[0.04] dark:opacity-[0.08]"
              style={{ color: accentColor }}
            >
              {activeExp.number}
            </div>

            {/* Left Column: Role Details, Status & Flex Tech Stacks */}
            <div className="lg:col-span-5 space-y-3">
              <div className="flex flex-wrap items-center gap-2">
                <span
                  className="font-mono text-[10px] sm:text-xs font-bold tracking-widest uppercase px-2.5 py-0.5 rounded-md border backdrop-blur-md"
                  style={{
                    backgroundColor: `${accentColor}15`,
                    borderColor: `${accentColor}40`,
                    color: accentColor,
                  }}
                >
                  MILESTONE {activeExp.number}
                </span>

                {activeExp.isCurrent && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-emerald-500/15 border border-emerald-500/40 text-[10px] sm:text-xs font-mono font-bold text-emerald-700 dark:text-emerald-400 shadow-2xs">
                    <Sparkles size={11} className="text-emerald-600 dark:text-emerald-400" />
                    <span>CURRENT POSITION</span>
                  </span>
                )}
              </div>

              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-black tracking-tight text-primary-theme font-sans">
                    {activeExp.company}
                  </h3>

                  {activeExp.companyUrl && (
                    <a
                      href={activeExp.companyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1 rounded-md hover:bg-slate-200 dark:hover:bg-white/10 text-slate-600 hover:text-black dark:text-slate-300 dark:hover:text-white transition-colors"
                      title="Visit Company Portal"
                    >
                      <ArrowUpRight size={16} />
                    </a>
                  )}
                </div>

                <p
                  className="text-sm sm:text-base font-bold font-mono tracking-tight mt-0.5"
                  style={{ color: accentColor }}
                >
                  {activeExp.role}
                </p>
              </div>

              {/* High Contrast Date & Location */}
              <div className="meta-pill-theme flex flex-wrap items-center gap-3 text-xs font-mono font-bold rounded-lg px-3 py-1.5 w-fit shadow-2xs">
                <span className="inline-flex items-center gap-1.5">
                  <Calendar size={13} style={{ color: accentColor }} />
                  <span>{activeExp.duration}</span>
                </span>
                <span className="text-muted-theme opacity-50">·</span>
                <span className="inline-flex items-center gap-1.5">
                  <MapPin size={13} style={{ color: accentColor }} />
                  <span>{activeExp.location}</span>
                </span>
              </div>

              {/* Flex Tech Stack Chips */}
              <div className="pt-2 border-t border-theme-subtle">
                <div className="text-[10px] font-mono font-bold text-tertiary-theme uppercase tracking-wider mb-2">
                  TECHNOLOGIES & TOOLS:
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {activeExp.skills?.map((skill, sIdx) => (
                    <span
                      key={sIdx}
                      className="tech-pill-theme px-2.5 py-1 rounded-md text-[10px] sm:text-[11px] font-mono font-semibold"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Key Contributions & Line-by-Line Scroll Reveal */}
            <div className="lg:col-span-7 space-y-2">
              <div className="text-[10px] font-mono font-bold tracking-widest text-tertiary-theme uppercase flex items-center justify-between pb-1 border-b border-theme-subtle">
                <span>KEY CONTRIBUTIONS & IMPACT</span>
                <span className="text-[10px] font-mono text-muted-theme">
                  {bulletRevealCount} / {activeExp.responsibilities?.length || 3} ACTIVE
                </span>
              </div>

              <div className="space-y-2">
                {activeExp.responsibilities?.map((bullet, bIdx) => {
                  const isRevealed = bIdx < bulletRevealCount;

                  return (
                    <motion.div
                      key={bIdx}
                      initial={false}
                      animate={{
                        opacity: isRevealed ? 1 : 0.2,
                        x: isRevealed ? 0 : -8,
                        scale: isRevealed ? 1 : 0.99,
                      }}
                      transition={{ duration: 0.25, ease: "easeOut" }}
                      className={`flex items-start gap-2.5 p-2 sm:p-2.5 rounded-lg transition-colors duration-200 ${
                        isRevealed
                          ? "bg-secondary-theme border border-theme-subtle shadow-2xs"
                          : "bg-transparent border border-transparent"
                      }`}
                    >
                      <div
                        className="shrink-0 mt-0.5 w-5 h-5 rounded-md flex items-center justify-center transition-transform duration-200"
                        style={{
                          backgroundColor: isRevealed ? `${accentColor}18` : "transparent",
                          color: isRevealed ? accentColor : "var(--text-muted)",
                        }}
                      >
                        <CheckCircle2 size={14} />
                      </div>
                      <p
                        className={`text-xs sm:text-[13px] leading-snug font-sans transition-colors duration-200 ${
                          isRevealed
                            ? "text-primary-theme font-medium"
                            : "text-muted-theme opacity-40"
                        }`}
                      >
                        {bullet}
                      </p>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom Progress Bar */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 pt-2">
        <div className="flex items-center justify-between text-[10px] font-mono font-bold text-slate-500 mb-1">
          <span>PROGRESS</span>
          <span ref={progressLabelRef}>
            0% · MILESTONE {activeIndex + 1} OF {totalMilestones}
          </span>
        </div>
        <div className="w-full h-1 bg-slate-200 dark:bg-white/10 rounded-full overflow-hidden">
          <div
            ref={progressBarRef}
            className="h-full rounded-full transition-colors duration-500"
            style={{
              width: "5%",
              backgroundColor: accentColor,
              boxShadow: `0 0 10px ${accentColor}`,
            }}
          />
        </div>
      </div>
    </section>
  );
}
