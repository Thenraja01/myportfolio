"use client";
import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/utils";

export function FloatingObject({ children, duration = 4, delay = 0, yOffset = 10, className }) {
  const isReduced = useReducedMotion();

  if (isReduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      animate={{ y: [0, -yOffset, 0] }}
      transition={{
        duration,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut",
        delay,
      }}
      className={cn("will-change-transform", className)}
    >
      {children}
    </motion.div>
  );
}
