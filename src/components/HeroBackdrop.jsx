import { useEffect, useRef } from "react";
import { gsap } from "../lib/scroll.js";

const BLOBS = [
  { className: "blob blob-a", depth: 40 },
  { className: "blob blob-b", depth: 70 },
  { className: "blob blob-c", depth: 25 },
];

export default function HeroBackdrop() {
  const rootRef = useRef(null);
  const blobRefs = useRef([]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const blobSetters = blobRefs.current.map((el, i) =>
      el
        ? {
            x: gsap.quickTo(el, "x", { duration: 1.1, ease: "power3.out" }),
            y: gsap.quickTo(el, "y", { duration: 1.1, ease: "power3.out" }),
            depth: BLOBS[i].depth,
          }
        : null
    );

    const onMove = (e) => {
      const rect = root.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width - 0.5;
      const py = (e.clientY - rect.top) / rect.height - 0.5;
      blobSetters.forEach((qs) => {
        if (!qs) return;
        qs.x(px * qs.depth);
        qs.y(py * qs.depth);
      });
    };

    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  return (
    <div className="hero-backdrop" ref={rootRef} aria-hidden="true">
      {BLOBS.map((b, i) => (
        <div className={b.className} key={b.className} ref={(el) => (blobRefs.current[i] = el)} />
      ))}
      <svg className="hero-dots" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice">
        <g className="hero-dots-g">
          {Array.from({ length: 36 }).map((_, i) => {
            const x = (i % 9) * 180 + 60 + ((i % 3) * 24);
            const y = Math.floor(i / 9) * 220 + 90;
            return <circle key={i} cx={x} cy={y} r="2" />;
          })}
        </g>
      </svg>
    </div>
  );
}
