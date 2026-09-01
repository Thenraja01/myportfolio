"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Github, Code2, Trophy, ExternalLink, Activity, Star, GitFork, RefreshCw, CheckCircle2 } from "lucide-react";
import { useUser } from "@/context/UserContext";

export default function CodingActivity() {
  const { personalInfo } = useUser();
  const githubUsername = personalInfo?.github?.split("/").pop() || "Thenraja01";
  const leetcodeUsername = "ePsMYahxiO";

  const [githubData, setGithubData] = useState({
    repos: 13,
    followers: 1,
    stars: 0,
    loading: true,
    topRepos: [],
  });

  const [leetcodeData, setLeetcodeData] = useState({
    totalSolved: 81,
    easySolved: 47,
    mediumSolved: 30,
    hardSolved: 4,
    ranking: 1938960,
    recentSubmissions: [],
    loading: true,
  });

  useEffect(() => {
    // 1. Fetch GitHub User & Repos Stats
    async function fetchGithubStats() {
      try {
        const userRes = await fetch(`https://api.github.com/users/${githubUsername}`);
        const reposRes = await fetch(`https://api.github.com/users/${githubUsername}/repos?sort=updated&per_page=6`);

        if (userRes.ok && reposRes.ok) {
          const userData = await userRes.json();
          const reposData = await reposRes.json();

          const totalStars = Array.isArray(reposData)
            ? reposData.reduce((acc, repo) => acc + (repo.stargazers_count || 0), 0)
            : 0;

          setGithubData({
            repos: userData.public_repos || 13,
            followers: userData.followers || 1,
            stars: totalStars,
            loading: false,
            topRepos: Array.isArray(reposData) ? reposData.slice(0, 4) : [],
          });
        } else {
          setGithubData((prev) => ({ ...prev, loading: false }));
        }
      } catch (err) {
        console.warn("GitHub API fetch error:", err);
        setGithubData((prev) => ({ ...prev, loading: false }));
      }
    }

    // 2. Fetch LeetCode Stats
    async function fetchLeetcodeStats() {
      try {
        const res = await fetch(`https://leetcode-api-faisalshohag.vercel.app/${leetcodeUsername}`);
        if (res.ok) {
          const data = await res.json();
          if (data && data.totalSolved !== undefined) {
            setLeetcodeData({
              totalSolved: data.totalSolved || 81,
              easySolved: data.easySolved || 47,
              mediumSolved: data.mediumSolved || 30,
              hardSolved: data.hardSolved || 4,
              ranking: data.ranking || 1938960,
              recentSubmissions: (data.recentSubmissions || []).slice(0, 4),
              loading: false,
            });
            return;
          }
        }
        setLeetcodeData((prev) => ({ ...prev, loading: false }));
      } catch (err) {
        console.warn("LeetCode API fetch error:", err);
        setLeetcodeData((prev) => ({ ...prev, loading: false }));
      }
    }

    fetchGithubStats();
    fetchLeetcodeStats();
  }, []);

  // Percentages for LeetCode Ring/Bars
  const total = leetcodeData.totalSolved || 81;
  const easyPct = Math.round((leetcodeData.easySolved / total) * 100) || 58;
  const mediumPct = Math.round((leetcodeData.mediumSolved / total) * 100) || 37;
  const hardPct = Math.round((leetcodeData.hardSolved / total) * 100) || 5;

  return (
    <section className="py-16 relative">
      <div className="space-y-12">
        {/* Section Title */}
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-600 dark:text-indigo-400 text-xs font-mono uppercase tracking-wider font-semibold">
            <Activity size={14} className="animate-pulse text-indigo-500 dark:text-indigo-400" />
            <span>LIVE CODING METRICS</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight transition-colors">
            Real-Time GitHub & DSA Activity
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 transition-colors">
            Live continuous integration, GitHub commits, open-source repositories, and LeetCode problem-solving breakdown.
          </p>
        </div>

        {/* 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: GitHub Stats & Heatmap */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white/85 dark:bg-slate-950/80 p-6 sm:p-8 shadow-2xl backdrop-blur-xl flex flex-col justify-between space-y-6 group hover:border-indigo-500/40 transition-all text-slate-900 dark:text-slate-100"
          >
            {/* Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-2xl bg-indigo-500/10 border border-indigo-500/30 text-indigo-600 dark:text-indigo-400">
                  <Github size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2 transition-colors">
                    <span>GitHub Contributions</span>
                    {githubData.loading && <RefreshCw size={14} className="animate-spin text-slate-500" />}
                  </h3>
                  <a
                    href={personalInfo.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-mono text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1 mt-0.5"
                  >
                    <span>@{githubUsername}</span>
                    <ExternalLink size={12} />
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="text-right">
                  <div className="text-xl font-extrabold font-mono text-slate-900 dark:text-slate-100 transition-colors">{githubData.repos}</div>
                  <div className="text-[11px] font-mono text-slate-500 dark:text-slate-400 uppercase">Public Repos</div>
                </div>
              </div>
            </div>

            {/* Heatmap Contribution Graph */}
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs font-mono text-slate-600 dark:text-slate-400">
                <span>Contribution Heatmap</span>
                <span className="text-emerald-600 dark:text-emerald-400 flex items-center gap-1 font-semibold">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                  <span>Active Contributor</span>
                </span>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50/80 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800/80 overflow-x-auto flex justify-center items-center transition-colors">
                <img
                  src={`https://ghchart.rshah.org/6366f1/${githubUsername}`}
                  alt="GitHub Contribution Grid"
                  className="min-w-[650px] w-full max-w-full opacity-90 hover:opacity-100 transition-opacity filter drop-shadow"
                />
              </div>
            </div>

            {/* Top Active Repositories */}
            <div className="space-y-3">
              <h4 className="text-xs font-mono font-bold uppercase text-slate-500 dark:text-slate-400 tracking-wider">
                Recent Public Repositories
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {githubData.topRepos.length > 0
                  ? githubData.topRepos.map((repo) => (
                      <a
                        key={repo.id}
                        href={repo.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3.5 rounded-2xl bg-slate-50/80 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800/60 hover:border-indigo-500/40 hover:bg-slate-100 dark:hover:bg-slate-900 transition-all flex flex-col justify-between space-y-2 group/repo"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-mono text-xs font-bold text-slate-900 dark:text-slate-200 truncate group-hover/repo:text-indigo-600 dark:group-hover/repo:text-indigo-400 transition-colors">
                            {repo.name}
                          </span>
                          <ExternalLink size={12} className="text-slate-400 dark:text-slate-500 group-hover/repo:text-indigo-600 dark:group-hover/repo:text-indigo-400 transition-colors" />
                        </div>
                        <p className="text-[11px] text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed transition-colors">
                          {repo.description || "Full-stack project repository."}
                        </p>
                        <div className="flex items-center gap-3 text-[10px] font-mono text-slate-500 dark:text-slate-400 pt-1">
                          {repo.language && <span className="text-indigo-600 dark:text-indigo-300 font-semibold">● {repo.language}</span>}
                          <span className="flex items-center gap-1">
                            <Star size={10} className="text-amber-500" /> {repo.stargazers_count}
                          </span>
                          <span className="flex items-center gap-1">
                            <GitFork size={10} /> {repo.forks_count}
                          </span>
                        </div>
                      </a>
                    ))
                  : [1, 2, 3, 4].map((i) => (
                      <div key={i} className="p-3.5 rounded-2xl bg-slate-100 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800/40 animate-pulse h-20" />
                    ))}
              </div>
            </div>
          </motion.div>

          {/* Right Column: LeetCode DSA Breakdown */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-5 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white/85 dark:bg-slate-950/80 p-6 sm:p-8 shadow-2xl backdrop-blur-xl flex flex-col justify-between space-y-6 group hover:border-purple-500/40 transition-all text-slate-900 dark:text-slate-100"
          >
            {/* Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-500 dark:text-amber-400">
                  <Trophy size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2 transition-colors">
                    <span>LeetCode Analytics</span>
                    {leetcodeData.loading && <RefreshCw size={14} className="animate-spin text-slate-500" />}
                  </h3>
                  <a
                    href={personalInfo.leetcode}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-mono text-amber-600 dark:text-amber-400 hover:underline flex items-center gap-1 mt-0.5"
                  >
                    <span>@{leetcodeUsername}</span>
                    <ExternalLink size={12} />
                  </a>
                </div>
              </div>

              <div className="text-right">
                <div className="text-2xl font-extrabold font-mono text-amber-600 dark:text-amber-400 transition-colors">{leetcodeData.totalSolved}</div>
                <div className="text-[11px] font-mono text-slate-500 dark:text-slate-400 uppercase">Solved</div>
              </div>
            </div>

            {/* Total Solved Gauge & Stats Grid */}
            <div className="p-5 rounded-2xl bg-slate-50/80 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 space-y-4 transition-colors">
              {/* Easy Bar */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    Easy
                  </span>
                  <span className="text-slate-800 dark:text-slate-300 font-bold">{leetcodeData.easySolved} ({easyPct}%)</span>
                </div>
                <div className="w-full h-2.5 rounded-full bg-slate-200 dark:bg-slate-950 overflow-hidden">
                  <div className="h-full bg-emerald-500 rounded-full transition-all duration-1000" style={{ width: `${easyPct}%` }} />
                </div>
              </div>

              {/* Medium Bar */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-amber-600 dark:text-amber-400 font-bold flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-amber-500" />
                    Medium
                  </span>
                  <span className="text-slate-800 dark:text-slate-300 font-bold">{leetcodeData.mediumSolved} ({mediumPct}%)</span>
                </div>
                <div className="w-full h-2.5 rounded-full bg-slate-200 dark:bg-slate-950 overflow-hidden">
                  <div className="h-full bg-amber-500 rounded-full transition-all duration-1000" style={{ width: `${mediumPct}%` }} />
                </div>
              </div>

              {/* Hard Bar */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-rose-600 dark:text-rose-400 font-bold flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-rose-500" />
                    Hard
                  </span>
                  <span className="text-slate-800 dark:text-slate-300 font-bold">{leetcodeData.hardSolved} ({hardPct}%)</span>
                </div>
                <div className="w-full h-2.5 rounded-full bg-slate-200 dark:bg-slate-950 overflow-hidden">
                  <div className="h-full bg-rose-500 rounded-full transition-all duration-1000" style={{ width: `${hardPct}%` }} />
                </div>
              </div>
            </div>

            {/* Recent Solved Submissions */}
            <div className="space-y-3">
              <h4 className="text-xs font-mono font-bold uppercase text-slate-500 dark:text-slate-400 tracking-wider flex items-center gap-2">
                <Code2 size={14} className="text-indigo-600 dark:text-indigo-400" />
                Recent Solved Problems
              </h4>

              <div className="space-y-2">
                {leetcodeData.recentSubmissions.length > 0 ? (
                  leetcodeData.recentSubmissions.map((sub, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-xl bg-slate-50/80 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800/60 flex items-center justify-between text-xs font-mono transition-colors"
                    >
                      <div className="flex items-center gap-2 truncate">
                        <CheckCircle2 size={14} className="text-emerald-500 dark:text-emerald-400 shrink-0" />
                        <span className="text-slate-800 dark:text-slate-200 truncate font-medium">{sub.title}</span>
                      </div>
                      <span className="px-2 py-0.5 rounded-md bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-[10px] shrink-0 font-bold">
                        {sub.lang || "Python"}
                      </span>
                    </div>
                  ))
                ) : (
                  <>
                    {["Palindrome Number", "Valid Parentheses", "Integer to Roman", "First Missing Positive"].map((title, idx) => (
                      <div key={idx} className="p-3 rounded-xl bg-slate-50/80 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800/60 flex items-center justify-between text-xs font-mono transition-colors">
                        <div className="flex items-center gap-2 truncate">
                          <CheckCircle2 size={14} className="text-emerald-500 dark:text-emerald-400 shrink-0" />
                          <span className="text-slate-800 dark:text-slate-200 truncate font-medium">{title}</span>
                        </div>
                        <span className="px-2 py-0.5 rounded-md bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-[10px] font-bold">
                          Python
                        </span>
                      </div>
                    ))}
                  </>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
