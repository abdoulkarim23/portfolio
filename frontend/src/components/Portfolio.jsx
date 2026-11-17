import React, { useEffect } from "react";
import Navbar from "./Navbar";
import Hero from "./Hero";
import MarqueeLogos from "./MarqueeLogos";
import EditorialDefinition from "./EditorialDefinition";
import ProjectsShowcase from "./ProjectsShowcase";
import StoryAndStats from "./StoryAndStats";
import EthosGrid from "./EthosGrid";
import FaqAccordion from "./FaqAccordion";
import Contact from "./Contact";
import Footer from "./Footer";
import ScrollProgress from "./ScrollProgress";
import CraftCursor from "./CraftCursor";
import SmoothScroll from "../fx/SmoothScroll";

const Portfolio = () => {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.16 }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <div className="relative">
      <SmoothScroll />
      <CraftCursor />
      <div className="grain" aria-hidden="true" />
      <ScrollProgress />
      <Navbar />
      <main>
        <Hero />
        <MarqueeLogos />
        <EditorialDefinition />
        <ProjectsShowcase />
        <StoryAndStats />
        <EthosGrid />
        <FaqAccordion />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Portfolio;
