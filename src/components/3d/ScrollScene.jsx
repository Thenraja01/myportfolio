"use client";
import { cn } from "@/lib/utils";

export function ScrollScene({ children, className, perspective = 1200 }) {
  return (
    <div
      style={{ perspective: `${perspective}px` }}
      className={cn("relative w-full overflow-hidden perspective-container", className)}
    >
      {children}
    </div>
  );
}
