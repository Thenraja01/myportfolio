"use client";

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
