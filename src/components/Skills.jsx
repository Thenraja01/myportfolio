import { useContext } from "react";
import { ThemeContext } from "../dataprovider/ThemeContext";
import { motion } from "framer-motion";

export default function Skills() {
  const { Value } = useContext(ThemeContext);
  const data = Value;

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

      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 text-[var(--text-primary)]">
        {data.skills.techSkills.map((tech, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="space-y-4"
          >
            <div className="flex justify-between font-semibold tracking-wide">
              <span>{tech}</span>
              <span className="text-themeButton">{data.skills.percentages[index]}%</span>
            </div>
            <div className="h-3 w-full bg-[var(--text-primary)]/10 rounded-full overflow-hidden shadow-inner">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${data.skills.percentages[index]}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: "easeOut", delay: 0.2 + (index * 0.1) }}
                className="h-full bg-gradient-to-r from-themeButton to-themeSubheading rounded-full shadow-md"
              ></motion.div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
