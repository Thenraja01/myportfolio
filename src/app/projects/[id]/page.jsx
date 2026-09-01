import { notFound } from "next/navigation";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Badge } from "@/components/ui/Badge";
import { ProjectLinks } from "@/components/projects/ProjectLinks";
import { AsyncReadmeSection } from "@/components/projects/AsyncReadmeSection";
import { parseGitHubUrl, getRepositoryReadme } from "@/lib/github/client";
import { processReadmeMarkdown } from "@/lib/github/readme";
import { ArrowLeft, Sparkles, FolderCode } from "lucide-react";
import { getAdminDb } from "@/lib/firebase/admin";

// Fetch all projects from Firebase Realtime DB
async function getProjects() {
  try {
    const db = getAdminDb();
    if (!db) return [];
    const { ref, get } = await import("firebase-admin/database");
    const snap = await get(ref(db, "/projects"));
    if (!snap.exists()) return [];
    const data = snap.val();
    return Array.isArray(data) ? data : Object.values(data);
  } catch {
    return [];
  }
}

export async function generateStaticParams() {
  const projects = await getProjects();
  return projects.map((project) => ({
    id: project.id || project.name?.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
  }));
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const projects = await getProjects();
  const project = projects.find(
    (p) => p.id === id || p.name?.toLowerCase().replace(/[^a-z0-9]+/g, "-") === id
  );

  if (!project) {
    return { title: "Project Not Found" };
  }

  return {
    title: `${project.name} | Then Raja M Portfolio`,
    description: project.description,
  };
}

export default async function ProjectDetailPage({ params }) {
  const { id } = await params;
  const projects = await getProjects();
  const project = projects.find(
    (p) => p.id === id || p.name?.toLowerCase().replace(/[^a-z0-9]+/g, "-") === id
  );

  if (!project) {
    notFound();
  }


  // Parse GitHub repository owner and name
  const repoInfo = parseGitHubUrl(project.github);
  let initialReadmeContent = null;
  let readmeHtmlUrl = project.github;

  // Pre-fetch at build time if available, otherwise AsyncReadmeSection handles it on client
  if (repoInfo) {
    try {
      const readmeData = await getRepositoryReadme(repoInfo.owner, repoInfo.repo);
      if (readmeData && readmeData.success && readmeData.content) {
        initialReadmeContent = processReadmeMarkdown(
          readmeData.content,
          repoInfo.owner,
          repoInfo.repo,
          readmeData.defaultBranch
        );
        readmeHtmlUrl = readmeData.htmlUrl || project.github;
      }
    } catch (err) {
      console.warn(`Static build pre-fetch skipped for ${repoInfo.owner}/${repoInfo.repo}`);
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between">
      <Navbar />

      <main className="pt-28 pb-20">
        <Container className="max-w-4xl space-y-10">
          {/* Back button */}
          <Link
            href="/#projects"
            className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-slate-400 hover:text-indigo-400 transition-colors"
          >
            <ArrowLeft size={16} /> Back to All Projects
          </Link>

          {/* Project Header Shell (Renders Immediately) */}
          <div className="glass-panel p-8 sm:p-12 rounded-3xl border border-slate-800 bg-slate-900/60 backdrop-blur-xl space-y-6">
            <div className="flex items-center justify-between">
              <Badge variant={project.category === "AI" ? "purple" : "default"}>
                {project.category === "AI" && <Sparkles size={12} className="inline mr-1" />}
                {project.category || "Full Stack"}
              </Badge>

              {project.status && (
                <span className="text-xs font-mono uppercase px-3 py-1 rounded-md bg-amber-500/10 text-amber-400 border border-amber-500/20">
                  ● {project.status}
                </span>
              )}
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-100 font-mono tracking-tight flex items-center gap-3">
              <FolderCode size={32} className="text-indigo-400 shrink-0" />
              {project.name}
            </h1>

            <p className="text-slate-300 text-base sm:text-lg leading-relaxed font-sans">
              {project.description}
            </p>

            {/* Tech Stack */}
            <div className="space-y-3 pt-4 border-t border-slate-800">
              <h3 className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold">
                Technologies Used
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.technologies?.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-indigo-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Links */}
            <div className="pt-6">
              <ProjectLinks github={project.github} liveDemo={project.liveDemo} />
            </div>
          </div>

          {/* Progressive README Section with Document Skeleton */}
          <div className="pt-4">
            <AsyncReadmeSection
              owner={repoInfo?.owner}
              repo={repoInfo?.repo}
              githubUrl={readmeHtmlUrl}
              initialContent={initialReadmeContent}
            />
          </div>
        </Container>
      </main>

      <Footer />
    </div>
  );
}
