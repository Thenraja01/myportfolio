"use client";
import { forwardRef, useImperativeHandle, useRef } from "react";
import gsap from "gsap";

export const CareerTrain = forwardRef(function CareerTrain(
  { activeColor = "#6366f1", activeStationName = "STATION 01" },
  ref
) {
  const trainInnerRef = useRef(null);

  useImperativeHandle(ref, () => ({
    triggerArrivalShake: () => {
      if (!trainInnerRef.current) return;
      gsap.killTweensOf(trainInnerRef.current);
      gsap.timeline()
        .to(trainInnerRef.current, {
          x: -3,
          y: -2,
          rotation: -1,
          duration: 0.05,
          ease: "power1.out",
        })
        .to(trainInnerRef.current, {
          x: 3,
          y: 0,
          rotation: 1,
          duration: 0.05,
          ease: "power1.inOut",
        })
        .to(trainInnerRef.current, {
          x: -2,
          y: -1,
          rotation: -0.5,
          duration: 0.05,
          ease: "power1.inOut",
        })
        .to(trainInnerRef.current, {
          x: 0,
          y: 0,
          rotation: 0,
          duration: 0.07,
          ease: "power1.inOut",
        });
    },
  }));

  return (
    <div className="relative inline-flex flex-col items-center select-none">
      {/* Station Name Label floating above train */}
      <div
        className="mb-1 px-2.5 py-0.5 rounded-full text-[9px] font-mono font-bold tracking-widest uppercase border backdrop-blur-md shadow-md transition-colors duration-500"
        style={{
          backgroundColor: `${activeColor}15`,
          borderColor: `${activeColor}40`,
          color: activeColor,
        }}
      >
        <span>{activeStationName}</span>
      </div>

      {/* Train Locomotive Engine Container */}
      <div ref={trainInnerRef} className="relative flex flex-col items-center">
        <div
          className="relative px-3 py-1.5 rounded-xl border backdrop-blur-xl shadow-xl flex items-center gap-2 transition-colors duration-500"
          style={{
            backgroundColor: "#090d16",
            borderColor: activeColor,
            boxShadow: `0 0 15px ${activeColor}30`,
          }}
        >
          {/* Headlight Beam */}
          <div
            className="w-2 h-2 rounded-full animate-ping"
            style={{ backgroundColor: activeColor }}
          />

          {/* Locomotive Body & Label */}
          <div className="flex items-center gap-1.5">
            <span className="text-xs sm:text-sm">🚆</span>
            <span className="font-mono text-[10px] sm:text-xs font-extrabold tracking-wider text-slate-100 uppercase">
              CAREER EXPRESS
            </span>
          </div>

          {/* Engine Exhaust Spark */}
          <div
            className="w-1 h-1 rounded-full"
            style={{ backgroundColor: activeColor }}
          />
        </div>

        {/* Train Wheels */}
        <div className="flex justify-between w-3/4 px-2 -mt-0.5 z-10">
          <div
            className="w-2.5 h-2.5 rounded-full border-2 border-slate-900 animate-spin"
            style={{ backgroundColor: activeColor }}
          />
          <div
            className="w-2.5 h-2.5 rounded-full border-2 border-slate-900 animate-spin"
            style={{ backgroundColor: activeColor }}
          />
        </div>
      </div>
    </div>
  );
});
