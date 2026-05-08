import { useContext } from "react";
import { ThemeContext } from "../dataprovider/ThemeContext";
import { motion } from "framer-motion";
import { Award, CheckCircle } from "lucide-react";

export default function Certifications() {
  const { certifications } = useContext(ThemeContext);

  return (
    <section id="certifications" className="space-y-16">
      <div className="text-center space-y-4">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold text-themeSubheading"
        >
          Certifications
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-[var(--text-primary)]/70 max-w-2xl mx-auto"
        >
          My professional certifications and achievements.
        </motion.p>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {certifications.map((cert, index) => {
          const [title, provider] = cert.includes(" — ") ? cert.split(" — ") : [cert, ""];
          
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="group flex items-start gap-5 p-8 bg-[var(--card-bg)] backdrop-blur-md rounded-[2rem] border border-[var(--border-color)] shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="p-4 rounded-2xl bg-themeButton/10 text-themeButton shrink-0 group-hover:bg-themeButton group-hover:text-white transition-all duration-300">
                <Award size={24} />
              </div>
              <div className="space-y-2">
                <p className="text-lg font-bold text-[var(--text-primary)] leading-tight group-hover:text-themeButton transition-colors">
                  {title}
                </p>
                {provider && (
                  <p className="text-sm text-themeSubheading font-bold uppercase tracking-wider">
                    {provider}
                  </p>
                )}
                <div className="flex items-center gap-2 pt-2">
                  <span className="flex items-center gap-1 text-[10px] font-black uppercase tracking-[0.2em] px-2 py-1 bg-green-500/10 text-green-500 rounded-md">
                    <CheckCircle size={10} />
                    Verified
                  </span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
