import { useEffect, useRef } from "react";
import { gsap } from "../lib/scroll.js";

export default function Marquee({ items, speed = 42 }) {
  const trackRef = useRef(null);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const width = el.scrollWidth / 2;
    const tween = gsap.to(el, {
      x: -width,
      duration: width / speed,
      ease: "none",
      repeat: -1,
    });
    return () => tween.kill();
  }, [speed]);

  const content = [...items, ...items];

  return (
    <div className="marquee">
      <div className="marquee-track" ref={trackRef}>
        {content.map((item, i) => (
          <span className="marquee-item" key={i}>
            {item}
            <span className="marquee-sep">&#10022;</span>
          </span>
        ))}
      </div>
    </div>
  );
}
