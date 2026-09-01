"use client";
import { TiltCard } from "@/components/3d/TiltCard";
import { Award, CheckCircle2, ExternalLink, ShieldAlert } from "lucide-react";

export function CertificationCard({ cert }) {
  const hasValidLink =
    cert.link &&
    typeof cert.link === "string" &&
    cert.link.trim() !== "" &&
    cert.link.trim() !== '""';

  return (
    <TiltCard maxTilt={4}>
      <div className="glass-panel p-6 rounded-3xl border border-slate-800/80 bg-slate-950/70 backdrop-blur-xl h-full flex flex-col justify-between space-y-4 hover:border-indigo-500/40 transition-all duration-300 group">
        <div className="space-y-3">
          {/* Header icon and verification badge */}
          <div className="flex items-center justify-between">
            <div className="p-2.5 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
              <Award size={20} />
            </div>

            {cert.verified ? (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-mono font-bold tracking-wider uppercase">
                <CheckCircle2 size={12} /> VERIFIED
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-[10px] font-mono font-bold tracking-wider uppercase">
                <ShieldAlert size={12} /> VERIFICATION UNAVAILABLE
              </span>
            )}
          </div>

          {/* Certificate Title */}
          <h3 className="text-base font-bold text-slate-100 font-mono line-clamp-2 group-hover:text-indigo-400 transition-colors">
            {cert.title}
          </h3>

          {/* Issuer / Institute */}
          <p className="text-xs font-mono uppercase tracking-wider text-slate-400">
            {cert.institute}
          </p>
        </div>

        {/* Certificate External Link */}
        {hasValidLink ? (
          <div className="pt-3 border-t border-slate-900">
            <a
              href={cert.link}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold text-indigo-400 hover:text-indigo-300 transition-colors"
            >
              <span>View Certificate</span>
              <ExternalLink size={14} />
            </a>
          </div>
        ) : (
          <div className="pt-3 border-t border-slate-900 text-[11px] font-mono text-slate-500 italic">
            Certificate link not available
          </div>
        )}
      </div>
    </TiltCard>
  );
}
