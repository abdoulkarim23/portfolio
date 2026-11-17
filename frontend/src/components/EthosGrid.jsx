import React from "react";
import { useI18n } from "../i18n/LanguageContext";

const EthosGrid = () => {
  const { t } = useI18n();
  const block = t.ethos;
  if (!block) return null;

  const move = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty("--mx", `${event.clientX - rect.left}px`);
    event.currentTarget.style.setProperty("--my", `${event.clientY - rect.top}px`);
  };

  return (
    <section id="ethos" className="section-padding">
      <div className="container-xl">
        <p className="section-eyebrow reveal">{block.eyebrow}</p>
        <h2 className="display section-display reveal">{block.heading}</h2>
        <div className="ethos-grid">
          {block.items?.map((item) => (
            <article
              key={item.index}
              className="ethos-cell reveal"
              onMouseMove={move}
            >
              <p className="mono ethos-index">{item.index}</p>
              <h3 className="display ethos-title">{item.title}</h3>
              <p className="ethos-text">{item.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EthosGrid;
