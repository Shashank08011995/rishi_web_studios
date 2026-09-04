import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "../lib/scroll.js";
import { useReveal } from "../lib/useReveal.js";

const icons = {
  message: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 20l1.4-4.2A8 8 0 1 1 9 19.4L4 20Z" />
    </svg>
  ),
  build: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="m9 8-4 4 4 4M15 8l4 4-4 4" />
    </svg>
  ),
  revise: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 12a9 9 0 0 1 15.3-6.4L21 8" />
      <path d="M21 3v5h-5" />
      <path d="M21 12a9 9 0 0 1-15.3 6.4L3 16" />
      <path d="M3 21v-5h5" />
    </svg>
  ),
  launch: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14.5 3c2 1 4 3 5 5-1 4-4 7-8 9l-3-3c2-4 5-7 9-8-2 1-4 3-5 5" />
      <circle cx="14" cy="10" r="1.6" />
      <path d="M6 15c-2 1-2 4-2 4s3 0 4-2M9 18c0 1-1 2-1 2" />
    </svg>
  ),
};

const steps = [
  { title: "Tell us what you need", body: "Message us on WhatsApp with what your business does and what the site needs to cover.", icon: icons.message },
  { title: "We design & build", body: "Your site gets built in React around your brief — not assembled from a recycled template.", icon: icons.build },
  { title: "One round of revisions", body: "We adjust based on your feedback before anything goes live.", icon: icons.revise },
  { title: "Live in 3–10 days", body: "Your new site goes live and ready for visitors, start to finish.", icon: icons.launch },
];

export default function Process() {
  const listRef = useReveal("[data-reveal]", { y: 24, stagger: 0.1 });
  const progressRef = useRef(null);
  const iconRefs = useRef([]);

  const onEnter = (i) => {
    gsap.to(iconRefs.current[i], {
      scale: 1.06, backgroundColor: "var(--accent)", color: "var(--bg-deep)", borderColor: "var(--accent)",
      duration: 0.4, ease: "back.out(2)",
    });
  };
  const onLeave = (i) => {
    gsap.to(iconRefs.current[i], {
      scale: 1, backgroundColor: "var(--bg-deep)", color: "var(--accent)", borderColor: "var(--line-strong)",
      duration: 0.4, ease: "power2.out",
    });
  };

  useEffect(() => {
    const list = listRef.current;
    const timeline = list?.querySelector(".process-timeline");
    const bar = progressRef.current;
    if (!timeline || !bar) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        bar,
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: "none",
          scrollTrigger: {
            trigger: timeline,
            start: "top 70%",
            end: "bottom 60%",
            scrub: 0.4,
          },
        }
      );
    }, list);

    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section id="process">
      <div className="wrap" ref={listRef}>
        <div className="section-head" data-reveal>
          <span className="section-tag">The process</span>
          <h2 data-kinetic>How a project runs</h2>
          <p>Four steps, start to live site.</p>
        </div>
        <div className="process-timeline">
          <span className="process-track" aria-hidden="true">
            <span className="process-track-fill" ref={progressRef} />
          </span>
          {steps.map((step, i) => (
            <div
              className="process-step"
              data-reveal
              key={step.title}
              onMouseEnter={() => onEnter(i)}
              onMouseLeave={() => onLeave(i)}
            >
              <span className="process-icon" ref={(el) => (iconRefs.current[i] = el)}>
                {step.icon}
                <span className="process-step-num">{String(i + 1).padStart(2, "0")}</span>
              </span>
              <div className="process-step-copy">
                <h3>{step.title}</h3>
                <p>{step.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
