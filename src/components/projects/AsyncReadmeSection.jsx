"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ProjectReadme } from "./ProjectReadme";
import { ProjectReadmeSkeleton } from "./ProjectReadmeSkeleton";

export function AsyncReadmeSection({ owner, repo, githubUrl, initialContent }) {
  const [content, setContent] = useState(initialContent || null);
  const [loading, setLoading] = useState(!initialContent && Boolean(owner && repo));
  const [htmlUrl, setHtmlUrl] = useState(githubUrl);
  const [error, setError] = useState(false);

  useEffect(() => {
    // If initialContent is provided or missing repo info, don't fetch
    if (initialContent || !owner || !repo) {
      return;
    }

    let isMounted = true;

    async function fetchReadme() {
      setLoading(true);
      setError(false);
      try {
        const res = await fetch(`/api/readme?owner=${encodeURIComponent(owner)}&repo=${encodeURIComponent(repo)}`);
        const data = await res.json();
        
        if (isMounted) {
          if (res.ok && data.success && data.content) {
            setContent(data.content);
            if (data.htmlUrl) setHtmlUrl(data.htmlUrl);
          } else {
            setError(true);
          }
        }
      } catch (err) {
        console.error("Error fetching README on client:", err);
        if (isMounted) setError(true);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    fetchReadme();

    return () => {
      isMounted = false;
    };
  }, [owner, repo, initialContent]);

  if (loading) {
    return <ProjectReadmeSkeleton />;
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={content ? "content" : "empty"}
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -15 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        <ProjectReadme content={content} htmlUrl={htmlUrl} />
      </motion.div>
    </AnimatePresence>
  );
}
