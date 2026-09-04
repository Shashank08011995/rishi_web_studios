import { useRef } from "react";
import { gsap } from "../lib/scroll.js";
import { useReveal } from "../lib/useReveal.js";

const items = [
  {
    title: "Fully custom design",
    body: "No drag-and-drop builders bolted together, no recycled template with your logo swapped in.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 3 3 8l9 5 9-5-9-5Z" />
        <path d="M3 16l9 5 9-5" />
        <path d="M3 12l9 5 9-5" />
      </svg>
    ),
  },
  {
    title: "Built in React",
    body: "Modern and fast under the hood — not another WordPress install held together by plugins.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="2.2" fill="currentColor" stroke="none" />
        <ellipse cx="12" cy="12" rx="9" ry="3.8" />
        <ellipse cx="12" cy="12" rx="9" ry="3.8" transform="rotate(60 12 12)" />
        <ellipse cx="12" cy="12" rx="9" ry="3.8" transform="rotate(120 12 12)" />
      </svg>
    ),
  },
  {
    title: "Fully responsive",
    body: "Checked and adjusted on phone, tablet, and desktop before anything goes live.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2.5" y="5" width="13" height="10" rx="1.4" />
        <rect x="17" y="8" width="4.5" height="11" rx="1" />
      </svg>
    ),
  },
  {
    title: "WhatsApp-first contact",
    body: "Every enquiry lands straight in your WhatsApp — not a form buried in an inbox nobody checks.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 20l1.4-4.2A8 8 0 1 1 9 19.4L4 20Z" />
      </svg>
    ),
  },
  {
    title: "Delivered in 3–10 days",
    body: "From brief to live site, without months of back-and-forth or missed deadlines.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="8.5" />
        <path d="M12 7v5l3.5 2" />
      </svg>
    ),
  },
  {
    title: "One revision round included",
    body: "Built into the price, so the first version you see is never the last word.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 12a9 9 0 0 1 15.3-6.4L21 8" />
        <path d="M21 3v5h-5" />
        <path d="M21 12a9 9 0 0 1-15.3 6.4L3 16" />
        <path d="M3 21v-5h5" />
      </svg>
    ),
  },
];

export default function Capabilities() {
  const ref = useReveal("[data-reveal]", { y: 30, stagger: 0.07 });
  const barRefs = useRef([]);
  const numRefs = useRef([]);
  const iconRefs = useRef([]);

  const onEnter = (i, e) => {
    gsap.to(e.currentTarget, { y: -6, boxShadow: "0 24px 48px var(--shadow)", duration: 0.4, ease: "power3.out" });
    gsap.to(barRefs.current[i], { scaleX: 1, duration: 0.5, ease: "power3.out" });
    gsap.to(numRefs.current[i], { color: "var(--accent-glow)", duration: 0.4 });
    gsap.to(iconRefs.current[i], {
      scale: 1.1, rotate: -6, backgroundColor: "var(--accent)", color: "var(--bg-deep)",
      duration: 0.4, ease: "back.out(2)",
    });
  };
  const onLeave = (i, e) => {
    gsap.to(e.currentTarget, { y: 0, boxShadow: "0 0 0 var(--shadow)", duration: 0.4, ease: "power2.out" });
    gsap.to(barRefs.current[i], { scaleX: 0, duration: 0.4, ease: "power2.in" });
    gsap.to(numRefs.current[i], { color: "var(--line-strong)", duration: 0.4 });
    gsap.to(iconRefs.current[i], {
      scale: 1, rotate: 0, backgroundColor: "var(--accent-glow-soft)", color: "var(--accent)",
      duration: 0.4, ease: "power2.out",
    });
  };

  return (
    <section id="included">
      <div className="wrap" ref={ref}>
        <div className="section-head" data-reveal>
          <span className="section-tag">What you get</span>
          <h2 data-kinetic>What's actually included</h2>
          <p>No hidden line items. This is what every project ships with, every time.</p>
        </div>
        <div className="included">
          {items.map((item, i) => (
            <div
              className="included-item"
              data-reveal
              key={item.title}
              onMouseEnter={(e) => onEnter(i, e)}
              onMouseLeave={(e) => onLeave(i, e)}
            >
              <span className="included-bar" ref={(el) => (barRefs.current[i] = el)} />
              <span className="included-num" ref={(el) => (numRefs.current[i] = el)}>
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="included-icon" ref={(el) => (iconRefs.current[i] = el)}>
                {item.icon}
              </span>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
