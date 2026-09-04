import { useState } from "react";
import Magnetic from "./Magnetic.jsx";
import WhatsappButton from "./WhatsappButton.jsx";
import { SunIcon, MoonIcon } from "./icons.jsx";

export default function Nav({ theme, setTheme, logoMark }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
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
          <Magnetic>
            <WhatsappButton>Chat on WhatsApp</WhatsappButton>
          </Magnetic>
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
            className="mobile-menu-theme"
            onClick={() => setTheme((t) => (t === "dark" ? "light" : "dark"))}
          >
            <span className="mobile-menu-theme-label">
              {theme === "dark" ? <SunIcon /> : <MoonIcon />}
              Switch to {theme === "dark" ? "light" : "dark"} mode
            </span>
            <span className={`mobile-menu-theme-switch${theme === "dark" ? " is-dark" : ""}`} aria-hidden="true">
              <span className="mobile-menu-theme-knob" />
            </span>
          </button>
        </div>
      )}
    </nav>
  );
}
