// src/context/ExperienceContext.js
import { createContext, useState, useContext, useEffect } from "react";
import { db } from "../firebase";
import { ref, get } from "firebase/database";

export const ExperienceContext = createContext();

export function ExperienceProvider({ children }) {
  const [workExperience, setWorkExperience] = useState([]);
  const [education, setEducation] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchExperience = async () => {
      try {
        setLoading(true);
        const dbRef = ref(db, "/");
        const snap = await get(dbRef);

        if (snap.exists()) {
          const data = snap.val();
          if (data.workExperience) {
            const workData = Array.isArray(data.workExperience) 
              ? data.workExperience 
              : Object.values(data.workExperience);
            setWorkExperience(workData);
          }
          if (data.education) {
            const eduData = Array.isArray(data.education) 
              ? data.education 
              : Object.values(data.education);
            setEducation(eduData);
          }
          setError(null);
        }
      } catch (err) {
        console.error("Firebase fetch error:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchExperience();
  }, []);

  return (
    <ExperienceContext.Provider value={{ workExperience, education, loading, error }}>
      {children}
    </ExperienceContext.Provider>
  );
}

export const useExperience = () => {
  const context = useContext(ExperienceContext);
  if (!context) {
    throw new Error("useExperience must be used within a ExperienceProvider");
  }
  return context;
};