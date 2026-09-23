const GITHUB_API = "https://api.github.com";

function githubHeaders() {
  const headers = {
    Accept: "application/vnd.github+json",
    "User-Agent": "NextJS-Portfolio-App",
    "X-GitHub-Api-Version": "2022-11-28",
  };

  if (process.env.GITHUB_TOKEN) {
    headers["Authorization"] = `Bearer ${process.env.GITHUB_TOKEN}`;
  }

  return headers;
}

export function parseGitHubUrl(url) {
  if (!url || typeof url !== "string") return null;
  try {
    const cleanUrl = url.trim().replace(/\/$/, "");
    const match = cleanUrl.match(/github\.com\/([^/]+)\/([^/]+)/i);
    if (match) {
      return { owner: match[1], repo: match[2].replace(/\.git$/i, "") };
    }
  } catch (err) {
    console.error("Error parsing GitHub URL:", err);
  }
  return null;
}

export async function getRepositories(username = process.env.GITHUB_USERNAME || "Thenraja01", options = {}) {
  const { perPage = 100, sort = "updated", includeForks = false, includePrivate = false } = options;
  const params = new URLSearchParams({
    per_page: perPage,
    sort,
    type: "owner",
    ...(includeForks ? {} : { fork: "false" }),
    ...(includePrivate ? {} : { type: "owner" }),
  });

  try {
    const response = await fetch(
      `${GITHUB_API}/users/${username}/repos?${params}`,
      { headers: githubHeaders(), next: { revalidate: 60 } }
    );
    if (!response.ok) {
      if (response.status === 403 || response.status === 429) {
        console.warn("GitHub API rate limit exceeded in getRepositories");
      }
      throw new Error(`GitHub API failed: ${response.status}`);
    }
    const data = await response.json();
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error("Failed to fetch repositories:", error.message || error);
    return [];
  }
}

export async function getRepository(owner = process.env.GITHUB_USERNAME || "Thenraja01", repo) {
  if (!repo) return null;
  try {
    const response = await fetch(
      `${GITHUB_API}/repos/${owner}/${repo}`,
      { headers: githubHeaders(), next: { revalidate: 60 } }
    );
    if (!response.ok) {
      throw new Error(`Repo fetch failed: ${response.status}`);
    }
    return response.json();
  } catch (error) {
    console.error(`Failed to fetch repo ${owner}/${repo}:`, error.message || error);
    return null;
  }
}

export async function getRepositoryReadme(owner, repo) {
  if (!owner || !repo) return null;

  const headers = githubHeaders();

  try {
    const readmeRes = await fetch(
      `${GITHUB_API}/repos/${owner}/${repo}/readme`,
      { headers, next: { revalidate: 1800 } }
    );

    if (!readmeRes.ok) {
      return {
        error: true,
        status: readmeRes.status,
        message:
          readmeRes.status === 404
            ? "README.md not found in this repository."
            : readmeRes.status === 403
            ? "GitHub API rate limit exceeded."
            : "Unable to load README from GitHub.",
      };
    }

    const readmeData = await readmeRes.json();

    let defaultBranch = "main";
    try {
      const repoRes = await fetch(
        `${GITHUB_API}/repos/${owner}/${repo}`,
        { headers, next: { revalidate: 3600 } }
      );
      if (repoRes.ok) {
        const repoData = await repoRes.json();
        if (repoData.default_branch) defaultBranch = repoData.default_branch;
      }
    } catch (err) {
      console.warn("Failed to fetch default branch:", err?.message);
    }

    let rawContent = "";
    if (readmeData.content) {
      rawContent = Buffer.from(readmeData.content.replace(/\s/g, ""), "base64").toString("utf-8");
    }

    return {
      success: true,
      owner, repo, defaultBranch,
      content: rawContent,
      htmlUrl: readmeData.html_url || `https://github.com/${owner}/${repo}`,
    };
  } catch (error) {
    console.error(`Exception fetching README for ${owner}/${repo}:`, error);
    return { error: true, message: "Network error loading project documentation." };
  }
}

export async function getRepositoryLanguages(owner, repo) {
  try {
    const response = await fetch(
      `${GITHUB_API}/repos/${owner}/${repo}/languages`,
      { headers: githubHeaders(), cache: "no-store" }
    );
    if (!response.ok) return {};
    return response.json();
  } catch {
    return {};
  }
}
