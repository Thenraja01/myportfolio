
import { ThemeContext } from "../context/ThemeContext";
import { motion, AnimatePresence } from "framer-motion";
import { Award, CheckCircle, XCircle, ExternalLink, ChevronDown, ChevronUp } from "lucide-react";
import { useCertifications } from "@/context/CertificationsContext";
import { useState } from "react";

export default function Certifications() {
  const { certifications } = useCertifications()
  const [expandedId, setExpandedId] = useState(null);

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

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
        {certifications.map((cert) => (
          <motion.div
            key={cert.id}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: (cert.id - 1) * 0.05 }}
            className="bg-[var(--card-bg)] backdrop-blur-md rounded-[2rem] border border-[var(--border-color)] shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden"
          >
            {/* Clickable Header */}
            <div
              className="flex items-start gap-5 p-8 cursor-pointer group"
              onClick={() => toggleExpand(cert.id)}
            >
              <div className="p-4 rounded-2xl bg-themeButton/10 text-themeButton shrink-0 group-hover:bg-themeButton group-hover:text-[var(--text-button)] transition-all duration-300">
                <Award size={24} />
              </div>
              <div className="space-y-2 flex-1">
                <div className="flex items-start justify-between">
                  <p className="text-lg font-bold text-[var(--text-primary)] leading-tight group-hover:text-themeButton transition-colors">
                    {cert.title}
                  </p>
                  <button className="mt-1 text-[var(--text-primary)]/40 hover:text-themeButton transition-colors">
                    {expandedId === cert.id ? (
                      <ChevronUp size={20} />
                    ) : (
                      <ChevronDown size={20} />
                    )}
                  </button>
                </div>
                <p className="text-sm text-themeSubheading font-bold uppercase tracking-wider">
                  {cert.institute}
                </p>
                <div className="flex items-center gap-2 pt-2">
                  {cert.verified ? (
                    <span className="flex items-center gap-1 text-[10px] font-black uppercase tracking-[0.2em] px-2 py-1 bg-green-500/10 text-green-700 rounded-md">
                      <CheckCircle size={10} />
                      Verified
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 text-[10px] font-black uppercase tracking-[0.2em] px-2 py-1 bg-yellow-500/10 text-yellow-700 rounded-md">
                      <XCircle size={10} />
                      Pending
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Expandable Content */}
            <AnimatePresence>
              {expandedId === cert.id && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="px-8 pb-8 pt-2 border-t border-[var(--border-color)] space-y-4">
                    <div className="flex items-center gap-3">
                      {cert.verified ? (
                        <span className="flex items-center gap-2 text-sm font-bold px-3 py-1.5 bg-green-500/10 text-green-700 rounded-full">
                          <CheckCircle size={14} />
                          Verified
                        </span>
                      ) : (
                        <span className="flex items-center gap-2 text-sm font-bold px-3 py-1.5 bg-yellow-500/10 text-yellow-700 rounded-full">
                          <XCircle size={14} />
                          Pending
                        </span>
                      )}
                    </div>

                    {cert.link ? (
                      <a
                        href={cert.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-sm text-themeButton hover:underline"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <ExternalLink size={14} />
                        View Certificate
                      </a>
                    ) : (
                      <p className="text-sm text-[var(--text-primary)]/50 italic">
                        No certificate link available
                      </p>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </section>
  );
}