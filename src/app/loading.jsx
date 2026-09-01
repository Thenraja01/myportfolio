"use client";
/**
 * Root portfolio loading screen — config driven from Firebase /loaderConfig
 *
 * Firebase Realtime DB structure (update anytime without code changes):
 * {
 *   "loaderConfig": {
 *     "title":       "THEN RAJA M",
 *     "subtitle":    "Full Stack · AI-Integrated Engineer",
 *     "bg_theme":    "dark",       ← "dark" | "light" | "brand" | "glass"
 *     "duration_ms": 2400,
 *     "enabled":     true
 *   }
 * }
 */
import { useLoaderConfig } from "@/hooks/useLoaderConfig";
import PortfolioSplashLoader from "@/components/ui/PortfolioSplashLoader";

export default function GlobalLoading() {
  const { config, loading } = useLoaderConfig();

  // While fetching Firebase config, show a minimal inline spinner
  if (loading) {
    return (
      <div className="fixed inset-0 bg-slate-950 z-50 flex items-center justify-center">
        <div className="w-10 h-10 rounded-full border-2 border-indigo-500/30 border-t-indigo-400 animate-spin" />
      </div>
    );
  }

  return (
    <PortfolioSplashLoader
      title={config.title}
      subtitle={config.subtitle}
      bgTheme={config.bg_theme}
      duration={config.duration_ms}
    />
  );
}
