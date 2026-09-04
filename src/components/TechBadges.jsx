import { useEffect, useRef } from "react";
import { gsap } from "../lib/scroll.js";

const OrbitIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <circle cx="12" cy="12" r="1.8" fill="currentColor" stroke="none" />
    <ellipse cx="12" cy="12" rx="9.5" ry="4" />
    <ellipse cx="12" cy="12" rx="9.5" ry="4" transform="rotate(60 12 12)" />
    <ellipse cx="12" cy="12" rx="9.5" ry="4" transform="rotate(120 12 12)" />
  </svg>
);
const EaseIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round">
    <path d="M3 18C7 18 8 6 12 6s5 12 9 12" />
    <circle cx="3" cy="18" r="1.4" fill="currentColor" stroke="none" />
    <circle cx="21" cy="18" r="1.4" fill="currentColor" stroke="none" />
  </svg>
);
const BoltIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" stroke="none">
    <path d="M13 2 4 14h6l-1 8 9-12h-6l1-8Z" />
  </svg>
);
const WaveIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round">
    <path d="M2 12c2 0 2-5 4-5s2 5 4 5 2-5 4-5 2 5 4 5 2-5 4-5" />
  </svg>
);
const LayersIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" strokeLinecap="round">
    <path d="M12 3 2 8l10 5 10-5-10-5Z" />
    <path d="M2 16l10 5 10-5" />
    <path d="M2 12l10 5 10-5" />
  </svg>
);

const BADGES = [
  { icon: <OrbitIcon />, label: "React", detail: "Powers every component on this page.", className: "tb-a", depth: 26 },
  { icon: <EaseIcon />, label: "GSAP", detail: "Drives every scroll animation you're seeing.", className: "tb-b", depth: 40 },
  { icon: <LayersIcon />, label: "Framer Motion", detail: "Handles cursor and micro-interactions.", className: "tb-c", depth: 18 },
  { icon: <BoltIcon />, label: "Vite", detail: "Builds and bundles this site instantly.", className: "tb-d", depth: 32 },
  { icon: <WaveIcon />, label: "Lenis", detail: "The buttery-smooth scroll you're feeling.", className: "tb-e", depth: 22 },
];

export default function TechBadges() {
  const rootRef = useRef(null);
  const badgeRefs = useRef([]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const setters = badgeRefs.current.map((el, i) =>
      el
        ? {
            x: gsap.quickTo(el, "x", { duration: 1, ease: "power3.out" }),
            y: gsap.quickTo(el, "y", { duration: 1, ease: "power3.out" }),
            depth: BADGES[i].depth,
          }
        : null
    );

    const onMove = (e) => {
      const rect = root.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width - 0.5;
      const py = (e.clientY - rect.top) / rect.height - 0.5;
      setters.forEach((s) => {
        if (!s) return;
        s.x(px * s.depth);
        s.y(py * s.depth);
      });
    };

    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  return (
    <div className="tech-badges" ref={rootRef} data-hero-item>
      {BADGES.map((b, i) => (
        <span className={`tech-badge ${b.className}`} key={b.label} ref={(el) => (badgeRefs.current[i] = el)}>
          <span className="tech-badge-main">
            <span className="tech-badge-icon">{b.icon}</span>
            <span className="tech-badge-label">{b.label}</span>
          </span>
          <span className="tech-badge-detail">{b.detail}</span>
        </span>
      ))}
    </div>
  );
}
