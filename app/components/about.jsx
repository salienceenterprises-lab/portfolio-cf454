"use client";
import React from "react";
import { motion } from "framer-motion";
import { FaMapMarkerAlt, FaEnvelope, FaGithub, FaLinkedin, FaGlobe } from "react-icons/fa";

const FONT_SERIF = '"Playfair Display", Georgia, serif';
const FONT_BODY  = '"Lora", Georgia, serif';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 36, filter: "blur(6px)" },
  whileInView: { opacity: 1, y: 0, filter: "blur(0px)" },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.85, ease: [0.25, 1, 0.5, 1], delay },
});

export default function PortfolioAbout({ data }) {
  if (!data) return null;

  const infoRows = [
    { label: "Location", value: data.location,  icon: <FaMapMarkerAlt />, link: null },
    { label: "Email",    value: data.email,      icon: <FaEnvelope />,    link: `mailto:${data.email}` },
    { label: "GitHub",   value: data.github ? "@" + data.github.split("/").pop() : null, icon: <FaGithub />, link: data.github },
    { label: "LinkedIn", value: data.linkedin ? "LinkedIn" : null, icon: <FaLinkedin />, link: data.linkedin },
    { label: "Website",  value: data.website,   icon: <FaGlobe />,       link: data.website },
  ].filter((r) => r.value);

  return (
    <section id="about" style={{ background: "#FAFAF8", padding: "8rem 2.5rem", position: "relative", overflow: "hidden" }}>

      {/* Background section number */}
      <motion.div
        initial={{ opacity: 0, x: 40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: [0.25, 1, 0.5, 1] }}
        style={{
          position: "absolute", right: "-2%", top: "50%", transform: "translateY(-50%)",
          fontFamily: FONT_SERIF, fontSize: "28vw", fontWeight: 700,
          color: "rgba(26,26,24,0.025)", lineHeight: 1,
          pointerEvents: "none", userSelect: "none", letterSpacing: "-0.05em",
        }}
      >
        01
      </motion.div>

      <div style={{ maxWidth: "1200px", margin: "0 auto", position: "relative", zIndex: 1 }}>

        {/* Section header */}
        <div style={{ marginBottom: "5rem" }}>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.25, 1, 0.5, 1] }}
            style={{ height: "1px", background: "#E8E5E0", marginBottom: "2rem", transformOrigin: "left" }}
          />
          <motion.div {...fadeUp(0)} style={{ display: "flex", alignItems: "baseline", gap: "1.5rem" }}>
            <span style={{ fontFamily: FONT_BODY, fontSize: "10px", letterSpacing: "0.3em", textTransform: "uppercase", color: "#A8A49E" }}>01</span>
            <h2 style={{ fontFamily: FONT_SERIF, fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 700, color: "#1A1A18", margin: 0, letterSpacing: "-0.03em" }}>
              About
            </h2>
          </motion.div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5rem", alignItems: "start" }}
          className="pr-two-col"
        >
          <style>{`@media (max-width: 767px) { .pr-two-col { display: block !important; gap: 0 !important; } }`}</style>

          {/* Bio */}
          <div>
            {/* Large opening quote */}
            <motion.div {...fadeUp(0.1)}>
              <div style={{ fontFamily: FONT_SERIF, fontSize: "6rem", lineHeight: 0.7, color: "#E8E5E0", marginBottom: "0.5rem", marginLeft: "-8px" }}>"</div>
              <p style={{
                fontFamily: FONT_BODY, fontSize: "clamp(1rem, 1.8vw, 1.15rem)",
                fontWeight: 300, fontStyle: "italic",
                color: "#4A4740", lineHeight: 1.9,
                margin: "0 0 2.5rem",
                borderLeft: "2px solid #E0D5CA",
                paddingLeft: "1.5rem",
              }}>
                {data.bio}
              </p>
            </motion.div>

            {/* Skills preview */}
            {data.skills?.length > 0 && (() => {
              const flatSkills = data.skills.flatMap((s) =>
                typeof s === "object" && s !== null && Array.isArray(s.items) ? s.items
                : typeof s === "object" && s !== null && Array.isArray(s.skills) ? s.skills
                : [s]
              ).filter(Boolean);
              if (!flatSkills.length) return null;
              const pastels = [
                { bg: "#F5DDD5", border: "#E8C4B8", text: "#7A4030" },
                { bg: "#D5E5D2", border: "#B8D4B4", text: "#2E5A2A" },
                { bg: "#D2DDE8", border: "#B4C8D8", text: "#2A4060" },
                { bg: "#E0D8F0", border: "#C8BCDC", text: "#4A3870" },
              ];
              return (
                <motion.div {...fadeUp(0.2)}>
                  <div style={{ fontFamily: FONT_BODY, fontSize: "9px", letterSpacing: "0.3em", textTransform: "uppercase", color: "#A8A49E", marginBottom: "1rem" }}>
                    Areas of Focus
                  </div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                    {flatSkills.slice(0, 8).map((skill, i) => {
                      const label = typeof skill === "string" ? skill : skill?.name || skill?.label || String(skill);
                      const p = pastels[i % pastels.length];
                      return (
                        <span key={i} style={{
                          padding: "5px 14px",
                          background: p.bg, border: `1px solid ${p.border}`,
                          color: p.text,
                          fontFamily: FONT_BODY, fontSize: "11px", fontWeight: 400,
                          letterSpacing: "0.05em",
                        }}>
                          {label}
                        </span>
                      );
                    })}
                    {flatSkills.length > 8 && (
                      <span style={{ padding: "5px 14px", border: "1px solid #E8E5E0", color: "#A8A49E", fontFamily: FONT_BODY, fontSize: "11px" }}>
                        +{flatSkills.length - 8} more
                      </span>
                    )}
                  </div>
                </motion.div>
              );
            })()}
          </div>

          {/* Info card */}
          <motion.div
            {...fadeUp(0.25)}
            style={{ border: "1px solid #E8E5E0", padding: "2.5rem", background: "#F5F3EF" }}
          >
            <div style={{ fontFamily: FONT_BODY, fontSize: "9px", letterSpacing: "0.3em", textTransform: "uppercase", color: "#A8A49E", marginBottom: "2rem", paddingBottom: "1rem", borderBottom: "1px solid #E8E5E0" }}>
              Contact & Links
            </div>
            {infoRows.map((row, i) => (
              <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "14px", padding: "12px 0", borderBottom: i < infoRows.length - 1 ? "1px solid #EDEBE7" : "none" }}>
                <span style={{ color: "#C0BCB6", fontSize: "13px", marginTop: "2px", flexShrink: 0 }}>{row.icon}</span>
                <div>
                  <div style={{ fontFamily: FONT_BODY, fontSize: "9px", letterSpacing: "0.2em", textTransform: "uppercase", color: "#A8A49E", marginBottom: "3px" }}>
                    {row.label}
                  </div>
                  {row.link ? (
                    <a href={row.link} target="_blank" rel="noopener noreferrer"
                      style={{ fontFamily: FONT_BODY, fontSize: "13px", color: "#4A4740", textDecoration: "none", borderBottom: "1px solid transparent", transition: "border-color 0.2s" }}
                      onMouseEnter={(e) => e.currentTarget.style.borderColor = "#4A4740"}
                      onMouseLeave={(e) => e.currentTarget.style.borderColor = "transparent"}
                    >
                      {row.value}
                    </a>
                  ) : (
                    <span style={{ fontFamily: FONT_BODY, fontSize: "13px", color: "#4A4740" }}>{row.value}</span>
                  )}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
