"use client";
import { motion } from "framer-motion";
import { useTilt } from "@/hooks/useTilt";
import { cn } from "@/lib/utils";

export function TiltCard({ children, className, maxTilt = 4, ...props }) {
  const { ref, tilt, handleMouseMove, handleMouseLeave } = useTilt(maxTilt);

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{
        rotateX: tilt.rotateX,
        rotateY: tilt.rotateY,
        scale: tilt.scale,
      }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      style={{ transformStyle: "preserve-3d" }}
      className={cn("will-change-transform", className)}
      {...props}
    >
      {children}
    </motion.div>
  );
}
