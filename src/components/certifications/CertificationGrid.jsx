"use client";
import { motion } from "framer-motion";
import { CertificationCard } from "./CertificationCard";

export function CertificationGrid({ certifications }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {certifications.map((cert, idx) => (
        <motion.div
          key={cert.id || cert.title}
          initial={{ opacity: 0, y: 30, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: idx * 0.05, duration: 0.4 }}
        >
          <CertificationCard cert={cert} />
        </motion.div>
      ))}
    </div>
  );
}
