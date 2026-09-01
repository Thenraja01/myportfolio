/**
 * Extract { owner, repo } from a GitHub URL string.
 * Example: "https://github.com/Thenraja01/cropwhisper" -> { owner: "Thenraja01", repo: "cropwhisper" }
 */
export function parseGitHubUrl(url) {
  if (!url || typeof url !== "string") return null;

  try {
    const cleanUrl = url.trim().replace(/\/$/, "");
    const match = cleanUrl.match(/github\.com\/([^/]+)\/([^/]+)/i);
    if (match) {
      return {
        owner: match[1],
        repo: match[2].replace(/\.git$/i, ""),
      };
    }
  } catch (err) {
    console.error("Error parsing GitHub URL:", err);
  }

  return null;
}

/**
 * Fetch GitHub repository README via REST API with Next.js server-side caching (revalidate: 30 min).
 */
export async function getRepositoryReadme(owner, repo) {
  if (!owner || !repo) return null;

  const headers = {
    Accept: "application/vnd.github.v3+json",
    "User-Agent": "NextJS-Portfolio-App",
  };

  if (process.env.GITHUB_TOKEN) {
    headers["Authorization"] = `Bearer ${process.env.GITHUB_TOKEN}`;
  }

  try {
    // 1. Fetch README metadata
    const readmeRes = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/readme`,
      {
        headers,
        next: { revalidate: 1800 }, // Cache for 30 minutes
      }
    );

    if (!readmeRes.ok) {
      console.warn(
        `GitHub API README fetch failed for ${owner}/${repo}: status ${readmeRes.status}`
      );
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

    // 2. Fetch repo metadata to know default branch (for relative images)
    let defaultBranch = "main";
    try {
      const repoRes = await fetch(
        `https://api.github.com/repos/${owner}/${repo}`,
        {
          headers,
          next: { revalidate: 3600 },
        }
      );
      if (repoRes.ok) {
        const repoData = await repoRes.json();
        if (repoData.default_branch) {
          defaultBranch = repoData.default_branch;
        }
      }
    } catch {
      // Default to "main" if repo fetch fails
    }

    // 3. Base64 Decode content
    let rawContent = "";
    if (readmeData.content) {
      const cleanBase64 = readmeData.content.replace(/\s/g, "");
      rawContent = Buffer.from(cleanBase64, "base64").toString("utf-8");
    }

    return {
      success: true,
      owner,
      repo,
      defaultBranch,
      content: rawContent,
      htmlUrl: readmeData.html_url || `https://github.com/${owner}/${repo}`,
    };
  } catch (error) {
    console.error(`Exception fetching README for ${owner}/${repo}:`, error);
    return {
      error: true,
      message: "Network error loading project documentation.",
    };
  }
}
