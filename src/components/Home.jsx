import { useContext, useState } from "react";
import { ThemeContext } from "../dataprovider/ThemeContext";
import { motion } from "framer-motion";
import { Download, Mail } from "lucide-react";
import axios from "axios";
import person from "./icon/user1.jpg";
import person1 from "./icon/user3.jpg";

export default function Home() {
  const { user } = useContext(ThemeContext);
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
      link.setAttribute("download", "Thenraja_M_Resume.pdf");
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
      <div className="min-h-[80vh] flex flex-col md:flex-row items-center justify-between gap-12 mt-12">
        <motion.div
           initial={{ opacity: 0, x: -50 }}
           animate={{ opacity: 1, x: 0 }}
           transition={{ duration: 0.8 }}
           className="flex-1 space-y-8"
        >
          <div className="space-y-4">
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-[var(--text-primary)]">
              Welcome to <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-themeButton to-themeSubheading">
                My Portfolio
              </span>
            </h1>
            <p className="text-lg text-[var(--text-primary)]/80 max-w-2xl leading-relaxed">
              {user.info.jobdesc}
            </p>
          </div>

          <div className="flex items-center gap-4">
             <button
               onClick={toggleVisibility}
               className="px-8 py-3 bg-themeButton hover:bg-opacity-90 text-white rounded-full font-medium transition-all transform hover:scale-105 shadow-lg shadow-themeButton/30 flex items-center gap-2"
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
             <div className="p-4 rounded-xl bg-[var(--text-primary)]/5 border border-[var(--text-primary)]/10">
               {user.info.contact.map((conts, idx) => (
                 <p key={idx} className="text-[var(--text-primary)] font-medium leading-loose">
                   {conts}
                 </p>
               ))}
             </div>
          </motion.div>
        </motion.div>

        <motion.div
           initial={{ opacity: 0, scale: 0.8 }}
           animate={{ opacity: 1, scale: 1 }}
           transition={{ duration: 0.8, delay: 0.2 }}
           className="flex-1 flex justify-center w-full"
        >
          <div className="relative">
             <div className="absolute inset-0 bg-gradient-to-tr from-themeButton to-themeSubheading rounded-full blur-3xl opacity-20 dark:opacity-40 animate-pulse"></div>
             <img 
               src={person} 
               alt="Profile" 
               className="relative z-10 w-[280px] h-[380px] md:w-[350px] md:h-[480px] object-cover rounded-[2rem] shadow-2xl grayscale hover:grayscale-0 transition-all duration-700 ease-in-out border-4 border-white dark:border-[#1f1f1f]" 
             />
             <div className="absolute -bottom-8 -left-8 bg-white dark:bg-[#1a1a1a] p-6 rounded-2xl shadow-xl border border-gray-100 dark:border-white/10 z-20">
               <h1 className="text-2xl font-bold text-[var(--text-primary)]">{user.data.username}</h1>
               <h3 className="text-themeSubheading font-medium tracking-wide uppercase text-sm mt-1">{user.data.joblevel}</h3>
             </div>
          </div>
        </motion.div>
      </div>

      <motion.div 
         id="about"
         initial={{ opacity: 0, y: 50 }}
         whileInView={{ opacity: 1, y: 0 }}
         viewport={{ once: true, margin: "-100px" }}
         transition={{ duration: 0.6 }}
         className="flex flex-col md:flex-row items-center gap-12 bg-[var(--text-primary)]/5 rounded-[3rem] p-8 md:p-16 border border-[var(--text-primary)]/5"
      >
        <div className="w-full md:w-1/3 flex justify-center">
            <img 
               src={person1} 
               alt="Profile" 
               className="w-48 h-48 md:w-64 md:h-64 object-cover rounded-full shadow-lg border-4 border-white dark:border-[#1f1f1f] grayscale hover:grayscale-0 transition-all duration-500"
             />
        </div>
        <div className="w-full md:w-2/3 space-y-6 text-center md:text-left">
           <h2 className="text-3xl md:text-4xl font-bold text-themeSubheading">About Me</h2>
           <p className="text-lg text-[var(--text-primary)] leading-relaxed indent-8">
             {user.data.personalInfo}
           </p>
        </div>
      </motion.div>
    </section>
  );
}
