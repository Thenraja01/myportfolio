import {  useState, useEffect } from "react";
import {  useTheme } from "../context/ThemeContext";
import { Sun, Moon, Github, Instagram, Linkedin, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const { theme, toggleTheme } =  useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const links = ["Home", "Skills","Experience", "Projects", "Education"];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-5xl rounded-full transition-all duration-300 border perspective-container ${
          scrolled
            ? "glass-panel shadow-lg border-[var(--glass-border)]"
            : "bg-transparent border-transparent"
        }`}
      >
        <div className="px-6 py-4 flex items-center justify-between">
          <div className="flex gap-4 items-center">
            <a href="https://www.instagram.com/kingz__nyx_" target="_blank" rel="noreferrer" className="text-[var(--text-primary)] hover:text-themeButton transition-colors">
              <Instagram size={20} />
            </a>
            <a href="https://github.com/Thenraja01" target="_blank" rel="noreferrer" className="text-[var(--text-primary)] hover:text-themeButton transition-colors">
              <Github size={20} />
            </a>
            <a href="https://www.linkedin.com/in/then-raja1205" target="_blank" rel="noreferrer" className="text-[var(--text-primary)] hover:text-themeButton transition-colors">
              <Linkedin size={20} />
            </a>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            {links.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-sm font-medium tracking-wider text-[var(--text-primary)] hover:text-themeButton transition-colors uppercase"
              >
                {item}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors text-[var(--text-primary)]"
            >
              <AnimatePresence mode="wait" initial={false}>
                {theme === "dark" ? (
                  <motion.div
                    key="moon"
                    initial={{ scale: 0, rotate: -90 }}
                    animate={{ scale: 1, rotate: 0 }}
                    exit={{ scale: 0, rotate: 90 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Moon size={20} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="sun"
                    initial={{ scale: 0, rotate: 90 }}
                    animate={{ scale: 1, rotate: 0 }}
                    exit={{ scale: 0, rotate: -90 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Sun size={20} />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
            <button
              className="md:hidden text-[var(--text-primary)] p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden fixed top-24 left-1/2 -translate-x-1/2 w-[95%] max-w-md glass-panel rounded-2xl shadow-xl z-40 overflow-hidden"
          >
            <div className="flex flex-col p-6 space-y-4">
              {links.map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-lg font-medium text-[var(--text-primary)] hover:text-themeButton transition-colors"
                >
                  {item}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
