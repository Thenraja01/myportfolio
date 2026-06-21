import { useContext, useState } from "react";
import { ThemeContext } from "../dataprovider/ThemeContext";
import { motion } from "framer-motion";
import { Download, Mail } from "lucide-react";
import axios from "axios";

import person from "./icon/user1.jpg";
import person1 from "./icon/user3.jpg";

export default function Home() {
  const { user, objective, personalInfo } = useContext(ThemeContext);

  const [visible, setVisible] = useState(false);

  const toggleVisibility = () => {
    setVisible(!visible);
  };

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
          <div className="space-y-4">
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-[var(--text-primary)] section-title-3d">
              Welcome to <br />
              <span className="text-gradient-3d">
                My Portfolio
              </span>
            </h1>

            <p className="text-lg text-[var(--text-primary)]/80 max-w-2xl leading-relaxed">
              {objective}
            </p>
          </div>

          {/* ================= BUTTONS ================= */}
          <div className="flex items-center gap-4">
            <button
              onClick={toggleVisibility}
              className="px-8 py-3 bg-themeButton hover:bg-indigo-500 text-white rounded-full font-medium btn-3d flex items-center gap-2"
            >
              <Mail size={18} />
              Contact Me
            </button>

            <button
              onClick={handleDownload}
              className="px-8 py-3 glass-panel border border-[var(--text-primary)]/20 hover:border-themeAccent text-[var(--text-primary)] rounded-full font-medium transition-all hover:text-themeSubheading card-3d flex items-center gap-2"
            >
              <Download size={18} />
              Download CV
            </button>
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
            <div className="p-4 rounded-xl glass-panel border border-[var(--text-primary)]/10">
              <p className="text-[var(--text-primary)] font-medium leading-loose">
                Email: {personalInfo.email}
              </p>

              <p className="text-[var(--text-primary)] font-medium leading-loose">
                Phone: {personalInfo.phone}
              </p>

              <p className="text-[var(--text-primary)] font-medium leading-loose">
                Location: {personalInfo.location}
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

            <img
              src={person}
              alt="Profile"
              className="relative z-10 w-[280px] h-[380px] md:w-[350px] md:h-[480px] object-cover rounded-[2rem] shadow-2xl grayscale hover:grayscale-0 transition-all duration-700 ease-in-out border-4 border-white/80 dark:border-indigo-500/30 card-3d"
            />

            <div className="absolute -bottom-8 -left-8 glass-panel p-6 rounded-2xl z-20 card-3d">
              <h1 className="text-2xl font-bold text-[var(--text-primary)]">
                {personalInfo.name}
              </h1>

              <h3 className="text-themeSubheading font-medium tracking-wide uppercase text-sm mt-1">
                {personalInfo.title}
              </h3>
            </div>
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
        className="flex flex-col md:flex-row items-center gap-12 glass-panel rounded-[3rem] p-8 md:p-16 card-3d"
      >
        {/* IMAGE */}
        <div className="w-full md:w-1/3 flex justify-center">
          <img
            src={person1}
            alt="Profile"
            className="w-48 h-48 md:w-64 md:h-64 object-cover rounded-full shadow-lg border-4 border-white dark:border-[#1f1f1f] grayscale hover:grayscale-0 transition-all duration-500"
          />
        </div>

        {/* ABOUT CONTENT */}
        <div className="w-full md:w-2/3 space-y-6 text-center md:text-left">
          <h2 className="text-3xl md:text-4xl font-bold text-themeSubheading">
            About Me
          </h2>

          <p className="text-lg text-[var(--text-primary)] leading-relaxed indent-8">
            {objective}
          </p>
        </div>
      </motion.div>
    </section>
  );
}