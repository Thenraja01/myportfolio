"use client";
import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Github,
  Linkedin,
  Mail,
  Menu,
  X,
  Sun,
  Moon,
} from "lucide-react";
import { useTheme } from "@/context/ThemeContext";
import { useUser } from "@/context/UserContext";

export const navItems = [
  { label: "HOME",       id: "hero" },
  { label: "SKILLS",     id: "skills" },
  { label: "EXPERIENCE", id: "experience" },
  { label: "PROJECTS",   id: "projects" },
  { label: "EDUCATION",  id: "education" },
];

function scrollToSection(id) {
  const el = document.getElementById(id);
  if (!el) return;
  const navHeight = 80;
  const top = el.getBoundingClientRect().top + window.scrollY - navHeight;
  window.scrollTo({ top, behavior: "smooth" });
}

export default function Navbar() {
  const [scrolled, setScrolled]         = useState(false);
  const [mobileMenuOpen, setMobileOpen] = useState(false);
  const [activeSection, setActive]      = useState("hero");
  const pathname  = usePathname();
  const router    = useRouter();
  const isHome    = pathname === "/";
  const { isDark, toggleTheme } = useTheme();
  const { personalInfo } = useUser();

  /* ── scroll-state ── */
  useEffect(() => {
    const onScroll = () => {
      const isScrolled = window.scrollY > 30;
      setScrolled((prev) => (prev !== isScrolled ? isScrolled : prev));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ── active-section detection ── */
  useEffect(() => {
    if (!isHome) { 
      setActive((prev) => (prev !== "" ? "" : prev)); 
      return; 
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible.length > 0) {
          const topId = visible[0].target.id;
          setActive((prev) => (prev !== topId ? topId : prev));
        }
      },
      {
        threshold: [0.05, 0.15, 0.3, 0.5],
        rootMargin: "-70px 0px -35% 0px",
      }
    );

    navItems.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [isHome]);

  /* ── click handler ── */
  const handleNavClick = useCallback(
    async (e, id) => {
      e.preventDefault();
      setMobileOpen(false);

      if (isHome) {
        scrollToSection(id);
      } else {
        await router.push("/");
        setTimeout(() => scrollToSection(id), 120);
      }
    },
    [isHome, router]
  );

  const socials = personalInfo;

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.55, ease: "easeOut" }}
        className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[94%] max-w-[1240px] rounded-full transition-all duration-300 border shadow-xl backdrop-blur-2xl ${
          isDark
            ? "bg-slate-950/85 border-slate-800/80 text-slate-100 shadow-black/40"
            : "bg-white/85 border-slate-200/80 text-[#e8e5e5] shadow-slate-200/50"
        } ${scrolled ? "py-2 px-5" : "py-2.5 px-6"}`}
      >
        <div className="flex items-center justify-between">

          {/* Left — social icons */}
          <div className="flex items-center gap-1.5">
            {socials.github && (
              <a
                href={socials.github}
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                className="p-2 rounded-full text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-100 dark:hover:bg-slate-800/60 transition-all hover:scale-105 active:scale-95"
              >
                <Github size={17} />
              </a>
            )}
            {socials.linkedin && (
              <a
                href={socials.linkedin}
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="p-2 rounded-full text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-100 dark:hover:bg-slate-800/60 transition-all hover:scale-105 active:scale-95"
              >
                <Linkedin size={17} />
              </a>
            )}
            {socials.email && (
              <a
                href={`mailto:${socials.email}`}
                aria-label="Email"
                className="p-2 rounded-full text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-100 dark:hover:bg-slate-800/60 transition-all hover:scale-105 active:scale-95"
              >
                <Mail size={17} />
              </a>
            )}
          </div>

          {/* Center — nav links (desktop) */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map(({ label, id }) => {
              const isActive = isHome && activeSection === id;
              return (
                <a
                  key={id}
                  href={`#${id}`}
                  onClick={(e) => handleNavClick(e, id)}
                  className={`relative px-4 py-1.5 rounded-full text-[11px] font-mono font-bold uppercase tracking-wider transition-all duration-200 ${
                    isActive
                      ? "text-indigo-600 dark:text-indigo-400 bg-indigo-50/80 dark:bg-indigo-950/40"
                      : "text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-100/80 dark:hover:bg-slate-800/50"
                  }`}
                >
                  {label}
                  {isActive && (
                    <motion.span
                      layoutId="activeNavPill"
                      className="absolute inset-0 rounded-full ring-1 ring-indigo-500/40 dark:ring-indigo-400/40"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </a>
              );
            })}
          </div>

          {/* Right — theme + mobile menu */}
          <div className="flex items-center gap-2">
            <button
              onClick={toggleTheme}
              aria-label="Toggle Theme"
              className="p-2 rounded-full text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-100 dark:hover:bg-slate-800/60 transition-all hover:scale-105 active:scale-95"
              title={`Switch to ${isDark ? "Light" : "Dark"} Mode`}
            >
              {isDark ? <Sun size={18} className="text-amber-400" /> : <Moon size={18} className="text-indigo-600" />}
            </button>

            <button
              className="md:hidden p-2 rounded-full text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:bg-slate-800/60 transition-colors"
              onClick={() => setMobileOpen((o) => !o)}
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -16, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -16, scale: 0.97 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className={`md:hidden fixed top-[4.5rem] left-1/2 -translate-x-1/2 w-[92%] max-w-sm z-50 rounded-3xl p-5 shadow-2xl backdrop-blur-2xl border ${
              isDark
                ? "bg-slate-950/95 border-slate-800/80 text-slate-100"
                : "bg-white/95 border-slate-200/80 text-slate-900"
            }`}
          >
            <div className="flex flex-col gap-1">
              {navItems.map(({ label, id }) => {
                const isActive = isHome && activeSection === id;
                return (
                  <a
                    key={id}
                    href={`#${id}`}
                    onClick={(e) => handleNavClick(e, id)}
                    className={`px-4 py-3 rounded-xl text-sm font-mono font-bold uppercase tracking-wider transition-all ${
                      isActive
                        ? "text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/20"
                        : "text-slate-700 dark:text-slate-300 hover:text-indigo-600 hover:bg-slate-50 dark:hover:bg-slate-800/40"
                    }`}
                  >
                    {label}
                  </a>
                );
              })}
            </div>

            {/* Mobile socials */}
            <div className="flex items-center justify-center gap-4 mt-4 pt-4 border-t border-slate-200/60 dark:border-slate-800/60">
              {socials.github && (
                <a href={socials.github} target="_blank" rel="noreferrer" className="text-slate-600 dark:text-slate-400 hover:text-indigo-600 transition-colors">
                  <Github size={19} />
                </a>
              )}
              {socials.linkedin && (
                <a href={socials.linkedin} target="_blank" rel="noreferrer" className="text-slate-600 dark:text-slate-400 hover:text-indigo-600 transition-colors">
                  <Linkedin size={19} />
                </a>
              )}
              {socials.email && (
                <a href={`mailto:${socials.email}`} className="text-slate-600 dark:text-slate-400 hover:text-indigo-600 transition-colors">
                  <Mail size={19} />
                </a>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
