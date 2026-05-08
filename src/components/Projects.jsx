import { useContext, useState } from "react";
import { ThemeContext } from "../dataprovider/ThemeContext";
import { motion } from "framer-motion";
import { Github, ExternalLink, Code, Heart } from "lucide-react";

const ProjectCard = ({ p, cardVariants }) => {
  const [liked, setLiked] = useState(false);
  
  const [count, setCount] = useState(12 * p.id + 7);

  const handleLike = () => {
    setLiked(!liked);
    setCount((prev) => (liked ? prev - 1 : prev + 1));
  };

  return (
    <motion.div
      variants={cardVariants}
      className="group relative flex flex-col justify-between bg-white dark:bg-[#1a1a1a] rounded-[2rem] overflow-hidden p-8 border border-gray-100 dark:border-white/5 shadow-xl hover:shadow-2xl transition-all duration-300 h-full"
    >
      <div className="absolute top-6 right-6 px-3 py-1 text-xs font-semibold uppercase tracking-wider rounded-full bg-[var(--text-primary)] text-white dark:text-black">
        {p.status}
      </div>

      <div className="space-y-6 mt-4 relative z-10 flex-grow">
        <div className="w-14 h-14 rounded-2xl bg-[var(--text-primary)]/5 flex items-center justify-center text-themeButton group-hover:scale-110 transition-transform duration-300">
          <Code size={28} />
        </div>
        
        <h3 className="text-2xl font-bold text-[var(--text-primary)] group-hover:text-themeSubheading transition-colors">
          {p.name}
        </h3>
        
        <p className="text-[var(--text-primary)]/80 leading-relaxed">
          {p.projectdesc}
        </p>

        <div className="flex flex-wrap gap-2 pt-2">
          {p.usedSkills.map((skill, index) => (
            <span 
              key={index} 
              className="px-3 py-1 text-xs font-medium bg-[var(--text-primary)]/10 text-[var(--text-primary)] rounded-full"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* Interactive Bottom Bar */}
      <div className="flex items-center justify-between pt-6 mt-8 border-t border-gray-100 dark:border-white/5 relative z-10">
        <div className="flex gap-4">
          <a 
            href={p.githubLink || "#"} 
            title="View Source" 
            className="text-[var(--text-primary)]/60 hover:text-themeButton hover:-translate-y-1 transition-all duration-300 flex items-center gap-1 text-sm font-medium"
          >
            <Github size={18} />
            <span className="hidden sm:inline">Code</span>
          </a>
          <a 
            href={p.liveLink || "#"} 
            title="Live Project" 
            className="text-[var(--text-primary)]/60 hover:text-themeButton hover:-translate-y-1 transition-all duration-300 flex items-center gap-1 text-sm font-medium"
          >
            <ExternalLink size={18} />
            <span className="hidden sm:inline">Live</span>
          </a>
        </div>
        
        <button 
           onClick={handleLike} 
           title="Like Project"
           className="flex items-center justify-center gap-2 group transition-all"
        >
          <span className={`text-sm font-bold tracking-wider ${liked ? 'text-red-500' : 'text-[var(--text-primary)]/60 group-hover:text-red-400'}`}>
            {count}
          </span>
          <Heart 
            size={22} 
            className={`transition-all duration-300 ease-out ${
              liked 
                ? 'text-red-500 fill-red-500 scale-110' 
                : 'text-[var(--text-primary)]/60 group-hover:text-red-400 group-hover:scale-110'
            }`} 
          />
        </button>
      </div>

      <div className="absolute opacity-0 group-hover:opacity-100 inset-0 pointer-events-none transition-opacity duration-500 bg-gradient-to-t from-themeButton/5 to-transparent"></div>
    </motion.div>
  );
};

export default function Projects() {
  const { projects } = useContext(ThemeContext);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const cardVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: "easeOut" } },
  };

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
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        className="grid grid-cols-1 lg:grid-cols-2 gap-8"
      >
        {projects.map((p, index) => (
          <ProjectCard 
            key={index} 
            p={{
              ...p,
              id: index,
              status: p.status || "Completed",
              projectdesc: p.description,
              usedSkills: p.technologies || []
            }} 
            cardVariants={cardVariants} 
          />
        ))}
      </motion.div>
    </section>
  );
}
