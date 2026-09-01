"use client";
import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export function FadeIn({ children, delay = 0, duration = 0.5, direction = "up", className }) {
  const isReduced = useReducedMotion();

  if (isReduced) {
    return <div className={className}>{children}</div>;
  }

  const directions = {
    up: { y: 20 },
    down: { y: -20 },
    left: { x: 20 },
    right: { x: -20 },
    none: {},
  };

  return (
    <motion.div
      initial={{ opacity: 0, ...directions[direction] }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
