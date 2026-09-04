import { useEffect, useRef, useState } from "react";
import { gsap } from "../lib/scroll.js";

export default function Preloader({ onDone }) {
  const [pct, setPct] = useState(0);
  const rootRef = useRef(null);

  useEffect(() => {
    const counter = { v: 0 };
    const tl = gsap.timeline({
      onComplete: () => {
        gsap.to(rootRef.current, {
          yPercent: -100,
          duration: 0.9,
          ease: "power4.inOut",
          onComplete: onDone,
        });
      },
    });
    tl.to(counter, {
      v: 100,
      duration: 1.6,
      ease: "power2.inOut",
      onUpdate: () => setPct(Math.round(counter.v)),
    });

    return () => tl.kill();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="preloader" ref={rootRef}>
      <div className="preloader-mark">
        <span>Rishi Web</span>
        <span className="preloader-dot" />
      </div>
      <div className="preloader-count">{pct}%</div>
    </div>
  );
}
