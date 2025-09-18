import { createContext,useState} from "react";
import { useEffect } from "react";
export const ThemeContext =createContext()
export  function ThemeProvider({children}) {
    const [theme,setTheme]=useState("light")
     const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
    
  };
   useEffect(() => {
    document.body.className = theme; 
  }, [theme]);
  const color =theme==="black"?'white':'black'
  return(
    <ThemeContext.Provider value={{color,toggleTheme}}>{children}</ThemeContext.Provider>
  )
};
