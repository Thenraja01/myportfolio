import { useState, useEffect } from "react";
import { useReducedMotion } from "./useReducedMotion";

export function useParallax(speed = 0.2) {
  const [offsetY, setOffsetY] = useState(0);
  const isReduced = useReducedMotion();

  useEffect(() => {
    if (isReduced) return;

    const handleScroll = () => {
      setOffsetY(window.scrollY * speed);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [speed, isReduced]);

  return isReduced ? 0 : offsetY;
}
