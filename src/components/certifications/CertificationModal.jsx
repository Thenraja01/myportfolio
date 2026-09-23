"use client";
import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, X, Award, CheckCircle2, ExternalLink, ShieldAlert } from "lucide-react";

export function CertificationModal({ certifications, selectedIndex, onClose, onNext, onPrev }) {
  // Handle keyboard events
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onNext();
      if (e.key === "ArrowLeft") onPrev();
    };

    if (selectedIndex !== null) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [selectedIndex, onClose, onNext, onPrev]);

  if (selectedIndex === null) return null;

  const cert = certifications[selectedIndex];
  if (!cert) return null;

  const hasValidLink =
    cert.link &&
    typeof cert.link === "string" &&
    cert.link.trim() !== "" &&
    cert.link.trim() !== '""';

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        {/* Blurred Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-slate-900/50 dark:bg-slate-950/80 backdrop-blur-xl"
        />

        {/* Modal Content */}
        <div className="relative z-10 w-full max-w-4xl flex items-center justify-between gap-4">
          
          {/* Prev Button */}
          <button
            onClick={(e) => { e.stopPropagation(); onPrev(); }}
            className="p-3 rounded-full bg-white/90 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700/50 text-slate-700 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-indigo-600 hover:border-indigo-500 transition-all backdrop-blur-sm shadow-lg hidden sm:block"
            aria-label="Previous certificate"
          >
            <ChevronLeft size={24} />
          </button>

          {/* Card Container */}
          <motion.div
            key={selectedIndex}
            initial={{ opacity: 0, scale: 0.9, x: 20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.9, x: -20 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="flex-1 max-w-2xl mx-auto"
          >
            <div className="glass-card-morphism p-8 md:p-12 rounded-[2rem] border border-slate-200/80 dark:border-slate-800/80 bg-white/95 dark:bg-slate-900/95 shadow-2xl relative text-slate-900 dark:text-slate-100">
              
              {/* Close Button (Mobile & Desktop) */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 dark:bg-slate-800/50 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-rose-500/80 transition-all"
                aria-label="Close modal"
              >
                <X size={20} />
              </button>

              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="p-4 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-600 dark:text-indigo-400 inline-flex w-fit">
                    <Award size={32} />
                  </div>

                  {cert.verified ? (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-mono font-bold tracking-wider uppercase">
                      <CheckCircle2 size={14} /> VERIFIED CREDENTIAL
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400 text-xs font-mono font-bold tracking-wider uppercase">
                      <ShieldAlert size={14} /> WORKSHOP / UNVERIFIED
                    </span>
                  )}
                </div>

                <div className="space-y-2">
                  <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-slate-100 font-mono leading-tight">
                    {cert.title}
                  </h2>
                  <p className="text-sm md:text-base font-mono uppercase tracking-widest text-indigo-600 dark:text-indigo-400">
                    {cert.institute}
                  </p>
                </div>

                {cert.description && (
                  <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm md:text-base border-l-2 border-indigo-500/40 pl-4 py-1 font-sans">
                    {cert.description}
                  </p>
                )}

                {hasValidLink ? (
                  <div className="pt-6 border-t border-slate-200/80 dark:border-slate-800/80 mt-6">
                    <a
                      href={cert.link}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-mono font-semibold transition-all shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40"
                    >
                      <span>View Official Certificate</span>
                      <ExternalLink size={18} />
                    </a>
                  </div>
                ) : (
                  <div className="pt-6 border-t border-slate-200/80 dark:border-slate-800/80 mt-6 text-sm font-mono text-slate-500 italic text-center sm:text-left">
                    Official link not available for this entry.
                  </div>
                )}
              </div>
            </div>
            
            {/* Mobile Navigation Arrows below card */}
            <div className="flex items-center justify-center gap-4 mt-6 sm:hidden">
              <button
                onClick={(e) => { e.stopPropagation(); onPrev(); }}
                className="p-3 rounded-full bg-white/90 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-700/50 text-slate-700 dark:text-slate-300 shadow-md"
              >
                <ChevronLeft size={24} />
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); onNext(); }}
                className="p-3 rounded-full bg-white/90 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-700/50 text-slate-700 dark:text-slate-300 shadow-md"
              >
                <ChevronRight size={24} />
              </button>
            </div>
          </motion.div>

          {/* Next Button */}
          <button
            onClick={(e) => { e.stopPropagation(); onNext(); }}
            className="p-3 rounded-full bg-white/90 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700/50 text-slate-700 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-indigo-600 hover:border-indigo-500 transition-all backdrop-blur-sm shadow-lg hidden sm:block"
            aria-label="Next certificate"
          >
            <ChevronRight size={24} />
          </button>
          
        </div>
      </div>
    </AnimatePresence>
  );
}
