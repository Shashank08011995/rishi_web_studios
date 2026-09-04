import { useReveal } from "../lib/useReveal.js";

export default function TrustStrip() {
  const ref = useReveal("[data-reveal]", { y: 16, stagger: 0.08 });

  return (
    <div className="trust-strip" ref={ref}>
      <div className="wrap trust-strip-inner">
        <span className="trust-quote-mark" data-reveal aria-hidden="true">&#8220;</span>
        <span data-kinetic>Websites crafted, not copied.</span>
      </div>
    </div>
  );
}
