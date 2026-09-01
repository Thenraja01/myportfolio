"use client";
import { CertificationCard } from "./CertificationCard";

export function CertificationMarquee({ certifications, onCardClick }) {
  // Ensure the track is wide enough to fill the screen by duplicating if needed.
  // We'll duplicate it twice per track to be safe.
  const baseList = [...certifications, ...certifications];

  return (
    <div className="w-full py-10 overflow-hidden relative group">
      <style>{`
        @keyframes custom-marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-100%); }
        }
        .animate-custom-marquee {
          animation: custom-marquee 45s linear infinite;
        }
        .group:hover .animate-custom-marquee {
          animation-play-state: paused;
        }
      `}</style>
      
      {/* Gradient fades on the left and right edges for a smooth entrance/exit */}
      <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-blur-950 [mask-image:linear-gradient(to_right,black,transparent)] z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-blur-950 [mask-image:linear-gradient(to_left,black,transparent)] z-10 pointer-events-none" />
      
      {/* Marquee Container */}
      <div className="flex w-full py-12 perspective-[1200px]">
        
        {/* Track 1 */}
        <div className="flex shrink-0 animate-custom-marquee">
          {baseList.map((cert, idx) => {
            const originalIndex = idx % certifications.length;
            return (
              <div key={`track1-${cert.id || cert.title}-${idx}`} className="w-[340px] md:w-[420px] shrink-0 px-5 relative hover:z-50 transition-all duration-300">
                <CertificationCard cert={cert} isMarquee={true} onClick={() => onCardClick?.(originalIndex)} />
              </div>
            );
          })}
        </div>

        {/* Track 2 (Identical to Track 1 for seamless looping) */}
        <div className="flex shrink-0 animate-custom-marquee">
          {baseList.map((cert, idx) => {
            const originalIndex = idx % certifications.length;
            return (
              <div key={`track2-${cert.id || cert.title}-${idx}`} className="w-[340px] md:w-[420px] shrink-0 px-5 relative hover:z-50 transition-all duration-300">
                <CertificationCard cert={cert} isMarquee={true} onClick={() => onCardClick?.(originalIndex)} />
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}
