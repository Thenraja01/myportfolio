import { createContext,useState} from "react";
import { useEffect } from "react";
import {user,project,skills} from '../../public/sourse/data'
import { educationData } from "../../public/sourse/educationdata";
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
  const Value={skills,educationData}
  return(
    <ThemeContext.Provider value={{color,toggleTheme,user,project,Value}}>
      {children}
      </ThemeContext.Provider>
  )
};
