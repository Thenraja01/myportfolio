"use client";

export function HeroBackground() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      {/* Radial ambient glow */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-indigo-600/15 rounded-full blur-[120px]" />
      <div className="absolute top-1/3 -right-40 w-96 h-96 bg-purple-600/15 rounded-full blur-[120px]" />
      <div className="absolute -bottom-40 left-1/3 w-96 h-96 bg-cyan-600/10 rounded-full blur-[120px]" />

      {/* Subtle grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b15_1px,transparent_1px),linear-gradient(to_bottom,#1e293b15_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
    </div>
  );
}
