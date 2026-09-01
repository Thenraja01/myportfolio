"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./LoaderStyles.css";

// Helper component for typewriter effect
const TypewriterText = ({ text, delay = 0, speed = 40, className = "" }) => {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    let i = 0;
    const timeout = setTimeout(() => {
      const interval = setInterval(() => {
        setDisplayedText(text.substring(0, i + 1));
        i++;
        if (i >= text.length) clearInterval(interval);
      }, speed);
      return () => clearInterval(interval);
    }, delay);
    return () => clearTimeout(timeout);
  }, [text, delay, speed]);

  return <span className={className}>{displayedText}</span>;
};

export default function CinematicLoader({ onComplete }) {
  const [scene, setScene] = useState(0);

  useEffect(() => {
    // Check for reduced motion or returning visitor
    const isReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const hasVisited = localStorage.getItem("hasVisitedPortfolio");
    
    if (isReducedMotion || hasVisited) {
      onComplete();
      return;
    }

    localStorage.setItem("hasVisitedPortfolio", "true");
    
    // Cyberpunk Scene orchestration
    const sequence = [
      { s: 1, delay: 0 },       // System Wake (Terminal)
      { s: 2, delay: 3000 },    // Data Surge & Grid
      { s: 3, delay: 5500 },    // The Eagle
      { s: 4, delay: 8000 },    // The Race Car
      { s: 5, delay: 10500 },   // Title Reveal
      { s: 6, delay: 13500 },   // Calm Dissolve
      { s: 7, delay: 16000 },   // Complete
    ];

    const timeouts = sequence.map(({ s, delay }) =>
      setTimeout(() => {
        setScene(s);
        if (s === 7) onComplete();
      }, delay)
    );

    return () => timeouts.forEach(clearTimeout);
  }, [onComplete]);

  if (scene === 0 || scene === 7) return null;

  return (
    <div className="loader-container bg-slate-950">
      <div className="film-grain"></div>
      <div className="scanline"></div>

      <AnimatePresence mode="wait">
        
        {/* SCENE 01: System Wake (Terminal) */}
        {scene === 1 && (
          <motion.div
            key="scene-1"
            className="absolute inset-0 flex flex-col justify-center px-8 md:px-24"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.1, filter: "blur(4px)", transition: { duration: 0.5 } }}
          >
            <div className="font-mono text-cyan-500 text-sm md:text-lg leading-loose">
              <div><TypewriterText text="> INITIALIZING NEURAL KERNEL..." delay={300} speed={30} /></div>
              <div><TypewriterText text="> LOADING AI MODULES [ OK ]" delay={1200} speed={20} /></div>
              <div><TypewriterText text="> BYPASSING SECURITY PROTOCOLS..." delay={1800} speed={10} /></div>
              <div className="mt-2"><span className="terminal-cursor"></span></div>
            </div>
          </motion.div>
        )}

        {/* SCENE 02: Data Surge & Grid */}
        {scene === 2 && (
          <motion.div
            key="scene-2"
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="cyber-grid"></div>
            
            {/* Raining Data Particles */}
            <div className="absolute inset-0 overflow-hidden">
              {[...Array(20)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute text-cyan-500/50 font-mono text-xs md:text-sm font-bold"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: "100%",
                  }}
                  animate={{
                    top: "-10%",
                    opacity: [0, 1, 0]
                  }}
                  transition={{
                    duration: 1 + Math.random() * 2,
                    repeat: Infinity,
                    delay: Math.random() * 2,
                    ease: "linear"
                  }}
                >
                  {Math.random() > 0.5 ? "</>" : "01"}
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* SCENE 03: The Eagle */}
        {scene === 3 && (
          <motion.div
            key="scene-3"
            className="absolute inset-0 bg-slate-950 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.2, transition: { duration: 0.5 } }}
          >
            <motion.img 
              src="https://media.giphy.com/media/xsIH9JAo9HZElViMQv/giphy.gif"
              alt="Eagle"
              className="w-full h-full object-cover opacity-60 mix-blend-screen"
              initial={{ scale: 1 }}
              animate={{ scale: 1.1 }}
              transition={{ duration: 1, ease: "easeInOut" }}
            />
            <div className="laser-flash"></div>
          </motion.div>
        )}

        {/* SCENE 04: The Race Car */}
        {scene === 4 && (
          <motion.div
            key="scene-4"
            className="absolute inset-0 bg-slate-950 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.2, transition: { duration: 0.5 } }}
          >
            <motion.img 
              src="https://giffiles.alphacoders.com/223/223474.gif"
              alt="Cyberpunk Race Car"
              className="w-full h-full object-cover opacity-80 mix-blend-screen"
              initial={{ x: "-100%" }}
              animate={{ x: "100%" }}
              transition={{ duration: 0.7, ease: "easeInOut" }}
            />
            <div className="laser-flash"></div>
          </motion.div>
        )}

        {/* SCENE 05: Title Reveal */}
        {scene === 5 && (
          <motion.div
            key="scene-5"
            className="absolute inset-0 flex flex-col items-center justify-center"
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, filter: "blur(10px)", transition: { duration: 1.5 } }}
          >
            <motion.h1 
              className="text-5xl md:text-7xl font-black mb-4 glow-title"
              initial={{ filter: "blur(10px)" }}
              animate={{ filter: "blur(0px)" }}
              transition={{ duration: 1 }}
            >
              <span className="chromatic-glitch" data-text="THEN RAJA">THEN RAJA</span>
            </motion.h1>
            
            <motion.div
              className="h-[1px] w-48 md:w-64 bg-cyan-500/50 mb-4"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            />

            <motion.p
              className="text-cyan-400 font-mono tracking-[0.2em] text-xs md:text-sm font-bold"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
            >
              FULL STACK DEV · AI ENGINEER
            </motion.p>
          </motion.div>
        )}

        {/* SCENE 06: Calm Dissolve */}
        {scene === 6 && (
          <motion.div
            key="scene-6"
            className="absolute inset-0 flex items-center justify-center bg-gradient-to-b from-slate-950 to-indigo-950/20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 1.5 } }}
          >
             <motion.p 
              className="text-slate-400 italic font-serif text-lg md:text-xl tracking-wide"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
             >
                "Code is poetry written in logic."
             </motion.p>
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
}
