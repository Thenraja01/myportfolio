import { createContext, useState, useEffect } from "react";
import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore/lite";

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
          setError(null);
        } else {
          setError("Database document 'portfolio/data' not found. Please check your Firebase setup.");
        }
      } catch (err) {
        console.error("Firebase fetch error:", err);
        setError(`Firebase Connection Error: ${err.message}. Please ensure the Firestore API is enabled in your Google Cloud Console.`);
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
