import { useContext } from "react";
import { ThemeContext } from "../dataprovider/ThemeContext";

export default function Footer() {
  const { personalInfo } = useContext(ThemeContext);

  return (
    <footer className="w-full bg-[var(--card-bg-3)] text-white py-12 mt-32 border-t border-[var(--border-2)] relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-themeButton via-themeSubheading to-themeButton opacity-50"></div>
      
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-8 z-10 relative">
        <div className="text-center md:text-left space-y-2">
          <h2 className="text-2xl font-bold tracking-tight">
            {personalInfo.name}
          </h2>
          <p className="text-[var(--text-default)] font-medium">
            {personalInfo.title} • Building Digital Experiences
          </p>
        </div>
        
        <div className="flex flex-col items-center md:items-end space-y-2 text-[var(--text-default)] text-sm font-medium">
          <p>
            &copy; {new Date().getFullYear()} All Rights Reserved.
          </p>
          <p>
          </p>
        </div>
      </div>
    </footer>
  );
}
