"use client";
import React from "react";
import { motion } from "framer-motion";

const FONT_SERIF = '"Playfair Display", Georgia, serif';
const FONT_BODY  = '"Lora", Georgia, serif';

const PASTELS = [
  { left: "#D4C8E8", bg: "#F2EEF8", yearBg: "#E0D8F0", yearText: "#4A3870" },
  { left: "#C8D8E8", bg: "#EEF3F8", yearBg: "#D2DDE8", yearText: "#2A4060" },
  { left: "#D8E8C8", bg: "#F2F7EE", yearBg: "#D5E5D2", yearText: "#2E5A2A" },
  { left: "#E8D8C8", bg: "#F8F2EE", yearBg: "#F0E0CC", yearText: "#6A3820" },
];

export default function PortfolioEducation({ data }) {
  const items = data?.education;
  if (!items || !Array.isArray(items) || items.length === 0) return null;

  const staggerContainer = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12 } },
  };
  const cardItem = {
    hidden: { opacity: 0, y: 40, filter: "blur(6px)" },
    visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.75, ease: [0.25, 1, 0.5, 1] } },
  };

  return (
    <section id="education" style={{ background: "#F5F3EF", padding: "8rem 2.5rem", position: "relative", overflow: "hidden" }}>
      <style>{`@media(max-width:767px){#education{padding:4rem 1.25rem!important;} .pr-edu-grid{grid-template-columns:1fr!important;}}`}</style>

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
        02
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
            <span style={{ fontFamily: FONT_BODY, fontSize: "10px", letterSpacing: "0.3em", textTransform: "uppercase", color: "#A8A49E" }}>02</span>
            <h2 style={{ fontFamily: FONT_SERIF, fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 700, color: "#1A1A18", margin: 0, letterSpacing: "-0.03em" }}>
              Education
            </h2>
          </motion.div>
        </div>

        <motion.div
          className="pr-edu-grid"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "1.5rem" }}
        >
          {items.map((edu, i) => {
            const p = PASTELS[i % PASTELS.length];
            const period = edu.period || edu.duration || edu.year || edu.graduationYear || "";
            const achievements = Array.isArray(edu.achievements) && edu.achievements.length > 0 ? edu.achievements
              : Array.isArray(edu.highlights) && edu.highlights.length > 0 ? edu.highlights
              : [];
            return (
              <motion.div key={i} variants={cardItem}>
                <div style={{
                  background: p.bg,
                  borderLeft: `3px solid ${p.left}`,
                  padding: "2rem 2rem 2rem 1.75rem",
                  height: "100%",
                }}>
                  {period && (
                    <span style={{
                      display: "inline-block", padding: "3px 12px",
                      background: p.yearBg, color: p.yearText,
                      fontFamily: FONT_BODY, fontSize: "10px", fontWeight: 400,
                      letterSpacing: "0.15em", textTransform: "uppercase",
                      marginBottom: "1.25rem",
                    }}>
                      {period}
                    </span>
                  )}
                  <h3 style={{ fontFamily: FONT_SERIF, fontSize: "17px", fontWeight: 600, color: "#1A1A18", margin: "0 0 6px", lineHeight: 1.35 }}>
                    {edu.degree || edu.field || edu.program}
                  </h3>
                  <p style={{ fontFamily: FONT_BODY, fontSize: "13px", fontStyle: "italic", color: "#6B6860", margin: "0 0 4px" }}>
                    {edu.institution || edu.school}
                  </p>
                  {edu.location && (
                    <p style={{ fontFamily: FONT_BODY, fontSize: "12px", color: "#9A9490", margin: "0 0 10px" }}>{edu.location}</p>
                  )}
                  {edu.description && (
                    <p style={{ fontFamily: FONT_BODY, fontSize: "13px", color: "#7A7670", lineHeight: 1.7, margin: "0 0 10px" }}>{edu.description}</p>
                  )}
                  {achievements.length > 0 && (
                    <ul style={{ listStyle: "none", padding: 0, margin: "8px 0 0", display: "flex", flexDirection: "column", gap: "5px" }}>
                      {achievements.map((a, j) => (
                        <li key={j} style={{ display: "flex", gap: "10px", fontFamily: FONT_BODY, fontSize: "12px", color: "#7A7670", lineHeight: 1.6 }}>
                          <span style={{ color: p.left, flexShrink: 0, marginTop: "4px", fontSize: "8px" }}>◆</span>
                          {typeof a === "string" ? a : a?.text || a?.description || String(a)}
                        </li>
                      ))}
                    </ul>
                  )}
                  {edu.gpa && (
                    <p style={{ fontFamily: FONT_BODY, fontSize: "11px", color: "#9A9490", marginTop: "10px", fontStyle: "italic" }}>GPA: {edu.gpa}</p>
                  )}
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
