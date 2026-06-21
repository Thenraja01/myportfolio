import { motion } from "framer-motion";
import { Download, Mail, Github, Linkedin, Twitter, Terminal, Cpu, Zap } from "lucide-react";
import axios from "axios";

import person from "./icon/user1.jpg";
import person1 from "./icon/user3.jpg";
import { useUser } from "@/context/UserContext";
import { useState } from "react";
import { useProjects } from "@/context";

export default function Home() {
  const { user, objective, personalInfo,  } = useUser();
  const {projects}=useProjects()

  const [visible, setVisible] = useState(false);

  const toggleVisibility = () => {
    setVisible(!visible);
  };
  const projectCount = Array.isArray(projects) 
    ? projects.length 
    : projects 
      ? Object.keys(projects).length 
      : 0;
  const handleDownload = async () => {
    try {
      const response = await axios.get("/Thenraja.pdf", {
        responseType: "blob",
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));

      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "Then_Raja_Resume.pdf");

      document.body.appendChild(link);
      link.click();

      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Download failed:", error);
    }
  };

  return (
    <section id="home" className="flex flex-col gap-32">
      {/* ================= HERO SECTION ================= */}
      <div className="min-h-[80vh] flex flex-col md:flex-row items-center justify-between gap-12 mt-12">

        {/* ================= LEFT CONTENT ================= */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="flex-1 space-y-8"
        >
          <div className="space-y-6 relative">
            {/* Animated Background Glow */}
            <div className="absolute -top-20 -left-20 w-64 h-64 bg-themeButton/10 rounded-full blur-3xl animate-pulse-slow" />
            <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-themeButton/5 rounded-full blur-3xl animate-pulse-slow animation-delay-1000" />

            {/* Robot/AI Badge */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-themeButton/10 border border-themeButton/20 text-themeButton text-xs font-mono uppercase tracking-widest"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-themeButton opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-themeButton" />
              </span>
              <span>SYSTEM ONLINE • v2.0.1</span>
            </motion.div>

            {/* Main Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-[var(--text-primary)] section-title-3d relative"
            >
              {/* Glitch effect overlay */}
              <span className="relative inline-block">
                Welcome
                <span className="absolute inset-0 text-themeButton/20 blur-sm animate-glitch-1">Welcome</span>
                <span className="absolute inset-0 text-blue-400/20 blur-sm animate-glitch-2">Welcome</span>
              </span>
              <br />
              <motion.span
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="relative inline-block"
              >
                <span className="relative inline-block">
                  <span className="text-5xl md:text-7xl lg:text-8xl font-bold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                    My Portfolio
                  </span>
                  {/* Scanning line effect */}
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-scan-line pointer-events-none" />
                </span>
              </motion.span>
            </motion.h1>

            {/* Subtitle with typing effect */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="relative"
            >
              <motion.p
                className="text-lg md:text-xl text-[var(--text-primary)]/70 max-w-2xl font-mono"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                <span className="text-themeButton">&gt;</span> Initializing creative systems...
                <motion.span
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ duration: 0.8, repeat: Infinity }}
                  className="inline-block w-2 h-5 bg-themeButton ml-1"
                />
              </motion.p>
              <motion.p
                className="text-sm text-[var(--text-primary)]/40 font-mono mt-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
              >
                <span className="text-green-400">✓</span> System ready • <span className="text-yellow-400">◉</span> {projectCount} projects loaded • <span className="text-blue-400">⟳</span> 99% operational
              </motion.p>
            </motion.div>

            {/* Animated Code Blocks */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 }}
              className="flex flex-wrap gap-3 pt-2"
            >
              <span className="px-3 py-1.5 text-xs font-mono bg-[var(--text-primary)]/5 border border-[var(--border-color)] rounded-full text-themeButton/80 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                &lt;developer /&gt;
              </span>
              <span className="px-3 py-1.5 text-xs font-mono bg-[var(--text-primary)]/5 border border-[var(--border-color)] rounded-full text-blue-400/80 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse animation-delay-300" />
                {'{ creator }'}
              </span>
              <span className="px-3 py-1.5 text-xs font-mono bg-[var(--text-primary)]/5 border border-[var(--border-color)] rounded-full text-purple-400/80 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse animation-delay-600" />
                [ innovator ]
              </span>
            </motion.div>
          </div>

          {/* Objective */}
          <p className="text-lg text-[var(--text-primary)]/80 max-w-2xl leading-relaxed">
            {objective}
          </p>

          {/* ================= BUTTONS ================= */}
          <div className="flex flex-wrap items-center gap-4">
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleVisibility}
              className="px-8 py-3 bg-themeButton hover:bg-indigo-500 text-white rounded-full font-medium btn-3d flex items-center gap-2 shadow-lg shadow-themeButton/20"
            >
              <Mail size={18} />
              Contact Me
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleDownload}
              className="px-8 py-3 glass-panel border border-[var(--text-primary)]/20 hover:border-themeAccent text-[var(--text-primary)] rounded-full font-medium transition-all hover:text-themeSubheading card-3d flex items-center gap-2"
            >
              <Download size={18} />
              Download CV
            </motion.button>

            {/* Social Icons */}
            <div className="flex items-center gap-2 ml-2">
              {[
                { icon: Github, href: "https://github.com" },
                { icon: Linkedin, href: "https://linkedin.com" },
                { icon: Twitter, href: "https://twitter.com" },
              ].map((social, i) => (
                <motion.a
                  key={i}
                  whileHover={{ scale: 1.15, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-full glass-panel border border-[var(--border-color)] text-[var(--text-primary)]/60 hover:text-themeButton hover:border-themeButton/30 transition-all"
                >
                  <social.icon size={18} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* ================= CONTACT INFO ================= */}
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{
              height: visible ? "auto" : 0,
              opacity: visible ? 1 : 0,
            }}
            className="overflow-hidden"
          >
            <div className="p-6 rounded-xl glass-panel border border-[var(--text-primary)]/10 space-y-2">
              <p className="text-[var(--text-primary)] font-medium leading-loose flex items-center gap-2">
                <span className="text-themeButton">📧</span> {personalInfo.email}
              </p>
              <p className="text-[var(--text-primary)] font-medium leading-loose flex items-center gap-2">
                <span className="text-themeButton">📱</span> {personalInfo.phone}
              </p>
              <p className="text-[var(--text-primary)] font-medium leading-loose flex items-center gap-2">
                <span className="text-themeButton">📍</span> {personalInfo.location}
              </p>
            </div>
          </motion.div>
        </motion.div>

        {/* ================= PROFILE SECTION ================= */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex-1 flex justify-center w-full"
        >
          <div className="relative perspective-container profile-3d-wrap">

            <div className="absolute inset-0 bg-gradient-to-tr from-themeButton via-themeAccent to-themeSubheading rounded-full blur-3xl opacity-30 dark:opacity-50 animate-pulse"></div>

            {/* Floating Tech Icons */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute -top-4 -right-4 z-20 p-3 rounded-xl bg-themeButton/10 border border-themeButton/20 backdrop-blur-sm"
            >
              <Cpu size={24} className="text-themeButton" />
            </motion.div>

            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 4, repeat: Infinity, delay: 1 }}
              className="absolute -bottom-4 -left-4 z-20 p-3 rounded-xl bg-blue-500/10 border border-blue-500/20 backdrop-blur-sm"
            >
              <Zap size={24} className="text-blue-400" />
            </motion.div>

            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3.5, repeat: Infinity, delay: 0.5 }}
              className="absolute top-1/2 -right-6 z-20 p-2 rounded-xl bg-purple-500/10 border border-purple-500/20 backdrop-blur-sm"
            >
              <Terminal size={20} className="text-purple-400" />
            </motion.div>

            <img
              src={person}
              alt="Profile"
              className="relative z-10 w-[280px] h-[380px] md:w-[350px] md:h-[480px] object-cover rounded-[2rem] shadow-2xl grayscale hover:grayscale-0 transition-all duration-700 ease-in-out border-4 border-white/80 dark:border-indigo-500/30 card-3d"
            />

            {/* Name Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="absolute -bottom-8 -left-8 glass-panel p-6 rounded-2xl z-20 card-3d backdrop-blur-xl bg-[var(--card-bg)]/80 border border-[var(--border-color)]"
            >
              <h1 className="text-2xl font-bold text-[var(--text-primary)]">
                {personalInfo.name}
              </h1>
              <h3 className="text-themeSubheading font-medium tracking-wide uppercase text-sm mt-1">
                {personalInfo.title}
              </h3>
              {/* Status indicator */}
              <div className="flex items-center gap-2 mt-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400" />
                </span>
                <span className="text-[10px] font-mono text-green-400">ACTIVE</span>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* ================= ABOUT SECTION ================= */}
      <motion.div
        id="about"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="flex flex-col md:flex-row items-center gap-12 glass-panel rounded-[3rem] p-8 md:p-16 card-3d border border-[var(--border-color)]"
      >
        {/* IMAGE */}
        <div className="w-full md:w-1/3 flex justify-center">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-tr from-themeButton to-themeAccent rounded-full blur-2xl opacity-20 animate-pulse" />
            <img
              src={person1}
              alt="Profile"
              className="relative w-48 h-48 md:w-64 md:h-64 object-cover rounded-full shadow-lg border-4 border-white dark:border-[#1f1f1f] grayscale hover:grayscale-0 transition-all duration-500"
            />
          </div>
        </div>

        {/* ABOUT CONTENT */}
        <div className="w-full md:w-2/3 space-y-6 text-center md:text-left">
          <motion.h2
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="text-3xl md:text-4xl font-bold text-themeSubheading"
          >
            About Me
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-lg text-[var(--text-primary)] leading-relaxed indent-8"
          >
            {objective}
          </motion.p>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="grid grid-cols-3 gap-4 pt-4 max-w-md mx-auto md:mx-0"
          >
            <div className="text-center p-3 rounded-xl bg-[var(--text-primary)]/5">
              <div className="text-2xl font-bold text-themeButton">{projectCount}+</div>
              <div className="text-xs text-[var(--text-primary)]/40 font-mono">PROJECTS</div>
            </div>
            {/* <div className="text-center p-3 rounded-xl bg-[var(--text-primary)]/5">
              <div className="text-2xl font-bold text-themeButton">3+</div>
              <div className="text-xs text-[var(--text-primary)]/40 font-mono">YEARS</div>
            </div> */}
            <div className="text-center p-3 rounded-xl bg-[var(--text-primary)]/5">
              <div className="text-2xl font-bold text-themeButton">1+</div>
              <div className="text-xs text-[var(--text-primary)]/40 font-mono">YEAR</div>
            </div>
            {/* <div className="text-center p-3 rounded-xl bg-[var(--text-primary)]/5">
              <div className="text-2xl font-bold text-themeButton">10+</div>
              <div className="text-xs text-[var(--text-primary)]/40 font-mono">CLIENTS</div>
            </div> */}
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}