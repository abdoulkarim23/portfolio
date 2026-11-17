import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { useI18n } from "../i18n/LanguageContext";
import usePrefersReducedMotion from "../hooks/usePrefersReducedMotion";
import HeroField from "./HeroField";

const Hero = () => {
  const { personal, t, lang } = useI18n();
  const p = t.personal;
  const rootRef = useRef(null);
  const reduced = usePrefersReducedMotion();
  const words = (personal.name || "").split(" ").filter(Boolean);

  useEffect(() => {
    if (reduced) return undefined;
    const ctx = gsap.context(() => {
      gsap.from("[data-rise]", {
        yPercent: 110,
        duration: 1.05,
        stagger: 0.07,
        ease: "power3.out",
      });
      gsap.from("[data-fade]", {
        y: 16,
        opacity: 0,
        duration: 0.8,
        delay: 0.35,
        stagger: 0.08,
        ease: "power2.out",
      });
    }, rootRef);
    return () => ctx.revert();
  }, [reduced, lang]);

  return (
    <section id="top" className="hero">
      <HeroField reduced={reduced} />
      <div ref={rootRef} className="container-xl hero-copy">
        <p data-fade className="mono hero-kicker">
          {p.status}
        </p>
        <h1 className="display hero-title">
          {words.map((word, index) => (
            <span className="mask-line" key={word}>
              <span data-rise className={index > 0 ? "hero-stroke" : undefined}>
                {word}
              </span>
            </span>
          ))}
        </h1>
        <p data-fade className="hero-lead">
          {p.title}
        </p>
        <p data-fade className="hero-tag">
          {p.tagline}
        </p>
        <p data-fade className="mono hero-facts">
          {p.location}
          <span aria-hidden="true"> / </span>
          {p.companyRole}
          <span aria-hidden="true"> / </span>
          {personal.company?.product}
        </p>
      </div>
      <a href="#about" className="scroll-hint mono">
        <span>{t.ui.scrollDown}</span>
        <span className="scroll-hint-line" aria-hidden="true" />
      </a>
    </section>
  );
};

export default Hero;
