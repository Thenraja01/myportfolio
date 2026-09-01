"use client";
import { motion } from "framer-motion";

export function SectionHeading({ title, subtitle, badge }) {
  return (
    <div className="text-center space-y-4 max-w-3xl mx-auto">
      {badge && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-500 dark:text-indigo-400 text-xs font-mono uppercase tracking-widest font-semibold"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 dark:bg-indigo-400 animate-pulse" />
          <span>{badge}</span>
        </motion.div>
      )}

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-slate-900 dark:text-slate-100"
      >
        <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 dark:from-indigo-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
          {title}
        </span>
      </motion.h2>

      {subtitle && (
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-slate-600 dark:text-slate-400 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed transition-colors"
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}
