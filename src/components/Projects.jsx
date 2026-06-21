import { useContext, useMemo, useState, useCallback } from "react";
import { ThemeContext } from "../dataprovider/ThemeContext";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { Github, ExternalLink, Code, Heart, ChevronDown, ChevronUp, LayoutGrid, List } from "lucide-react";
import { use3DTilt } from "../hooks/use3dTilt";

const TOP_SKILLS_LIMIT = 8;

const ProjectCard = ({ p, liked, count, onToggleLike }) => {
  const { ref, onMove, onLeave } = use3DTilt(14);

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className="group relative flex flex-col justify-between glass-panel rounded-[2rem] overflow-hidden p-8 card-3d-tilt perspective-container h-full border border-[var(--border-color)] bg-[var(--card-bg)] backdrop-blur-md shadow-lg hover:shadow-2xl transition-all duration-300"
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
        <p className="text-[var(--chart-2)]/80 leading-relaxed line-clamp-3">{p.projectdesc}</p>
        <div className="flex flex-wrap gap-2 pt-2">
          {p.usedSkills.slice(0, 5).map((skill) => (
            <span
              key={skill}
              className="px-3 py-1 text-xs font-medium bg-[var(--chart-2)]/10 text-[var(--chart-2)] rounded-full"
            >
              {skill}
            </span>
          ))}
          {p.usedSkills.length > 5 && (
            <span className="px-3 py-1 text-xs font-medium bg-[var(--chart-2)]/5 text-[var(--chart-2)]/60 rounded-full">
              +{p.usedSkills.length - 5}
            </span>
          )}
        </div>
      </div>

      <div className="flex items-center justify-between pt-6 mt-8 border-t border-[var(--border-2)] relative z-10">
        <div className="flex gap-4">
          {p.github && (
            <motion.button
              whileHover={{ scale: 1.1, y: -4 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => window.open(p.github, "_blank")}
              className="text-[var(--chart-4)]/60 hover:text-themeButton flex items-center gap-1 text-sm font-medium bg-[var(--text-primary)]/5 px-4 py-2 rounded-full border border-transparent hover:border-themeButton/30 transition-colors"
            >
              <Github size={18} />
              <span className="hidden sm:inline">Code</span>
            </motion.button>
          )}
          {p.liveDemo && (
            <motion.button
              whileHover={{ scale: 1.1, y: -4 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => window.open(p.liveDemo, "_blank")}
              className="text-[var(--chart-4)]/60 hover:text-themeButton flex items-center gap-1 text-sm font-medium bg-[var(--text-primary)]/5 px-4 py-2 rounded-full border border-transparent hover:border-themeButton/30 transition-colors"
            >
              <ExternalLink size={18} />
              <span className="hidden sm:inline">Live</span>
            </motion.button>
          )}
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

      <div className="absolute opacity-0 group-hover:opacity-100 inset-0 pointer-events-none transition-opacity duration-500 bg-gradient-to-t from-themeButton/5 to-transparent rounded-[2rem]" />
    </motion.div>
  );
};

// List View Item Component
const ListItem = ({ p, expandedId, toggleExpand, getLike, toggleLike }) => {
  const { liked, count } = getLike(p);
  const isExpanded = expandedId === p.id;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="glass-panel rounded-2xl p-6 border border-[var(--border-color)] bg-[var(--card-bg)] shadow-md hover:shadow-lg transition-shadow"
    >
      <div 
        className="flex items-center justify-between cursor-pointer"
        onClick={() => toggleExpand(p.id)}
      >
        <div className="flex items-center gap-4 flex-1 min-w-0">
          <div className="p-3 rounded-xl bg-themeButton/10 text-themeButton shrink-0">
            <Code size={20} />
          </div>
          <div className="min-w-0">
            <h3 className="font-bold text-[var(--text-primary)] truncate">{p.name}</h3>
            <p className="text-sm text-[var(--text-primary)]/60 truncate">
              {p.usedSkills.slice(0, 4).join(", ")}
              {p.usedSkills.length > 4 && ` +${p.usedSkills.length - 4} more`}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-4 shrink-0 ml-4">
          <span className="text-sm text-[var(--text-primary)]/60 flex items-center gap-1">
            <Heart size={14} className={liked ? "text-red-500 fill-red-500" : ""} />
            {count}
          </span>
          <button className="text-[var(--text-primary)]/40 hover:text-themeButton transition-colors">
            {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          </button>
        </div>
      </div>
      
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="pt-4 mt-4 border-t border-[var(--border-color)] space-y-4">
              <p className="text-sm text-[var(--text-primary)]/80 leading-relaxed">
                {p.projectdesc}
              </p>
              
              <div className="flex flex-wrap gap-2">
                {p.usedSkills.map((skill) => (
                  <span
                    key={skill}
                    className="px-2 py-1 text-[10px] font-medium bg-themeButton/10 text-themeButton rounded-full"
                  >
                    {skill}
                  </span>
                ))}
              </div>

              <div className="flex gap-4 pt-2">
                {p.github && (
                  <a
                    href={p.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-themeButton hover:underline flex items-center gap-1"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Github size={14} /> GitHub
                  </a>
                )}
                {p.liveDemo && (
                  <a
                    href={p.liveDemo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-themeButton hover:underline flex items-center gap-1"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <ExternalLink size={14} /> Live Demo
                  </a>
                )}
              </div>

              <div className="flex items-center justify-between pt-2">
                <span className="text-xs text-[var(--text-primary)]/40">
                  Status: {p.status}
                </span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleLike(p.id);
                  }}
                  className="flex items-center gap-2 group transition-all"
                >
                  <span className={`text-sm font-bold ${liked ? "text-red-500" : "text-[var(--text-primary)]/60"}`}>
                    {count}
                  </span>
                  <Heart
                    size={18}
                    className={`transition-all duration-300 ${
                      liked
                        ? "text-red-500 fill-red-500"
                        : "text-[var(--text-primary)]/60 group-hover:text-red-400"
                    }`}
                  />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default function Projects() {
  const { projects } = useContext(ThemeContext);
  const [activeSkill, setActiveSkill] = useState("All");
  const [viewMode, setViewMode] = useState("grid"); // "grid" | "list"
  const [expandedId, setExpandedId] = useState(null);
  
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
        projectdesc: p.description || p.projectdesc || "Project description",
        usedSkills: Array.isArray(p.technologies)
          ? p.technologies.map((s) => s.trim()).filter(Boolean)
          : p.technologies
            ? Object.values(p.technologies).map((s) => String(s).trim()).filter(Boolean)
            : p.usedSkills || [],
        github: p.github || p.repo || "",
        liveDemo: p.liveDemo || p.demo || p.url || "",
      })),
    [projectsArr]
  );
  
  const [likes, setLikes] = useState({});

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

  const toggleExpand = useCallback((id) => {
    setExpandedId((prev) => (prev === id ? null : id));
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

        {/* Filter and View Controls */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
          {/* Skill Filters */}
          <div className="flex flex-wrap justify-center gap-2">
            {["All", ...topSkills].map((skill) => {
              const active = activeSkill.toLowerCase() === skill.toLowerCase();
              return (
                <button
                  key={skill}
                  type="button"
                  onClick={() =>
                    setActiveSkill((prev) =>
                      skill !== "All" && prev.toLowerCase() === skill.toLowerCase() ? "All" : skill
                    )
                  }
                  className={`px-3 py-1.5 text-xs font-semibold rounded-full border transition-all ${
                    active
                      ? "bg-themeButton/20 border-themeButton/40 text-themeButton shadow-md"
                      : "bg-[var(--text-primary)]/5 border-[var(--border-2)]/60 text-[var(--text-primary)]/70 hover:text-themeButton hover:border-themeButton/30"
                  }`}
                >
                  {skill}
                </button>
              );
            })}
          </div>

          {/* View Toggle */}
          <div className="flex items-center gap-1 p-1 rounded-full bg-[var(--text-primary)]/5 border border-[var(--border-color)]">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-2 rounded-full transition-all ${
                viewMode === "grid"
                  ? "bg-themeButton/20 text-themeButton shadow-sm"
                  : "text-[var(--text-primary)]/40 hover:text-[var(--text-primary)]"
              }`}
              aria-label="Grid view"
            >
              <LayoutGrid size={18} />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-2 rounded-full transition-all ${
                viewMode === "list"
                  ? "bg-themeButton/20 text-themeButton shadow-sm"
                  : "text-[var(--text-primary)]/40 hover:text-[var(--text-primary)]"
              }`}
              aria-label="List view"
            >
              <List size={18} />
            </button>
          </div>
        </div>

        <p className="text-xs text-[var(--text-primary)]/40 pt-1">
          {filteredProjects.length} project{filteredProjects.length !== 1 ? "s" : ""}
          {activeSkill !== "All" ? ` using ${activeSkill}` : ""}
          {viewMode === "list" ? " • List view" : " • Grid view"}
        </p>
      </div>

      {/* Grid View */}
      {viewMode === "grid" && (
        <LayoutGroup>
          <motion.div layout className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((p) => {
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
                      liked={getLike(p).liked}
                      count={getLike(p).count}
                      onToggleLike={() => toggleLike(p.id)}
                    />
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>
        </LayoutGroup>
      )}

      {/* List View */}
      {viewMode === "list" && (
        <LayoutGroup>
          <motion.div layout className="space-y-4 max-w-4xl mx-auto">
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((p) => (
                <ListItem
                  key={p.id}
                  p={p}
                  expandedId={expandedId}
                  toggleExpand={toggleExpand}
                  getLike={getLike}
                  toggleLike={toggleLike}
                />
              ))}
            </AnimatePresence>
          </motion.div>
        </LayoutGroup>
      )}

      {/* Empty State */}
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