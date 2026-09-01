import { useState, useRef, useCallback } from "react";
import { useReducedMotion } from "./useReducedMotion";

export function useTilt(maxTilt = 5) {
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0, scale: 1 });
  const ref = useRef(null);
  const isReduced = useReducedMotion();

  const handleMouseMove = useCallback(
    (e) => {
      if (isReduced || !ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateY = ((x - centerX) / centerX) * maxTilt;
      const rotateX = -((y - centerY) / centerY) * maxTilt;

      setTilt({ rotateX, rotateY, scale: 1.02 });
    },
    [maxTilt, isReduced]
  );

  const handleMouseLeave = useCallback(() => {
    setTilt({ rotateX: 0, rotateY: 0, scale: 1 });
  }, []);

  return { ref, tilt, handleMouseMove, handleMouseLeave };
}
