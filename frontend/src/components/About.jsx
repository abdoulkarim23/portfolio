import React from "react";
import { about } from "../mock";

const About = () => {
  return (
    <section id="about" className="section-padding relative">
      <div className="container-xl">
        <div className="reveal max-w-2xl">
          <span className="section-eyebrow">// 01 — Profil</span>
          <h2 className="section-title mt-3">{about.heading}</h2>
        </div>

        <div className="mt-12 grid md:grid-cols-12 gap-10">
          <div className="md:col-span-7 reveal space-y-5 text-white/75 text-[15.5px] leading-[1.8]">
            {about.paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>

          <div className="md:col-span-5 reveal">
            <div className="grid grid-cols-2 gap-4">
              {about.highlights.map((h) => (
                <div
                  key={h.label}
                  className="card-surface rounded-lg p-5"
                >
                  <div className="mono text-2xl md:text-3xl text-white font-semibold">
                    {h.value}
                  </div>
                  <div className="text-white/55 text-xs mt-1">{h.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
