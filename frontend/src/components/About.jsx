import React from "react";
import { useI18n } from "../i18n/LanguageContext";
import { resetTilt, tiltCard } from "../lib/motion";
import { ScrambleTitle } from "../fx/DecryptText";

const About = () => {
  const { t } = useI18n();
  const about = t.about;

  return (
    <section id="about" className="section-padding relative">
      <div className="container-xl">
        <div className="reveal max-w-2xl">
          <span className="section-eyebrow">{about.eyebrow}</span>
          <ScrambleTitle>{about.heading}</ScrambleTitle>
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
                  className="card-surface spotlight rounded-lg p-5"
                  onMouseMove={tiltCard}
                  onMouseLeave={resetTilt}
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
