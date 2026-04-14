"use client";
import React from "react";
import portfolioData from "../profile.json";
import PortfolioNav from "./components/nav";
import PortfolioHero from "./components/hero";
import PortfolioAbout from "./components/about";
import PortfolioEducation from "./components/education";
import PortfolioExperience from "./components/experience";
import PortfolioProjects from "./components/projects";
import PortfolioSkills from "./components/skills";
import PortfolioCommunity from "./components/community";
import PortfolioContact from "./components/contact";
import PortfolioFooter from "./components/footer";

export default function DeployedPortfolio() {
  const data = portfolioData;
  if (!data) return <div style={{ color: "#1A1A18", padding: "40px", fontFamily: "serif" }}>Loading…</div>;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;0,900;1,400;1,600&family=Lora:ital,wght@0,300;0,400;0,500;1,300;1,400&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; scroll-padding-top: 68px; }
        /* Responsive nav */
        .pr-desktop-links { display: flex; align-items: center; gap: 2.5rem; }
        .pr-hamburger { display: none; }
        @media (max-width: 767px) {
          .pr-desktop-links { display: none !important; }
          .pr-hamburger { display: flex !important; }
        }
      `}</style>
      <div style={{ minHeight: "100vh", background: "#FAFAF8", color: "#1A1A18" }}>
        <PortfolioNav data={data} />
        <PortfolioHero data={data} />
        <PortfolioAbout data={data} />
        <PortfolioEducation data={data} />
        <PortfolioExperience data={data} />
        <PortfolioProjects data={data} />
        <PortfolioSkills data={data} />
        <PortfolioCommunity data={data} />
        <PortfolioContact data={data} />
        <PortfolioFooter data={data} />
      </div>
    </>
  );
}
