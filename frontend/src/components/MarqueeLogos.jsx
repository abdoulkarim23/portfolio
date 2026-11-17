import React from "react";
import { useI18n } from "../i18n/LanguageContext";
import usePrefersReducedMotion from "../hooks/usePrefersReducedMotion";

const MarqueeLogos = () => {
  const { t } = useI18n();
  const reduced = usePrefersReducedMotion();
  const items = t.marquee ?? [];
  const loop = reduced ? items : [...items, ...items];

  return (
    <section id="skills" className="marquee" aria-label={t.ui.marqueeLabel}>
      <div className="marquee-track">
        {loop.map((item, index) => (
          <span className="marquee-item" key={`${item}-${index}`}>
            <span className="marquee-dot" aria-hidden="true" />
            {item}
          </span>
        ))}
      </div>
    </section>
  );
};

export default MarqueeLogos;
