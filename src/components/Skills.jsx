import { useContext, useMemo, useState } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { useSkills } from "@/context";
import { 
  Code, 
  Database, 
  Cloud, 
  Shield, 
  Terminal, 
  Server, 
  Cpu, 
  Layers,
  Search,
  ChevronDown,
  ChevronUp,
  Sparkles,
  Zap,
  Github,
  Figma
} from "lucide-react";

// Category icon mapping
const categoryIcons = {
  "Programming Languages": Code,
  "Frontend": Layers,
  "Backend": Server,
  "Database": Database,
  "Cloud": Cloud,
  "DevOps": Terminal,
  "Security": Shield,
  "Tools": Cpu,
  "AI/ML": Sparkles,
  "Design": Zap,
};

// Category colors
const categoryColors = {
  "Programming Languages": "from-blue-500 to-cyan-400",
  "Frontend": "from-purple-500 to-pink-400",
  "Backend": "from-green-500 to-emerald-400",
  "Database": "from-yellow-500 to-orange-400",
  "Cloud": "from-sky-500 to-blue-400",
  "DevOps": "from-red-500 to-rose-400",
  "Security": "from-emerald-500 to-teal-400",
  "Tools": "from-indigo-500 to-purple-400",
  "AI/ML": "from-violet-500 to-purple-400",
  "Design": "from-pink-500 to-rose-400",
};

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 24,
    },
  },
};

const skillVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: (index) => ({
    opacity: 1,
    scale: 1,
    transition: {
      delay: index * 0.03,
      type: "spring",
      stiffness: 400,
      damping: 20,
    },
  }),
  hover: {
    scale: 1.08,
    y: -4,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 15,
    },
  },
  tap: {
    scale: 0.95,
  },
};

const categoryVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 25,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.9,
    transition: {
      duration: 0.2,
    },
  },
};

const expandVariants = {
  collapsed: {
    height: "auto",
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 30,
    },
  },
  expanded: {
    height: "auto",
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 30,
    },
  },
};

const searchResultVariants = {
  hidden: { opacity: 0, x: -20, scale: 0.95 },
  visible: (index) => ({
    opacity: 1,
    x: 0,
    scale: 1,
    transition: {
      delay: index * 0.05,
      type: "spring",
      stiffness: 400,
      damping: 25,
    },
  }),
  exit: {
    opacity: 0,
    x: 20,
    scale: 0.9,
    transition: {
      duration: 0.15,
    },
  },
};

const statsVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 25,
      staggerChildren: 0.1,
    },
  },
};

const statItemVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 20,
    },
  },
  hover: {
    y: -4,
    boxShadow: "0 10px 30px rgba(99, 102, 241, 0.15)",
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 15,
    },
  },
};

// Floating particles animation
const floatingParticles = [
  { x: 10, y: -20, duration: 3 },
  { x: -15, y: 30, duration: 4 },
  { x: 20, y: -10, duration: 3.5 },
  { x: -10, y: -25, duration: 4.5 },
  { x: 25, y: 15, duration: 3.2 },
];

export default function Skills() {
  const { technicalSkills } = useSkills();
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedCategory, setExpandedCategory] = useState(null);
  const [hoveredSkill, setHoveredSkill] = useState(null);

  const categories = useMemo(() => Object.keys(technicalSkills), [technicalSkills]);

  const filteredCategories = useMemo(() => {
    if (!searchTerm) return categories;
    return categories.filter(category => {
      const skills = technicalSkills[category] || [];
      return skills.some(skill => 
        skill.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });
  }, [categories, technicalSkills, searchTerm]);

  const allSkills = useMemo(() => {
    const skills = [];
    categories.forEach(cat => {
      (technicalSkills[cat] || []).forEach(skill => {
        skills.push({ skill, category: cat });
      });
    });
    return skills;
  }, [categories, technicalSkills]);

  const filteredSkills = useMemo(() => {
    if (!searchTerm) return null;
    return allSkills.filter(({ skill }) => 
      skill.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [allSkills, searchTerm]);

  const toggleCategory = (category) => {
    setExpandedCategory(expandedCategory === category ? null : category);
  };

  const getCategoryIcon = (category) => {
    return categoryIcons[category] || Code;
  };

  const getCategoryColor = (category) => {
    return categoryColors[category] || "from-gray-500 to-gray-400";
  };

  // Helper to render icon with correct size
  const renderIcon = (IconComponent, size = 18) => {
    return <IconComponent size={size} />;
  };

  return (
    <section id="skills" className="space-y-16 relative overflow-hidden">
      {/* Floating Particles Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {floatingParticles.map((particle, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-themeButton/10"
            initial={{ x: 0, y: 0 }}
            animate={{
              x: [0, particle.x, 0, -particle.x, 0],
              y: [0, particle.y, 0, -particle.y, 0],
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{
              left: `${10 + i * 20}%`,
              top: `${10 + i * 15}%`,
            }}
          />
        ))}
      </div>

      {/* Header */}
      <div className="text-center space-y-4 relative z-10">
        <motion.h2 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ 
            type: "spring", 
            stiffness: 300, 
            damping: 25,
            delay: 0.1 
          }}
          className="text-4xl md:text-5xl font-bold text-themeSubheading"
        >
          <span className="text-themeButton font-mono text-3xl">&lt;</span>
          My Skills
          <span className="text-themeButton font-mono text-3xl">/&gt;</span>
        </motion.h2>
        
        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-[var(--text-primary)]/70 max-w-2xl mx-auto"
        >
          Technologies and tools I work with to build amazing digital experiences.
        </motion.p>

        {/* Search Bar */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, type: "spring", stiffness: 300 }}
          className="max-w-md mx-auto relative"
        >
          <motion.div 
            className="relative"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-primary)]/40" />
            <input
              type="text"
              placeholder="Search skills..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-full bg-[var(--card-bg)] border border-[var(--border-color)] focus:border-themeButton/50 focus:outline-none focus:ring-2 focus:ring-themeButton/20 transition-all text-[var(--text-primary)]"
            />
            <AnimatePresence>
              {searchTerm && (
                <motion.button
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  onClick={() => setSearchTerm("")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--text-primary)]/40 hover:text-themeButton transition-colors"
                >
                  ✕
                </motion.button>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>

        {/* Search Results Count */}
        <AnimatePresence>
          {searchTerm && (
            <motion.p 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="text-xs text-[var(--text-primary)]/40"
            >
              Found {filteredSkills?.length || 0} skill{filteredSkills?.length !== 1 ? "s" : ""}
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      {/* Skills Grid */}
      <div className="max-w-6xl mx-auto relative z-10">
        <LayoutGroup>
          {!searchTerm ? (
            // Regular category view
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filteredCategories.map((category, catIndex) => {
                const Icon = getCategoryIcon(category);
                const isExpanded = expandedCategory === category;
                const skills = technicalSkills[category] || [];
                const color = getCategoryColor(category);

                return (
                  <motion.div
                    key={category}
                    variants={itemVariants}
                    layout
                    className="group"
                  >
                    <motion.div 
                      variants={categoryVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      whileHover={{ 
                        y: -4,
                        transition: { type: "spring", stiffness: 400 }
                      }}
                      className="p-6 bg-[var(--card-bg)] backdrop-blur-md rounded-2xl border border-[var(--border-color)] shadow-lg hover:shadow-xl transition-shadow cursor-pointer"
                      onClick={() => toggleCategory(category)}
                    >
                      {/* Category Header */}
                      <div className="flex items-center justify-between mb-4">
                        <motion.div 
                          className="flex items-center gap-3"
                          whileHover={{ x: 4 }}
                          transition={{ type: "spring", stiffness: 400 }}
                        >
                          <motion.div 
                            className={`p-2.5 rounded-xl bg-gradient-to-br ${color} text-white shadow-lg`}
                            whileHover={{ rotate: 10, scale: 1.1 }}
                            transition={{ type: "spring", stiffness: 400 }}
                          >
                            <Icon size={18} />
                          </motion.div>
                          <h3 className="text-lg font-bold text-[var(--text-primary)] capitalize">
                            {category.replace(/([A-Z])/g, ' $1').trim()}
                          </h3>
                        </motion.div>
                        <div className="flex items-center gap-2">
                          <motion.span 
                            className="text-xs font-mono text-[var(--text-primary)]/40"
                            animate={{ scale: isExpanded ? 1.2 : 1 }}
                            transition={{ type: "spring", stiffness: 400 }}
                          >
                            {skills.length}
                          </motion.span>
                          <motion.div
                            animate={{ rotate: isExpanded ? 180 : 0 }}
                            transition={{ type: "spring", stiffness: 400 }}
                          >
                            <ChevronDown size={18} className="text-[var(--text-primary)]/40" />
                          </motion.div>
                        </div>
                      </div>

                      {/* Skills */}
                      <AnimatePresence mode="wait">
                        <motion.div 
                          className="flex flex-wrap gap-2"
                          initial={false}
                          animate={{ height: isExpanded ? "auto" : "auto" }}
                          transition={{ type: "spring", stiffness: 400, damping: 30 }}
                        >
                          {(isExpanded ? skills : skills.slice(0, 6)).map((skill, skillIndex) => (
                            <motion.span
                              key={skillIndex}
                              custom={skillIndex}
                              variants={skillVariants}
                              initial="hidden"
                              animate="visible"
                              whileHover="hover"
                              whileTap="tap"
                              onMouseEnter={() => setHoveredSkill(`${category}-${skillIndex}`)}
                              onMouseLeave={() => setHoveredSkill(null)}
                              className={`px-3 py-1.5 bg-[var(--text-primary)]/5 text-[var(--text-primary)]/80 rounded-lg text-xs font-medium border border-[var(--border-color)] shadow-sm cursor-default ${
                                hoveredSkill === `${category}-${skillIndex}` 
                                  ? `bg-gradient-to-r ${color} text-white border-transparent shadow-lg` 
                                  : ""
                              }`}
                            >
                              {skill}
                            </motion.span>
                          ))}
                          {!isExpanded && skills.length > 6 && (
                            <motion.span 
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              className="px-3 py-1.5 text-xs text-[var(--text-primary)]/40 font-medium"
                            >
                              +{skills.length - 6} more
                            </motion.span>
                          )}
                        </motion.div>
                      </AnimatePresence>

                      {/* Click hint */}
                      <motion.div 
                        className="mt-3 text-[10px] text-[var(--text-primary)]/30 text-center font-mono"
                        animate={{ opacity: isExpanded ? 0.6 : 0.3 }}
                      >
                        {isExpanded ? "Click to collapse" : "Click to expand"}
                      </motion.div>
                    </motion.div>
                  </motion.div>
                );
              })}
            </motion.div>
          ) : (
            // Search Results View
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="space-y-4"
            >
              <AnimatePresence mode="popLayout">
                {filteredSkills && filteredSkills.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredSkills.map(({ skill, category }, index) => {
                      const Icon = getCategoryIcon(category);
                      const color = getCategoryColor(category);
                      return (
                        <motion.div
                          key={`${skill}-${index}`}
                          custom={index}
                          variants={searchResultVariants}
                          initial="hidden"
                          animate="visible"
                          exit="exit"
                          whileHover={{ 
                            y: -4, 
                            scale: 1.02,
                            transition: { type: "spring", stiffness: 400 }
                          }}
                          className="flex items-center gap-3 p-4 bg-[var(--card-bg)] rounded-xl border border-[var(--border-color)] hover:border-themeButton/30 transition-shadow hover:shadow-lg"
                        >
                          <motion.div 
                            className={`p-2 rounded-lg bg-gradient-to-br ${color} text-white`}
                            whileHover={{ rotate: 15, scale: 1.1 }}
                            transition={{ type: "spring", stiffness: 400 }}
                          >
                            <Icon size={14} />
                          </motion.div>
                          <div>
                            <p className="font-medium text-[var(--text-primary)]">{skill}</p>
                            <p className="text-xs text-[var(--text-primary)]/40 capitalize">
                              {category.replace(/([A-Z])/g, ' $1').trim()}
                            </p>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                ) : (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="text-center py-12"
                  >
                    <motion.p 
                      className="text-[var(--text-primary)]/40"
                      animate={{ y: [0, -5, 0] }}
                      transition={{ repeat: Infinity, duration: 2 }}
                    >
                      No skills found for "{searchTerm}"
                    </motion.p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}

          {/* Stats */}
          <motion.div 
            variants={statsVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto mt-12"
          >
            {[
              { label: "Categories", value: categories.length },
              { label: "Total Skills", value: allSkills.length },
              { label: "React Expert", value: allSkills.filter(s => s.skill.toLowerCase().includes('react')).length > 0 ? '✓' : '—' },
              { label: "JavaScript", value: allSkills.filter(s => s.skill.toLowerCase().includes('js') || s.skill.toLowerCase().includes('javascript')).length > 0 ? '✓' : '—' },
            ].map((stat, index) => (
              <motion.div
                key={index}
                variants={statItemVariants}
                whileHover="hover"
                className="text-center p-4 rounded-xl bg-[var(--card-bg)] border border-[var(--border-color)]"
              >
                <motion.div 
                  className="text-2xl font-bold text-themeButton"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ 
                    repeat: index === 0 ? Infinity : 0,
                    duration: 2,
                    delay: index * 0.3
                  }}
                >
                  {stat.value}
                </motion.div>
                <div className="text-xs text-[var(--text-primary)]/40 font-mono uppercase tracking-wider">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </LayoutGroup>
      </div>
    </section>
  );
}