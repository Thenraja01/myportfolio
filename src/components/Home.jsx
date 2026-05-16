import { useContext, useState } from "react";
import { ThemeContext } from "../dataprovider/ThemeContext";
import { motion } from "framer-motion";
import { Download, Mail } from "lucide-react";
import axios from "axios";

import person from "./icon/user1.jpg";
import person1 from "./icon/user3.jpg";
import { LampContainer } from "./ui/lamp";
import TiltedCard from "./ui/TiltedCard";

export default function Home() {
  const { personalInfo, objective } = useContext(ThemeContext);
  const [visible, setVisible] = useState(false);

  const toggleVisibility = () => setVisible(!visible);

  const handleDownload = async () => {
    try {
      const response = await axios.get("/Then_Raja_Resume.docx", {
        responseType: "blob",
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "Then_Raja_Resume.docx");
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Download failed:", error);
    }
  };

  // Overlay Content for TiltedCard
  const NameOverlay = (
    <div className="absolute min-w-full hover:bg-blend-hue/90 bg-black/70 backdrop-blur-xl px-6 py-5 rounded-2xl border border-white/10 shadow-2xl flex flex-col">
      <h1 className="text-2xl  font-bold text-white">{personalInfo.name}</h1>
      <h3 className="text-themeSubheading font-medium tracking-wide uppercase text-sm mt-1">
        {personalInfo.title}
      </h3>
    </div>
  );

  return (
    <section id="home" className="flex flex-col gap-32">
      {/* ==================== HERO SECTION ==================== */}
      <div className="min-h-[80vh] flex flex-col md:flex-row items-center justify-between gap-12 mt-12 px-6">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="flex-1 space-y-8"
        >
          <div className="space-y-4">
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-[var(--text-primary)]">
              Welcome to <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-themeButton to-themeSubheading">
                My Portfolio
              </span>
            </h1>
            <p className="text-lg text-[var(--text-primary)]/80 max-w-2xl leading-relaxed">
              {objective}
            </p>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={toggleVisibility}
              className="px-8 py-3 bg-themeButton hover:bg-opacity-90 text-[var(--text-button)] rounded-full font-medium transition-all transform hover:scale-105 shadow-lg shadow-themeButton/30 flex items-center gap-2"
            >
              <Mail size={18} /> Contact Me
            </button>
            <button
              onClick={handleDownload}
              className="px-8 py-3 border border-[var(--text-primary)]/20 hover:border-themeSubheading text-[var(--text-primary)] rounded-full font-medium transition-all hover:text-themeSubheading flex items-center gap-2"
            >
              <Download size={18} /> Download CV
            </button>
          </div>

          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: visible ? "auto" : 0, opacity: visible ? 1 : 0 }}
            className="overflow-hidden"
          >
            <div className="p-5 rounded-xl bg-[var(--text-primary)]/5 border border-[var(--text-primary)]/10">
              <p className="text-[var(--text-primary)] font-medium">
                Email: {personalInfo.email}
              </p>
              <p className="text-[var(--text-primary)] font-medium">
                Phone: {personalInfo.phone}
              </p>
              <p className="text-[var(--text-primary)] font-medium">
                Location: {personalInfo.location}
              </p>
            </div>
          </motion.div>
        </motion.div>

        {/* ==================== Tilted Profile Card with Overlay ==================== */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex-1 flex justify-center"
        >
          <div className="relative">
            <TiltedCard
              imageSrc={person}
              altText="Then Raja Profile"
              containerHeight="480px"
              containerWidth="320px"
              imageHeight="340px"
              imageWidth="300px"
              rotateAmplitude={13}
              scaleOnHover={1.06}
              captionText={personalInfo.name}
              showMobileWarning={true}
              showTooltip={true}
              displayOverlayContent={true}
              overlayContent={NameOverlay}
            />
          </div>
        </motion.div>
      </div>

      {/* ==================== ABOUT SECTION with Lamp ==================== */}
      <LampContainer className="min-h-[70vh] rounded-3xl">
        <motion.div
          id="about"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative z-10 flex flex-col md:flex-row items-center gap-12 max-w-6xl mx-auto px-6 py-12"
        >
          <div className="w-full md:w-1/3 flex justify-center">
            <img
              src={person1}
              alt="About Me"
              className="w-56 h-56 md:w-72 md:h-72 object-cover rounded-full shadow-2xl border-4 border-white/10  transition-all duration-700"
            />
          </div>

          <div className="w-full md:w-2/3 space-y-6 text-center md:text-left">
            <h2 className="text-2xl md:text-5xl font-bold text-chart-1/30 tracking-tight">
              About Me
            </h2>
            <p className="text-md text-slate-200 leading-relaxed max-w-2xl">
              {objective}
            </p>
          </div>
        </motion.div>
      </LampContainer>
    </section>
  );
}
