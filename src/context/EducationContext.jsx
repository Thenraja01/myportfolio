// src/context/EducationContext.jsx
import { createContext, useState, useContext, useEffect, useMemo } from "react";
import { db } from "../firebase";
import { ref, get } from "firebase/database";

// ✅ Export the context
export const EducationContext = createContext();

export function EducationProvider({ children }) {
  const [education, setEducation] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEducation = async () => {
      try {
        setLoading(true);
        const dbRef = ref(db, "/");
        const snap = await get(dbRef);

        if (snap.exists()) {
          const data = snap.val();
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

    fetchEducation();
  }, []);

  const sortedEducation = useMemo(() => {
    return [...education].sort((a, b) => {
      const yearA = parseInt(a.year) || 0;
      const yearB = parseInt(b.year) || 0;
      return yearB - yearA;
    });
  }, [education]);

  const highestEducation = useMemo(() => {
    if (sortedEducation.length === 0) return null;
    return sortedEducation[0];
  }, [sortedEducation]);

  const getEducationByType = (type) => {
    return education.filter(edu => 
      edu.type?.toLowerCase() === type.toLowerCase()
    );
  };

  const educationCount = useMemo(() => education.length, [education]);

  return (
    <EducationContext.Provider value={{ 
      education,
      sortedEducation,
      highestEducation,
      educationCount,
      getEducationByType,
      loading, 
      error
    }}>
      {children}
    </EducationContext.Provider>
  );
}

export const useEducation = () => {
  const context = useContext(EducationContext);
  if (!context) {
    throw new Error("useEducation must be used within a EducationProvider");
  }
  return context;
};