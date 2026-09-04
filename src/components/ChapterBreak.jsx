import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "../lib/scroll.js";

export default function ChapterBreak({ index, label, lines, tone = "deep" }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      const words = el.querySelectorAll(".chapter-word");
      const tag = el.querySelector(".chapter-tag");
      const bigNum = el.querySelector(".chapter-bignum");

      gsap.set(words, { yPercent: 100, opacity: 0 });
      gsap.set(tag, { opacity: 0, y: 16 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: "top 70%",
          end: "top 20%",
          scrub: 0.6,
        },
      });

      tl.to(tag, { opacity: 1, y: 0, duration: 0.3, ease: "power2.out" })
        .to(words, { yPercent: 0, opacity: 1, duration: 0.5, stagger: 0.12, ease: "power3.out" }, "-=0.15");

      if (bigNum) {
        gsap.to(bigNum, {
          yPercent: -14,
          ease: "none",
          scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: 0.6 },
        });
      }
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <div className={`chapter-break tone-${tone}`} ref={ref}>
      <span className="chapter-bignum" aria-hidden="true">{String(index).padStart(2, "0")}</span>
      <div className="wrap chapter-inner">
        <span className="chapter-tag">{String(index).padStart(2, "0")} — {label}</span>
        <h2 className="chapter-statement">
          {lines.map((line, li) => (
            <span className="chapter-line" key={li}>
              {line.split(" ").map((word, wi) => (
                <span className="chapter-word-mask" key={wi}>
                  <span className="chapter-word">{word}</span>
                </span>
              ))}
            </span>
          ))}
        </h2>
      </div>
    </div>
  );
}
