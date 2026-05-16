import { useContext } from "react";
import { ThemeContext } from "../dataprovider/ThemeContext";
import { motion } from "framer-motion";
import { Briefcase } from "lucide-react";

export default function Experience() {
  const { workExperience } = useContext(ThemeContext);

  return (
    <section id="experience" className="space-y-16">
      <div className="text-center space-y-4">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold text-themeSubheading"
        >
          Professional Experience
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-var(--text-use) max-w-2xl mx-auto"
        >
          My journey through internships and professional projects.
        </motion.p>
      </div>

      <div className="max-w-4xl mx-auto space-y-12">
        {workExperience.map((exp, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="group relative flex gap-6 p-10 bg-var(--card) backdrop-blur-md rounded-[2.5rem] border border-[var(--border-color)] shadow-xl hover:shadow-2xl transition-all duration-500"
          >
            <div className="hidden sm:flex w-20 h-20 rounded-3xl bg-linear-to-br from-themeButton/20 to-themeSubheading/10 items-center justify-center text-themeButton shrink-0 group-hover:scale-110 transition-transform duration-500">
              <Briefcase size={36} />
            </div>
            
            <div className="space-y-6 grow">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-2xl font-bold text-var(--text-default) group-hover:text-themeButton transition-colors">
                    {exp.role}
                  </h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-lg text-themeSubheading font-bold">{exp.company}</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--text-primary)]/20"></span>
                    <span className="text-var(--text-default)/60 font-medium">{exp.location}</span>
                  </div>
                </div>
                <div className="px-5 py-2 bg-[var(--text-primary)]/5 rounded-2xl text-sm font-bold text-themeButton border border-[var(--border-1)] whitespace-nowrap h-max">
                  {exp.duration}
                </div>
              </div>
              
              <ul className="space-y-4 border-l-2 border-themeButton/20 pl-6 ml-2">
                {exp.responsibilities.map((resp, i) => (
                  <li key={i} className="text-[var(--text-primary)]/80 leading-relaxed relative">
                    <span className="absolute -left-[1.85rem] top-2 w-3 h-3 rounded-full bg-themeButton border-2 border-[var(--card-bg-2)]"></span>
                    {resp}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
