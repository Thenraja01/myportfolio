"use client";
import { useState, useEffect } from "react";
import CinematicLoader from "./CinematicLoader";
import { AnimatePresence, motion } from "framer-motion";

export default function InitialLoaderOverlay() {
  const [loading, setLoading] = useState(true);

  // Fallback to ensure it doesn't get stuck
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 12000); // Max 12 seconds
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          className="fixed inset-0 z-[9999]"
          exit={{ opacity: 0, filter: "blur(10px)" }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          <CinematicLoader onComplete={() => setLoading(false)} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
