export default function GlobalLoading() {
  return (
    <div className="fixed inset-0 bg-slate-950 z-50 flex flex-col items-center justify-center space-y-4">
      {/* Glowing loader */}
      <div className="relative">
        <div className="w-16 h-16 rounded-full border-2 border-indigo-500/20 border-t-indigo-500 animate-spin" />
        <div className="absolute inset-0 rounded-full bg-indigo-500/10 blur-xl animate-pulse" />
      </div>

      <div className="text-center space-y-1">
        <h2 className="font-mono text-sm font-bold text-slate-200 tracking-wider">
          THEN RAJA M
        </h2>
        <p className="font-mono text-xs text-indigo-400 animate-pulse">
          FULL STACK · AI-INTEGRATED ENGINEER
        </p>
      </div>
    </div>
  );
}
