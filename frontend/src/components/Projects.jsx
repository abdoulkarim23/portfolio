import React, { useState } from "react";
import { Github, ArrowUpRight, Lock } from "lucide-react";
import { useI18n } from "../i18n/LanguageContext";

const Projects = () => {
  const { personal, t } = useI18n();
  const section = t.projects;
  const [hovered, setHovered] = useState(null);

  return (
    <section id="projects" className="section-padding relative">
      <div className="container-xl">
        <div className="reveal flex flex-col md:flex-row md:items-end md:justify-between gap-6 max-w-none">
          <div className="max-w-2xl">
            <span className="section-eyebrow">{section.eyebrow}</span>
            <h2 className="section-title mt-3">{section.heading}</h2>
            <p className="mt-4 text-white/65">{section.intro}</p>
          </div>
          <a
            href={personal.github}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline rounded-md px-4 py-2 text-sm inline-flex items-center gap-2 w-fit"
          >
            <Github size={16} /> {t.ui.allRepos}
          </a>
        </div>

        <div className="mt-12 grid md:grid-cols-2 gap-5">
          {section.items.map((p, idx) => (
            <article
              key={p.id}
              onMouseEnter={() => setHovered(idx)}
              onMouseLeave={() => setHovered(null)}
              className={`card-surface rounded-xl p-6 group relative overflow-hidden reveal ${
                p.featured ? "md:col-span-2" : ""
              }`}
            >
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
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="mono text-xs text-white/45">
                      {p.subtitle} • {p.year}
                    </span>
                    {p.featured && (
                      <span className="mono text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full border border-[#38bdf8]/30 text-[#38bdf8] bg-[#38bdf8]/10">
                        {t.ui.flagship}
                      </span>
                    )}
                    {p.confidential && (
                      <span className="inline-flex items-center gap-1 mono text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full border border-white/10 text-white/50">
                        <Lock size={10} /> {t.ui.confidential}
                      </span>
                    )}
                  </div>
                  <h3 className="text-white text-lg font-medium mt-2 leading-tight">
                    {p.title}
                  </h3>
                </div>
                {p.url && (
                  <a
                    href={p.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 rounded-md border border-white/10 grid place-items-center text-white/60 hover:text-white hover:border-[#38bdf8]/60 transition shrink-0"
                    aria-label={`${t.ui.openProject} ${p.title}`}
                  >
                    <ArrowUpRight size={16} />
                  </a>
                )}
              </div>

              <p className="mt-4 text-white/65 text-sm leading-relaxed max-w-3xl">
                {p.summary}
              </p>

              {p.metrics && (
                <div className="mt-5 grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-xl">
                  {p.metrics.map((m) => (
                    <div
                      key={m.label}
                      className="rounded-lg border border-white/10 bg-white/[0.02] px-3 py-2.5"
                    >
                      <div className="mono text-white text-sm">{m.value}</div>
                      <div className="text-white/45 text-[11px] mt-0.5">
                        {m.label}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <ul className="mt-4 space-y-1.5">
                {p.bullets.map((b, i) => (
                  <li key={i} className="flex gap-2 text-white/60 text-[13px]">
                    <span className="text-[#38bdf8] mono">›</span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-5 flex flex-wrap gap-2">
                {p.tags.map((tag) => (
                  <span key={tag} className="chip">
                    {tag}
                  </span>
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
