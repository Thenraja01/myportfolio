export default function Scene3DBackground() {
  const shapes = [
    { type: "cube", top: "12%", left: "8%", size: 56, dur: "20s", delay: "0s", spin: "18s", rx: "35deg" },
    { type: "ring", top: "25%", left: "78%", size: 140, dur: "24s", delay: "-4s", spin: "28s", rx: "65deg" },
    { type: "orb", top: "55%", left: "12%", size: 100, dur: "22s", delay: "-8s", spin: "20s" },
    { type: "cube", top: "70%", left: "65%", size: 48, dur: "26s", delay: "-2s", spin: "16s", rx: "50deg" },
    { type: "ring", top: "8%", left: "45%", size: 90, dur: "19s", delay: "-6s", spin: "24s", rx: "40deg" },
    { type: "orb", top: "38%", left: "88%", size: 70, dur: "21s", delay: "-10s", spin: "22s" },
  ];

  return (
    <div className="scene-3d-bg" aria-hidden="true">
      <div className="scene-3d-grid" />
      {shapes.map((s, i) => (
        <div
          key={i}
          className={`shape-3d shape-${s.type}`}
          style={{
            top: s.top,
            left: s.left,
            "--size": `${s.size}px`,
            "--dur": s.dur,
            "--delay": s.delay,
            "--spin-dur": s.spin,
            "--rx": s.rx || "25deg",
          }}
        >
          <div className="shape-3d-inner" />
        </div>
      ))}
    </div>
  );
}
