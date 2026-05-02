import React from "react";
import { Building2, ArrowUpRight, ShieldCheck, Layers, Zap } from "lucide-react";
import { personal } from "../mock";

const pillars = [
  {
    icon: Layers,
    title: "Expertise data & IA",
    text: "Conception d'architectures RAG, assistants IA et pipelines de données sur mesure.",
  },
  {
    icon: Zap,
    title: "Mise en production",
    text: "Du POC à l'industrialisation : cloud, monitoring, évaluation et déploiement.",
  },
  {
    icon: ShieldCheck,
    title: "Fiabilité & rigueur",
    text: "Qualité du code, benchmarks et bonnes pratiques MLOps au cœur des livrables.",
  },
];

const Conjectura = () => {
  return (
    <section id="conjectura" className="section-padding relative">
      <div
        className="accent-glow"
        style={{
          width: 480,
          height: 480,
          right: "-15%",
          top: "-10%",
          background:
            "radial-gradient(circle at center, rgba(56,189,248,0.25), transparent 60%)",
        }}
      />

      <div className="container-xl relative">
        <div className="reveal max-w-2xl">
          <span className="section-eyebrow">// 06 — Partenariat</span>
          <h2 className="section-title mt-3">Conjectura — entreprise partenaire</h2>
          <p className="mt-4 text-white/65">
            Je collabore avec Conjectura pour concevoir et déployer des solutions
            data et IA pour des clients ambitieux.
          </p>
        </div>

        <div className="mt-12 grid md:grid-cols-12 gap-6">
          <div className="md:col-span-5 card-surface rounded-xl p-7 reveal">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-white/[0.04] border border-white/10 grid place-items-center text-[#38bdf8]">
                <Building2 size={18} />
              </div>
              <div>
                <h3 className="text-white font-medium">{personal.company.name}</h3>
                <p className="mono text-xs text-white/50">{personal.company.role}</p>
              </div>
            </div>
            <p className="mt-5 text-white/70 text-[15px] leading-relaxed">
              Une structure agile qui réunit data scientists et ingénieurs IA pour
              transformer des idées en produits concrets. J'y mets en pratique mon
              expertise RAG / LLM sur des projets clients.
            </p>
            <a
              href={personal.company.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 btn-primary rounded-md px-4 py-2.5 text-sm inline-flex items-center gap-2 w-fit"
            >
              Visiter conjectura.fr
              <ArrowUpRight size={16} />
            </a>
          </div>

          <div className="md:col-span-7 grid gap-4">
            {pillars.map((p) => {
              const Icon = p.icon;
              return (
                <div key={p.title} className="card-surface rounded-xl p-6 reveal">
                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-lg bg-white/[0.04] border border-white/10 grid place-items-center text-[#38bdf8] shrink-0">
                      <Icon size={18} />
                    </div>
                    <div>
                      <h4 className="text-white font-medium">{p.title}</h4>
                      <p className="mt-1 text-white/65 text-[14.5px] leading-relaxed">
                        {p.text}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Conjectura;
