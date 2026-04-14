"use client";
import React from "react";
import { motion } from "framer-motion";

const FONT_SERIF = '"Playfair Display", Georgia, serif';
const FONT_BODY  = '"Lora", Georgia, serif';

export default function PortfolioExperience({ data }) {
  const items = data?.experience;
  if (!items || !Array.isArray(items) || items.length === 0) return null;

  return (
    <section id="experience" style={{ background: "#FAFAF8", padding: "8rem 2.5rem", position: "relative", overflow: "hidden" }}>
      <style>{`@media(max-width:767px){#experience{padding:4rem 1.25rem!important;}}`}</style>

      {/* Background number */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.4 }}
        style={{
          position: "absolute", left: "-2%", top: "50%", transform: "translateY(-50%)",
          fontFamily: FONT_SERIF, fontSize: "28vw", fontWeight: 700,
          color: "rgba(26,26,24,0.025)", lineHeight: 1,
          pointerEvents: "none", userSelect: "none", letterSpacing: "-0.05em",
        }}
      >
        03
      </motion.div>

      <div style={{ maxWidth: "1200px", margin: "0 auto", position: "relative", zIndex: 1 }}>

        {/* Header */}
        <div style={{ marginBottom: "5rem" }}>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.25, 1, 0.5, 1] }}
            style={{ height: "1px", background: "#E8E5E0", marginBottom: "2rem", transformOrigin: "left" }}
          />
          <motion.div
            initial={{ opacity: 0, y: 24, filter: "blur(4px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
            style={{ display: "flex", alignItems: "baseline", gap: "1.5rem" }}
          >
            <span style={{ fontFamily: FONT_BODY, fontSize: "10px", letterSpacing: "0.3em", textTransform: "uppercase", color: "#A8A49E" }}>03</span>
            <h2 style={{ fontFamily: FONT_SERIF, fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 700, color: "#1A1A18", margin: 0, letterSpacing: "-0.03em" }}>
              Experience
            </h2>
          </motion.div>
        </div>

        {/* Timeline */}
        <div style={{ position: "relative" }}>
          {/* Vertical spine */}
          <motion.div
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.25, 1, 0.5, 1] }}
            style={{
              position: "absolute", left: "0", top: 0, bottom: 0,
              width: "1px", background: "#E8E5E0", transformOrigin: "top",
            }}
          />

          <div style={{ paddingLeft: "3rem" }}>
            {items.map((exp, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30, filter: "blur(5px)" }}
                whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.75, ease: [0.25, 1, 0.5, 1], delay: i * 0.06 }}
                style={{
                  position: "relative",
                  paddingBottom: i < items.length - 1 ? "4rem" : "0",
                }}
              >
                {/* Timeline dot */}
                <div style={{
                  position: "absolute", left: "-3.25rem", top: "6px",
                  width: "9px", height: "9px",
                  border: "1px solid #C0BCB6",
                  background: "#FAFAF8",
                  transform: "rotate(45deg)",
                }} />

                {/* Date badge */}
                {(exp.period || exp.duration || exp.startDate) && (
                  <div style={{
                    display: "inline-block", marginBottom: "1rem",
                    fontFamily: FONT_BODY, fontSize: "10px", fontWeight: 400,
                    letterSpacing: "0.18em", textTransform: "uppercase",
                    color: "#9A9490", borderBottom: "1px solid #E0DBD4", paddingBottom: "2px",
                  }}>
                    {exp.period || exp.duration || exp.startDate}
                  </div>
                )}

                {/* Title + company */}
                <h3 style={{ fontFamily: FONT_SERIF, fontSize: "clamp(1.1rem, 2vw, 1.4rem)", fontWeight: 600, color: "#1A1A18", margin: "0 0 4px", letterSpacing: "-0.02em" }}>
                  {exp.role || exp.title || exp.position}
                </h3>
                <p style={{ fontFamily: FONT_BODY, fontSize: "13px", fontStyle: "italic", color: "#7A7670", margin: "0 0 1rem" }}>
                  {exp.company || exp.organization}
                </p>

                {exp.description && (
                  <p style={{ fontFamily: FONT_BODY, fontSize: "14px", color: "#6B6860", lineHeight: 1.8, margin: "0 0 1rem", maxWidth: "640px" }}>
                    {exp.description}
                  </p>
                )}

                {(() => {
                  const bullets = Array.isArray(exp.highlights) && exp.highlights.length ? exp.highlights
                    : Array.isArray(exp.responsibilities) && exp.responsibilities.length ? exp.responsibilities
                    : Array.isArray(exp.bullets) && exp.bullets.length ? exp.bullets
                    : [];
                  return bullets.length > 0 ? (
                    <ul style={{ listStyle: "none", padding: 0, margin: "0 0 1rem", display: "flex", flexDirection: "column", gap: "6px", maxWidth: "640px" }}>
                      {bullets.map((r, j) => (
                        <li key={j} style={{ display: "flex", gap: "12px", fontFamily: FONT_BODY, fontSize: "13px", color: "#7A7670", lineHeight: 1.7 }}>
                          <span style={{ color: "#C0BCB6", flexShrink: 0, marginTop: "5px", fontSize: "8px" }}>◆</span>
                          {typeof r === "string" ? r : r?.text || r?.description || String(r)}
                        </li>
                      ))}
                    </ul>
                  ) : null;
                })()}

                {(() => {
                  const stack = Array.isArray(exp.stack) ? exp.stack
                    : Array.isArray(exp.tech) ? exp.tech
                    : Array.isArray(exp.tags) ? exp.tags
                    : [];
                  return stack.length > 0 ? (
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginTop: "0.75rem" }}>
                      {stack.map((t, j) => {
                        const label = typeof t === "string" ? t : t?.name || t?.label || String(t);
                        return (
                          <span key={j} style={{
                            fontFamily: FONT_BODY, fontSize: "10px", fontWeight: 400,
                            letterSpacing: "0.08em", padding: "3px 12px",
                            background: "#F0EDE8", border: "1px solid #E0DBD4", color: "#7A7670",
                          }}>
                            {label}
                          </span>
                        );
                      })}
                    </div>
                  ) : null;
                })()}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
