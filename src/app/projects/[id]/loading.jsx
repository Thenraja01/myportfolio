"use client";
/**
 * Project detail page loading screen — config driven from Firebase /loaderConfig
 * Shows while the project data is being fetched from Firebase Realtime DB.
 *
 * Firebase Realtime DB structure (update anytime without code changes):
 * {
 *   "loaderConfig": {
 *     "title":       "THEN RAJA M",
 *     "subtitle":    "Loading Project Details",
 *     "bg_theme":    "dark",
 *     "duration_ms": 1800,
 *     "enabled":     true
 *   }
 * }
 */
import { useLoaderConfig } from "@/hooks/useLoaderConfig";
import PortfolioSplashLoader from "@/components/ui/PortfolioSplashLoader";

export default function ProjectLoading() {
  const { config, loading } = useLoaderConfig();

  // Minimal inline spinner while Firebase config loads
  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="w-10 h-10 rounded-full border-2 border-indigo-500/30 border-t-indigo-400 animate-spin" />
      </div>
    );
  }

  return (
    <PortfolioSplashLoader
      title={config.title}
      subtitle={config.projectSubtitle || "Loading Project Details"}
      bgTheme={config.bg_theme}
      duration={config.duration_ms}
    />
  );
}
