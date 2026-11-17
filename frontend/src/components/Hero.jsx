import React, { useEffect, useRef } from "react";
import { ArrowRight, Github, Linkedin, Mail, MapPin } from "lucide-react";
import gsap from "gsap";
import { useI18n } from "../i18n/LanguageContext";
import usePrefersReducedMotion from "../hooks/usePrefersReducedMotion";

const Hero = () => {
  const { personal, t, lang } = useI18n();
  const p = t.personal;
  const rootRef = useRef(null);
  const reduced = usePrefersReducedMotion();
  const rows = [
    { label: p.whereLabel, value: p.location },
    { label: p.roleLabel, value: p.companyRole },
    { label: p.nowLabel, value: personal.company?.product },
  ];

  useEffect(() => {
    if (reduced) return undefined;
    const ctx = gsap.context(() => {
      gsap.from("[data-hero-rise]", {
        y: 18,
        opacity: 0,
        duration: 0.9,
        delay: 1.15,
        stagger: 0.08,
        ease: "power2.out",
      });
    }, rootRef);
    return () => ctx.revert();
  }, [reduced, lang]);

  return (
    <section id="top" className="relative overflow-hidden pt-28 md:pt-36 pb-16 md:pb-24">
      <div
        className="hero-veil pointer-events-none absolute inset-0 z-[1]"
        style={{
          background:
            "linear-gradient(90deg, rgba(20,19,17,0.94) 0%, rgba(20,19,17,0.62) 46%, rgba(20,19,17,0.12) 100%)",
        }}
      />

      <div ref={rootRef} className="container-xl relative z-10 grid md:grid-cols-12 gap-12 items-end">
        <div className="md:col-span-8">
          <p data-hero-rise className="mono text-[12px] tracking-[0.18em] uppercase text-[#c4845a]">
            {p.status}
          </p>

          <h1
            data-hero-rise
            className="serif mt-5 text-[#f3efe6] font-medium leading-[0.95] tracking-tight"
            style={{ fontSize: "clamp(3.2rem, 8vw, 6.4rem)" }}
          >
            {personal.name}
          </h1>

          <p data-hero-rise className="mt-5 max-w-xl text-[#d9d1c5] text-lg md:text-xl leading-snug">
            {p.title}
          </p>

          <p data-hero-rise className="mt-5 text-[#a39b90] max-w-2xl text-base md:text-[17px] leading-relaxed">
            {p.tagline}
          </p>

          <div data-hero-rise className="mt-8 flex flex-wrap gap-2">
            {p.chips?.map((chip) => (
              <span key={chip} className="chip">
                {chip}
              </span>
            ))}
          </div>

          <div data-hero-rise className="mt-9 flex flex-wrap items-center gap-3">
            <a
              href="#projects"
              className="btn-primary rounded-sm px-5 py-3 text-sm font-medium inline-flex items-center gap-2"
            >
              {t.ui.seeProjects}
              <ArrowRight size={16} />
            </a>
            <a
              href="#contact"
              className="btn-outline rounded-sm px-5 py-3 text-sm font-medium inline-flex items-center gap-2"
            >
              <Mail size={16} />
              {t.ui.contactMe}
            </a>
          </div>

          <div data-hero-rise className="mt-10 flex flex-wrap items-center gap-5 text-[#a39b90] text-sm">
            <span className="inline-flex items-center gap-2">
              <MapPin size={14} />
              {p.location}
            </span>
            <a
              href={personal.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 nav-link"
            >
              <Github size={14} />
              GitHub
            </a>
            <a
              href={personal.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 nav-link"
            >
              <Linkedin size={14} />
              LinkedIn
            </a>
            <a
              href={personal.planquia}
              target="_blank"
              rel="noopener noreferrer"
              className="nav-link"
            >
              planquia.com
            </a>
          </div>
        </div>

        <aside data-hero-rise className="md:col-span-4">
          <div className="border border-[#c4845a]/35 bg-[#141311]/75">
            <div className="h-px bg-[#c4845a] origin-left draw-rule" />
            <dl className="divide-y divide-[#f3efe6]/10">
              {rows.map((row) => (
                <div key={row.label} className="px-5 py-4">
                  <dt className="mono text-[11px] tracking-[0.16em] uppercase text-[#a39b90]">
                    {row.label}
                  </dt>
                  <dd className="mt-1 text-[#f3efe6] text-[15px]">{row.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </aside>
      </div>
    </section>
  );
};

export default Hero;
