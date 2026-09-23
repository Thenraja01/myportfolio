"use client";
import { useState, useEffect } from "react";
import { Sparkles, Loader2, CheckCircle, AlertCircle, RefreshCw } from "lucide-react";

export default function AISkillsPage() {
  const [loading, setLoading] = useState(false);
  const [skills, setSkills] = useState(null);
  const [error, setError] = useState(null);
  const [saved, setSaved] = useState(false);

  async function generateSkills() {
    setLoading(true);
    setError(null);
    setSkills(null);
    setSaved(false);
    try {
      const res = await fetch("/api/skills", { method: "POST", body: JSON.stringify({ saveToFirebase: true }) });
      const data = await res.json();
      if (data.success) {
        setSkills(data.skills);
        setSaved(true);
      } else {
        setError(data.message || "Failed to generate skills");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function previewSkills() {
    setLoading(true);
    setError(null);
    setSkills(null);
    try {
      const res = await fetch("/api/skills");
      const data = await res.json();
      if (data.success) {
        setSkills(data.skills);
      } else {
        setError(data.message || "Failed to preview skills");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="p-6 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold font-mono flex items-center gap-2">
            <Sparkles size={24} /> AI Skill Generator
          </h1>
          <p className="text-slate-400 text-sm font-mono mt-1">
            Use Gemini/Groq API to automatically generate technical skills from portfolio data
          </p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={previewSkills}
            disabled={loading}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-purple-600 hover:bg-purple-700 disabled:bg-purple-900 text-white rounded-xl font-mono text-sm font-bold transition-all"
          >
            {loading ? <Loader2 size={16} className="animate-spin" /> : <RefreshCw size={16} />}
            Preview
          </button>
          <button
            onClick={generateSkills}
            disabled={loading}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-900 text-white rounded-xl font-mono text-sm font-bold transition-all"
          >
            {loading ? <Loader2 size={16} className="animate-spin" /> : <Sparkles size={16} />}
            Generate & Save to Firebase
          </button>
        </div>
      </div>

      {error && (
        <div className="glass-panel p-4 rounded-xl border border-red-500/30 flex items-center gap-3">
          <AlertCircle size={18} className="text-red-400 shrink-0" />
          <p className="text-red-400 font-mono text-sm">{error}</p>
        </div>
      )}

      {saved && (
        <div className="glass-panel p-4 rounded-xl border border-green-500/30 flex items-center gap-3">
          <CheckCircle size={18} className="text-green-400 shrink-0" />
          <p className="text-green-400 font-mono text-sm">Skills saved to Firebase successfully!</p>
        </div>
      )}

      {skills && (
        <div className="space-y-4">
          <h2 className="text-lg font-bold font-mono">Generated Skills</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Object.entries(skills).map(([category, skillList]) => (
              <div key={category} className="glass-card-morphism p-4 rounded-xl">
                <h3 className="font-mono text-sm font-bold text-indigo-400 mb-2">
                  {category.replace(/([A-Z])/g, " $1").trim()}
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  {Array.isArray(skillList) ? skillList.map((skill) => (
                    <span key={skill} className="px-2 py-1 bg-indigo-500/20 text-indigo-300 rounded-md text-xs font-mono">
                      {skill}
                    </span>
                  )) : null}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {!skills && !loading && !error && (
        <div className="glass-card-morphism p-8 rounded-xl text-center">
          <Sparkles size={48} className="mx-auto text-indigo-500/50 mb-4" />
          <p className="text-slate-500 font-mono text-sm">Click a button above to generate AI-based skills from your portfolio data</p>
        </div>
      )}
    </section>
  );
}
