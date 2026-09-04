import { useEffect, useRef } from "react";
import { gsap } from "./scroll.js";

/**
 * Splits an element's text into word spans for a kinetic reveal (mask +
 * rise), without needing a paid SplitText plugin. Caller drives the actual
 * from/to tween (see useReveal / ChapterBreak) — this just prepares the DOM.
 */
export function splitKineticWords(el) {
  const words = el.textContent.trim().split(/\s+/).filter(Boolean);
  el.innerHTML = words
    .map((w) => `<span class="kinetic-word"><span class="kinetic-word-inner">${w}</span></span>`)
    .join(" ");
  return el.querySelectorAll(".kinetic-word-inner");
}

/**
 * Reveals the elements matched by `selector` (and word-splits/reveals any
 * element matched by `kinetic`) inside the returned ref, scrubbed directly
 * to scroll position between `start` and `end` — same mechanism as
 * ChapterBreak's headline reveal. Scrolling down plays it forward, scrolling
 * back up reverses it, instead of a one-shot "fade in and stay" reveal.
 */
export function useReveal(selector = "[data-reveal]", { y = 40, stagger = 0.09, start = "top 88%", end = "top 45%", kinetic = "[data-kinetic]" } = {}) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const targets = el.querySelectorAll(selector);
    const kineticTargets = kinetic ? el.querySelectorAll(kinetic) : [];
    if (!targets.length && !kineticTargets.length) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: { trigger: el, start, end, scrub: 0.6 },
      });

      if (targets.length) {
        tl.fromTo(targets, { opacity: 0, y }, { opacity: 1, y: 0, stagger, ease: "power2.out" }, 0);
      }
      kineticTargets.forEach((t) => {
        const inners = splitKineticWords(t);
        tl.fromTo(inners, { yPercent: 115, opacity: 0 }, { yPercent: 0, opacity: 1, stagger: 0.04, ease: "power2.out" }, 0);
      });
    }, el);

    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selector, y, stagger, start, end, kinetic]);

  return ref;
}
