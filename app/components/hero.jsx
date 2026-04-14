"use client";
import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { FaEnvelope, FaDownload } from "react-icons/fa";

const FONT_SERIF = '"Playfair Display", Georgia, serif';
const FONT_BODY  = '"Lora", Georgia, serif';

// Stagger container for name words
const nameContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
};
const nameWord = {
  hidden: { clipPath: "inset(0 0 100% 0)", y: 20 },
  visible: { clipPath: "inset(0 0 0% 0)", y: 0, transition: { duration: 0.8, ease: [0.25, 1, 0.5, 1] } },
};

export default function PortfolioHero({ data }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });

  // Parallax transforms
  const textY   = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);
  const scale   = useTransform(scrollYProgress, [0, 1], [1, 0.97]);

  const hasPhoto = !!(data?.heroImageBase64 || data?.profile_photo);
  const nameParts  = (data?.name || "Portfolio").split(" ");
  const scrollTo   = (id) => {
    const el = document.getElementById(id);
    if (el) window.scrollTo({ top: el.offsetTop - 72, behavior: "smooth" });
  };

  return (
    <section
      ref={ref}
      id="hero"
      style={{ minHeight: "100vh", background: "#FAFAF8", position: "relative", overflow: "hidden", display: "flex", alignItems: "center" }}
    >
      <style>{`
        @keyframes pr-line-draw { from { transform: scaleX(0); } to { transform: scaleX(1); } }
        .pr-cta-primary {
          display: inline-flex; align-items: center; gap: 10px;
          padding: 13px 36px; border: 1px solid #1A1A18; background: #1A1A18;
          color: #FAFAF8; cursor: pointer;
          font-family: ${FONT_BODY}; font-size: 11px; font-weight: 400;
          letter-spacing: 0.22em; text-transform: uppercase; text-decoration: none;
          transition: all 0.3s ease;
        }
        .pr-cta-primary:hover { background: transparent; color: #1A1A18; }
        .pr-cta-secondary {
          display: inline-flex; align-items: center; gap: 10px;
          padding: 12px 32px; border: 1px solid #D8D4CE; background: transparent;
          color: #6B6860; cursor: pointer;
          font-family: ${FONT_BODY}; font-size: 11px; font-weight: 400;
          letter-spacing: 0.22em; text-transform: uppercase; text-decoration: none;
          transition: all 0.3s ease;
        }
        .pr-cta-secondary:hover { border-color: #1A1A18; color: #1A1A18; }
        @media (max-width: 768px) {
          .pr-hero-grid { grid-template-columns: 1fr !important; gap: 2rem !important; padding: 80px 1.25rem 7rem !important; }
          .pr-cta-primary, .pr-cta-secondary { width: 100%; justify-content: center; }
        }
      `}</style>

      {/* Very subtle dot grid background */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        backgroundImage: "radial-gradient(circle, #D8D4CE 1px, transparent 1px)",
        backgroundSize: "48px 48px",
        opacity: 0.35,
      }} />

      {/* Parallax content wrapper */}
      <motion.div
        style={{ y: textY, opacity, scale, width: "100%", position: "relative", zIndex: 1 }}
      >
        <div className="pr-hero-grid" style={{
          maxWidth: "1200px", margin: "0 auto",
          padding: "100px 2.5rem 4rem",
          display: "grid",
          gridTemplateColumns: hasPhoto ? "1fr 400px" : "1fr",
          gap: "5rem", alignItems: "center",
        }}>

          {/* Left: Typography */}
          <div>
            {/* Title badge */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
              style={{ marginBottom: "2.5rem", display: "flex", alignItems: "center", gap: "16px" }}
            >
              <div style={{ width: "36px", height: "1px", background: "#A8A49E" }} />
              <span style={{
                fontFamily: FONT_BODY, fontSize: "10px", fontWeight: 400,
                letterSpacing: "0.32em", textTransform: "uppercase", color: "#A8A49E",
                fontStyle: "italic",
              }}>
                {data?.title || "Professional Portfolio"}
              </span>
            </motion.div>

            {/* Name — clip-path word-by-word reveal */}
            <motion.div
              variants={nameContainer}
              initial="hidden"
              animate="visible"
              style={{ marginBottom: "2.5rem", overflow: "hidden" }}
            >
              {nameParts.map((word, i) => (
                <motion.div
                  key={i}
                  variants={nameWord}
                  style={{
                    fontFamily: FONT_SERIF,
                    fontSize: "clamp(3rem, 8vw, 7rem)",
                    fontWeight: i === nameParts.length - 1 ? 400 : 700,
                    fontStyle: i === nameParts.length - 1 ? "italic" : "normal",
                    lineHeight: 0.95,
                    letterSpacing: "-0.03em",
                    color: "#1A1A18",
                    display: "block",
                  }}
                >
                  {word}
                </motion.div>
              ))}
            </motion.div>

            {/* Animated rule — draws left to right */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1, delay: 0.7, ease: [0.25, 1, 0.5, 1] }}
              style={{ height: "1px", background: "#D8D4CE", marginBottom: "2.5rem", transformOrigin: "left" }}
            />

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0, y: 16, filter: "blur(4px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.9, delay: 0.85, ease: [0.25, 1, 0.5, 1] }}
              style={{
                fontFamily: FONT_BODY, fontSize: "clamp(1rem, 1.8vw, 1.15rem)",
                fontWeight: 300, fontStyle: "italic",
                color: "#7A7670", lineHeight: 1.85,
                maxWidth: "520px", marginBottom: "3rem",
              }}
            >
              {data?.sloganHeroSection || (data?.bio ? `"${data.bio.slice(0, 140)}…"` : "")}
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.05, ease: [0.25, 1, 0.5, 1] }}
              style={{ display: "flex", flexWrap: "wrap", gap: "16px", alignItems: "center" }}
            >
              <button onClick={() => scrollTo("contact")} className="pr-cta-primary">
                <FaEnvelope style={{ fontSize: "11px" }} /> Get in Touch
              </button>
              <button onClick={() => scrollTo("about")} className="pr-cta-secondary">
                View Profile
              </button>
              {(data?.resumeBase64 || data?.resume || data?.resumeUrl) && (
                <a href={data.resumeBase64 ? `data:application/pdf;base64,${data.resumeBase64}` : (data.resume || data.resumeUrl)} download="Resume.pdf" className="pr-cta-secondary">
                  <FaDownload style={{ fontSize: "10px" }} /> Résumé
                </a>
              )}
            </motion.div>
          </div>

          {/* Right: formal portrait */}
          {hasPhoto && (
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.1, delay: 0.4, ease: [0.25, 1, 0.5, 1] }}
              style={{ position: "relative" }}
              className="pr-hero-photo"
            >
              {/* Corner marks */}
              {[
                { top: "-10px", left: "-10px", borderTop: "1px solid #A8A49E", borderLeft: "1px solid #A8A49E" },
                { top: "-10px", right: "-10px", borderTop: "1px solid #A8A49E", borderRight: "1px solid #A8A49E" },
                { bottom: "-10px", left: "-10px", borderBottom: "1px solid #A8A49E", borderLeft: "1px solid #A8A49E" },
                { bottom: "-10px", right: "-10px", borderBottom: "1px solid #A8A49E", borderRight: "1px solid #A8A49E" },
              ].map((s, i) => (
                <div key={i} style={{ position: "absolute", width: "28px", height: "28px", ...s }} />
              ))}
              <div style={{ border: "1px solid #E8E5E0", overflow: "hidden", height: "520px" }}>
                <img
                  src={data.heroImageBase64 || data.profile_photo}
                  alt={data.name}
                  style={{
                    width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top",
                    filter: "saturate(0.8) brightness(1.02)",
                    display: "block",
                  }}
                />
              </div>
              {/* Name plate */}
              <div style={{
                position: "absolute", bottom: 0, left: 0, right: 0,
                background: "rgba(26,26,24,0.82)", backdropFilter: "blur(6px)",
                padding: "14px 20px", borderTop: "1px solid rgba(255,255,255,0.1)",
              }}>
                <div style={{ fontFamily: FONT_SERIF, fontSize: "14px", fontWeight: 600, color: "#FAFAF8", letterSpacing: "0.04em" }}>
                  {data.name}
                </div>
                {data?.title && (
                  <div style={{ fontFamily: FONT_BODY, fontSize: "10px", color: "#A8A49E", letterSpacing: "0.2em", textTransform: "uppercase", marginTop: "3px" }}>
                    {data.title}
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </div>
      </motion.div>

      {/* Bottom border */}
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "1px", background: "#E8E5E0" }} />

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        style={{ position: "absolute", bottom: "2rem", left: "2.5rem", display: "flex", alignItems: "center", gap: "12px" }}
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          style={{ width: "1px", height: "40px", background: "linear-gradient(to bottom, transparent, #A8A49E)", margin: "0 auto" }}
        />
        <span style={{ fontFamily: FONT_BODY, fontSize: "9px", letterSpacing: "0.3em", textTransform: "uppercase", color: "#C0BCB6" }}>Scroll</span>
      </motion.div>
    </section>
  );
}
