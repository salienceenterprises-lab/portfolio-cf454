"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaEnvelope, FaMapMarkerAlt, FaGithub, FaLinkedin } from "react-icons/fa";

const FONT_SERIF = '"Playfair Display", Georgia, serif';
const FONT_BODY  = '"Lora", Georgia, serif';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 32, filter: "blur(5px)" },
  whileInView: { opacity: 1, y: 0, filter: "blur(0px)" },
  viewport: { once: true, margin: "-40px" },
  transition: { duration: 0.8, ease: [0.25, 1, 0.5, 1], delay },
});

export default function PortfolioContact({ data }) {
  const [form, setForm]     = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("idle");
  const [focused, setFocused] = useState(null);

  const hasContact = !!(data?.email || data?.github || data?.linkedin || data?.twitter || data?.website || data?.web3forms_key);
  if (!hasContact) return null;

  const WEB3FORMS_KEY = data?.web3forms_key || process.env.NEXT_PUBLIC_WEB3FORMS_KEY || "";

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setStatus("sending");
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          subject: `Portfolio contact from ${form.name}`,
          from_name: form.name,
          email: form.email,
          message: form.message,
          botcheck: "",
        }),
      });
      const r = await res.json();
      setStatus(r.success ? "sent" : "error");
    } catch {
      setStatus("error");
    }
  };

  const fieldStyle = (field) => ({
    width: "100%", background: "transparent",
    border: "none", borderBottom: `1px solid ${focused === field ? "#1A1A18" : "#D8D4CE"}`,
    fontFamily: FONT_BODY, fontSize: "14px", color: "#1A1A18",
    padding: "12px 0", outline: "none",
    transition: "border-color 0.3s ease",
  });

  return (
    <section id="contact" style={{ background: "#FAFAF8", padding: "8rem 2.5rem 9rem", position: "relative", overflow: "hidden" }}>
      <style>{`
        .pr-submit {
          font-family: ${FONT_BODY}; font-size: 11px; font-weight: 400;
          letter-spacing: 0.24em; text-transform: uppercase;
          padding: 13px 40px; border: 1px solid #1A1A18;
          background: #1A1A18; color: #FAFAF8; cursor: pointer;
          transition: all 0.3s ease;
        }
        .pr-submit:hover:not(:disabled) { background: transparent; color: #1A1A18; }
        .pr-submit:disabled { opacity: 0.45; cursor: not-allowed; }
        .prestige-root input::placeholder,
        .prestige-root textarea::placeholder { color: #C0BCB6; font-family: ${FONT_BODY}; font-style: italic; }
        .prestige-root textarea { resize: none; font-family: inherit; }
        @media (max-width: 767px) { #contact { padding: 4rem 1.25rem 9rem !important; } .pr-contact-grid { display: block !important; } .pr-contact-grid > *:first-child { margin-bottom: 3rem; } }
      `}</style>

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
        07
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
          <motion.div {...fadeUp(0)} style={{ display: "flex", alignItems: "baseline", gap: "1.5rem" }}>
            <span style={{ fontFamily: FONT_BODY, fontSize: "10px", letterSpacing: "0.3em", textTransform: "uppercase", color: "#A8A49E" }}>07</span>
            <div>
              <h2 style={{ fontFamily: FONT_SERIF, fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 700, color: "#1A1A18", margin: "0 0 0.75rem", letterSpacing: "-0.03em" }}>
                Get in Touch
              </h2>
              <p style={{ fontFamily: FONT_BODY, fontSize: "14px", fontStyle: "italic", color: "#7A7670", margin: 0, maxWidth: "440px", lineHeight: 1.75 }}>
                Open to new opportunities, collaborations, and conversations.
              </p>
            </div>
          </motion.div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6rem", alignItems: "start" }}
          className="pr-contact-grid"
        >
          {/* Form */}
          <motion.div {...fadeUp(0.1)}>
            {status === "sent" ? (
              <div style={{ padding: "3.5rem", border: "1px solid #E8E5E0", textAlign: "center" }}>
                <div style={{ fontFamily: FONT_SERIF, fontSize: "3rem", color: "#C0BCB6", marginBottom: "1rem" }}>✦</div>
                <h3 style={{ fontFamily: FONT_SERIF, fontSize: "22px", fontWeight: 600, color: "#1A1A18", marginBottom: "0.5rem" }}>Message Received</h3>
                <p style={{ fontFamily: FONT_BODY, fontSize: "14px", fontStyle: "italic", color: "#7A7670" }}>I will be in touch shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "2.5rem" }}>
                <div>
                  <label style={{ fontFamily: FONT_BODY, fontSize: "9px", letterSpacing: "0.3em", textTransform: "uppercase", color: "#A8A49E", display: "block", marginBottom: "10px" }}>
                    Full Name
                  </label>
                  <input
                    type="text" placeholder="Your full name" required
                    value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                    onFocus={() => setFocused("name")} onBlur={() => setFocused(null)}
                    style={fieldStyle("name")}
                  />
                </div>
                <div>
                  <label style={{ fontFamily: FONT_BODY, fontSize: "9px", letterSpacing: "0.3em", textTransform: "uppercase", color: "#A8A49E", display: "block", marginBottom: "10px" }}>
                    Email Address
                  </label>
                  <input
                    type="email" placeholder="your@email.com" required
                    value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                    onFocus={() => setFocused("email")} onBlur={() => setFocused(null)}
                    style={fieldStyle("email")}
                  />
                </div>
                <div>
                  <label style={{ fontFamily: FONT_BODY, fontSize: "9px", letterSpacing: "0.3em", textTransform: "uppercase", color: "#A8A49E", display: "block", marginBottom: "10px" }}>
                    Message
                  </label>
                  <textarea
                    rows={5} placeholder="Your message…" required
                    value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}
                    onFocus={() => setFocused("message")} onBlur={() => setFocused(null)}
                    style={{ ...fieldStyle("message"), display: "block" }}
                  />
                </div>
                {status === "error" && (
                  <p style={{ fontFamily: FONT_BODY, fontSize: "12px", color: "#B04040", fontStyle: "italic" }}>Something went wrong. Please try again.</p>
                )}
                <div>
                  <button type="submit" disabled={status === "sending"} className="pr-submit">
                    {status === "sending" ? "Sending…" : "Send Message"}
                  </button>
                </div>
              </form>
            )}
          </motion.div>

          {/* Info */}
          <motion.div {...fadeUp(0.2)}>
            <div style={{ height: "1px", background: "#E8E5E0", marginBottom: "3rem" }} />
            {data?.email && (
              <div style={{ marginBottom: "2.5rem" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "6px" }}>
                  <FaEnvelope style={{ color: "#C0BCB6", fontSize: "13px" }} />
                  <span style={{ fontFamily: FONT_BODY, fontSize: "9px", letterSpacing: "0.25em", textTransform: "uppercase", color: "#A8A49E" }}>Email</span>
                </div>
                <a href={`mailto:${data.email}`}
                  style={{ fontFamily: FONT_SERIF, fontSize: "16px", fontWeight: 400, color: "#1A1A18", textDecoration: "none", fontStyle: "italic", borderBottom: "1px solid #E0DBD4", paddingBottom: "1px" }}>
                  {data.email}
                </a>
              </div>
            )}
            {data?.location && (
              <div style={{ marginBottom: "2.5rem" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "6px" }}>
                  <FaMapMarkerAlt style={{ color: "#C0BCB6", fontSize: "13px" }} />
                  <span style={{ fontFamily: FONT_BODY, fontSize: "9px", letterSpacing: "0.25em", textTransform: "uppercase", color: "#A8A49E" }}>Location</span>
                </div>
                <p style={{ fontFamily: FONT_BODY, fontSize: "15px", color: "#4A4740", margin: 0 }}>{data.location}</p>
              </div>
            )}
            <div style={{ display: "flex", gap: "14px", marginTop: "2.5rem" }}>
              {data?.github && (
                <a href={data.github} target="_blank" rel="noopener noreferrer"
                  style={{ width: "42px", height: "42px", border: "1px solid #E8E5E0", display: "flex", alignItems: "center", justifyContent: "center", color: "#A8A49E", textDecoration: "none", transition: "all 0.25s" }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#1A1A18"; e.currentTarget.style.color = "#1A1A18"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#E8E5E0"; e.currentTarget.style.color = "#A8A49E"; }}
                >
                  <FaGithub size={16} />
                </a>
              )}
              {data?.linkedin && (
                <a href={data.linkedin} target="_blank" rel="noopener noreferrer"
                  style={{ width: "42px", height: "42px", border: "1px solid #E8E5E0", display: "flex", alignItems: "center", justifyContent: "center", color: "#A8A49E", textDecoration: "none", transition: "all 0.25s" }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#1A1A18"; e.currentTarget.style.color = "#1A1A18"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#E8E5E0"; e.currentTarget.style.color = "#A8A49E"; }}
                >
                  <FaLinkedin size={16} />
                </a>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
