"use client";
import { cn } from "@/lib/utils";

export function DepthLayer({ children, depth = 0, className }) {
  // Translate Z value
  return (
    <div
      style={{
        transform: `translateZ(${depth}px)`,
        transformStyle: "preserve-3d",
      }}
      className={cn(className)}
    >
      {children}
    </div>
  );
}
