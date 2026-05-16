import { useContext } from "react";
import { ThemeContext } from "../dataprovider/ThemeContext";
import { motion } from "framer-motion";

export default function Skills() {
  const { technicalSkills } = useContext(ThemeContext);

  const categories = Object.keys(technicalSkills);

  return (
    <section id="skills" className="space-y-16">
      <div className="text-center space-y-4">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold text-themeSubheading"
        >
          My Skills
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-[var(--text-primary)]/70 max-w-2xl mx-auto"
        >
          Technologies I've been working with recently.
        </motion.p>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {categories.map((category, catIndex) => (
          <motion.div
            key={category}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: catIndex * 0.1 }}
            className="p-8 bg-[var(--card-bg)] backdrop-blur-md rounded-3xl border border-[var(--border-color)] shadow-xl"
          >
            <h3 className="text-xl font-bold text-themeButton mb-6 capitalize">
              {category.replace(/([A-Z])/g, ' $1').trim()}
            </h3>
            <div className="flex flex-wrap gap-3">
              {technicalSkills[category].map((skill, skillIndex) => (
                <span
                  key={skillIndex}
                  className="px-4 py-2 bg-[var(--text-primary)]/10 text-[var(--text-use)] rounded-xl text-sm font-semibold border border-[var(--text-primary)]/10 hover:bg-themeButton/20 hover:text-themeButton transition-colors duration-300 shadow-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
