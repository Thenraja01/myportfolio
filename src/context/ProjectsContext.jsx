"use client";
import { createContext, useState, useContext, useEffect, useMemo } from "react";
import { db } from "@/lib/firebase";
import { ref, get } from "firebase/database";

export const ProjectsContext = createContext();

function normalizeProject(project) {
  if (!project) return null;

  const hasPortfolio = project.portfolio && Object.keys(project.portfolio).length > 0;
  const hasGithubObject = project.github && typeof project.github === "object" && !Array.isArray(project.github);

  if (hasPortfolio || hasGithubObject) {
    const p = project.portfolio || {};
    const g = project.github || {};

    return {
      ...project,
      id: project.id || p.title?.toLowerCase().replace(/[^a-z0-9]+/g, "-") || "",
      name: p.title || project.name || "",
      description: p.customDescription || p.description || project.description || "",
      category: p.category || project.category || "Other",
      status: p.status || project.status || "Completed",
      featured: p.featured !== undefined ? p.featured : project.featured || false,
      technologies: p.technologies || project.technologies || [],
      liveDemo: p.liveDemo || project.liveDemo || "",
      github: hasGithubObject
        ? (g.url || project.github)
        : project.github,
      githubData: hasGithubObject ? g : null,
      portfolio: p,
      sync: project.sync,
    };
  }

  return { ...project };
}

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
            const projectsData = Array.isArray(data.projects)
              ? data.projects
              : Object.values(data.projects);
            const normalized = projectsData.map(normalizeProject).filter(Boolean);
            setProjects(normalized);
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
