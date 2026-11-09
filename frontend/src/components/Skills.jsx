import React from "react";
import {
  Sparkles,
  BrainCircuit,
  Terminal,
  Server,
  Database,
  Globe,
} from "lucide-react";
import { useI18n } from "../i18n/LanguageContext";
import { resetTilt, tiltCard } from "../lib/motion";

const iconMap = {
  Sparkles: Sparkles,
  BrainCircuit: BrainCircuit,
  Terminal: Terminal,
  Server: Server,
  Database: Database,
};

const SkillCard = ({ skill, delay = 0 }) => {
  const Icon = iconMap[skill.icon] || Sparkles;
  return (
    <div
      className="card-surface spotlight rounded-xl p-6 reveal h-full"
      style={{ transitionDelay: `${delay}ms` }}
      onMouseMove={tiltCard}
      onMouseLeave={resetTilt}
    >
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
  const { t } = useI18n();
  const section = t.skills;
  const featured = section.groups.filter((s) => s.featured);
  const rest = section.groups.filter((s) => !s.featured);

  return (
    <section id="skills" className="section-padding relative">
      <div className="container-xl">
        <div className="reveal max-w-2xl">
          <span className="section-eyebrow">{section.eyebrow}</span>
          <h2 className="section-title mt-3">{section.heading}</h2>
          <p className="mt-4 text-white/65">{section.intro}</p>
        </div>

        <div className="mt-12 grid md:grid-cols-2 gap-5">
          {featured.map((s, i) => (
            <SkillCard key={s.category} skill={s} delay={i * 80} />
          ))}
        </div>

        <div className="mt-5 grid md:grid-cols-3 gap-5">
          {rest.map((s, i) => (
            <SkillCard key={s.category} skill={s} delay={i * 80} />
          ))}
        </div>

        <div className="mt-12 grid md:grid-cols-12 gap-5 reveal">
          <div className="md:col-span-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-white/[0.04] border border-white/10 grid place-items-center text-[#38bdf8]">
                <Globe size={18} />
              </div>
              <h3 className="text-white font-medium">{section.languagesTitle}</h3>
            </div>
            <p className="mt-3 text-white/55 text-sm">{section.languagesIntro}</p>
          </div>
          <div className="md:col-span-8 grid sm:grid-cols-2 gap-4">
            {section.spoken.map((l) => (
              <div
                key={l.name}
                className="card-surface spotlight rounded-lg p-4"
                onMouseMove={tiltCard}
                onMouseLeave={resetTilt}
              >
                <div className="flex items-baseline justify-between">
                  <span className="text-white">{l.name}</span>
                  <span className="text-white/50 text-xs mono">{l.level}</span>
                </div>
                <div className="mt-3 h-1 rounded-full bg-white/5 overflow-hidden">
                  <div
                    className="lang-fill h-full bg-gradient-to-r from-[#38bdf8] to-[#6366f1]"
                    style={{ "--w": `${l.value}%` }}
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
