import React from "react";
import {
  Sparkles,
  BrainCircuit,
  Terminal,
  Server,
  Database,
  Globe,
} from "lucide-react";
import { skills, languages } from "../mock";

const iconMap = {
  Sparkles: Sparkles,
  BrainCircuit: BrainCircuit,
  Terminal: Terminal,
  Server: Server,
  Database: Database,
};

const SkillCard = ({ skill }) => {
  const Icon = iconMap[skill.icon] || Sparkles;
  return (
    <div className="card-surface rounded-xl p-6 reveal h-full">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-white/[0.04] border border-white/10 grid place-items-center text-[#38bdf8]">
          <Icon size={18} />
        </div>
        <h3 className="text-white font-medium">{skill.category}</h3>
      </div>
      <div className="mt-5 flex flex-wrap gap-2">
        {skill.items.map((it) => (
          <span key={it} className="chip">
            {it}
          </span>
        ))}
      </div>
    </div>
  );
};

const Skills = () => {
  const featured = skills.filter((s) => s.featured);
  const rest = skills.filter((s) => !s.featured);

  return (
    <section id="skills" className="section-padding relative">
      <div className="container-xl">
        <div className="reveal max-w-2xl">
          <span className="section-eyebrow">// 04 — Stack</span>
          <h2 className="section-title mt-3">Compétences techniques</h2>
          <p className="mt-4 text-white/65">
            Une stack pensée pour le GenAI de production — y compris le serving
            local, air-gapped, sur hardware contraint.
          </p>
        </div>

        <div className="mt-12 grid md:grid-cols-2 gap-5">
          {featured.map((s) => (
            <SkillCard key={s.category} skill={s} />
          ))}
        </div>

        <div className="mt-5 grid md:grid-cols-3 gap-5">
          {rest.map((s) => (
            <SkillCard key={s.category} skill={s} />
          ))}
        </div>

        <div className="mt-12 grid md:grid-cols-12 gap-5 reveal">
          <div className="md:col-span-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-white/[0.04] border border-white/10 grid place-items-center text-[#38bdf8]">
                <Globe size={18} />
              </div>
              <h3 className="text-white font-medium">Langues</h3>
            </div>
            <p className="mt-3 text-white/55 text-sm">
              Communication fluide en contexte international et défense.
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
