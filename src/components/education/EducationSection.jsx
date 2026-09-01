"use client";
import { useRef, useEffect, useMemo } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { useCertifications } from "@/context/CertificationsContext";
import {
  GraduationCap,
  BookOpen,
  Award,
  Calendar,
  MapPin,
  Star,
  CheckCircle,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

// Static base education data (dynamic cert highlights are added inside the component)
const baseEducationItems = [
  {
    id: "sslc",
    type: "school",
    icon: BookOpen,
    side: "left",
    degree: "Secondary Education (SSLC)",
    institution: "Holy Angel Hr Sec School",
    duration: "2018 – 2019",
    percentage: "76.19%",
    color: "from-emerald-500 to-teal-500",
    glow: "rgba(16,185,129,0.25)",
    highlights: ["State Board (Tamil Nadu)", "Scored 76.19% overall"],
  },
  {
    id: "hsc",
    type: "school",
    icon: BookOpen,
    side: "right",
    degree: "Higher Secondary (HSC)",
    institution: "Holy Angel Hr Sec School",
    duration: "2020 – 2021",
    percentage: "77%",
    color: "from-cyan-500 to-sky-500",
    glow: "rgba(6,182,212,0.25)",
    highlights: ["Computer Science stream", "Scored 77% overall"],
  },
  {
    id: "be-cse",
    type: "degree",
    icon: GraduationCap,
    side: "left",
    degree: "BE in Computer Science Engineering",
    institution: "Solamalai College of Engineering",
    duration: "2021 – 2025",
    cgpa: "7.6",
    color: "from-indigo-500 to-purple-500",
    glow: "rgba(99,102,241,0.3)",
    highlights: [
      "Full Stack Development (MERN)",
      "AI & Machine Learning projects",
      "Data Structures & Algorithms",
      "Final Year Project: AI Customer Support",
    ],
  },
  {
    id: "certs",
    type: "cert",
    icon: Award,
    side: "right",
    degree: "Certifications & Specialized Learning",
    institution: "React JS, Node.js, Full Stack, IBM Cybersecurity & more",
    duration: "2024 – Present",
    color: "from-amber-500 to-orange-500",
    glow: "rgba(245,158,11,0.25)",
    highlights: [], // Populated dynamically from Firebase inside the component
    isOngoing: true,
  },
];

function TimelineCard({ item, index }) {
  const cardRef = useRef(null);
  const Icon = item.icon;
  const isLeft = item.side === "left";

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;

    gsap.fromTo(
      el,
      {
        opacity: 0,
        x: isLeft ? -60 : 60,
        y: 20,
        scale: 0.95,
      },
      {
        opacity: 1,
        x: 0,
        y: 0,
        scale: 1,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 88%",
          end: "top 40%",
          toggleActions: "play none none reverse",
        },
      }
    );
  }, [isLeft]);

  return (
    <div
      ref={cardRef}
      className={`flex items-center gap-0 w-full ${
        isLeft ? "flex-row" : "flex-row-reverse"
      }`}
    >
      {/* Card */}
      <div className={`w-[calc(50%-2rem)] ${isLeft ? "pr-4" : "pl-4"}`}>
        <div
          className="glass-card-morphism rounded-2xl p-5 group cursor-default relative"
          style={{ boxShadow: `0 8px 40px -8px ${item.glow}, 0 2px 8px rgba(0,0,0,0.06)` }}
        >
          {/* Top accent bar */}
          <div
            className={`absolute top-0 left-6 right-6 h-[2px] rounded-full bg-gradient-to-r ${item.color}`}
          />

          {/* Header */}
          <div className="flex items-start justify-between gap-3 mt-1">
            <div className="flex items-center gap-2">
              <div
                className={`w-8 h-8 rounded-xl flex items-center justify-center bg-gradient-to-br ${item.color} shadow-lg shrink-0`}
              >
                <Icon size={14} className="text-white" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white leading-tight">
                  {item.degree}
                </h3>
                <p className={`text-[11px] font-semibold bg-gradient-to-r ${item.color} bg-clip-text text-transparent mt-0.5`}>
                  {item.institution}
                </p>
              </div>
            </div>
          </div>

          {/* Duration + Grade row */}
          <div className="flex items-center gap-2 mt-3 flex-wrap">
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-[10px] font-mono font-bold">
              <Calendar size={10} />
              {item.duration}
            </span>
            {item.cgpa && (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 text-[10px] font-mono font-bold">
                <Star size={10} />
                CGPA: {item.cgpa}
              </span>
            )}
            {item.percentage && (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 text-[10px] font-mono font-bold">
                <Star size={10} />
                {item.percentage}
              </span>
            )}
            {item.isOngoing && (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-50 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 text-[10px] font-bold animate-pulse">
                ● Ongoing
              </span>
            )}
          </div>

          {/* Highlights */}
          {item.highlights?.length > 0 && (
            <ul className="mt-3 space-y-1.5">
              {item.highlights.map((h, i) => (
                <li
                  key={i}
                  className="flex items-start gap-1.5 text-[11px] text-slate-600 dark:text-slate-400"
                >
                  <CheckCircle
                    size={11}
                    className={`mt-0.5 shrink-0 bg-gradient-to-r ${item.color} bg-clip-text`}
                    style={{ color: item.color.includes("emerald") ? "#10b981" : item.color.includes("cyan") ? "#06b6d4" : item.color.includes("indigo") ? "#6366f1" : "#f59e0b" }}
                  />
                  <span>{h}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Center connector dot */}
      <div className="w-16 flex flex-col items-center justify-center shrink-0 z-10">
        <div
          className={`w-5 h-5 rounded-full bg-gradient-to-br ${item.color} ring-4 ring-white dark:ring-slate-900 shadow-lg timeline-dot`}
          data-index={index}
        />
      </div>

      {/* Empty right/left side */}
      <div className="w-[calc(50%-2rem)]" />
    </div>
  );
}

export function EducationSection() {
  const sectionRef = useRef(null);
  const pathRef = useRef(null);
  const isReduced = useReducedMotion();
  const { certifications } = useCertifications();

  // Merge Firebase certifications into education timeline
  const educationItems = useMemo(() => {
    const certHighlights = certifications
      .slice(0, 5)
      .map((c) => `${c.title} — ${c.institute}`);
    return baseEducationItems.map((item) =>
      item.id === "certs" ? { ...item, highlights: certHighlights } : item
    );
  }, [certifications]);

  useEffect(() => {
    if (isReduced || !sectionRef.current || !pathRef.current) return;

    const path = pathRef.current;
    const pathLength = path.getTotalLength ? path.getTotalLength() : 1800;

    gsap.set(path, {
      strokeDasharray: pathLength,
      strokeDashoffset: pathLength,
    });

    const ctx = gsap.context(() => {
      gsap.to(path, {
        strokeDashoffset: 0,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          end: "bottom 30%",
          scrub: 1.2,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [isReduced]);

  return (
    <section
      id="education"
      ref={sectionRef}
      className="relative py-20 overflow-hidden scroll-mt-28"
    >
      {/* Ambient glow blobs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-indigo-500/10 blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full bg-purple-500/10 blur-3xl" />
      </div>

      {/* Header */}
      <div className="relative z-10 text-center px-4 mb-16">
        <SectionHeading
          badge="ACADEMIC BACKGROUND"
          title="EDUCATION & MILESTONES"
          subtitle="The academic journey — from school to university to specialized learning."
        />
      </div>

      {/* Timeline body */}
      <div className="relative max-w-5xl mx-auto px-4">

        {/* Animated Center SVG Line */}
        <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-12 pointer-events-none">
          <svg
            className="absolute inset-0 w-full h-full"
            preserveAspectRatio="xMidYMid meet"
            viewBox="0 0 48 1600"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="pathGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#10b981" />
                <stop offset="33%" stopColor="#06b6d4" />
                <stop offset="66%" stopColor="#6366f1" />
                <stop offset="100%" stopColor="#f59e0b" />
              </linearGradient>
            </defs>
            {/* Organic weaving path — sweeps slightly left & right */}
            <path
              ref={pathRef}
              d="M24 0
                 C 24 100, 14 150, 24 250
                 C 34 350, 24 400, 24 500
                 C 14 580, 24 650, 24 750
                 C 34 850, 24 900, 24 1000
                 C 14 1080, 24 1150, 24 1250
                 C 34 1350, 24 1400, 24 1500
                 C 24 1550, 24 1580, 24 1600"
              stroke="url(#pathGrad)"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        {/* Cards stacked vertically */}
        <div className="flex flex-col gap-24 py-8">
          {educationItems.map((item, index) => (
            <TimelineCard key={item.id} item={item} index={index} />
          ))}
        </div>

        {/* Footer: Present marker */}
        <div className="flex flex-col items-center mt-8 pb-4 relative z-10">
          <div className="w-px h-12 bg-gradient-to-b from-amber-500/60 to-transparent" />
          <div className="flex items-center gap-2 px-5 py-2.5 rounded-full glass-card-morphism border border-amber-400/40 shadow-lg shadow-amber-500/10">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse shadow-lg shadow-amber-400/60" />
            <span className="text-xs font-bold text-amber-600 dark:text-amber-400 font-mono tracking-widest uppercase">
              Present / Ongoing
            </span>
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse shadow-lg shadow-amber-400/60" />
          </div>
        </div>
      </div>
    </section>
  );
}
