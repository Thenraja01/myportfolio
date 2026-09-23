"use client";
import { createContext, useState, useContext, useEffect, useMemo } from "react";
import { db } from "@/lib/firebase";
import { ref, get } from "firebase/database";

export const ProjectsContext = createContext();

export function normalizeProject(project) {
  if (!project) return null;

  const hasPortfolio = project.portfolio && Object.keys(project.portfolio).length > 0;
  const hasGithubObject = project.github && typeof project.github === "object" && !Array.isArray(project.github);

  if (hasPortfolio || hasGithubObject) {
    const p = project.portfolio || {};
    const g = project.github || project.githubData || {};

    return {
      ...project,
      id: project.id || p.title?.toLowerCase().replace(/[^a-z0-9]+/g, "-") || "",
      name: p.title || project.name || "",
      description: p.customDescription || p.description || project.description || "",
      category: p.category || project.category || "Full Stack",
      status: p.status || project.status || "Completed",
      featured: p.featured !== undefined ? p.featured : project.featured || false,
      technologies: p.technologies || project.technologies || [],
      liveDemo: p.liveDemo || project.liveDemo || "",
      github: hasGithubObject
        ? (g.url || project.github)
        : (typeof project.github === "string" ? project.github : ""),
      githubData: hasGithubObject ? g : (project.githubData || null),
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
    let isMounted = true;

    const fetchProjects = async () => {
      try {
        setLoading(true);

        // 1. First fetch dynamic GitHub repositories from /api/projects
        try {
          const res = await fetch("/api/projects", { cache: "no-store" });
          if (res.ok) {
            const data = await res.json();
            if (data.projects && Array.isArray(data.projects) && data.projects.length > 0) {
              if (isMounted) {
                const normalized = data.projects.map(normalizeProject).filter(Boolean);
                setProjects(normalized);
                setError(null);
                setLoading(false);
                return;
              }
            }
          }
        } catch (apiErr) {
          console.warn("Direct /api/projects fetch failed, trying Firebase fallback:", apiErr);
        }

        // 2. Fallback to Firebase Realtime Database
        const dbRef = ref(db, "/");
        const snap = await get(dbRef);

        if (snap.exists()) {
          const data = snap.val();
          if (data.projects) {
            const projectsData = Array.isArray(data.projects)
              ? data.projects
              : Object.values(data.projects);
            const normalized = projectsData.map(normalizeProject).filter(Boolean);
            if (isMounted) {
              setProjects(normalized);
            }
          }
          if (isMounted) setError(null);
        }
      } catch (err) {
        console.error("Projects fetch error:", err);
        if (isMounted) setError(err.message);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchProjects();

    return () => {
      isMounted = false;
    };
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
