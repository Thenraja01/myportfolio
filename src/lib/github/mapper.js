function formatTitle(name) {
  if (!name) return "";
  return name
    .replace(/[-_.]+/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase())
    .replace(/\bAi\b/g, "AI")
    .replace(/\bUi\b/g, "UI")
    .replace(/\bApi\b/g, "API")
    .replace(/\bMern\b/g, "MERN")
    .replace(/\bLlm\b/g, "LLM")
    .replace(/\bRag\b/g, "RAG")
    .replace(/\bIde\b/g, "IDE")
    .replace(/\bDb\b/g, "DB");
}

function detectCategory(repo) {
  const text = `${repo.name} ${repo.description || ""} ${(repo.topics || []).join(" ")} ${repo.language || ""}`.toLowerCase();
  
  if (
    text.includes("ai") ||
    text.includes("llm") ||
    text.includes("rag") ||
    text.includes("gpt") ||
    text.includes("gemini") ||
    text.includes("openai") ||
    text.includes("groq") ||
    text.includes("langchain") ||
    text.includes("llama") ||
    text.includes("agent") ||
    text.includes("bot") ||
    text.includes("machine learning") ||
    text.includes("deep learning") ||
    text.includes("nlp") ||
    text.includes("vision") ||
    repo.language === "Jupyter Notebook"
  ) {
    return "AI";
  }

  if (
    text.includes("mobile") ||
    text.includes("react-native") ||
    text.includes("flutter") ||
    text.includes("android") ||
    text.includes("ios") ||
    repo.language === "Dart" ||
    repo.language === "Swift" ||
    repo.language === "Kotlin"
  ) {
    return "Mobile";
  }

  if (
    text.includes("devops") ||
    text.includes("docker") ||
    text.includes("kubernetes") ||
    text.includes("terraform") ||
    text.includes("cloud")
  ) {
    return "DevOps";
  }

  return "Full Stack";
}

export function createProjectFromGithub(repo, now = Date.now()) {
  const projectId = repo.name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

  const owner = repo.owner?.login || repo.full_name?.split("/")[0] || "Thenraja01";
  const languages = repo.language ? { [repo.language]: 100 } : {};
  
  // Extract all unique technologies
  const techSet = new Set();
  if (repo.language) techSet.add(repo.language);
  if (Array.isArray(repo.topics)) {
    repo.topics.forEach((t) => {
      // capitalize nicely
      const clean = t.replace(/[-_]/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
      techSet.add(clean);
    });
  }
  const technologies = Array.from(techSet);

  const category = detectCategory(repo);
  const formattedTitle = formatTitle(repo.name);
  const isFeatured = (repo.stargazers_count > 0) || 
    (repo.topics && (repo.topics.includes("featured") || repo.topics.includes("portfolio") || repo.topics.includes("showcase"))) ||
    repo.forks_count > 0;

  let liveDemo = repo.homepage || "";
  if (!liveDemo && repo.has_pages) {
    liveDemo = `https://${owner}.github.io/${repo.name}`;
  }

  const status = repo.archived ? "Archived" : "Completed";

  return {
    id: projectId,
    name: formattedTitle,
    title: formattedTitle,
    description: repo.description || `Open-source project built with ${repo.language || "modern technologies"}.`,
    category,
    status,
    featured: isFeatured,
    technologies: technologies.length > 0 ? technologies : [repo.language || "Software Development"],
    liveDemo,
    github: repo.html_url || `https://github.com/${owner}/${repo.name}`,
    githubData: {
      owner,
      repo: repo.name,
      fullName: repo.full_name || `${owner}/${repo.name}`,
      url: repo.html_url,
      cloneUrl: repo.clone_url,
      sshUrl: repo.ssh_url,
      description: repo.description,
      stars: repo.stargazers_count || 0,
      forks: repo.forks_count || 0,
      watchers: repo.watchers_count || 0,
      openIssues: repo.open_issues_count || 0,
      primaryLanguage: repo.language,
      languages,
      topics: repo.topics || [],
      defaultBranch: repo.default_branch || "main",
      createdAt: new Date(repo.created_at || now).getTime(),
      updatedAt: new Date(repo.updated_at || now).getTime(),
      lastSyncedAt: now,
    },
    portfolio: {
      title: formattedTitle,
      category,
      featured: isFeatured,
      visible: true,
      displayOrder: 999,
      status,
      liveDemo,
      customDescription: repo.description || "",
      technologies,
      image: "",
    },
    sync: {
      enabled: true,
      autoCreate: true,
      autoUpdate: true,
      lastStatus: "success",
      lastSyncedAt: now,
    },
  };
}

export function mergeGithubIntoProject(existingProject, githubData, now = Date.now()) {
  const dynamicProject = createProjectFromGithub(githubData, now);
  const p = existingProject.portfolio || {};

  return {
    ...dynamicProject,
    ...existingProject,
    id: existingProject.id || dynamicProject.id,
    name: p.title || existingProject.name || dynamicProject.name,
    description: p.customDescription || p.description || existingProject.description || dynamicProject.description,
    category: p.category || existingProject.category || dynamicProject.category,
    status: p.status || existingProject.status || dynamicProject.status,
    featured: p.featured !== undefined ? p.featured : (existingProject.featured !== undefined ? existingProject.featured : dynamicProject.featured),
    technologies: (p.technologies && p.technologies.length > 0) ? p.technologies : dynamicProject.technologies,
    liveDemo: p.liveDemo || existingProject.liveDemo || dynamicProject.liveDemo,
    github: dynamicProject.github,
    githubData: dynamicProject.githubData,
    sync: {
      ...existingProject.sync,
      lastStatus: "success",
      lastSyncedAt: now,
    },
  };
}
