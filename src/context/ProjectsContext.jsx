// src/context/ProjectsContext.js
import { createContext, useState, useContext, useEffect, useMemo } from "react";
import { db } from "../firebase";
import { ref, get } from "firebase/database";

export const ProjectsContext = createContext();

export function ProjectsProvider({ children }) {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const dbRef = ref(db, "/");
        const snap = await get(dbRef);

        if (snap.exists()) {
          const data = snap.val();
          if (data.projects) {
            // Handle both array and object formats
            const projectsData = Array.isArray(data.projects) 
              ? data.projects 
              : Object.values(data.projects);
            setProjects(projectsData);
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

    fetchProjects();
  }, []);

  const projectCount = useMemo(() => projects.length, [projects]);

  return (
    <ProjectsContext.Provider value={{ projects, projectCount, loading, error }}>
      {children}
    </ProjectsContext.Provider>
  );
}

export const useProjects = () => {
  const context = useContext(ProjectsContext);
  if (!context) {
    throw new Error("useProjects must be used within a ProjectsProvider");
  }
  return context;
};