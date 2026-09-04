const BoltIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor"><path d="M13 2 4 14h6l-1 8 9-12h-6l1-8Z" /></svg>
);
const ShieldIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round">
    <path d="M12 3 4 6v6c0 4.5 3.2 7.6 8 9 4.8-1.4 8-4.5 8-9V6l-8-3Z" />
    <path d="m9 12 2 2 4-4" strokeLinecap="round" />
  </svg>
);
const ChartIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 20V10M12 20V4M20 20v-7" />
  </svg>
);
const LayoutIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="16" rx="2" />
    <path d="M3 9h18M9 9v11" />
  </svg>
);
const CodeIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="m9 8-4 4 4 4M15 8l4 4-4 4" />
  </svg>
);
const AbstractMark = () => (
  <svg viewBox="0 0 100 100" fill="none">
    <circle cx="38" cy="42" r="26" fill="rgba(255,255,255,0.24)" />
    <circle cx="66" cy="60" r="17" fill="rgba(255,255,255,0.18)" />
    <circle cx="60" cy="30" r="8" fill="rgba(255,255,255,0.3)" />
  </svg>
);
const RocketIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14.5 3c2 1 4 3 5 5-1 4-4 7-8 9l-3-3c2-4 5-7 9-8-2 1-4 3-5 5" />
    <circle cx="14" cy="10" r="1.6" />
    <path d="M6 15c-2 1-2 4-2 4s3 0 4-2M9 18c0 1-1 2-1 2" />
  </svg>
);
const StarIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.5 15 9l7 1-5.2 5 1.3 7-6.1-3.4L5.9 22l1.3-7L2 10l7-1 3-6.5Z" /></svg>
);

const THEMES = {
  grow: {
    brand: "Acme Co.",
    links: ["Work", "About", "Contact"],
    title: "Grow your business",
    sub: "online, faster than ever.",
    cta: "Get Started",
    features: [
      { icon: <BoltIcon />, label: "Fast" },
      { icon: <ShieldIcon />, label: "Secure" },
      { icon: <ChartIcon />, label: "Scalable" },
    ],
    sectionTitle: "Why teams choose us",
    testimonials: [
      { initial: "S", name: "Sara K.", quote: "Doubled our leads in a month." },
      { initial: "I", name: "Imran A.", quote: "Fastest launch we've had." },
    ],
    footerCols: ["Product", "Company", "Support"],
  },
  studio: {
    brand: "Nova Studio",
    links: ["Projects", "Studio", "Book"],
    title: "Design that performs",
    sub: "built for modern brands.",
    cta: "View Work",
    features: [
      { icon: <LayoutIcon />, label: "Design" },
      { icon: <CodeIcon />, label: "Build" },
      { icon: <RocketIcon />, label: "Launch" },
    ],
    sectionTitle: "Recent projects",
    testimonials: [
      { initial: "F", name: "Fen", quote: "Brand identity + site" },
      { initial: "K", name: "Kilo", quote: "E-commerce rebuild" },
    ],
    footerCols: ["Work", "Studio", "Contact"],
  },
};

export default function MiniSite({ variant = "desktop", theme = "grow" }) {
  const t = THEMES[theme] ?? THEMES.grow;
  const testimonials = variant === "mobile" ? t.testimonials : [...t.testimonials, t.testimonials[0]];

  return (
    <div className={`mini-site mini-site-${variant} mini-site-${theme}`}>
      <div className="bp-nav" data-build-block>
        <span className="bp-nav-dot" />
        <span className="bp-nav-brand">{t.brand}</span>
        {variant === "desktop" && (
          <span className="bp-nav-links">
            {t.links.map((l) => <span key={l}>{l}</span>)}
          </span>
        )}
      </div>
      <div className="bp-hero">
        <div className="bp-hero-copy">
          <div className="bp-title" data-build-block>{t.title}</div>
          <div className="bp-sub" data-build-block>{t.sub}</div>
          <div className="bp-btn" data-build-block>{t.cta}</div>
        </div>
        <div className="bp-image" data-build-block>
          <AbstractMark />
        </div>
      </div>
      <div className="bp-cards">
        {t.features.map((f) => (
          <div className="bp-card" data-build-block key={f.label}>
            <span className="bp-card-icon-badge"><span className="bp-card-icon">{f.icon}</span></span>
            <span className="bp-card-label">{f.label}</span>
          </div>
        ))}
      </div>
      <div className="bp-section">
        <div className="bp-section-title" data-build-block>{t.sectionTitle}</div>
        <div className="bp-row">
          {testimonials.map((item, i) => (
            <div className="bp-row-card" data-build-block key={i}>
              <span className="bp-row-stars">
                {Array.from({ length: 5 }).map((_, s) => <StarIcon key={s} />)}
              </span>
              <span className="bp-row-quote">{item.quote}</span>
              <span className="bp-row-person">
                <span className="bp-row-avatar">{item.initial}</span>
                <span className="bp-row-name">{item.name}</span>
              </span>
            </div>
          ))}
        </div>
      </div>
      <div className="bp-footer" data-build-block>
        <span className="bp-footer-brand">{t.brand}</span>
        <span className="bp-footer-links">
          {t.footerCols.map((c) => <span key={c}>{c}</span>)}
        </span>
      </div>
    </div>
  );
}
