import { ref, get, update, set } from "firebase/database";
import { getDb } from "@/lib/firebase/admin";
import { getRepositories, getRepository } from "./client";
import { createProjectFromGithub, mergeGithubIntoProject } from "./mapper";

export async function syncGithubProjects(options = {}) {
  const {
    username = process.env.GITHUB_USERNAME,
    includeForks = false,
    includePrivate = false,
    autoCreate = true,
  } = options;

  if (!username) throw new Error("GITHUB_USERNAME is not set");

  const db = getDb();
  if (!db) throw new Error("Firebase Admin not initialized");

  const repositories = await getRepositories(username, {
    includeForks,
    includePrivate,
  });

  const projectsRef = ref(db, "projects");
  const snapshot = await get(projectsRef);
  const existingProjects = snapshot.exists() ? snapshot.val() : {};

  const now = Date.now();
  const updates = {};
  let created = 0;
  let updated = 0;
  const results = [];

  for (const repo of repositories) {
    if (!includeForks && repo.fork) continue;
    if (!includePrivate && repo.private) continue;
    if (repo.archived) {
      const projectId = repo.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
      if (existingProjects[projectId]) {
        updates[`projects/${projectId}/sync/archived`] = true;
        updates[`projects/${projectId}/sync/lastStatus`] = "repository_archived";
        results.push({ repo: repo.name, status: "archived" });
      }
      continue;
    }

    const projectId = repo.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");

    const existing = existingProjects[projectId];

    if (!existing) {
      if (!autoCreate) {
        results.push({ repo: repo.name, status: "skipped" });
        continue;
      }
      const project = createProjectFromGithub(repo, now);
      updates[`projects/${projectId}`] = project;
      created++;
      results.push({ repo: repo.name, status: "created", projectId });
    } else {
      if (existing.sync?.autoUpdate === false) {
        results.push({ repo: repo.name, status: "skipped_manual" });
        continue;
      }
      const merged = mergeGithubIntoProject(existing, repo, now);
      updates[`projects/${projectId}`] = merged;
      updated++;
      results.push({ repo: repo.name, status: "updated", projectId });
    }
  }

  if (Object.keys(updates).length > 0) {
    await update(ref(db), updates);
  }

  await set(ref(db, "github/sync"), {
    lastSyncAt: now,
    status: "success",
    created,
    updated,
    repositoryCount: repositories.length,
    username,
  });

  await set(ref(db, "github/config"), {
    githubUsername: username,
    autoSync: true,
    includeForks,
    includePrivate,
    autoCreateProjects: autoCreate,
    lastSyncAt: now,
  });

  return { success: true, created, updated, repositoryCount: repositories.length, results };
}

export async function getSyncStatus() {
  const db = getDb();
  if (!db) return null;
  try {
    const snapshot = await get(ref(db, "github/sync"));
    return snapshot.exists() ? snapshot.val() : null;
  } catch {
    return null;
  }
}

export async function getRepositoriesWithSyncStatus() {
  const db = getDb();
  if (!db) return null;
  try {
    const repos = await getRepositories(process.env.GITHUB_USERNAME);
    const projectsSnapshot = await get(ref(db, "projects"));
    const existingProjects = projectsSnapshot.exists() ? projectsSnapshot.val() : {};

    return repos.map((repo) => {
      const projectId = repo.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
      const existing = existingProjects[projectId];
      return {
        ...repo,
        projectId,
        inPortfolio: !!existing,
        syncStatus: existing?.sync?.lastStatus || (existing ? "synced" : "new"),
        portfolio: existing?.portfolio || null,
      };
    });
  } catch (err) {
    console.error("Failed to get repos with sync status:", err);
    return null;
  }
}
