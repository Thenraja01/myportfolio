"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { useSkills } from "@/context/SkillsContext";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SkillCard } from "@/components/skills/SkillCard";
import { FloatingObject } from "@/components/3d/FloatingObject";

export default function Skills() {
  const { technicalSkills, skillCategories: categories, loading } = useSkills();
  const [filter, setFilter] = useState("all");


  const filteredCategories =
    filter === "all"
      ? categories
      : categories.filter((cat) => cat.toLowerCase().includes(filter.toLowerCase()));

  return (
    <section id="skills" className="py-20 relative">
      <SectionHeading
        badge="TECHNICAL STACK"
        title="TECHNICAL SKILLS & ECOSYSTEM"
        subtitle="Driven by modern frameworks, backend engines, and AI/ML tools."
      />

      {/* Interactive Center 3D Hub */}
      <div className="my-12 flex justify-center">
        <FloatingObject duration={6} yOffset={8}>
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white/90 dark:bg-indigo-950/40 border border-indigo-300 dark:border-indigo-500/30 text-indigo-600 dark:text-indigo-300 font-mono text-sm shadow-xl backdrop-blur-xl transition-colors">
            <span className="w-2.5 h-2.5 rounded-full bg-indigo-500 dark:bg-indigo-400 animate-ping" />
            <span className="font-bold tracking-wider">THEN RAJA</span>
            <span className="text-slate-400">•</span>
            <span className="text-xs text-slate-600 dark:text-slate-400 font-semibold">FULL STACK & AI</span>
          </div>
        </FloatingObject>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
        <button
          onClick={() => setFilter("all")}
          className={`px-4 py-2 rounded-full text-xs font-mono font-bold transition-all ${
            filter === "all"
              ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30"
              : "bg-white/80 dark:bg-slate-900 text-slate-700 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-slate-200 border border-slate-200 dark:border-slate-800"
          }`}
        >
          ALL CATEGORIES
        </button>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-4 py-2 rounded-full text-xs font-mono font-bold transition-all ${
              filter === cat
                ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30"
                : "bg-white/80 dark:bg-slate-900 text-slate-700 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-slate-200 border border-slate-200 dark:border-slate-800"
            }`}
          >
            {cat.replace(/([A-Z])/g, " $1").trim().toUpperCase()}
          </button>
        ))}
      </div>

      {/* Grid of Skill Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCategories.map((categoryKey) => (
          <SkillCard
            key={categoryKey}
            categoryKey={categoryKey}
            skills={technicalSkills[categoryKey]}
          />
        ))}
      </div>
    </section>
  );
}
