import React from "react";
import { useI18n } from "../i18n/LanguageContext";

const EditorialDefinition = () => {
  const { t } = useI18n();
  const d = t.definition;
  if (!d) return null;

  return (
    <section id="about" className="section-padding definition">
      <div className="container-xl">
        <p className="section-eyebrow reveal">{d.eyebrow}</p>
        <div className="definition-grid">
          <header className="reveal">
            <h2 className="display definition-word">{d.word}</h2>
            <p className="mono definition-phonetic">
              {d.phonetic}
              <span>{d.pos}</span>
            </p>
          </header>
          <div className="reveal">
            <p className="definition-body">{d.definition}</p>
            <blockquote className="definition-quote">{d.citation}</blockquote>
            <p className="mono definition-outcomes-label">{d.outcomesLabel}</p>
            <ul className="definition-outcomes">
              {d.outcomes?.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EditorialDefinition;
