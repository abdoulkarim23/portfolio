import React from "react";
import { Briefcase, MapPin, Check } from "lucide-react";
import { experiences } from "../mock";

const Experience = () => {
  return (
    <section id="experience" className="section-padding relative">
      <div className="container-xl">
        <div className="reveal max-w-2xl">
          <span className="section-eyebrow">// 02 — Parcours</span>
          <h2 className="section-title mt-3">Expérience professionnelle</h2>
        </div>

        <div className="mt-12 relative">
          <div className="absolute left-[11px] md:left-[15px] top-2 bottom-2 w-px bg-gradient-to-b from-[#38bdf8]/40 via-white/10 to-transparent" />

          <div className="space-y-8">
            {experiences.map((e) => (
              <div key={e.id} className="relative pl-10 md:pl-14 reveal">
                <span className="absolute left-0 top-1.5 w-6 h-6 md:w-8 md:h-8 rounded-full bg-[#07070a] border border-[#38bdf8]/50 grid place-items-center">
                  <Briefcase size={12} className="text-[#38bdf8]" />
                </span>

                <div className="card-surface rounded-xl p-6 md:p-7">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        {e.kind && (
                          <span className="mono text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full border border-white/10 text-white/55">
                            {e.kind}
                          </span>
                        )}
                        {e.current && (
                          <span className="mono text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full border border-emerald-400/30 text-emerald-400 bg-emerald-400/10">
                            En cours
                          </span>
                        )}
                      </div>
                      <h3 className="text-white text-lg font-medium">{e.role}</h3>
                      <p className="text-[#38bdf8] mono text-sm mt-0.5">
                        {e.company}
                      </p>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-white/55">
                      <span className="mono">{e.period}</span>
                      <span className="inline-flex items-center gap-1">
                        <MapPin size={12} /> {e.location}
                      </span>
                    </div>
                  </div>

                  <p className="mt-4 text-white/70 text-[15px] leading-relaxed">
                    {e.description}
                  </p>

                  <ul className="mt-5 space-y-2">
                    {e.achievements.map((a, i) => (
                      <li key={i} className="flex gap-3 text-white/70 text-sm">
                        <Check size={16} className="text-[#38bdf8] mt-0.5 shrink-0" />
                        <span>{a}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {e.stack.map((s) => (
                      <span key={s} className="chip">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
