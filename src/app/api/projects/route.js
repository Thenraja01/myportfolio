import { NextResponse } from "next/server";
import { getRepositories } from "@/lib/github/client";
import { createProjectFromGithub, mergeGithubIntoProject } from "@/lib/github/mapper";
import { getDb } from "@/lib/firebase/admin";
import { ref, get } from "firebase-admin/database";

export const dynamic = "force-dynamic";

export async function GET() {
  const username = process.env.GITHUB_USERNAME || "Thenraja01";
  let firebaseProjects = {};

  // Try to load any custom metadata from Firebase
  try {
    const db = getDb();
    if (db) {
      const snap = await get(ref(db, "projects"));
      if (snap.exists()) {
        firebaseProjects = snap.val() || {};
      }
    }
  } catch (err) {
    console.warn("Firebase read skipped/failed in /api/projects:", err.message);
  }

  // Fetch all public GitHub repositories dynamically
  try {
    const repos = await getRepositories(username);
    const now = Date.now();

    if (repos && repos.length > 0) {
      const projectsMap = new Map();

      for (const repo of repos) {
        if (repo.fork) continue; // Skip forks if desired
        const projectId = repo.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
        const existing = firebaseProjects[projectId];

        if (existing) {
          projectsMap.set(projectId, mergeGithubIntoProject(existing, repo, now));
        } else {
          projectsMap.set(projectId, createProjectFromGithub(repo, now));
        }
      }

      // Also include any custom Firebase-only projects not on GitHub
      Object.entries(firebaseProjects).forEach(([id, proj]) => {
        if (!projectsMap.has(id) && proj) {
          projectsMap.set(id, proj);
        }
      });

      const allProjects = Array.from(projectsMap.values());
      return NextResponse.json({
        success: true,
        source: "github_dynamic",
        count: allProjects.length,
        projects: allProjects,
      });
    }
  } catch (err) {
    console.error("Error fetching GitHub repos in /api/projects:", err);
  }

  // Fallback to Firebase projects if GitHub API returns empty
  const fallbackList = Array.isArray(firebaseProjects)
    ? firebaseProjects
    : Object.values(firebaseProjects);

  return NextResponse.json({
    success: true,
    source: "firebase_fallback",
    count: fallbackList.length,
    projects: fallbackList,
  });
}
