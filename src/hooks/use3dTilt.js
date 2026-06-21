import { useRef, useCallback } from "react";

export function use3DTilt(intensity = 12) {
  const ref = useRef(null);

  const onMove = useCallback(
    (e) => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      el.style.transform = `perspective(1000px) rotateY(${x * intensity}deg) rotateX(${-y * intensity}deg) translateZ(16px)`;
    },
    [intensity]
  );

  const onLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = "perspective(1000px) rotateY(0deg) rotateX(0deg) translateZ(0)";
  }, []);

  return { ref, onMove, onLeave };
}
