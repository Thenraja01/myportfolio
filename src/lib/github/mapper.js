export function createProjectFromGithub(repo, now) {
  const projectId = repo.name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

  const languages = repo.language ? { [repo.language]: 100 } : {};

  return {
    id: projectId,
    name: repo.name,
    description: repo.description || "",
    github: {
      owner: repo.full_name.split("/")[0],
      repo: repo.name,
      url: repo.html_url,
      cloneUrl: repo.clone_url,
      sshUrl: repo.ssh_url,
      description: repo.description,
      stars: repo.stargazers_count,
      forks: repo.forks_count,
      watchers: repo.watchers_count,
      openIssues: repo.open_issues_count,
      primaryLanguage: repo.language,
      languages,
      topics: repo.topics || [],
      defaultBranch: repo.default_branch,
      createdAt: new Date(repo.created_at).getTime(),
      updatedAt: new Date(repo.updated_at).getTime(),
      lastSyncedAt: now,
    },
    portfolio: {
      title: repo.name
        .replace(/[-_]/g, " ")
        .replace(/\b\w/g, (c) => c.toUpperCase()),
      category: "Other",
      featured: false,
      visible: true,
      displayOrder: 999,
      status: "Completed",
      liveDemo: "",
      customDescription: "",
      technologies: repo.language ? [repo.language] : [],
      image: "",
    },
    featured: false,
    category: "Other",
    status: "Completed",
    technologies: repo.language ? [repo.language] : [],
    liveDemo: "",
    sync: {
      enabled: true,
      autoCreate: true,
      autoUpdate: true,
      lastStatus: "success",
      lastSyncedAt: now,
    },
  };
}

export function mergeGithubIntoProject(existingProject, githubData, now) {
  const project = { ...existingProject };

  project.github = {
    ...project.github,
    owner: githubData.full_name.split("/")[0],
    repo: githubData.name,
    url: githubData.html_url,
    cloneUrl: githubData.clone_url,
    sshUrl: githubData.ssh_url,
    description: githubData.description,
    stars: githubData.stargazers_count,
    forks: githubData.forks_count,
    watchers: githubData.watchers_count,
    openIssues: githubData.open_issues_count,
    primaryLanguage: githubData.language,
    topics: githubData.topics || [],
    defaultBranch: githubData.default_branch,
    createdAt: project.github?.createdAt || new Date(githubData.created_at).getTime(),
    updatedAt: new Date(githubData.updated_at).getTime(),
    lastSyncedAt: now,
  };

  project.sync = {
    ...project.sync,
    lastStatus: "success",
    lastSyncedAt: now,
  };

  return project;
}
