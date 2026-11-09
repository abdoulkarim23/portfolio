import React, { useEffect, useRef } from "react";
import { ArrowRight, Github, Linkedin, Mail, MapPin, ExternalLink } from "lucide-react";
import gsap from "gsap";
import { useI18n } from "../i18n/LanguageContext";
import usePrefersReducedMotion from "../hooks/usePrefersReducedMotion";
import DecryptText from "../fx/DecryptText";
import { resetTilt, tiltCard } from "../lib/motion";

const Hero = () => {
  const { personal, t, lang } = useI18n();
  const p = t.personal;
  const rootRef = useRef(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (reduced) return undefined;
    const ctx = gsap.context(() => {
      gsap.from("[data-hero-rise]", {
        y: 16,
        opacity: 0,
        duration: 0.7,
        stagger: 0.07,
        ease: "power3.out",
      });
    }, rootRef);
    return () => ctx.revert();
  }, [reduced, lang]);

  return (
    <section id="top" className="relative overflow-hidden pt-28 md:pt-36 pb-20 md:pb-28">
      <div
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{
          background:
            "linear-gradient(90deg, rgba(5,8,20,0.9) 0%, rgba(5,8,20,0.62) 36%, rgba(5,8,20,0.18) 68%, rgba(5,8,20,0.42) 100%)",
        }}
      />

      <div ref={rootRef} className="container-xl relative z-10 grid md:grid-cols-12 gap-10 items-center">
        <div className="md:col-span-8">
          <div
            data-hero-rise
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/[0.02] mono text-[11px] text-white/70 mb-7"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#00ff66] animate-pulse" />
            {p.status}
          </div>

          <h1
            className="font-semibold text-white leading-[1.02] tracking-tight"
            style={{ fontSize: "clamp(2.4rem, 6vw, 4.5rem)" }}
          >
            <DecryptText text={personal.name} />
            <span className="text-[#00f0ff]">.</span>
          </h1>

          <p className="mt-4 mono text-[#00f0ff] text-sm md:text-base">
            <DecryptText text={`<${p.title}/>`} />
            <span className="blink text-white/50">_</span>
          </p>

          <p data-hero-rise className="mt-6 text-white/70 max-w-2xl text-base md:text-lg leading-relaxed">
            {p.tagline}
          </p>

          <div data-hero-rise className="mt-5 flex flex-wrap gap-2">
            {p.chips.map((chip) => (
              <span key={chip} className="chip">
                {chip}
              </span>
            ))}
          </div>

          <div data-hero-rise className="mt-9 flex flex-wrap items-center gap-3">
            <a
              href="#projects"
              className="btn-primary rounded-md px-5 py-3 text-sm font-medium inline-flex items-center gap-2"
            >
              {t.ui.seeProjects}
              <ArrowRight size={16} />
            </a>
            <a
              href="#contact"
              className="btn-outline rounded-md px-5 py-3 text-sm font-medium inline-flex items-center gap-2"
            >
              <Mail size={16} />
              {t.ui.contactMe}
            </a>
          </div>

          <div data-hero-rise className="mt-10 flex flex-wrap items-center gap-5 text-white/60 text-sm">
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
              className="inline-flex items-center gap-2 nav-link"
            >
              <ExternalLink size={14} />
              planquia.com
            </a>
          </div>
        </div>

        <div className="md:col-span-4" data-hero-rise>
          <div className="relative">
            <div
              className="relative card-surface glass-card spotlight terminal-screen rounded-xl p-4 shadow-2xl"
              onMouseMove={tiltCard}
              onMouseLeave={resetTilt}
            >
              <div className="flex items-center gap-1.5 pb-3 border-b border-white/5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
                <span className="ml-2 mono text-[11px] text-white/50">
                  ~/arkam — zsh
                </span>
              </div>
              <pre className="mono text-[12.5px] leading-6 pt-3 text-white/80 overflow-x-auto">
{`$ whoami
Arkam ALI

$ cat role.txt
AI/ML Engineer
Production GenAI · RAG

$ ls ./stack
python  vllm  faiss
mistral  fastapi  docker

$ ./run.sh --mission
> Serving LLM on-premise
  air-gapped, no cloud.`}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
