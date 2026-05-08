import { createContext, useState, useEffect } from "react";
import { db } from "../firebase";
import { ref, get } from "firebase/database";

export const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("light");
  const [personalInfo, setPersonalInfo] = useState({});
  const [objective, setObjective] = useState("");
  const [workExperience, setWorkExperience] = useState([]);
  const [technicalSkills, setTechnicalSkills] = useState({});
  const [projects, setProjects] = useState([]);
  const [education, setEducation] = useState([]);
  const [certifications, setCertifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
        setLoading(true);
        const dbRef = ref(db, "/");
        const snap = await get(dbRef);

        if (snap.exists()) {
          const data = snap.val();
          if (data.personalInfo) setPersonalInfo(data.personalInfo);
          if (data.objective) setObjective(data.objective);
          if (data.workExperience) setWorkExperience(data.workExperience);
          if (data.technicalSkills) setTechnicalSkills(data.technicalSkills);
          if (data.projects) setProjects(data.projects);
          if (data.education) setEducation(data.education);
          if (data.certifications) setCertifications(data.certifications);
          
          // Also set theme if available in the database
          if (data.themes && data.themes.default) {
            // You can use data.themes.default.primary here if needed
          }
          
          setError(null);
        } else {
          setError("Data at root path '/' not found. Please check your Realtime Database setup.");
        }
      } catch (err) {
        console.error("Firebase fetch error:", err);
        setError(`Firebase Connection Error: ${err.message}. Please ensure your Realtime Database rules allow read access.`);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const color = theme === "dark" ? "white" : "black";

  return (
    <ThemeContext.Provider value={{ 
      theme, color, toggleTheme, loading, error,
      personalInfo, objective, workExperience, technicalSkills, projects, education, certifications 
    }}>
      {children}
    </ThemeContext.Provider>
  );
}
