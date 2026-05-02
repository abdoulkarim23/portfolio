import React from "react";
import { GraduationCap } from "lucide-react";
import { education } from "../mock";

const Education = () => {
  return (
    <section id="education" className="section-padding relative">
      <div className="container-xl">
        <div className="reveal max-w-2xl">
          <span className="section-eyebrow">// 05 — Académique</span>
          <h2 className="section-title mt-3">Formation</h2>
        </div>

        <div className="mt-12 grid md:grid-cols-3 gap-5">
          {education.map((e) => (
            <div key={e.id} className="card-surface rounded-xl p-6 reveal">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-white/[0.04] border border-white/10 grid place-items-center text-[#38bdf8]">
                  <GraduationCap size={18} />
                </div>
                <span className="mono text-xs text-white/50">{e.period}</span>
              </div>
              <h3 className="mt-4 text-white text-lg font-medium">{e.school}</h3>
              <p className="mt-1 text-[#38bdf8] mono text-xs">{e.degree}</p>
              <p className="mt-3 text-white/60 text-sm leading-relaxed">
                {e.field}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;
