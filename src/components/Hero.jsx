import { useEffect, useRef } from "react";
import { gsap } from "../lib/scroll.js";
import HeroBackdrop from "./HeroBackdrop.jsx";
import Magnetic from "./Magnetic.jsx";
import WhatsappButton from "./WhatsappButton.jsx";
import MiniSite from "./MiniSite.jsx";
import TechBadges from "./TechBadges.jsx";

const LINE_ONE = "Watch a website";
const CAROUSEL_PHRASES = ["build itself.", "sell while you sleep.", "grow your business.", "convert visitors."];

const LEAD =
  "Rishi Web Studios designs and builds custom React websites for businesses that refuse to look like everyone else. Every project is hand-coded, fully responsive, and live within days.";

export default function Hero({ ready }) {
  const heroRef = useRef(null);
  const headlineRef = useRef(null);
  const leadRef = useRef(null);
  const restRef = useRef(null);

  useEffect(() => {
    if (!ready) return;
    const words = headlineRef.current?.querySelectorAll(".hero-word");
    const leadWords = leadRef.current?.querySelectorAll(".hero-lead-word");
    const items = restRef.current?.querySelectorAll("[data-hero-item]");

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.15 });
      if (words?.length) {
        gsap.set(words, { yPercent: 105, opacity: 0 });
        tl.to(words, {
          yPercent: 0,
          opacity: 1,
          duration: 1,
          ease: "power4.out",
          stagger: 0.045,
        });
      }
      if (leadWords?.length) {
        gsap.set(leadWords, { opacity: 0, yPercent: 60 });
        tl.to(
          leadWords,
          { opacity: 1, yPercent: 0, duration: 0.5, ease: "power2.out", stagger: 0.012 },
          "-=0.5"
        );
      }
      if (items?.length) {
        gsap.set(items, { opacity: 0, y: 20 });
        tl.to(items, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", stagger: 0.1 }, "-=0.6");
      }

      const phone = heroRef.current?.querySelector(".hero-phone");
      if (phone) {
        gsap.set(phone, { autoAlpha: 0, scale: 0.7, y: 20 });
        tl.to(phone, { autoAlpha: 1, scale: 1, y: 0, duration: 0.6, ease: "back.out(1.5)" }, "-=0.5");
      }
    });

    return () => ctx.revert();
  }, [ready]);

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;

    // .hero-preview is display:none below 1080px (no room for the
    // laptop+phone showcase) — the pinned zoom sequence only exists above
    // that breakpoint. gsap.matchMedia (rather than a one-off
    // window.matchMedia check) re-runs this whenever the breakpoint is
    // crossed and automatically reverts the ScrollTrigger/pin-spacer when
    // it stops matching — otherwise a resize or devtools viewport change
    // after mount can leave a stale desktop pin-spacer (and 2.6
    // viewport-heights of dead pinned space) behind on a mobile-width page.
    const mm = gsap.matchMedia();

    mm.add("(min-width: 1081px)", () => {
      const copy = hero.querySelector(".hero-copy");
      const preview = hero.querySelector(".hero-preview");
      const laptop = hero.querySelector(".hero-laptop");
      const phone = hero.querySelector(".hero-phone");
      const screenContent = hero.querySelector(".laptop-screen-scroll .mini-site");
      const phoneContent = hero.querySelector(".hero-phone .mini-site");
      if (!preview || !laptop) return;

      // Measure the actual visible laptop+phone cluster (not the wider
      // .hero-preview box, which has empty space to its left since the
      // laptop is right-aligned within it) so centering lands precisely.
      const laptopRect = laptop.getBoundingClientRect();
      const phoneRect = phone ? phone.getBoundingClientRect() : laptopRect;
      const groupLeft = Math.min(laptopRect.left, phoneRect.left);
      const groupRight = Math.max(laptopRect.right, phoneRect.right);
      const groupTop = Math.min(laptopRect.top, phoneRect.top);
      const groupBottom = Math.max(laptopRect.bottom, phoneRect.bottom);
      // Center within the space BELOW the sticky nav, not the full
      // viewport — otherwise the nav (which stays on top during the
      // pin) covers the top of the zoomed group.
      const navHeight = document.querySelector(".nav")?.offsetHeight ?? 0;
      const availableCenterY = navHeight + (window.innerHeight - navHeight) / 2;

      const deltaX = window.innerWidth / 2 - (groupLeft + groupRight) / 2;
      const deltaY = availableCenterY - (groupTop + groupBottom) / 2;

      // The base CSS sets transform-origin: center right (for the old
      // subtle parallax scale). That makes GSAP's scale anchor to the
      // right edge instead of the true center, throwing the centering
      // math off — force it back to center for this animation.
      gsap.set(preview, { transformOrigin: "50% 50%" });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: hero,
          start: "top top",
          end: () => "+=" + window.innerHeight * 2.6,
          scrub: 0.6,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // Phase 1 — copy fades away, laptop + phone (and the floating tech
      // badges riding along as siblings inside .hero-preview) zoom in and
      // move to center together.
      tl.to(copy, { yPercent: -18, opacity: 0, ease: "power1.out", duration: 1 }, 0);
      tl.to(preview, { x: deltaX, y: deltaY, scale: 1.32, ease: "power2.inOut", duration: 1.4 }, 0.1);

      // Phase 2 — hold centered while the site scrolls inside both screens.
      if (screenContent) {
        tl.to(
          screenContent,
          { y: () => -(screenContent.offsetHeight - 280) - 40, ease: "none", duration: 3 },
          1.6
        );
      }
      if (phoneContent) {
        tl.to(
          phoneContent,
          { y: () => -(phoneContent.offsetHeight - 300) - 30, ease: "none", duration: 3 },
          1.6
        );
      }

      // Phase 3 — release: shrink back down as we hand off to the next section.
      tl.to(preview, { scale: 1.1, opacity: 0, ease: "power1.in", duration: 0.8 }, 4.8);
    });

    return () => mm.revert();
  }, []);

  return (
    <header className="hero" id="top" ref={heroRef}>
      <HeroBackdrop />
      <div className="wrap hero-inner hero-grid" ref={restRef}>
        <div className="hero-copy">
          <div className="hero-eyebrow-row" data-hero-item>
            <span className="hero-eyebrow">Rishi Web Studios</span>
            <span className="hero-status">
              <span className="hero-status-dot" />
              Open for new projects
            </span>
          </div>
          <h1 className="hero-headline" ref={headlineRef}>
            <span className="hero-line">
              {LINE_ONE.split(" ").map((word, wi) => (
                <span className="hero-word-mask" key={wi}>
                  <span className="hero-word">{word}</span>
                </span>
              ))}
            </span>
            <span className="hero-line hero-carousel">
              {CAROUSEL_PHRASES.map((phrase, pi) => (
                <span
                  className="hero-carousel-phrase"
                  key={pi}
                  style={{ animationDelay: `${pi * 3}s` }}
                >
                  {phrase}
                </span>
              ))}
            </span>
          </h1>

          <p className="hero-lead" ref={leadRef}>
            {LEAD.split(" ").map((word, i) => (
              <span className="hero-lead-word" key={i}>{word} </span>
            ))}
          </p>
          <div className="hero-cta-row" data-hero-item>
            <Magnetic>
              <WhatsappButton />
            </Magnetic>
            <div className="price-pill">
              Starting at <b>AED 1,499</b>
            </div>
          </div>
          <div className="scroll-cue" data-hero-item aria-hidden="true">
            <span>Scroll to see it in action</span>
            <span className="scroll-cue-line" />
          </div>
        </div>

        <div className="hero-preview" data-hero-item>
          <TechBadges />
          <div className="device-laptop hero-laptop">
            <div className="laptop-lid">
              <div className="laptop-screen">
                <div className="laptop-screen-scroll">
                  <MiniSite variant="desktop" theme="grow" />
                </div>
              </div>
            </div>
            <div className="laptop-base">
              <span className="laptop-notch" />
            </div>
          </div>

          <div className="device-phone hero-phone">
            <div className="phone-notch" />
            <div className="phone-screen">
              <MiniSite variant="mobile" theme="grow" />
            </div>
          </div>
        </div>

        <div className="hero-mobile-preview" data-hero-item>
          <div className="device-laptop hero-mobile-laptop">
            <div className="laptop-lid">
              <div className="laptop-screen">
                <div className="laptop-screen-scroll">
                  <MiniSite variant="desktop" theme="grow" />
                </div>
              </div>
            </div>
            <div className="laptop-base">
              <span className="laptop-notch" />
            </div>
          </div>
          <div className="device-phone hero-mobile-phone">
            <div className="phone-notch" />
            <div className="phone-screen">
              <MiniSite variant="mobile" theme="grow" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
