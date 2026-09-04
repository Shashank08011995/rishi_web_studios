import { useRef } from "react";
import { gsap } from "../lib/scroll.js";
import { useReveal } from "../lib/useReveal.js";
import Magnetic from "./Magnetic.jsx";
import WhatsappButton from "./WhatsappButton.jsx";

const faqs = [
  { q: "Do I own the website once it's built?", a: "Yes. Once the project is paid in full, the complete codebase is yours. We can transfer the repository and hosting project directly to your own accounts." },
  { q: "What about hosting and a domain?", a: "Domain and hosting are arranged directly by you and kept separate from the build price. We'll guide you through deployment once your site is ready." },
  { q: "What if I need more pages than my plan covers?", a: "Extra pages beyond your plan's limit are billed at AED 300 per page. Need something much larger — an online store or a booking system? Message us for a custom quote." },
  { q: "How do changes after launch work?", a: "Post-launch updates and ongoing maintenance are billed at AED 200 per hour rather than a fixed monthly fee, so you only pay for the work you actually need." },
  { q: "How is this different from a WordPress site?", a: "Your site is hand-built in React rather than assembled from templates and plugins — which means it loads faster, carries no plugin security risk, and doesn't break with every update." },
];

export default function FAQ() {
  const ref = useReveal("[data-reveal]", { y: 20, stagger: 0.06 });
  const numRefs = useRef([]);
  const toggleRefs = useRef([]);
  const vLineRefs = useRef([]);
  const openState = useRef([]);

  const activate = (i) => {
    gsap.to(numRefs.current[i], { backgroundColor: "var(--accent)", color: "var(--bg-deep)", borderColor: "var(--accent)", duration: 0.35, ease: "power2.out" });
    gsap.to(toggleRefs.current[i], { borderColor: "var(--accent)", backgroundColor: "var(--accent-glow-soft)", duration: 0.35, ease: "power2.out" });
  };
  const deactivate = (i) => {
    gsap.to(numRefs.current[i], { backgroundColor: "transparent", color: "var(--accent)", borderColor: "var(--line-strong)", duration: 0.35, ease: "power2.out" });
    gsap.to(toggleRefs.current[i], { borderColor: "var(--line-strong)", backgroundColor: "transparent", duration: 0.35, ease: "power2.out" });
  };

  const onEnter = (i, e) => {
    gsap.to(e.currentTarget, { backgroundColor: "var(--bg-panel)", duration: 0.3, ease: "power2.out" });
    if (!openState.current[i]) activate(i);
  };
  const onLeave = (i, e) => {
    gsap.to(e.currentTarget, { backgroundColor: "transparent", duration: 0.3, ease: "power2.out" });
    if (!openState.current[i]) deactivate(i);
  };
  const onToggle = (i, e) => {
    const isOpen = e.currentTarget.open;
    openState.current[i] = isOpen;
    gsap.to(vLineRefs.current[i], { rotate: isOpen ? 90 : 0, scaleY: isOpen ? 0 : 1, duration: 0.4, ease: "power3.inOut" });
    if (isOpen) activate(i);
    else deactivate(i);
  };

  return (
    <section id="faq">
      <div className="wrap" ref={ref}>
        <div className="section-head" data-reveal>
          <span className="section-tag">FAQ</span>
          <h2 data-kinetic>Questions people actually ask</h2>
        </div>
        <div className="faq-list">
          {faqs.map((item, i) => (
            <details
              className="faq-item"
              data-reveal
              key={item.q}
              onMouseEnter={(e) => onEnter(i, e)}
              onMouseLeave={(e) => onLeave(i, e)}
              onToggle={(e) => onToggle(i, e)}
            >
              <summary>
                <span className="faq-num" ref={(el) => (numRefs.current[i] = el)}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="faq-q">{item.q}</span>
                <span className="faq-toggle" ref={(el) => (toggleRefs.current[i] = el)} aria-hidden="true">
                  <span className="faq-toggle-h" />
                  <span className="faq-toggle-v" ref={(el) => (vLineRefs.current[i] = el)} />
                </span>
              </summary>
              <p>{item.a}</p>
            </details>
          ))}
        </div>
        <div className="faq-cta" data-reveal>
          <span>Still have questions?</span>
          <Magnetic>
            <WhatsappButton className="btn btn-ghost btn-sm">Ask us on WhatsApp</WhatsappButton>
          </Magnetic>
        </div>
      </div>
    </section>
  );
}
