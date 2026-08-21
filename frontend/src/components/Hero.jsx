import React from "react";
import { ArrowRight, Github, Linkedin, Mail, MapPin, ExternalLink } from "lucide-react";
import { personal, heroStats } from "../mock";

const Hero = () => {
  return (
    <section id="top" className="relative overflow-hidden pt-28 md:pt-36 pb-20 md:pb-28">
      <div className="absolute inset-0 grid-bg" />
      <div
        className="accent-glow floaty"
        style={{
          width: 520,
          height: 520,
          top: -180,
          left: "55%",
          background:
            "radial-gradient(circle at center, rgba(56,189,248,0.45), transparent 60%)",
        }}
      />
      <div
        className="accent-glow"
        style={{
          width: 420,
          height: 420,
          bottom: -160,
          left: "-6%",
          background:
            "radial-gradient(circle at center, rgba(99,102,241,0.30), transparent 60%)",
        }}
      />

      <div className="container-xl relative z-10 grid md:grid-cols-12 gap-10 items-center">
        <div className="md:col-span-8">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/[0.02] mono text-[11px] text-white/70 mb-7">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            {personal.status}
          </div>

          <h1
            className="font-semibold text-white leading-[1.02] tracking-tight"
            style={{ fontSize: "clamp(2.4rem, 6vw, 4.5rem)" }}
          >
            {personal.name}
            <span className="text-[#38bdf8]">.</span>
          </h1>

          <p className="mt-4 mono text-[#38bdf8] text-sm md:text-base">
            &lt;{personal.title}/&gt;
            <span className="blink text-white/50">_</span>
          </p>

          <p className="mt-6 text-white/70 max-w-2xl text-base md:text-lg leading-relaxed">
            {personal.tagline}
          </p>

          <div className="mt-5 flex flex-wrap gap-2">
            {personal.chips.map((chip) => (
              <span key={chip} className="chip">
                {chip}
              </span>
            ))}
          </div>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <a
              href="#projects"
              className="btn-primary rounded-md px-5 py-3 text-sm font-medium inline-flex items-center gap-2"
            >
              Voir les projets
              <ArrowRight size={16} />
            </a>
            <a
              href="#contact"
              className="btn-outline rounded-md px-5 py-3 text-sm font-medium inline-flex items-center gap-2"
            >
              <Mail size={16} />
              Me contacter
            </a>
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-5 text-white/60 text-sm">
            <span className="inline-flex items-center gap-2">
              <MapPin size={14} />
              {personal.location}
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

        <div className="md:col-span-4">
          <div className="relative card-surface rounded-xl p-4 shadow-2xl">
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

      <div className="container-xl relative z-10 mt-14 grid grid-cols-2 md:grid-cols-4 gap-3">
        {heroStats.map((stat) => (
          <div key={stat.label} className="card-surface rounded-lg px-4 py-4">
            <div className="mono text-white text-sm md:text-base font-medium">
              {stat.value}
            </div>
            <div className="text-white/50 text-[11px] mt-1">{stat.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Hero;
