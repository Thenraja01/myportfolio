// src/context/SkillsContext.js
import { createContext, useState, useContext, useEffect, useMemo } from "react";
import { db } from "../firebase";
import { ref, get } from "firebase/database";

export const SkillsContext = createContext();

export function SkillsProvider({ children }) {
  const [technicalSkills, setTechnicalSkills] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        setLoading(true);
        const dbRef = ref(db, "/");
        const snap = await get(dbRef);

        if (snap.exists()) {
          const data = snap.val();
          if (data.technicalSkills) setTechnicalSkills(data.technicalSkills);
          setError(null);
        }
      } catch (err) {
        console.error("Firebase fetch error:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSkills();
  }, []);

  const skillCategories = useMemo(() => Object.keys(technicalSkills), [technicalSkills]);
  const allSkills = useMemo(() => {
    const skills = [];
    Object.values(technicalSkills).forEach(category => {
      if (Array.isArray(category)) {
        skills.push(...category);
      } else if (typeof category === 'object') {
        skills.push(...Object.values(category));
      }
    });
    return skills;
  }, [technicalSkills]);

  return (
    <SkillsContext.Provider value={{ 
      technicalSkills, 
      skillCategories, 
      allSkills, 
      loading, 
      error 
    }}>
      {children}
    </SkillsContext.Provider>
  );
}

export const useSkills = () => {
  const context = useContext(SkillsContext);
  if (!context) {
    throw new Error("useSkills must be used within a SkillsProvider");
  }
  return context;
};