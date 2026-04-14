"use client";
import React from "react";
import { motion } from "framer-motion";
import { FaExternalLinkAlt } from "react-icons/fa";

const FONT_SERIF = '"Playfair Display", Georgia, serif';
const FONT_BODY  = '"Lora", Georgia, serif';

const BORDER_COLORS = ["#D4C8E8", "#C8D8E8", "#D8E8C8", "#F5DDD5", "#E8E0C8", "#F0D8D8"];

export default function PortfolioCommunity({ data }) {
  const items = data?.community;
  if (!items || !Array.isArray(items) || items.length === 0) return null;

  return (
    <section id="community" style={{ background: "#F5F3EF", padding: "8rem 2.5rem", position: "relative", overflow: "hidden" }}>

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
        06
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
            <span style={{ fontFamily: FONT_BODY, fontSize: "10px", letterSpacing: "0.3em", textTransform: "uppercase", color: "#A8A49E" }}>06</span>
            <h2 style={{ fontFamily: FONT_SERIF, fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 700, color: "#1A1A18", margin: 0, letterSpacing: "-0.03em" }}>
              Impact & Community
            </h2>
          </motion.div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px,1fr))", gap: "1.5rem" }}>
          {items.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 36, filter: "blur(5px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.7, ease: [0.25, 1, 0.5, 1], delay: i * 0.07 }}
            >
              <div style={{
                background: "#FAFAF8", borderTop: `3px solid ${BORDER_COLORS[i % BORDER_COLORS.length]}`,
                border: "1px solid #E8E5E0",
                borderTopWidth: "3px",
                padding: "2rem", height: "100%",
              }}>
                <div style={{ fontFamily: FONT_BODY, fontSize: "9px", fontWeight: 400, letterSpacing: "0.25em", textTransform: "uppercase", color: "#A8A49E", marginBottom: "0.75rem", fontStyle: "italic" }}>
                  {item.role || item.type || "Contributor"}
                </div>
                <h3 style={{ fontFamily: FONT_SERIF, fontSize: "17px", fontWeight: 600, color: "#1A1A18", margin: "0 0 10px", letterSpacing: "-0.02em", lineHeight: 1.35 }}>
                  {item.title || item.name || item.organization}
                </h3>
                {item.description && (
                  <p style={{ fontFamily: FONT_BODY, fontSize: "13px", color: "#7A7670", lineHeight: 1.75, margin: "0 0 1rem" }}>
                    {item.description}
                  </p>
                )}
                {item.year && (
                  <p style={{ fontFamily: FONT_BODY, fontSize: "11px", color: "#A8A49E", marginBottom: "0.75rem", fontStyle: "italic" }}>
                    {item.year}
                  </p>
                )}
                {item.link && (
                  <a href={item.link} target="_blank" rel="noopener noreferrer"
                    style={{ fontFamily: FONT_BODY, fontSize: "11px", letterSpacing: "0.12em", textTransform: "uppercase", color: "#7A7670", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "6px", borderBottom: "1px solid #C0BCB6", paddingBottom: "1px", transition: "color 0.2s" }}
                    onMouseEnter={(e) => e.currentTarget.style.color = "#1A1A18"}
                    onMouseLeave={(e) => e.currentTarget.style.color = "#7A7670"}
                  >
                    View <FaExternalLinkAlt style={{ fontSize: "9px" }} />
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
