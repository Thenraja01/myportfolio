import { createContext, useState, useEffect } from "react";
import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
// Keeping static imports as fallbacks for now
import { user as staticUser, project as staticProject, skills as staticSkills } from "../../public/sourse/data";
import { educationData as staticEducation } from "../../public/sourse/educationdata";

export const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("light");
  const [personalInfo, setPersonalInfo] = useState({
    name: staticUser.data.username,
    title: staticUser.data.joblevel,
    email: "thenraja01@gmail.com",
    phone: "7418869396",
    location: "Madurai, India"
  });
  const [objective, setObjective] = useState(staticUser.info.jobdesc);
  const [workExperience, setWorkExperience] = useState([
    {
      role: "Full Stack Developer Intern",
      company: "Techspark",
      duration: "Sep 2024 – Nov 2025",
      location: "Madurai, India",
      responsibilities: [
        "Developed and maintained full-stack web features using React.js, Node.js, Express.js, and MongoDB.",
        "Built reusable UI components with Tailwind CSS and shadcn/ui."
      ]
    }
  ]);
  const [technicalSkills, setTechnicalSkills] = useState({
    frontendDevelopment: ["React.js", "HTML5", "CSS3", "JavaScript", "Tailwind CSS"],
    backendAndDatabases: ["Node.js", "Express.js", "Python", "Fast API", "MongoDB", "Firebase"],
    programmingAndCSConcepts: ["Python", "Core Java", "JavaScript", "DSA", "OOP"],
    devOpsAndTools: ["Git", "GitHub", "Docker", "Postman", "VS Code"],
    aiToolsAndEmergingTech: ["AI/ML Fundamentals", "OpenAI API", "Google AI"]
  });
  const [projects, setProjects] = useState(staticProject.map(p => ({
    name: p.name,
    description: p.projectdesc,
    technologies: p.usedSkills,
    status: p.status,
    githubLink: p.githubLink,
    liveLink: p.liveLink
  })));
  const [education, setEducation] = useState(staticEducation.map(e => ({
    duration: e.year,
    degree: e.degree,
    institution: e.institution,
    percentage: e.gpa
  })));
  const [certifications, setCertifications] = useState([
    "React JS Developer — Networkz Systems",
    "Introduction to Node.js — The Linux Foundation",
    "Node.js Integration with MongoDB — MongoDB Foundation"
  ]);
  const [loading, setLoading] = useState(true);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const docRef = doc(db, "portfolio", "data");
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          if (data.personalInfo) setPersonalInfo(data.personalInfo);
          if (data.objective) setObjective(data.objective);
          if (data.workExperience) setWorkExperience(data.workExperience);
          if (data.technicalSkills) setTechnicalSkills(data.technicalSkills);
          if (data.projects) setProjects(data.projects);
          if (data.education) setEducation(data.education);
          if (data.certifications) setCertifications(data.certifications);
        } else {
          console.log("No such document in Firebase! Using static fallbacks.");
        }
      } catch (error) {
        console.error("Error fetching data from Firebase:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const color = theme === "dark" ? "white" : "black";

  return (
    <ThemeContext.Provider value={{ 
      theme, color, toggleTheme, loading,
      personalInfo, objective, workExperience, technicalSkills, projects, education, certifications 
    }}>
      {children}
    </ThemeContext.Provider>
  );
}
