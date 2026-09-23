"use client";
import { useState, useEffect } from "react";
import { Github, RefreshCw, CheckCircle, XCircle, AlertTriangle, GitBranch, Star, GitFork } from "lucide-react";

export default function GithubSyncPage() {
  const [loading, setLoading] = useState(false);
  const [repos, setRepos] = useState([]);
  const [syncResult, setSyncResult] = useState(null);
  const [syncStatus, setSyncStatus] = useState(null);

  async function fetchRepositories() {
    try {
      const res = await fetch("/api/github/repositories");
      const data = await res.json();
      setRepos(data || []);
    } catch (err) {
      console.error("Error fetching repositories:", err);
    }
  }

  async function fetchSyncStatus() {
    try {
      const res = await fetch("/api/github/sync-status");
      const data = await res.json();
      setSyncStatus(data);
    } catch (err) {
      console.error("Error fetching sync status:", err);
    }
  }

  async function handleSync() {
    setLoading(true);
    setSyncResult(null);
    try {
      const res = await fetch("/api/github/sync", { method: "POST" });
      const data = await res.json();
      setSyncResult(data);
      await fetchRepositories();
      await fetchSyncStatus();
    } catch (err) {
      console.error("Error running sync:", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchRepositories();
    fetchSyncStatus();
  }, []);

  const totalStars = repos.reduce((a, r) => a + (r.stargazers_count || 0), 0);
  const inPortfolio = repos.filter(r => r.inPortfolio).length;
  const newProjects = repos.filter(r => !r.inPortfolio).length;

  return (
    <section className="p-6 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold font-mono flex items-center gap-2">
            <Github size={24} /> GitHub Integration
          </h1>
          <p className="text-slate-400 text-sm font-mono mt-1">
            Manage repository synchronization for your portfolio
          </p>
        </div>
        <button
          onClick={handleSync}
          disabled={loading}
          className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-900 text-white rounded-xl font-mono text-sm font-bold transition-all"
        >
          <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
          {loading ? "Syncing..." : "Sync Now"}
        </button>
      </div>

      {syncResult && (
        <div className="glass-panel p-4 rounded-xl border border-green-500/30">
          <p className="text-green-400 font-mono text-sm">
            ✅ Sync complete: {syncResult.created} created, {syncResult.updated} updated, {syncResult.repositoryCount} repos
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="glass-card-morphism p-4 rounded-xl">
          <p className="text-slate-400 text-xs font-mono uppercase">Repositories</p>
          <p className="text-2xl font-bold font-mono mt-1">{repos.length}</p>
        </div>
        <div className="glass-card-morphism p-4 rounded-xl">
          <p className="text-slate-400 text-xs font-mono uppercase">In Portfolio</p>
          <p className="text-2xl font-bold font-mono mt-1 text-indigo-400">{inPortfolio}</p>
        </div>
        <div className="glass-card-morphism p-4 rounded-xl">
          <p className="text-slate-400 text-xs font-mono uppercase">New Projects</p>
          <p className="text-2xl font-bold font-mono mt-1 text-green-400">{newProjects}</p>
        </div>
        <div className="glass-card-morphism p-4 rounded-xl">
          <p className="text-slate-400 text-xs font-mono uppercase">Total Stars</p>
          <p className="text-2xl font-bold font-mono mt-1 text-amber-400">{totalStars}</p>
        </div>
      </div>

      {syncStatus && (
        <div className="glass-card-morphism p-4 rounded-xl">
          <p className="text-slate-400 text-xs font-mono uppercase mb-2">Last Sync</p>
          <p className="font-mono text-sm">
            {syncStatus.lastSyncAt
              ? new Date(syncStatus.lastSyncAt).toLocaleString()
              : "Never"}
          </p>
          <p className="font-mono text-sm mt-1">
            Status:{" "}
            <span className={syncStatus.status === "success" ? "text-green-400" : "text-amber-400"}>
              {syncStatus.status}
            </span>
          </p>
        </div>
      )}

      <div className="space-y-2">
        <h2 className="text-lg font-bold font-mono flex items-center gap-2">
          <GitBranch size={18} /> Repository Status
        </h2>
        <div className="space-y-2">
          {repos.map((repo) => (
            <div
              key={repo.full_name}
              className="glass-card-morphism p-4 rounded-xl flex items-center justify-between"
            >
              <div className="flex items-center gap-4">
                {repo.inPortfolio ? (
                  <CheckCircle size={18} className="text-green-400 shrink-0" />
                ) : (
                  <AlertTriangle size={18} className="text-amber-400 shrink-0" />
                )}
                <div>
                  <p className="font-mono text-sm font-bold">{repo.full_name}</p>
                  <p className="text-xs text-slate-400 font-mono">{repo.description?.slice(0, 60)}...</p>
                </div>
              </div>
              <div className="flex items-center gap-4 text-xs font-mono">
                <span className="flex items-center gap-1"><Star size={14} /> {repo.stargazers_count}</span>
                <span className="flex items-center gap-1"><GitFork size={14} /> {repo.forks_count}</span>
                <span className={`px-2 py-1 rounded-full font-bold ${
                  repo.inPortfolio ? "bg-green-500/20 text-green-400" : "bg-amber-500/20 text-amber-400"
                }`}>
                  {repo.inPortfolio ? "Synced" : "New"}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
