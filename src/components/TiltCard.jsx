import { useEffect, useRef } from "react";
import { gsap } from "../lib/scroll.js";

export default function TiltCard({ children, className, strength = 10, onMouseEnter, onMouseLeave, ...rest }) {
  const ref = useRef(null);
  const quick = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    quick.current = {
      rx: gsap.quickTo(el, "rotationX", { duration: 0.5, ease: "power3.out" }),
      ry: gsap.quickTo(el, "rotationY", { duration: 0.5, ease: "power3.out" }),
    };
    gsap.set(el, { transformPerspective: 900 });
  }, []);

  const handleMove = (e) => {
    const el = ref.current;
    if (!el || !quick.current) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    quick.current.ry(px * strength);
    quick.current.rx(-py * strength);
  };

  const handleLeave = (e) => {
    quick.current?.rx(0);
    quick.current?.ry(0);
    onMouseLeave?.(e);
  };

  return (
    <div
      ref={ref}
      className={className}
      onMouseMove={handleMove}
      onMouseEnter={onMouseEnter}
      onMouseLeave={handleLeave}
      {...rest}
    >
      {children}
    </div>
  );
}
