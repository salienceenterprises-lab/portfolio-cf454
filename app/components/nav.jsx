"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const FONT_SERIF = '"Playfair Display", Georgia, serif';
const FONT_BODY  = '"Lora", Georgia, serif';

export default function PortfolioNav({ data }) {
  const [scrolled, setScrolled]     = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [active, setActive]         = useState("");

  const allLinks = [
    { label: "About",      href: "#about",      key: "about" },
    { label: "Education",  href: "#education",  key: "education" },
    { label: "Experience", href: "#experience", key: "experience" },
    { label: "Work",       href: "#projects",   key: "projects" },
    { label: "Expertise",  href: "#skills",     key: "skills" },
    { label: "Impact",     href: "#community",  key: "community" },
    { label: "Contact",    href: "#contact",    key: "contact" },
  ];

  const activeLinks = allLinks.filter((l) => {
    if (l.label === "About") return true;
    if (l.key === "contact") return !!(data?.email || data?.github || data?.linkedin);
    const d = data?.[l.key];
    return Array.isArray(d) ? d.length > 0 : !!d;
  });

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 60);
      const ids = activeLinks.map((l) => l.href.replace("#", ""));
      const sorted = ids
        .map((id) => document.getElementById(id))
        .filter(Boolean)
        .sort((a, b) => a.offsetTop - b.offsetTop);
      let current = sorted[0]?.id ?? "";
      for (let i = sorted.length - 1; i >= 0; i--) {
        if (window.scrollY >= sorted[i].offsetTop - 130) { current = sorted[i].id; break; }
      }
      setActive(current);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (e, href) => {
    e.preventDefault();
    setMobileOpen(false);
    const el = document.getElementById(href.replace("#", ""));
    if (el) window.scrollTo({ top: el.offsetTop - 72, behavior: "smooth" });
  };

  const resumeHref = data?.resumeBase64
    ? `data:application/pdf;base64,${data.resumeBase64}`
    : (data?.resume || data?.resumeUrl || null);

  return (
    <>
      <style>{`
        .pr-link {
          position: relative; text-decoration: none;
          font-family: ${FONT_BODY}; font-size: 11px; font-weight: 400;
          letter-spacing: 0.18em; text-transform: uppercase;
          color: #6B6860; transition: color 0.25s;
        }
        .pr-link::after {
          content: ''; position: absolute; bottom: -3px; left: 0; right: 0;
          height: 1px; background: #1A1A18;
          transform: scaleX(0); transform-origin: left;
          transition: transform 0.3s cubic-bezier(0.4,0,0.2,1);
        }
        .pr-link:hover, .pr-link.pr-active { color: #1A1A18; }
        .pr-link:hover::after, .pr-link.pr-active::after { transform: scaleX(1); }
      `}</style>

      <motion.nav
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.25, 1, 0.5, 1] }}
        style={{
          position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
          background: scrolled ? "rgba(250,250,248,0.96)" : "transparent",
          backdropFilter: scrolled ? "blur(12px)" : "none",
          borderBottom: scrolled ? "1px solid #E8E5E0" : "1px solid transparent",
          transition: "all 0.4s ease",
        }}
      >
        <div className="pr-nav-inner" style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 2.5rem", height: "68px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>

          {/* Logo */}
          <a href="#about" onClick={(e) => go(e, "#about")} style={{ textDecoration: "none" }}>
            <span style={{ fontFamily: FONT_SERIF, fontSize: "17px", fontWeight: 700, color: "#1A1A18", letterSpacing: "-0.02em" }}>
              {data?.name?.split(" ")[0] || "Portfolio"}
              <span style={{ color: "#A8A49E", fontStyle: "italic", fontWeight: 400 }}>.</span>
            </span>
          </a>

          {/* Desktop links */}
          <div className="pr-desktop-links">
            {activeLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => go(e, link.href)}
                className={`pr-link${active === link.href.replace("#", "") ? " pr-active" : ""}`}
              >
                {link.label}
              </a>
            ))}
            {resumeHref && (
              <a
                href={resumeHref} download="Resume.pdf"
                style={{
                  fontFamily: FONT_BODY, fontSize: "11px", fontWeight: 400,
                  letterSpacing: "0.18em", textTransform: "uppercase",
                  color: "#1A1A18", textDecoration: "none",
                  borderBottom: "1px solid #1A1A18", paddingBottom: "1px",
                  transition: "opacity 0.2s",
                }}
                onMouseEnter={(e) => e.currentTarget.style.opacity = "0.5"}
                onMouseLeave={(e) => e.currentTarget.style.opacity = "1"}
              >
                Résumé
              </a>
            )}
          </div>

          {/* Mobile hamburger */}
          <button
            className="pr-hamburger"
            onClick={() => setMobileOpen(!mobileOpen)}
            style={{ background: "none", border: "none", cursor: "pointer", padding: "8px", color: "#1A1A18", flexDirection: "column", gap: "5px", alignItems: "center", justifyContent: "center" }}
            aria-label="Menu"
          >
            <div style={{ width: "22px", display: "flex", flexDirection: "column", gap: "5px" }}>
              <span style={{ display: "block", height: "1px", background: "currentColor", transition: "all 0.3s", transform: mobileOpen ? "rotate(45deg) translate(4px, 4px)" : "none" }} />
              <span style={{ display: "block", height: "1px", background: "currentColor", transition: "all 0.3s", opacity: mobileOpen ? 0 : 1 }} />
              <span style={{ display: "block", height: "1px", background: "currentColor", transition: "all 0.3s", transform: mobileOpen ? "rotate(-45deg) translate(4px, -4px)" : "none" }} />
            </div>
          </button>
        </div>

        {/* Mobile drawer */}
        <div style={{ display: mobileOpen ? "block" : "none" }}>
          <div style={{ background: "rgba(250,250,248,0.98)", borderBottom: "1px solid #E8E5E0", padding: "1.5rem 1.25rem 2rem" }}>
            {activeLinks.map((link, i) => {
              const isActive = active === link.href.replace("#", "");
              return (
                <a
                  key={link.href} href={link.href}
                  onClick={(e) => go(e, link.href)}
                  style={{
                    display: "block", padding: "12px 0",
                    borderBottom: i < activeLinks.length - 1 ? "1px solid #E8E5E0" : "none",
                    borderLeft: isActive ? "2px solid #1A1A18" : "2px solid transparent",
                    paddingLeft: "12px",
                    fontFamily: FONT_BODY, fontSize: "12px",
                    letterSpacing: "0.18em", textTransform: "uppercase",
                    color: isActive ? "#1A1A18" : "#6B6860", textDecoration: "none",
                    transition: "color 0.2s",
                  }}
                >
                  {link.label}
                </a>
              );
            })}
            {resumeHref && (
              <a href={resumeHref} download="Resume.pdf"
                style={{
                  display: "inline-flex", alignItems: "center", gap: "8px",
                  marginTop: "1.5rem", padding: "10px 18px",
                  border: "1px solid #1A1A18",
                  fontFamily: FONT_BODY, fontSize: "11px",
                  letterSpacing: "0.18em", textTransform: "uppercase",
                  color: "#1A1A18", textDecoration: "none",
                }}
              >
                Download Résumé
              </a>
            )}
          </div>
        </div>
      </motion.nav>
    </>
  );
}
