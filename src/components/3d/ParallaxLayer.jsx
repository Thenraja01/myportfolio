"use client";
import { useParallax } from "@/hooks/useParallax";
import { cn } from "@/lib/utils";

export function ParallaxLayer({ children, speed = 0.15, className }) {
  const offsetY = useParallax(speed);

  return (
    <div
      style={{ transform: `translateY(${offsetY}px)` }}
      className={cn("will-change-transform", className)}
    >
      {children}
    </div>
  );
}
