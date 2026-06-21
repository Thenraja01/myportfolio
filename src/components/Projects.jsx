import { useContext, useMemo, useState, useCallback } from "react";
import { ThemeContext } from "../dataprovider/ThemeContext";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { Github, ExternalLink, Code, Heart } from "lucide-react";
import { use3DTilt } from "../hooks/use3dTilt";

const TOP_SKILLS_LIMIT = 8;

const ProjectCard = ({ p, liked, count, onToggleLike }) => {
  const { ref, onMove, onLeave } = use3DTilt(14);

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className="group relative flex flex-col justify-between glass-panel rounded-[2rem] overflow-hidden p-8 card-3d-tilt perspective-container h-full"
    >
      <div className="absolute top-6 right-6 px-3 py-1 text-xs font-semibold uppercase tracking-wider rounded-full bg-[var(--text-primary)]/10 text-[var(--text-primary)]">
        {p.status}
      </div>

      <div className="space-y-6 mt-4 relative z-10 grow">
        <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-themeButton group-hover:scale-110 transition-transform duration-300">
          <Code size={28} />
        </div>
        <h3 className="text-2xl font-bold text-[var(--chart-5)] group-hover:text-themeSubheading transition-colors">
          {p.name}
        </h3>
        <p className="text-[var(--chart-2)]/80 leading-relaxed">{p.projectdesc}</p>
        <div className="flex flex-wrap gap-2 pt-2">
          {p.usedSkills.map((skill) => (
            <span
              key={skill}
              className="px-3 py-1 text-xs font-medium bg-[var(--chart-2)]/10 text-[var(--chart-2)] rounded-full"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between pt-6 mt-8 border-t border-[var(--border-2)] relative z-10">
        <div className="flex gap-4">
          <motion.button
            whileHover={{ scale: 1.1, y: -4 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => window.open(p.github, "_blank")}
            className="text-[var(--chart-4)]/60 hover:text-themeButton flex items-center gap-1 text-sm font-medium bg-[var(--text-primary)]/5 px-4 py-2 rounded-full border border-transparent hover:border-themeButton/30 transition-colors"
          >
            <Github size={18} />
            <span className="hidden sm:inline">Code</span>
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1, y: -4 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => window.open(p.liveDemo, "_blank")}
            className="text-[var(--chart-4)]/60 hover:text-themeButton flex items-center gap-1 text-sm font-medium bg-[var(--text-primary)]/5 px-4 py-2 rounded-full border border-transparent hover:border-themeButton/30 transition-colors"
          >
            <ExternalLink size={18} />
            <span className="hidden sm:inline">Live</span>
          </motion.button>
        </div>

        <button
          onClick={onToggleLike}
          className="flex items-center justify-center gap-2 group transition-all"
        >
          <span
            className={`text-sm font-bold tracking-wider ${
              liked ? "text-red-500" : "text-[var(--text-primary)]/60 group-hover:text-red-400"
            }`}
          >
            {count}
          </span>
          <Heart
            size={22}
            className={`transition-all duration-300 ease-out ${
              liked
                ? "text-red-500 fill-red-500 scale-110"
                : "text-[var(--text-primary)]/60 group-hover:text-red-400 group-hover:scale-110"
            }`}
          />
        </button>
      </div>

      <div className="absolute opacity-0 group-hover:opacity-100 inset-0 pointer-events-none transition-opacity duration-500 bg-gradient-to-t from-themeButton/5 to-transparent" />
    </motion.div>
  );
};

export default function Projects() {
  const { projects } = useContext(ThemeContext);
  const [activeSkill, setActiveSkill] = useState("All");
  const projectsArr = useMemo(
    () => (Array.isArray(projects) ? projects : Object.values(projects || {})),
    [projects]
  );

  const normalizedProjects = useMemo(
    () =>
      projectsArr.map((p, index) => ({
        ...p,
        id: index,
        status: p.status || "Completed",
        projectdesc: p.description,
        usedSkills: Array.isArray(p.technologies)
          ? p.technologies.map((s) => s.trim()).filter(Boolean)
          : p.technologies
            ? Object.values(p.technologies).map((s) => String(s).trim()).filter(Boolean)
            : [],
      })),
    [projectsArr]
  );
  const [likes, setLikes] = useState({}); // { [id]: { liked, count } }

  const getLike = (p) => likes[p.id] ?? { liked: false, count: 12 * p.id + 7 };

  const toggleLike = useCallback((id) => {
    setLikes((prev) => {
      const cur = prev[id] ?? { liked: false, count: 12 * id + 7 };
      return {
        ...prev,
        [id]: { liked: !cur.liked, count: cur.liked ? cur.count - 1 : cur.count + 1 },
      };
    });
  }, []);

  const topSkills = useMemo(() => {
    const freq = new Map();
    normalizedProjects.forEach((p) =>
      p.usedSkills.forEach((s) => {
        const key = s.toLowerCase();
        freq.set(key, { count: (freq.get(key)?.count ?? 0) + 1, original: s });
      })
    );
    return Array.from(freq.values())
      .sort((a, b) => b.count - a.count)
      .slice(0, TOP_SKILLS_LIMIT)
      .map((v) => v.original);
  }, [normalizedProjects]);

  const filteredProjects = useMemo(
    () =>
      activeSkill === "All"
        ? normalizedProjects
        : normalizedProjects.filter((p) =>
            p.usedSkills.some((s) => s.toLowerCase() === activeSkill.toLowerCase())
          ),
    [activeSkill, normalizedProjects]
  );

  

  return (
    <section id="projects" className="space-y-16">
      <div className="text-center space-y-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold text-themeSubheading"
        >
          Featured Projects
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-[var(--text-primary)]/70 max-w-2xl mx-auto"
        >
          Some of the recent work I've built.
        </motion.p>

        <div className="flex flex-wrap justify-center gap-2 pt-4">
          {["All", ...topSkills].map((skill) => {
            const active = activeSkill.toLowerCase() === skill.toLowerCase();
            return (
              <button
                key={skill.id}
                type="button"
                onClick={() =>
                  setActiveSkill((prev) =>
                    skill !== "All" && prev.toLowerCase() === skill.toLowerCase() ? "All" : skill
                  )
                }
                className={`px-3 py-1 text-xs font-semibold rounded-full border transition-colors ${
                  active
                    ? "bg-themeButton/20 border-themeButton/40 text-themeButton"
                    : "bg-[var(--text-primary)]/5 border-[var(--border-2)]/60 text-[var(--text-primary)]/70 hover:text-themeButton hover:border-themeButton/30"
                }`}
               
              >
                {skill}
              </button>
            );
          })}
        </div>

        <p className="text-xs text-[var(--text-primary)]/40 pt-1">
          {filteredProjects.length} project{filteredProjects.length !== 1 ? "s" : ""}
          {activeSkill !== "All" ? ` using ${activeSkill}` : ""}
        </p>
      </div>

      <motion.div layout className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((p) => {
                const { liked, count } = getLike(p);
                return (
                  <motion.div
                    key={p.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.25 }}
                  >
                    <ProjectCard
                      p={p}
                      liked={liked}
                      count={count}
                      onToggleLike={() => toggleLike(p.id)}
                    />
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>

          {/* ← FIX: empty state outside the grid, full-width, animates correctly */}
          <AnimatePresence>
            {filteredProjects.length === 0 && (
              <motion.p
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center text-[var(--text-primary)]/40 py-16 text-sm"
              >
                No projects found for "{activeSkill}"
              </motion.p>
            )}
          </AnimatePresence>
    </section>
  );
}