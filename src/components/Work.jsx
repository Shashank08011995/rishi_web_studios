import { useEffect, useRef } from "react";
import { gsap } from "../lib/scroll.js";
import { splitKineticWords } from "../lib/useReveal.js";
import BrowserFrame from "./BrowserFrame.jsx";
import { ExternalIcon } from "./icons.jsx";

const cases = [
  {
    src: "/assets/bunkeshwar_shot.jpg",
    alt: "Bunkeshwar Retreats website",
    tags: ["React", "Booking flow", "Editorial design"],
    title: "Bunkeshwar Retreats",
    body: "A four-day retreat brand built around a bold, reality-show aesthetic instead of the usual wellness-brand cliché. Every section carries the same tension the retreat itself is built on.",
    href: "https://www.bunkeshwar.com",
  },
  {
    src: "/assets/rishikesh_shot.jpg",
    alt: "Experience Rishikesh website",
    tags: ["React", "Live data", "WhatsApp booking"],
    title: "Experience Rishikesh",
    body: "A live storefront for Tapovan's cafes, treks, and experiences — real-time venue status, one-tap WhatsApp booking, and a map that updates as the day changes.",
    href: "https://experiencerishikesh.com/",
  },
];

export default function Work() {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const ctx = gsap.context(() => {
      const headline = section.querySelector(".section-head h2");
      const revealEls = section.querySelectorAll(".section-head [data-reveal]");
      if (headline) {
        const inners = splitKineticWords(headline);
        const headTl = gsap.timeline({
          scrollTrigger: { trigger: section, start: "top 90%", end: "top 50%", scrub: 0.6 },
        });
        headTl.fromTo(inners, { yPercent: 115, opacity: 0 }, { yPercent: 0, opacity: 1, stagger: 0.04, ease: "power2.out" }, 0);
        if (revealEls.length) {
          headTl.fromTo(revealEls, { opacity: 0, y: 20 }, { opacity: 1, y: 0, stagger: 0.1, ease: "power2.out" }, 0.1);
        }
      }

      // Below 860px each case switches to a stacked (image-on-top) layout
      // that's much taller than the pinned viewport — horizontally
      // scroll-jacking it there clips the tall content vertically instead
      // of revealing it. Let cases sit in normal document flow on mobile
      // and give each its own simple reveal instead of the horizontal pin.
      //
      // gsap.matchMedia (rather than a one-off window.matchMedia check)
      // re-evaluates this on resize and auto-reverts the losing branch —
      // otherwise a viewport change after mount could leave the desktop
      // horizontal pin active while CSS has already switched the cases to
      // the stacked mobile layout, scroll-jacking them into a dead zone
      // that never reveals the second case.
      const mm = gsap.matchMedia();

      mm.add("(max-width: 860px)", () => {
        track.querySelectorAll(".case").forEach((caseEl) => {
          gsap.fromTo(
            caseEl,
            { opacity: 0, y: 40 },
            {
              opacity: 1,
              y: 0,
              ease: "power2.out",
              scrollTrigger: { trigger: caseEl, start: "top 88%", end: "top 55%", scrub: 0.6 },
            }
          );
        });
      });

      mm.add("(min-width: 861px)", () => {
        const distance = track.scrollWidth - section.offsetWidth;
        if (distance <= 0) return;

        const tween = gsap.to(track, {
          x: -distance,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: () => `+=${distance + window.innerHeight * 0.4}`,
            scrub: 0.6,
            pin: true,
            invalidateOnRefresh: true,
          },
        });

        track.querySelectorAll(".case-media img").forEach((img) => {
          gsap.fromTo(
            img,
            { scale: 1.16 },
            {
              scale: 1,
              ease: "none",
              scrollTrigger: {
                trigger: img,
                containerAnimation: tween,
                start: "left 92%",
                end: "left 25%",
                scrub: true,
              },
            }
          );
        });

        return () => tween.kill();
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section id="work" className="work-section" ref={sectionRef}>
      <div className="work-pin">
        <div className="section-head wrap">
          <span className="section-tag" data-reveal>Selected work</span>
          <h2>Recent work</h2>
          <p data-reveal>Two live projects, two completely different industries.</p>
        </div>
        <div className="work-track" ref={trackRef}>
          {cases.map((c) => (
            <div className="case" key={c.title}>
              <div className="case-media">
                <BrowserFrame src={c.src} alt={c.alt} tall />
              </div>
              <div className="case-copy">
                <div className="case-tags">
                  {c.tags.map((t) => (
                    <span className="case-tag" key={t}>{t}</span>
                  ))}
                </div>
                <h3>{c.title}</h3>
                <p>{c.body}</p>
                <a className="case-link" href={c.href} target="_blank" rel="noopener noreferrer">
                  Visit the live site
                  <ExternalIcon />
                </a>
              </div>
            </div>
          ))}
          <div className="work-track-end">
            <p>Your project could be next.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
