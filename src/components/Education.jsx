import { useContext } from "react";
import { motion } from "framer-motion";
import { GraduationCap } from "lucide-react";
import { useEducation } from "@/context/EducationContext"

export default function Education() {
  const { education } = useEducation()

  return (
    <section id="education" className="space-y-16">
      <div className="text-center space-y-4">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold text-themeSubheading"
        >
          Education
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-[var(--text-primary)]/70 max-w-2xl mx-auto"
        >
          My academic background.
        </motion.p>
      </div>

      <div className="max-w-4xl mx-auto relative pl-4 md:pl-0">
        <div className="absolute left-[39px] md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-0.5 bg-[var(--text-secondary)]/10 hidden md:block"></div>

        <div className="space-y-12">
          {education.map((edu, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className={`relative flex items-center justify-between md:justify-normal w-full ${
                index % 2 === 0 ? "md:flex-row-reverse" : ""
              }`}
            >
              <div className="absolute left-[8px] md:left-1/2 md:-translate-x-1/2 w-14 h-14 rounded-full bg-[var(--card-bg-2)] border-[3px] border-themeButton flex items-center justify-center z-10 shadow-lg text-[var(--text-primary)]">
                <GraduationCap size={24} />
              </div>

              <div className={`w-full md:w-5/12 ml-20 md:ml-0 ${
                index % 2 === 0 ? "md:pl-16 text-left" : "md:pr-16 md:text-right"
              }`}>
                <div className="p-8 bg-[var(--card-bg-2)] rounded-3xl shadow-xl border border-[var(--border-2)] hover:-translate-y-2 transition-transform duration-300">
                  <span className="px-3 py-1 bg-[var(--text-primary)]/5 rounded-full text-sm font-semibold tracking-wider text-themeButton block w-max uppercase mb-4">
                    {edu.duration}
                  </span>
                  <h3 className="text-xl md:text-2xl font-bold text-[var(--text-secondary)] mb-2">
                    {edu.degree}
                  </h3>
                  <h4 className="text-lg text-themeSubheading font-medium mb-4">
                    {edu.institution}
                  </h4>
                  <div className="inline-block bg-var(--text-primary) text-chart-1 dark:text-black font-bold px-4 py-2 rounded-xl text-sm mt-2 shadow-md">
                    Percentage: {edu.percentage}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
