import { createContext, useState, useEffect } from "react";
import { user, project, skills } from "../../public/sourse/data";
import { educationData } from "../../public/sourse/educationdata";

export const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("light");

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

  // Expose colors directly if needed, or rely on tailwind classes.
  const color = theme === "dark" ? "white" : "black";
  const Value = { skills, educationData };

  return (
    <ThemeContext.Provider value={{ theme, color, toggleTheme, user, project, Value }}>
      {children}
    </ThemeContext.Provider>
  );
}
