export default function ProjectLoading() {
  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center space-y-4">
      <div className="w-12 h-12 rounded-full border-2 border-indigo-500 border-t-transparent animate-spin" />
      <p className="text-slate-400 font-mono text-sm animate-pulse">Loading Project Details...</p>
    </div>
  );
}
