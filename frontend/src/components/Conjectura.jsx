import React from "react";
import {
  Building2,
  ArrowUpRight,
  ShieldCheck,
  Layers,
  Zap,
} from "lucide-react";
import { personal, planquia } from "../mock";

const iconMap = {
  Layers,
  Zap,
  ShieldCheck,
};

const Conjectura = () => {
  return (
    <section id="planquia" className="section-padding relative">
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
          <span className="section-eyebrow">// 06 — Produit</span>
          <h2 className="section-title mt-3">{planquia.heading}</h2>
          <p className="mt-4 text-white/65">{planquia.intro}</p>
        </div>

        <div className="mt-12 grid md:grid-cols-12 gap-6">
          <div className="md:col-span-5 card-surface rounded-xl p-7 reveal">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-white/[0.04] border border-white/10 grid place-items-center text-[#38bdf8]">
                <Building2 size={18} />
              </div>
              <div>
                <h3 className="text-white font-medium">
                  {personal.company.product}
                </h3>
                <p className="mono text-xs text-white/50">
                  {personal.company.name} · {personal.company.role}
                </p>
              </div>
            </div>
            <p className="mt-5 text-white/70 text-[15px] leading-relaxed">
              Des plans PDF de construction aux devis structurés : Planquia
              automatise l'extraction, le raisonnement et la quotation pour les
              professionnels du BTP.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href={personal.planquia}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary rounded-md px-4 py-2.5 text-sm inline-flex items-center gap-2 w-fit"
              >
                Visiter planquia.com
                <ArrowUpRight size={16} />
              </a>
              <a
                href={personal.company.url}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline rounded-md px-4 py-2.5 text-sm inline-flex items-center gap-2 w-fit"
              >
                conjectura.fr
                <ArrowUpRight size={16} />
              </a>
            </div>
          </div>

          <div className="md:col-span-7 grid gap-4">
            {planquia.pillars.map((p) => {
              const Icon = iconMap[p.icon] || Layers;
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
