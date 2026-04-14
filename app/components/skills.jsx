"use client";
import React from "react";
import { motion } from "framer-motion";

const FONT_SERIF = '"Playfair Display", Georgia, serif';
const FONT_BODY  = '"Lora", Georgia, serif';

const PASTEL_SETS = [
  { bg: "#F5DDD5", border: "#E4C0B0", text: "#7A4030" },
  { bg: "#D5E5D2", border: "#B4CEB0", text: "#2E5A2A" },
  { bg: "#D2DDE8", border: "#B0C4D8", text: "#2A4060" },
  { bg: "#E0D8F0", border: "#C4B8DC", text: "#4A3870" },
  { bg: "#F0E8D0", border: "#D8CAA0", text: "#6A5020" },
  { bg: "#F0D8D8", border: "#D8B0B0", text: "#6A2020" },
];

export default function PortfolioSkills({ data }) {
  const skills = data?.skills;
  if (!skills || !Array.isArray(skills) || skills.length === 0) return null;

  // Normalize: handle both grouped {category, items[]} objects and flat string arrays
  const groups = (() => {
    if (
      typeof skills[0] === "object" && skills[0] !== null &&
      (skills[0].items || skills[0].category || skills[0].skills)
    ) {
      return skills.map((g) => ({
        category: g.category || g.name || "Skills",
        items: Array.isArray(g.items) ? g.items : Array.isArray(g.skills) ? g.skills : [],
      })).filter((g) => g.items.length > 0);
    }
    return null; // flat
  })();

  const tagVariants = {
    hidden: { opacity: 0, scale: 0.88, filter: "blur(4px)" },
    visible: { opacity: 1, scale: 1, filter: "blur(0px)", transition: { duration: 0.45, ease: [0.25, 1, 0.5, 1] } },
  };
  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.04 } },
  };

  return (
    <section id="skills" style={{ background: "#FAFAF8", padding: "8rem 2.5rem", position: "relative", overflow: "hidden" }}>
      <style>{`@media(max-width:767px){#skills{padding:4rem 1.25rem!important;}}`}</style>

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
        05
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
            <span style={{ fontFamily: FONT_BODY, fontSize: "10px", letterSpacing: "0.3em", textTransform: "uppercase", color: "#A8A49E" }}>05</span>
            <h2 style={{ fontFamily: FONT_SERIF, fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 700, color: "#1A1A18", margin: 0, letterSpacing: "-0.03em" }}>
              Areas of Expertise
            </h2>
          </motion.div>
        </div>

        {groups ? (
          <div style={{ display: "flex", flexDirection: "column", gap: "3.5rem" }}>
            {groups.map((group, gi) => (
              <motion.div
                key={gi}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ duration: 0.7, ease: [0.25, 1, 0.5, 1], delay: gi * 0.06 }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.25rem" }}>
                  <div style={{ width: "20px", height: "1px", background: "#C0BCB6" }} />
                  <span style={{ fontFamily: FONT_BODY, fontSize: "10px", fontWeight: 400, letterSpacing: "0.25em", textTransform: "uppercase", color: "#A8A49E" }}>{group.category}</span>
                </div>
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}
                >
                  {group.items.map((skill, i) => {
                    const label = typeof skill === "string" ? skill : skill?.name || skill?.label || String(skill);
                    const p = PASTEL_SETS[i % PASTEL_SETS.length];
                    return (
                      <motion.span key={i} variants={tagVariants} style={{ padding: "7px 18px", background: p.bg, border: `1px solid ${p.border}`, color: p.text, fontFamily: FONT_BODY, fontSize: "12px", fontWeight: 400, letterSpacing: "0.04em" }}>
                        {label}
                      </motion.span>
                    );
                  })}
                </motion.div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div>
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
              style={{ height: "1px", background: "linear-gradient(90deg, #E0DBD4, transparent)", marginBottom: "3rem", transformOrigin: "left" }}
            />
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}
            >
              {skills.map((skill, i) => {
                const label = typeof skill === "string" ? skill : skill?.name || skill?.label || String(skill);
                const p = PASTEL_SETS[i % PASTEL_SETS.length];
                return (
                  <motion.span key={i} variants={tagVariants} style={{
                    padding: "8px 20px", background: p.bg, border: `1px solid ${p.border}`,
                    color: p.text, fontFamily: FONT_BODY,
                    fontSize: i % 4 === 0 ? "13px" : "12px",
                    fontWeight: 400, letterSpacing: "0.04em",
                    fontStyle: i % 5 === 0 ? "italic" : "normal",
                  }}>
                    {label}
                  </motion.span>
                );
              })}
            </motion.div>
          </div>
        )}
      </div>
    </section>
  );
}
