import React, { useEffect } from "react";
import Navbar from "./Navbar";
import Hero from "./Hero";
import About from "./About";
import Experience from "./Experience";
import Projects from "./Projects";
import Skills from "./Skills";
import Education from "./Education";
import Conjectura from "./Conjectura";
import Contact from "./Contact";
import Footer from "./Footer";
import ScrollProgress from "./ScrollProgress";
import NeonCursor from "../fx/NeonCursor";
import SceneCanvas from "../scene/SceneCanvas";
import SmoothScroll from "../fx/SmoothScroll";

const Portfolio = () => {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal, .draw-line");
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in-view");
            obs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <div className="relative">
      <SmoothScroll />
      <SceneCanvas />
      <div className="relative z-10">
      <ScrollProgress />
      <NeonCursor />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Education />
        <Conjectura />
        <Contact />
      </main>
      <Footer />
      </div>
    </div>
  );
};

export default Portfolio;
