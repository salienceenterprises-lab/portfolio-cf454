"use client";
import React from "react";
import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaEnvelope, FaGlobe } from "react-icons/fa";

const FONT_SERIF = '"Playfair Display", Georgia, serif';
const FONT_BODY  = '"Lora", Georgia, serif';

export default function PortfolioFooter({ data }) {
  const year = new Date().getFullYear();

  const socials = [
    { icon: <FaGithub size={15} />,   href: data?.github,   label: "GitHub" },
    { icon: <FaLinkedin size={15} />, href: data?.linkedin, label: "LinkedIn" },
    { icon: <FaEnvelope size={15} />, href: data?.email ? `mailto:${data.email}` : null, label: "Email" },
    { icon: <FaGlobe size={15} />,    href: data?.website,  label: "Website" },
  ].filter((s) => s.href);

  const navLinks = ["About", "Experience", "Work", "Expertise", "Contact"];
  const hrefs    = ["#about", "#experience", "#projects", "#skills", "#contact"];

  return (
    <footer style={{ background: "#F5F3EF", borderTop: "1px solid #E8E5E0", padding: "4rem 2.5rem 2rem" }}>

      {/* Top rule with ornament */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, ease: [0.25, 1, 0.5, 1] }}
        style={{ height: "1px", background: "#E0DBD4", marginBottom: "3rem", transformOrigin: "center" }}
      />

      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-start", justifyContent: "space-between", gap: "2.5rem", marginBottom: "3rem" }}>

          {/* Brand */}
          <div>
            <div style={{ fontFamily: FONT_SERIF, fontSize: "20px", fontWeight: 700, color: "#1A1A18", letterSpacing: "-0.02em", marginBottom: "6px" }}>
              {data?.name || "Portfolio"}
              <span style={{ color: "#C0BCB6", fontStyle: "italic", fontWeight: 400 }}>.</span>
            </div>
            {data?.title && (
              <div style={{ fontFamily: FONT_BODY, fontSize: "11px", color: "#A8A49E", letterSpacing: "0.15em", textTransform: "uppercase", fontStyle: "italic" }}>
                {data.title}
              </div>
            )}
          </div>

          {/* Nav */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "2rem" }}>
            {navLinks.map((label, i) => (
              <a key={label} href={hrefs[i]}
                style={{ fontFamily: FONT_BODY, fontSize: "11px", letterSpacing: "0.18em", textTransform: "uppercase", color: "#A8A49E", textDecoration: "none", transition: "color 0.2s" }}
                onMouseEnter={(e) => e.currentTarget.style.color = "#1A1A18"}
                onMouseLeave={(e) => e.currentTarget.style.color = "#A8A49E"}
              >
                {label}
              </a>
            ))}
          </div>

          {/* Socials */}
          <div style={{ display: "flex", gap: "10px" }}>
            {socials.map((s, i) => (
              <a key={i} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label}
                style={{ width: "36px", height: "36px", border: "1px solid #E8E5E0", display: "flex", alignItems: "center", justifyContent: "center", color: "#C0BCB6", textDecoration: "none", transition: "all 0.25s" }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#1A1A18"; e.currentTarget.style.color = "#1A1A18"; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#E8E5E0"; e.currentTarget.style.color = "#C0BCB6"; }}
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Bottom */}
        <div style={{ height: "1px", background: "#E8E5E0", marginBottom: "1.5rem" }} />
        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "1rem" }}>
          <p style={{ fontFamily: FONT_BODY, fontSize: "11px", fontStyle: "italic", color: "#A8A49E", margin: 0 }}>
            © {year} {data?.name}. All rights reserved.
          </p>
          <p style={{ fontFamily: FONT_BODY, fontSize: "11px", color: "#A8A49E", margin: 0 }}>
            Built with{" "}
            <span style={{ color: "#1A1A18", fontStyle: "italic" }}>Salience</span>
            {" "}✦
          </p>
        </div>
      </div>
    </footer>
  );
}
