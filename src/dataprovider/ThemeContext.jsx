import { createContext, useState, useEffect } from "react";
import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
// Keeping static imports as fallbacks for now
import { user as staticUser, project as staticProject, skills as staticSkills } from "../../public/sourse/data";
import { educationData as staticEducation } from "../../public/sourse/educationdata";

export const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("light");
  const [user, setUser] = useState(staticUser);
  const [project, setProject] = useState(staticProject);
  const [skills, setSkills] = useState(staticSkills);
  const [educationData, setEducationData] = useState(staticEducation);
  const [loading, setLoading] = useState(true);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  useEffect(() => {
    // Tailwind darkMode toggling
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
          if (data.user) setUser(data.user);
          if (data.project) setProject(data.project);
          if (data.skills) setSkills(data.skills);
          if (data.educationData) setEducationData(data.educationData);
        } else {
          console.log("No such document in Firebase! Using static data.");
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
  const Value = { skills, educationData };

  return (
    <ThemeContext.Provider value={{ theme, color, toggleTheme, user, project, Value, loading }}>
      {children}
    </ThemeContext.Provider>
  );
}
