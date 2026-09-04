import { gsap } from "../lib/scroll.js";
import { WA_LINK, EMAIL, PHONE_DISPLAY, INSTAGRAM } from "../constants.js";
import { WaIcon, MailIcon, InstagramIcon } from "./icons.jsx";
import { useReveal } from "../lib/useReveal.js";

export default function Footer({ logoMark }) {
  const ref = useReveal("[data-reveal]", { y: 18, stagger: 0.05, start: "top 95%" });

  const onLinkEnter = (e) => {
    gsap.to(e.currentTarget, { x: 6, color: "var(--accent)", duration: 0.3, ease: "power2.out" });
    const svg = e.currentTarget.querySelector("svg");
    if (svg) gsap.to(svg, { color: "var(--accent)", rotate: -8, duration: 0.3, ease: "power2.out" });
  };
  const onLinkLeave = (e) => {
    gsap.to(e.currentTarget, { x: 0, color: "var(--ink-dim)", duration: 0.3, ease: "power2.out" });
    const svg = e.currentTarget.querySelector("svg");
    if (svg) gsap.to(svg, { color: "var(--ink-faint)", rotate: 0, duration: 0.3, ease: "power2.out" });
  };

  return (
    <footer>
      <div className="wrap" ref={ref}>
        <div className="footer-inner">
          <div className="footer-col" data-reveal>
            <img className="footer-logo" src={logoMark} alt="Rishi Web Studios" />
            <p>Custom React websites for Dubai businesses. Websites crafted, not copied.</p>
          </div>
          <div className="footer-col" data-reveal>
            <h4>Explore</h4>
            <div className="footer-links">
              <a href="#work" data-reveal onMouseEnter={onLinkEnter} onMouseLeave={onLinkLeave}>Work</a>
              <a href="#process" data-reveal onMouseEnter={onLinkEnter} onMouseLeave={onLinkLeave}>Process</a>
              <a href="#pricing" data-reveal onMouseEnter={onLinkEnter} onMouseLeave={onLinkLeave}>Pricing</a>
              <a href="#faq" data-reveal onMouseEnter={onLinkEnter} onMouseLeave={onLinkLeave}>FAQ</a>
            </div>
          </div>
          <div className="footer-col" data-reveal>
            <h4>Contact</h4>
            <div className="footer-links">
              <a href={WA_LINK} target="_blank" rel="noopener noreferrer" data-reveal onMouseEnter={onLinkEnter} onMouseLeave={onLinkLeave}><WaIcon />{PHONE_DISPLAY}</a>
              <a href={`mailto:${EMAIL}`} data-reveal onMouseEnter={onLinkEnter} onMouseLeave={onLinkLeave}><MailIcon />{EMAIL}</a>
              <a href={INSTAGRAM} target="_blank" rel="noopener noreferrer" data-reveal onMouseEnter={onLinkEnter} onMouseLeave={onLinkLeave}><InstagramIcon />@rishi_webstudios</a>
            </div>
          </div>
        </div>
        <div className="footer-bottom" data-reveal>
          <span>&copy; {new Date().getFullYear()} Rishi Web Studios. All rights reserved.</span>
          <span>Dubai, UAE &amp; India</span>
        </div>
      </div>
    </footer>
  );
}
