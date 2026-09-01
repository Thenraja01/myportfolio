"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTilt } from "@/hooks/useTilt";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { Sparkles, Code2, Camera, RefreshCw } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";

const DEFAULT_PHOTOS = [
  "/images/user1.jpg",
  "/images/user3.jpg",
  "/images/programmer.jpg",
];

export function Photo3DEnvironment({
  src,
  images = DEFAULT_PHOTOS,
  alt = "Profile photo",
  className = "",
  imageClassName = "w-64 h-80 sm:w-72 sm:h-96",
  variant = "hero",
}) {
  const { isDark } = useTheme();

  // If a single `src` prop was passed and images wasn't custom, ensure primary is in photosList
  const photosList = src && !images.includes(src) ? [src, ...images] : images;

  const [photoIndex, setPhotoIndex] = useState(
    src ? Math.max(0, photosList.indexOf(src)) : 0
  );
  const [isFlipping, setIsFlipping] = useState(false);

  const { ref, tilt, handleMouseMove, handleMouseLeave } = useTilt(6);
  const isReduced = useReducedMotion();

  const handleNextPhoto = () => {
    setIsFlipping(true);
    setTimeout(() => {
      setPhotoIndex((prev) => (prev + 1) % photosList.length);
      setIsFlipping(false);
    }, 150);
  };

  const currentPhoto = photosList[photoIndex];

  return (
    <div className="relative group flex flex-col justify-center items-center py-6">
      {/* Ambient background glow */}
      <div className="absolute -inset-4 rounded-full bg-gradient-to-r from-indigo-600/30 via-purple-600/20 to-pink-600/30 blur-3xl opacity-60 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

      {/* Floating 3D Environment Wrapper */}
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={handleNextPhoto}
        animate={{
          rotateX: tilt.rotateX,
          rotateY: isFlipping ? tilt.rotateY + 180 : tilt.rotateY,
          scale: tilt.scale,
        }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        style={{ transformStyle: "preserve-3d", perspective: 1000 }}
        className="relative z-10 cursor-pointer will-change-transform select-none"
        title="Click to switch photo"
      >
        {/* Layer 1: Backing 3D Glass Frame (Offset Depth Layer) */}
        <div
          style={{ transform: "translateZ(-40px) rotate(-4deg)" }}
          className={`absolute -inset-3 rounded-3xl border shadow-2xl backdrop-blur-xl pointer-events-none transition-all duration-300 group-hover:-translate-x-2 group-hover:-translate-y-2 ${
            isDark
              ? "bg-slate-900/80 border-slate-700/50"
              : "bg-white/70 border-indigo-200/80"
          }`}
        />

        {/* Layer 2: Floating Sparkle & Tech Badges */}
        {!isReduced && (
          <>
            <motion.div
              animate={{ y: [0, -8, 0], rotate: [0, 5, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              style={{ transform: "translateZ(35px)" }}
              className={`absolute -top-4 -right-4 z-30 p-2.5 rounded-2xl border shadow-xl backdrop-blur-xl pointer-events-none ${
                isDark
                  ? "bg-slate-950/90 border-indigo-500/40 text-indigo-400"
                  : "bg-white/95 border-indigo-300 text-indigo-600"
              }`}
            >
              <Sparkles size={18} className="animate-pulse" />
            </motion.div>

            <motion.div
              animate={{ y: [0, 8, 0], rotate: [0, -5, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              style={{ transform: "translateZ(30px)" }}
              className={`absolute -bottom-4 -left-4 z-30 p-2.5 rounded-2xl border shadow-xl backdrop-blur-xl pointer-events-none ${
                isDark
                  ? "bg-slate-950/90 border-purple-500/40 text-purple-400"
                  : "bg-white/95 border-purple-300 text-purple-600"
              }`}
            >
              <Code2 size={18} />
            </motion.div>
          </>
        )}

        {/* Layer 3: Main Photo Card with Smooth AnimatePresence Flip */}
        <div
          style={{ transform: "translateZ(10px)" }}
          className={`relative rounded-3xl overflow-hidden border-2 shadow-2xl group/img transition-colors duration-300 ${
            isDark ? "border-slate-800 bg-slate-950" : "border-indigo-200 bg-white"
          }`}
        >
          <AnimatePresence mode="wait">
            <motion.img
              key={currentPhoto}
              src={currentPhoto}
              alt={alt}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className={`${imageClassName} object-cover transition-all duration-500 group-hover/img:scale-105 ${className}`}
            />
          </AnimatePresence>

          {/* Interactive Click Switch Badge Banner */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-30 px-3 py-1 rounded-full bg-slate-950/80 border border-slate-700/70 text-slate-200 text-[10px] font-mono font-bold flex items-center gap-1.5 backdrop-blur-md opacity-80 group-hover:opacity-100 transition-opacity">
            <Camera size={12} className="text-indigo-400 animate-bounce" />
            <span>Click to switch</span>
            <RefreshCw size={10} className="text-purple-400" />
          </div>

          {/* Subtle gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent opacity-60 group-hover:opacity-20 transition-opacity pointer-events-none" />
        </div>
      </motion.div>
    </div>
  );
}
