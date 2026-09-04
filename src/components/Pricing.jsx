import { gsap } from "../lib/scroll.js";
import { useReveal } from "../lib/useReveal.js";
import Magnetic from "./Magnetic.jsx";
import TiltCard from "./TiltCard.jsx";
import WhatsappButton from "./WhatsappButton.jsx";
import { CheckIcon } from "./icons.jsx";

const LeafIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 20c8 0 16-4 16-16-12 0-16 8-16 16Z" /><path d="M4 20c2-6 6-10 12-12" />
  </svg>
);
const FlameIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22c4 0 7-3 7-7 0-3-2-5-3-7-.5 2-1.5 3-2.5 3 .5-3-1-5-3.5-7 0 3-1.5 4.5-3.5 6.5C5 12.5 5 15 5 15c0 4 3 7 7 7Z" />
  </svg>
);
const CrownIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="m3 8 4 3 5-7 5 7 4-3-2 11H5L3 8Z" />
  </svg>
);

const pricingPlans = [
  {
    name: "Starter",
    tag: "For getting online fast",
    icon: <LeafIcon />,
    price: "1,499",
    pages: "Up to 3 pages",
    features: [
      "Up to 3 custom-designed pages",
      "Fully responsive on every device",
      "WhatsApp enquiry built into every page",
      "One round of revisions included",
      "Delivered in 3–5 business days",
    ],
  },
  {
    name: "Growth",
    tag: "Our most chosen package",
    icon: <FlameIcon />,
    price: "2,499",
    pages: "Up to 8 pages",
    featured: true,
    features: [
      "Up to 8 custom-designed pages, built in React",
      "Fully responsive on every device",
      "WhatsApp enquiry built into every page",
      "One round of revisions included",
      "Delivered in 5–8 business days",
    ],
  },
  {
    name: "Business",
    tag: "For brands that need more",
    icon: <CrownIcon />,
    price: "2,999",
    pages: "Up to 12 pages",
    premium: true,
    features: [
      "Up to 12 custom-designed pages, built in React",
      "Fully responsive on every device",
      "WhatsApp enquiry built into every page",
      "One round of revisions included",
      "Delivered in 7–10 business days",
    ],
  },
];

const addOns = [
  { label: "Extra page beyond your plan", price: "AED 300 / page" },
  { label: "Ongoing maintenance & support", price: "AED 200 / hour" },
];

export default function Pricing() {
  const ref = useReveal("[data-reveal]", { y: 34, stagger: 0.1 });

  const onEnter = (e) => {
    gsap.to(e.currentTarget, { y: -6, duration: 0.4, ease: "power3.out" });
  };
  const onLeave = (e) => {
    gsap.to(e.currentTarget, { y: 0, duration: 0.4, ease: "power2.out" });
  };

  return (
    <section id="pricing">
      <div className="wrap" ref={ref}>
        <div className="section-head" data-reveal>
          <span className="section-tag">Investment</span>
          <h2 data-kinetic>Pricing</h2>
          <p>Three straightforward packages, priced by page count.</p>
        </div>
        <div className="pricing-grid">
          {pricingPlans.map((plan) => (
            <TiltCard
              className={`pricing-card${plan.featured ? " featured" : ""}${plan.premium ? " premium" : ""}`}
              data-reveal
              key={plan.name}
              onMouseEnter={onEnter}
              onMouseLeave={onLeave}
            >
              {plan.featured && <span className="pricing-badge">Most popular</span>}
              {plan.premium && <span className="pricing-badge pricing-badge-gold">Full package</span>}
              <div className="pricing-card-body">
                <span className="pricing-watermark" aria-hidden="true">{plan.icon}</span>
                <div className="pricing-head">
                  <span className="pricing-icon">{plan.icon}</span>
                  <div>
                    <h3 className="pricing-plan-name">{plan.name}</h3>
                    <p className="pricing-tag">{plan.tag}</p>
                  </div>
                </div>
                <div className="pricing-amount">
                  <span className="pricing-currency">AED</span> {plan.price}
                  <span className="pricing-period"> / project</span>
                </div>
                <div className="pricing-pages">{plan.pages}</div>
                <ul className="pricing-list">
                  {plan.features.map((f) => (
                    <li key={f}><CheckIcon /> {f}</li>
                  ))}
                </ul>
                <Magnetic className="pricing-cta-wrap">
                  <WhatsappButton>Get started on WhatsApp</WhatsappButton>
                </Magnetic>
              </div>
            </TiltCard>
          ))}
        </div>
        <div className="pricing-addons" data-reveal>
          {addOns.map((a) => (
            <div className="pricing-addon" key={a.label}>
              <span>{a.label}</span>
              <b>{a.price}</b>
            </div>
          ))}
        </div>
        <p className="pricing-note" data-reveal>
          Domain and hosting are arranged directly by you at deployment,
          kept separate from these prices. Need something much larger — an
          online store or a booking system? Message us for a custom quote.
        </p>
      </div>
    </section>
  );
}
