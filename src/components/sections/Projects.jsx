"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { useProjects } from "@/context/ProjectsContext";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProjectCard } from "@/components/projects/ProjectCard";

export default function Projects() {
  const { projects, loading } = useProjects();
  const [filter, setFilter] = useState("All");


  const categories = ["All", "Featured", "AI", "Full Stack"];

  const filteredProjects = projects.filter((p) => {
    if (filter === "All") return true;
    if (filter === "Featured") return p.featured;
    return p.category?.toLowerCase() === filter.toLowerCase();
  });

  return (
    <section id="projects" className="py-20 relative">
      <SectionHeading
        badge="PORTFOLIO WORK"
        title="FEATURED PROJECTS"
        subtitle="Explore real-world software applications, AI integration projects, and developer platforms."
      />

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2 my-10">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-5 py-2.5 rounded-full text-xs font-mono tracking-wider font-semibold transition-all ${
              filter === cat
                ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/30"
                : "bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800"
            }`}
          >
            {cat.toUpperCase()}
          </button>
        ))}
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProjects.map((project, idx) => (
          <motion.div
            key={project.id || project.name}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
          >
            <ProjectCard project={project} />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
