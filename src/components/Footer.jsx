import { useCertifications, useProjects } from "@/context";
import { ThemeContext } from "../context/ThemeContext";
import { useUser } from "@/context/UserContext";
import { motion } from "framer-motion";
import { Github, Linkedin, Twitter, Mail, Heart, Code, Award, Briefcase } from "lucide-react";

export default function Footer() {
  const { personalInfo } = useUser();
  const { projectCount } = useProjects()
  const { certCount } = useCertifications()

  const socialLinks = [
    { icon: Github, href: "https://github.com/yourusername", label: "GitHub" },
    { icon: Linkedin, href: "https://linkedin.com/in/yourusername", label: "LinkedIn" },
    { icon: Twitter, href: "https://twitter.com/yourusername", label: "Twitter" },
    { icon: Mail, href: "mailto:your@email.com", label: "Email" },
  ];

  return (
    <footer className="relative w-full mt-32 overflow-hidden">
      {/* Animated Gradient Border */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-themeButton to-transparent animate-pulse" />

      {/* Background Glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-themeButton/5 to-transparent" />

      {/* Animated Background Orbs */}
      <div className="absolute -top-20 -left-20 w-64 h-64 bg-themeButton/5 rounded-full blur-3xl animate-pulse-slow" />
      <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-themeButton/5 rounded-full blur-3xl animate-pulse-slow animation-delay-1000" />

      <div className="relative max-w-7xl mx-auto px-6 py-12 z-10">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">

          {/* Left: Brand & Signature */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-4 text-center md:text-left"
          >
            {/* Signature Style Name */}
            <div className="relative inline-block">
              <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-themeButton via-purple-400 to-pink-400 bg-clip-text text-transparent">
                {personalInfo.name}
              </h2>
              {/* Signature Underline */}
              <motion.div
                className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-themeButton to-purple-400"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                transition={{ delay: 0.3, duration: 0.8 }}
              />
            </div>

            <p className="text-[var(--text-default)]/80 font-medium text-sm">
              {personalInfo.title}
            </p>

            {/* Signature Line */}
            <div className="flex items-center gap-2 text-xs text-[var(--text-default)]/40 font-mono">
              <span className="text-themeButton">✦</span>
              <span>crafting digital experiences</span>
              <span className="text-themeButton">✦</span>
            </div>

            {/* Animated Status */}
            <div className="flex items-center gap-2 text-xs text-green-400/70 font-mono">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400" />
              </span>
              <span>Available for collaboration</span>
            </div>
          </motion.div>

          {/* Center: Quick Links / Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="flex flex-col items-center space-y-4"
          >
            <div className="grid grid-cols-2 gap-4 w-full max-w-xs">
              <div className="text-center p-3 rounded-xl bg-[var(--text-primary)]/5 border border-[var(--border-color)]">
                <Code size={18} className="mx-auto text-themeButton mb-1" />
                <div className="text-xs text-[var(--text-default)]/60">Projects</div>
                <div className="text-sm font-bold text-themeButton">{projectCount}+</div>
              </div>
              <div className="text-center p-3 rounded-xl bg-[var(--text-primary)]/5 border border-[var(--border-color)]">
                <Award size={18} className="mx-auto text-purple-400 mb-1" />
                <div className="text-xs text-[var(--text-default)]/60">Certifications</div>
                <div className="text-sm font-bold text-purple-400">{certCount}+</div>
              </div>
              <div className="text-center p-3 rounded-xl bg-[var(--text-primary)]/5 border border-[var(--border-color)] col-span-2">
                <Briefcase size={18} className="mx-auto text-blue-400 mb-1" />
                <div className="text-xs text-[var(--text-default)]/60">Experience</div>
                <div className="text-sm font-bold text-blue-400">3+ Years</div>
              </div>
            </div>
          </motion.div>

          {/* Right: Social & Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex flex-col items-center md:items-end space-y-4"
          >
            {/* Social Icons */}
            <div className="flex gap-3">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  whileHover={{ y: -4, scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-2.5 rounded-xl bg-[var(--text-primary)]/5 border border-[var(--border-color)] text-[var(--text-default)]/50 hover:text-themeButton hover:border-themeButton/30 transition-all duration-300 group"
                >
                  <social.icon size={18} className="group-hover:scale-110 transition-transform" />
                </motion.a>
              ))}
            </div>

            {/* Contact Info */}
            <div className="text-right space-y-1">
              {personalInfo.email && (
                <p className="text-sm text-[var(--text-default)]/60 hover:text-themeButton transition-colors">
                  <a href={`mailto:${personalInfo.email}`}>{personalInfo.email}</a>
                </p>
              )}
              {personalInfo.location && (
                <p className="text-xs text-[var(--text-default)]/40">
                  📍 {personalInfo.location}
                </p>
              )}
            </div>
          </motion.div>
        </div>

        {/* Divider with Animation */}
        <motion.div
          className="my-8 h-px bg-gradient-to-r from-transparent via-[var(--border-color)] to-transparent"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        />

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[var(--text-default)]/40">
          <div className="flex items-center gap-2">
            <span>
              &copy; {new Date().getFullYear()} {personalInfo.name}
            </span>
            <span className="text-[var(--border-color)]">|</span>
            <span className="flex items-center gap-1">
              Built with <Heart size={12} className="text-red-400 fill-red-400 animate-pulse" /> using React
            </span>
          </div>

          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-themeButton transition-colors">Privacy</a>
            <a href="#" className="hover:text-themeButton transition-colors">Terms</a>
            <a href="#home" className="hover:text-themeButton transition-colors">Back to Top ↑</a>
          </div>
        </div>
      </div>
    </footer>
  );
}