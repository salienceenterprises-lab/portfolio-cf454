"use client";
import React from "react";
import { motion } from "framer-motion";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";

const FONT_SERIF = '"Playfair Display", Georgia, serif';
const FONT_BODY  = '"Lora", Georgia, serif';

const CARD_ACCENTS = [
  { top: "#D4C8E8", num: "#9080B0" },
  { top: "#C8D8E8", num: "#6080A0" },
  { top: "#D8E8C8", num: "#609060" },
  { top: "#F5DDD5", num: "#A06050" },
  { top: "#E8E0C8", num: "#907040" },
];

export default function PortfolioProjects({ data }) {
  const items = data?.projects;
  if (!items || !Array.isArray(items) || items.length === 0) return null;

  return (
    <section id="projects" style={{ background: "#F5F3EF", padding: "8rem 2.5rem", position: "relative", overflow: "hidden" }}>
      <style>{`@media(max-width:768px){#projects{padding:4rem 1.25rem!important;} .pr-proj-grid{grid-template-columns:1fr!important;}}`}</style>

      {/* Background number */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.4 }}
        style={{
          position: "absolute", right: "-2%", top: "50%", transform: "translateY(-50%)",
          fontFamily: FONT_SERIF, fontSize: "28vw", fontWeight: 700,
          color: "rgba(26,26,24,0.025)", lineHeight: 1,
          pointerEvents: "none", userSelect: "none", letterSpacing: "-0.05em",
        }}
      >
        04
      </motion.div>

      <div style={{ maxWidth: "1200px", margin: "0 auto", position: "relative", zIndex: 1 }}>

        {/* Header */}
        <div style={{ marginBottom: "5rem" }}>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.25, 1, 0.5, 1] }}
            style={{ height: "1px", background: "#E0DBD4", marginBottom: "2rem", transformOrigin: "left" }}
          />
          <motion.div
            initial={{ opacity: 0, y: 24, filter: "blur(4px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
            style={{ display: "flex", alignItems: "baseline", gap: "1.5rem" }}
          >
            <span style={{ fontFamily: FONT_BODY, fontSize: "10px", letterSpacing: "0.3em", textTransform: "uppercase", color: "#A8A49E" }}>04</span>
            <h2 style={{ fontFamily: FONT_SERIF, fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 700, color: "#1A1A18", margin: 0, letterSpacing: "-0.03em" }}>
              Selected Work
            </h2>
          </motion.div>
        </div>

        <div className="pr-proj-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px,1fr))", gap: "2rem" }}>
          {items.map((proj, i) => {
            const accent = CARD_ACCENTS[i % CARD_ACCENTS.length];
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 50, rotateX: 8, filter: "blur(6px)" }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0, filter: "blur(0px)" }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1], delay: i * 0.07 }}
                style={{ perspective: "800px", height: "100%" }}
              >
                <div style={{
                  background: "#FAFAF8", border: "1px solid #E8E5E0",
                  borderTop: `3px solid ${accent.top}`,
                  padding: "2.25rem", height: "100%",
                  display: "flex", flexDirection: "column",
                  transition: "box-shadow 0.35s ease, transform 0.35s ease",
                }}
                  onMouseEnter={(e) => { e.currentTarget.style.boxShadow = "0 12px 40px rgba(26,26,24,0.08)"; e.currentTarget.style.transform = "translateY(-4px)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.transform = "translateY(0)"; }}
                >
                  {proj.imageBase64 && (
                    <div style={{ width: "100%", paddingTop: "52%", position: "relative", overflow: "hidden", marginBottom: "1.5rem" }}>
                      <img src={proj.imageBase64} alt={proj.title || "Project"}
                        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top", display: "block" }} />
                    </div>
                  )}
                  {/* Index + links */}
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1.5rem" }}>
                    <span style={{ fontFamily: FONT_SERIF, fontSize: "32px", fontWeight: 700, color: accent.top, lineHeight: 1, opacity: 0.7 }}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div style={{ display: "flex", gap: "14px", paddingTop: "6px" }}>
                      {proj.github && (
                        <a href={proj.github} target="_blank" rel="noopener noreferrer"
                          style={{ color: "#C0BCB6", textDecoration: "none", transition: "color 0.2s" }}
                          onMouseEnter={(e) => e.currentTarget.style.color = "#1A1A18"}
                          onMouseLeave={(e) => e.currentTarget.style.color = "#C0BCB6"}
                        >
                          <FaGithub size={16} />
                        </a>
                      )}
                      {(proj.live || proj.url || proj.link || proj.demo) && (
                        <a href={proj.live || proj.url || proj.link || proj.demo} target="_blank" rel="noopener noreferrer"
                          style={{ color: "#C0BCB6", textDecoration: "none", transition: "color 0.2s" }}
                          onMouseEnter={(e) => e.currentTarget.style.color = "#1A1A18"}
                          onMouseLeave={(e) => e.currentTarget.style.color = "#C0BCB6"}
                        >
                          <FaExternalLinkAlt size={14} />
                        </a>
                      )}
                    </div>
                  </div>

                  <h3 style={{ fontFamily: FONT_SERIF, fontSize: "18px", fontWeight: 600, color: "#1A1A18", margin: "0 0 10px", letterSpacing: "-0.02em", lineHeight: 1.3 }}>
                    {proj.title || "Untitled"}
                  </h3>
                  <p style={{ fontFamily: FONT_BODY, fontSize: "13px", color: "#7A7670", lineHeight: 1.75, margin: 0, flex: 1 }}>
                    {proj.description}
                  </p>

                  {(() => {
                    const tags = Array.isArray(proj.stack) ? proj.stack
                      : Array.isArray(proj.tech) ? proj.tech
                      : Array.isArray(proj.technologies) ? proj.technologies
                      : Array.isArray(proj.tags) ? proj.tags : [];
                    return tags.length > 0 ? (
                      <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginTop: "1.5rem", paddingTop: "1.25rem", borderTop: "1px solid #EDEBE7" }}>
                        {tags.map((t, j) => {
                          const label = typeof t === "string" ? t : t?.name || t?.label || String(t);
                          return (
                            <span key={j} style={{
                              fontFamily: FONT_BODY, fontSize: "10px", fontWeight: 400,
                              letterSpacing: "0.06em", padding: "3px 10px",
                              background: "#F0EDE8", border: "1px solid #E0DBD4", color: "#7A7670",
                            }}>
                              {label}
                            </span>
                          );
                        })}
                      </div>
                    ) : null;
                  })()}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
