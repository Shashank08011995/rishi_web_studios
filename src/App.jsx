import { useState, useEffect } from "react";

const WA_NUMBER = "918920101994";
const WA_LINK =
  `https://wa.me/${WA_NUMBER}?text=` +
  encodeURIComponent("Hi Rishi Web Studios, I'd like to get a website built.");
const EMAIL = "contact@rishiwebstudios.com";
const PHONE_DISPLAY = "+91 89201 01994";
const INSTAGRAM = "https://www.instagram.com/rishi_webstudios/";

const WaIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5.1-1.3A10 10 0 1 0 12 2zm5.6 14.3c-.2.7-1.4 1.3-2 1.4-.5.1-1.1.1-1.8-.1-.4-.1-1-.3-1.6-.6-2.9-1.3-4.8-4.2-4.9-4.4-.1-.2-1.2-1.6-1.2-3s.7-2.1 1-2.4c.2-.3.5-.4.7-.4h.5c.2 0 .4 0 .6.4.2.5.7 1.8.8 1.9.1.2.1.3 0 .5-.1.2-.1.3-.3.5-.1.2-.3.3-.4.5-.1.2-.3.3-.1.6.2.3.8 1.3 1.7 2.1 1.2 1 2.1 1.4 2.4 1.5.3.1.5.1.6-.1.2-.2.7-.8.9-1.1.2-.3.4-.2.6-.1.2.1 1.5.7 1.8.8.3.1.4.2.5.3 0 .2 0 .8-.2 1.4z" />
  </svg>
);

const CheckIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const ExternalIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    <polyline points="15 3 21 3 21 9" />
    <line x1="10" y1="14" x2="21" y2="3" />
  </svg>
);

const SunIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="4.5" />
    <line x1="12" y1="1.5" x2="12" y2="4" />
    <line x1="12" y1="20" x2="12" y2="22.5" />
    <line x1="4.2" y1="4.2" x2="5.9" y2="5.9" />
    <line x1="18.1" y1="18.1" x2="19.8" y2="19.8" />
    <line x1="1.5" y1="12" x2="4" y2="12" />
    <line x1="20" y1="12" x2="22.5" y2="12" />
    <line x1="4.2" y1="19.8" x2="5.9" y2="18.1" />
    <line x1="18.1" y1="5.9" x2="19.8" y2="4.2" />
  </svg>
);

const MoonIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 14.5A8.5 8.5 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5z" />
  </svg>
);

const MailIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2.5" y="4.5" width="19" height="15" rx="2.5" />
    <path d="M3 6.5 12 13l9-6.5" />
  </svg>
);

const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4.2" />
    <circle cx="17.4" cy="6.6" r="1.1" fill="currentColor" stroke="none" />
  </svg>
);

function BrowserFrame({ src, alt, tall = false }) {
  return (
    <div className="browser-frame">
      <div className="browser-bar">
        <span className="browser-dot" />
        <span className="browser-dot" />
        <span className="browser-dot" />
      </div>
      <div className="browser-window" style={tall ? { height: 360 } : undefined}>
        <img src={src} alt={alt} />
      </div>
    </div>
  );
}

function WhatsappButton({ children = "Chat on WhatsApp" }) {
  return (
    <a className="btn btn-wa" href={WA_LINK} target="_blank" rel="noopener noreferrer">
      <WaIcon />
      {children}
    </a>
  );
}

const included = [
  { title: "Fully custom design", body: "No drag-and-drop builders bolted together, no recycled template with your logo swapped in." },
  { title: "Built in React", body: "Modern and fast under the hood — not another WordPress install held together by plugins." },
  { title: "Fully responsive", body: "Checked and adjusted on phone, tablet, and desktop before anything goes live." },
  { title: "WhatsApp-first contact", body: "Every enquiry lands straight in your WhatsApp — not a form buried in an inbox nobody checks." },
  { title: "Delivered in 3–10 days", body: "From brief to live site, without months of back-and-forth or missed deadlines." },
  { title: "One revision round included", body: "Built into the price, so the first version you see is never the last word." },
];

const process = [
  { title: "Tell us what you need", body: "Message us on WhatsApp with what your business does and what the site needs to cover." },
  { title: "We design & build", body: "Your site gets built in React around your brief — not assembled from a recycled template." },
  { title: "One round of revisions", body: "We adjust based on your feedback before anything goes live." },
  { title: "Live in 3–10 days", body: "Your new site goes live and ready for visitors, start to finish." },
];

const pricingPlans = [
  {
    name: "Starter",
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
    price: "2,999",
    pages: "Up to 12 pages",
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

const faqs = [
  { q: "Do I own the website once it's built?", a: "Yes. Once the project is paid in full, the complete codebase is yours. We can transfer the repository and hosting project directly to your own accounts." },
  { q: "What about hosting and a domain?", a: "Domain and hosting are arranged directly by you and kept separate from the build price. We'll guide you through deployment once your site is ready." },
  { q: "What if I need more pages than my plan covers?", a: "Extra pages beyond your plan's limit are billed at AED 300 per page. Need something much larger — an online store or a booking system? Message us for a custom quote." },
  { q: "How do changes after launch work?", a: "Post-launch updates and ongoing maintenance are billed at AED 200 per hour rather than a fixed monthly fee, so you only pay for the work you actually need." },
  { q: "How is this different from a WordPress site?", a: "Your site is hand-built in React rather than assembled from templates and plugins — which means it loads faster, carries no plugin security risk, and doesn't break with every update." },
];

export default function App() {
  const [theme, setTheme] = useState("dark");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("rws-theme");
    if (saved) {
      setTheme(saved);
    } else if (window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches) {
      setTheme("light");
    }
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("rws-theme", theme);
  }, [theme]);

  const logoMark = theme === "dark" ? "/assets/logo-dark.png" : "/assets/logo-light.png";

  return (
    <>
      <nav className="nav">
        <div className="wrap nav-inner">
          <a href="#top" className="nav-logo-link">
            <img className="nav-logo" src={logoMark} alt="Rishi Web Studios" />
          </a>
          <div className="nav-links">
            <a href="#work">Work</a>
            <a href="#process">Process</a>
            <a href="#pricing">Pricing</a>
            <a href="#faq">FAQ</a>
          </div>
          <div className="nav-right">
            <button
              className="theme-toggle"
              aria-label="Toggle theme"
              onClick={() => setTheme((t) => (t === "dark" ? "light" : "dark"))}
            >
              {theme === "dark" ? <SunIcon /> : <MoonIcon />}
            </button>
            <WhatsappButton>Chat on WhatsApp</WhatsappButton>
          </div>
          <button
            className="nav-toggle-btn"
            aria-label="Menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
          >
            {menuOpen ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <line x1="6" y1="6" x2="18" y2="18" />
                <line x1="18" y1="6" x2="6" y2="18" />
              </svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            )}
          </button>
        </div>
        {menuOpen && (
          <div className="mobile-menu">
            <a href="#work" onClick={() => setMenuOpen(false)}>Work</a>
            <a href="#process" onClick={() => setMenuOpen(false)}>Process</a>
            <a href="#pricing" onClick={() => setMenuOpen(false)}>Pricing</a>
            <a href="#faq" onClick={() => setMenuOpen(false)}>FAQ</a>
            <button
              onClick={() => { setTheme((t) => (t === "dark" ? "light" : "dark")); }}
              style={{ textAlign: "left" }}
            >
              Switch to {theme === "dark" ? "light" : "dark"} mode
            </button>
          </div>
        )}
      </nav>

      <main id="top">
        <header className="hero">
          <div className="wrap hero-grid">
            <div className="hero-copy">
              <h1>Fast, custom websites — built in React, not templates.</h1>
              <p className="lead">
                Rishi Web Studios designs and builds websites for Dubai
                businesses that need more than a drag-and-drop template.
                Every site is coded from scratch, fully responsive, and
                live in days.
              </p>
              <div className="hero-cta-row">
                <WhatsappButton />
                <div className="price-pill">
                  Starting at <b>AED 1,499</b>
                </div>
              </div>
              <div className="hero-meta">
                <div className="hero-meta-item"><b>3&ndash;10 days</b>Turnaround</div>
                <div className="hero-meta-item"><b>React</b>Hand-built, not templated</div>
                <div className="hero-meta-item"><b>1 revision</b>Included in the price</div>
              </div>
            </div>
            <BrowserFrame src="/assets/bunkeshwar_shot.jpg" alt="Bunkeshwar Retreats website" />
          </div>
        </header>

        <div className="trust-strip" style={{ borderTop: "1px solid var(--line)", borderBottom: "1px solid var(--line)", padding: "22px 0" }}>
          <div className="wrap" style={{ textAlign: "center", fontSize: 17, color: "var(--ink-dim)", fontStyle: "italic" }}>
            "Websites crafted, not copied."
          </div>
        </div>

        <section id="included">
          <div className="wrap">
            <div className="section-head">
              <h2>What's actually included</h2>
              <p>No hidden line items. This is what every project ships with, every time.</p>
            </div>
            <div className="included">
              {included.map((item, i) => (
                <div className="included-item" key={item.title}>
                  <span className="included-num">{String(i + 1).padStart(2, "0")}</span>
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="work">
          <div className="wrap">
            <div className="section-head">
              <h2>Recent work</h2>
              <p>Two live projects, two completely different industries.</p>
            </div>

            <div className="case">
              <div className="case-media">
                <BrowserFrame src="/assets/bunkeshwar_shot.jpg" alt="Bunkeshwar Retreats website" tall />
              </div>
              <div className="case-copy">
                <div className="case-tags">
                  <span className="case-tag">React</span>
                  <span className="case-tag">Booking flow</span>
                  <span className="case-tag">Editorial design</span>
                </div>
                <h3>Bunkeshwar Retreats</h3>
                <p>
                  A four-day retreat brand built around a bold, reality-show
                  aesthetic instead of the usual wellness-brand cliché. Every
                  section carries the same tension the retreat itself is
                  built on.
                </p>
                <a className="case-link" href="https://www.bunkeshwar.com" target="_blank" rel="noopener noreferrer">
                  Visit the live site
                  <ExternalIcon />
                </a>
              </div>
            </div>

            <div className="case">
              <div className="case-media">
                <BrowserFrame src="/assets/rishikesh_shot.jpg" alt="Experience Rishikesh website" tall />
              </div>
              <div className="case-copy">
                <div className="case-tags">
                  <span className="case-tag">React</span>
                  <span className="case-tag">Live data</span>
                  <span className="case-tag">WhatsApp booking</span>
                </div>
                <h3>Experience Rishikesh</h3>
                <p>
                  A live storefront for Tapovan's cafes, treks, and
                  experiences &mdash; real-time venue status, one-tap
                  WhatsApp booking, and a map that updates as the day
                  changes.
                </p>
                <a className="case-link" href="https://experiencerishikesh.com/" target="_blank" rel="noopener noreferrer">
                  Visit the live site
                  <ExternalIcon />
                </a>
              </div>
            </div>
          </div>
        </section>

        <section id="process">
          <div className="wrap">
            <div className="section-head">
              <h2>How a project runs</h2>
              <p>Four steps, start to live site.</p>
            </div>
            <div className="process-list">
              {process.map((step, i) => (
                <div className="process-item" key={step.title}>
                  <div className="process-num">{String(i + 1).padStart(2, "0")}</div>
                  <div>
                    <h3>{step.title}</h3>
                    <p>{step.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="pricing">
          <div className="wrap">
            <div className="section-head">
              <h2>Pricing</h2>
              <p>Three straightforward packages, priced by page count.</p>
            </div>
            <div className="pricing-grid">
              {pricingPlans.map((plan) => (
                <div className={`pricing-card${plan.featured ? " featured" : ""}`} key={plan.name}>
                  {plan.featured && <span className="pricing-badge">Most popular</span>}
                  <h3 className="pricing-plan-name">{plan.name}</h3>
                  <div className="pricing-amount">AED {plan.price} <span>/ project</span></div>
                  <div className="pricing-pages">{plan.pages}</div>
                  <ul className="pricing-list">
                    {plan.features.map((f) => (
                      <li key={f}><CheckIcon /> {f}</li>
                    ))}
                  </ul>
                  <WhatsappButton>Get started on WhatsApp</WhatsappButton>
                </div>
              ))}
            </div>
            <div className="pricing-addons">
              {addOns.map((a) => (
                <div className="pricing-addon" key={a.label}>
                  <span>{a.label}</span>
                  <b>{a.price}</b>
                </div>
              ))}
            </div>
            <p className="pricing-note">
              Domain and hosting are arranged directly by you at deployment,
              kept separate from these prices. Need something much larger —
              an online store or a booking system? Message us for a custom
              quote.
            </p>
          </div>
        </section>

        <section id="faq">
          <div className="wrap">
            <div className="section-head">
              <h2>Questions people actually ask</h2>
            </div>
            <div className="faq-list">
              {faqs.map((item) => (
                <details className="faq-item" key={item.q}>
                  <summary>{item.q}</summary>
                  <p>{item.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <div className="closing">
          <div className="wrap">
            <h2>Ready to build yours?</h2>
            <p>Message us on WhatsApp and we'll get started today.</p>
            <div className="hero-cta-row">
              <WhatsappButton />
              <div className="price-pill">Starting at <b>AED 1,499</b></div>
            </div>
          </div>
        </div>
      </main>

      <footer>
        <div className="wrap">
          <div className="footer-inner">
            <div className="footer-col">
              <img className="footer-logo" src={logoMark} alt="Rishi Web Studios" />
              <p>Custom React websites for Dubai businesses. Websites crafted, not copied.</p>
            </div>
            <div className="footer-col">
              <h4>Explore</h4>
              <div className="footer-links">
                <a href="#work">Work</a>
                <a href="#process">Process</a>
                <a href="#pricing">Pricing</a>
                <a href="#faq">FAQ</a>
              </div>
            </div>
            <div className="footer-col">
              <h4>Contact</h4>
              <div className="footer-links">
                <a href={WA_LINK} target="_blank" rel="noopener noreferrer"><WaIcon />{PHONE_DISPLAY}</a>
                <a href={`mailto:${EMAIL}`}><MailIcon />{EMAIL}</a>
                <a href={INSTAGRAM} target="_blank" rel="noopener noreferrer"><InstagramIcon />@rishi_webstudios</a>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <span>&copy; {new Date().getFullYear()} Rishi Web Studios. All rights reserved.</span>
            <span>Dubai, UAE &amp; India</span>
          </div>
        </div>
      </footer>

      <div className="mobile-wa">
        <WhatsappButton>Chat on WhatsApp</WhatsappButton>
      </div>
    </>
  );
}
