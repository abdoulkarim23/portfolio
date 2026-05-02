import React from "react";
import {
  Sparkles,
  BrainCircuit,
  Terminal,
  Cloud,
  Globe,
} from "lucide-react";
import { skills, languages } from "../mock";

const iconMap = {
  Sparkles: Sparkles,
  BrainCircuit: BrainCircuit,
  Terminal: Terminal,
  Cloud: Cloud,
};

const Skills = () => {
  return (
    <section id="skills" className="section-padding relative">
      <div className="container-xl">
        <div className="reveal max-w-2xl">
          <span className="section-eyebrow">// 02 — Stack</span>
          <h2 className="section-title mt-3">Compétences techniques</h2>
          <p className="mt-4 text-white/65">
            Du prototype à la mise en production — une stack pensée pour déployer
            des assistants IA fiables et performants.
          </p>
        </div>

        <div className="mt-12 grid md:grid-cols-2 xl:grid-cols-4 gap-5">
          {skills.map((s) => {
            const Icon = iconMap[s.icon] || Sparkles;
            return (
              <div key={s.category} className="card-surface rounded-xl p-6 reveal">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-white/[0.04] border border-white/10 grid place-items-center text-[#38bdf8]">
                    <Icon size={18} />
                  </div>
                  <h3 className="text-white font-medium">{s.category}</h3>
                </div>
                <div className="mt-5 flex flex-wrap gap-2">
                  {s.items.map((it) => (
                    <span key={it} className="chip">
                      {it}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Languages */}
        <div className="mt-12 grid md:grid-cols-12 gap-5 reveal">
          <div className="md:col-span-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-white/[0.04] border border-white/10 grid place-items-center text-[#38bdf8]">
                <Globe size={18} />
              </div>
              <h3 className="text-white font-medium">Langues</h3>
            </div>
            <p className="mt-3 text-white/55 text-sm">
              Communication fluide à l'international.
            </p>
          </div>
          <div className="md:col-span-8 grid sm:grid-cols-2 gap-4">
            {languages.map((l) => (
              <div key={l.name} className="card-surface rounded-lg p-4">
                <div className="flex items-baseline justify-between">
                  <span className="text-white">{l.name}</span>
                  <span className="text-white/50 text-xs mono">{l.level}</span>
                </div>
                <div className="mt-3 h-1 rounded-full bg-white/5 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#38bdf8] to-[#6366f1]"
                    style={{ width: `${l.value}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
