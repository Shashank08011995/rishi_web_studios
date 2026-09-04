import { useReveal } from "../lib/useReveal.js";
import Magnetic from "./Magnetic.jsx";
import WhatsappButton from "./WhatsappButton.jsx";
import TypingDots from "./TypingDots.jsx";

const STATS = ["4.9/5 average rating", "Reply within minutes", "3–10 day turnaround"];

export default function Closing() {
  const ref = useReveal("[data-reveal]", { y: 24, stagger: 0.1 });

  return (
    <div className="closing" ref={ref}>
      <span className="closing-blob closing-blob-a" aria-hidden="true" />
      <span className="closing-blob closing-blob-b" aria-hidden="true" />
      <div className="wrap">
        <div className="closing-typing-badge" data-reveal>
          <TypingDots />
          <span data-kinetic>We usually reply in minutes</span>
        </div>
        <h2 data-kinetic>Ready to build yours?</h2>
        <p data-kinetic>Message us on WhatsApp and we'll get started today.</p>
        <div className="hero-cta-row" data-reveal>
          <Magnetic>
            <WhatsappButton />
          </Magnetic>
          <div className="price-pill">Starting at <b>AED 1,499</b></div>
        </div>
        <div className="closing-stats">
          {STATS.map((s) => (
            <span className="closing-stat" data-reveal key={s}>{s}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
