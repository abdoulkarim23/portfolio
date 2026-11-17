import React, { useState } from "react";
import { useI18n } from "../i18n/LanguageContext";

const FaqAccordion = () => {
  const { t } = useI18n();
  const block = t.faq;
  const [open, setOpen] = useState(0);
  if (!block) return null;

  return (
    <section id="faq" className="section-padding">
      <div className="container-xl faq-wrap">
        <div>
          <p className="section-eyebrow reveal">{block.eyebrow}</p>
          <h2 className="display section-display reveal">{block.heading}</h2>
        </div>
        <div className="faq-list">
          {block.items?.map((item, index) => {
            const isOpen = open === index;
            const panelId = `faq-panel-${index}`;
            return (
              <div key={item.q} className="faq-item">
                <button
                  type="button"
                  className="faq-trigger"
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => setOpen(isOpen ? -1 : index)}
                >
                  <span>{item.q}</span>
                  <span className={`faq-plus${isOpen ? " is-open" : ""}`} aria-hidden="true">
                    +
                  </span>
                </button>
                <div id={panelId} className={`faq-panel${isOpen ? " is-open" : ""}`} role="region">
                  <div className="faq-panel-inner">
                    <p>{item.a}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FaqAccordion;
