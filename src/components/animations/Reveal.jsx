"use client";
import { motion } from "framer-motion";

export function Reveal({ children, width = "fit-content", className }) {
  return (
    <div style={{ position: "relative", width, overflow: "hidden" }} className={className}>
      <motion.div
        variants={{
          hidden: { opacity: 0, y: 30 },
          visible: { opacity: 1, y: 0 },
        }}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {children}
      </motion.div>
    </div>
  );
}
