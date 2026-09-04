import { useEffect, useState } from "react";
import { useSmoothScroll, ScrollTrigger } from "./lib/scroll.js";
import Preloader from "./components/Preloader.jsx";
import Cursor from "./components/Cursor.jsx";
import Nav from "./components/Nav.jsx";
import Hero from "./components/Hero.jsx";
import Marquee from "./components/Marquee.jsx";
import TrustStrip from "./components/TrustStrip.jsx";
import ChapterBreak from "./components/ChapterBreak.jsx";
import Capabilities from "./components/Capabilities.jsx";
import Work from "./components/Work.jsx";
import Process from "./components/Process.jsx";
import Pricing from "./components/Pricing.jsx";
import FAQ from "./components/FAQ.jsx";
import Closing from "./components/Closing.jsx";
import Footer from "./components/Footer.jsx";
import WhatsappButton from "./components/WhatsappButton.jsx";

const MARQUEE_ITEMS = [
  "Custom React builds",
  "Fully responsive",
  "WhatsApp-first",
  "Live in days, not months",
  "Crafted, not copied",
];

export default function App() {
  const [theme, setTheme] = useState("light");
  const [loading, setLoading] = useState(true);
  const [ready, setReady] = useState(false);

  useSmoothScroll();

  useEffect(() => {
    const saved = localStorage.getItem("rws-theme");
    if (saved) setTheme(saved);
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("rws-theme", theme);
  }, [theme]);

  useEffect(() => {
    if (!ready) return;
    const t = setTimeout(() => ScrollTrigger.refresh(), 300);
    return () => clearTimeout(t);
  }, [ready]);

  const logoMark = theme === "dark" ? "/assets/logo-dark.png" : "/assets/logo-light.png";

  return (
    <>
      <Cursor />
      {loading && (
        <Preloader
          onDone={() => {
            setLoading(false);
            setReady(true);
          }}
        />
      )}

      <Nav theme={theme} setTheme={setTheme} logoMark={logoMark} />

      <main>
        <Hero ready={ready} />

        <Marquee items={MARQUEE_ITEMS} />

        <TrustStrip />

        <ChapterBreak
          index={1}
          label="The Problem"
          tone="deep"
          lines={["Every business gets", "handed the same site."]}
        />

        <Capabilities />

        <ChapterBreak
          index={2}
          label="The Proof"
          tone="panel"
          lines={["We don't just say", "hand-coded. We show it."]}
        />

        <Work />
        <Process />
        <Pricing />
        <FAQ />

        <ChapterBreak
          index={3}
          label="Your Move"
          tone="deep"
          lines={["Your competitors are still", "using a template."]}
        />

        <Closing />
      </main>

      <Footer logoMark={logoMark} />

      <div className="mobile-wa">
        <WhatsappButton>Chat on WhatsApp</WhatsappButton>
      </div>
    </>
  );
}
