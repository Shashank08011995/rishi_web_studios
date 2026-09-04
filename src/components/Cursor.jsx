import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function Cursor() {
  const [hovering, setHovering] = useState(false);
  const [visible, setVisible] = useState(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const springX = useSpring(x, { stiffness: 500, damping: 40, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 500, damping: 40, mass: 0.4 });

  useEffect(() => {
    const isCoarse = window.matchMedia("(pointer: coarse)").matches;
    if (isCoarse) return;

    const move = (e) => {
      x.set(e.clientX);
      y.set(e.clientY);
      if (!visible) setVisible(true);
    };
    const over = (e) => {
      setHovering(!!e.target.closest("a, button, summary, [data-cursor-hover]"));
    };

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", over);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible]);

  if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) return null;

  return (
    <motion.div
      className="cursor-ring"
      style={{ x: springX, y: springY, opacity: visible ? 0.75 : 0 }}
      animate={{ scale: hovering ? 1.8 : 1 }}
      transition={{ scale: { type: "spring", stiffness: 300, damping: 20 } }}
    />
  );
}
