"use client";
import { CertificationCard } from "./CertificationCard";

export function CertificationMarquee({ certifications = [], onCardClick }) {
  if (!certifications || certifications.length === 0) return null;

  const baseList = [...certifications, ...certifications];

  return (
    <div className="w-full py-10 overflow-hidden relative group">
      <style>{`
        @keyframes custom-marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .animate-custom-marquee {
          animation: custom-marquee 45s linear infinite;
        }
        .group:hover .animate-custom-marquee {
          animation-play-state: paused;
        }
      `}</style>
      
      {/* Marquee Container */}
      <div className="flex w-full py-6 perspective-[1200px] overflow-hidden">
        <div className="flex shrink-0 animate-custom-marquee">
          {baseList.map((cert, idx) => {
            const originalIndex = idx % certifications.length;
            return (
              <div
                key={`cert-${cert.id || cert.title}-${idx}`}
                className="w-[320px] md:w-[400px] shrink-0 px-4 relative hover:z-50 transition-all duration-300"
              >
                <CertificationCard
                  cert={cert}
                  isMarquee={true}
                  onClick={() => onCardClick?.(originalIndex)}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
