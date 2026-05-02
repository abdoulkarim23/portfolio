import React, { useState } from "react";
import { ExternalLink, Github, ArrowUpRight } from "lucide-react";
import { projects } from "../mock";

const Projects = () => {
  const [hovered, setHovered] = useState(null);

  return (
    <section id="projects" className="section-padding relative">
      <div className="container-xl">
        <div className="reveal flex flex-col md:flex-row md:items-end md:justify-between gap-6 max-w-none">
          <div className="max-w-2xl">
            <span className="section-eyebrow">// 04 — Réalisations</span>
            <h2 className="section-title mt-3">Projets sélectionnés</h2>
            <p className="mt-4 text-white/65">
              Une sélection de projets RAG, data et IA.
            </p>
          </div>
          <a
            href="https://github.com/abdoulkarim23"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline rounded-md px-4 py-2 text-sm inline-flex items-center gap-2 w-fit"
          >
            <Github size={16} /> Tous les repos
          </a>
        </div>

        <div className="mt-12 grid md:grid-cols-2 xl:grid-cols-3 gap-5">
          {projects.map((p, idx) => (
            <article
              key={p.id}
              onMouseEnter={() => setHovered(idx)}
              onMouseLeave={() => setHovered(null)}
              className="card-surface rounded-xl p-6 group relative overflow-hidden reveal"
            >
              {/* accent line */}
              <div
                className="absolute inset-x-0 top-0 h-px transition-opacity"
                style={{
                  background:
                    "linear-gradient(90deg, transparent, rgba(56,189,248,0.6), transparent)",
                  opacity: hovered === idx ? 1 : 0,
                }}
              />

              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="mono text-xs text-white/45">
                    {p.subtitle} • {p.year}
                  </div>
                  <h3 className="text-white text-lg font-medium mt-2 leading-tight">
                    {p.title}
                  </h3>
                </div>
                <a
                  href={p.repo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-md border border-white/10 grid place-items-center text-white/60 hover:text-white hover:border-[#38bdf8]/60 transition"
                  aria-label="Voir le repo"
                >
                  <ArrowUpRight size={16} />
                </a>
              </div>

              <p className="mt-4 text-white/65 text-sm leading-relaxed">
                {p.summary}
              </p>

              <ul className="mt-4 space-y-1.5">
                {p.bullets.map((b, i) => (
                  <li key={i} className="flex gap-2 text-white/60 text-[13px]">
                    <span className="text-[#38bdf8] mono">›</span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-5 flex flex-wrap gap-2">
                {p.tags.map((t) => (
                  <span key={t} className="chip">{t}</span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
