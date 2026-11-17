import React, { useCallback, useEffect, useRef, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { useI18n } from "../i18n/LanguageContext";
import { setScrollLock } from "../lib/scrollLock";

const ProjectsShowcase = () => {
  const { t } = useI18n();
  const items = t.projects?.items ?? [];
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    containScroll: "trimSnaps",
    dragFree: true,
  });
  const [active, setActive] = useState(null);
  const opener = useRef(null);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  const open = (item, node) => {
    opener.current = node;
    setActive(item);
  };

  useEffect(() => {
    if (!active) return undefined;
    setScrollLock(true);
    const closeBtn = document.getElementById("case-close");
    closeBtn?.focus();
    const onKey = (event) => {
      if (event.key === "Escape") setActive(null);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      setScrollLock(false);
      window.removeEventListener("keydown", onKey);
      opener.current?.focus();
    };
  }, [active]);

  return (
    <section id="projects" className="section-padding projects">
      <div className="container-xl projects-head">
        <div>
          <p className="section-eyebrow reveal">{t.projects?.eyebrow}</p>
          <h2 className="display section-display reveal">{t.projects?.heading}</h2>
          <p className="section-intro reveal">{t.projects?.intro}</p>
        </div>
        <div className="project-arrows">
          <button type="button" className="icon-btn" onClick={scrollPrev} aria-label={t.ui.prevProject}>
            ←
          </button>
          <button type="button" className="icon-btn" onClick={scrollNext} aria-label={t.ui.nextProject}>
            →
          </button>
        </div>
      </div>

      <div className="embla" ref={emblaRef} data-cursor="drag">
        <div className="embla-row">
          {items.map((item) => (
            <article
              key={item.id}
              id={item.id === "proj-planquia" ? "planquia" : undefined}
              className="project-card"
            >
              <div className="project-card-top">
                <p className="mono project-year">{item.year}</p>
                {item.confidential ? (
                  <p className="mono project-flag">{t.ui.confidential}</p>
                ) : null}
                {item.featured ? <p className="mono project-flag is-live">{t.ui.flagship}</p> : null}
              </div>
              <h3 className="display project-title">{item.title}</h3>
              <p className="project-sub">{item.subtitle}</p>
              <p className="project-summary">{item.summary}</p>
              <ul className="project-tags">
                {item.tags?.slice(0, 4).map((tag) => (
                  <li key={tag}>{tag}</li>
                ))}
              </ul>
              <button
                type="button"
                className="project-read"
                data-cursor="view"
                onClick={(event) => open(item, event.currentTarget)}
              >
                {t.ui.readCase}
              </button>
            </article>
          ))}
        </div>
      </div>

      {active ? (
        <div className="case-root" onClick={() => setActive(null)}>
          <aside
            className="case-panel"
            role="dialog"
            aria-modal="true"
            aria-labelledby="case-title"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="case-bar">
              <p className="mono">{active.year}</p>
              <button id="case-close" type="button" className="menu-close" onClick={() => setActive(null)}>
                {t.ui.closeCase}
              </button>
            </div>
            <p className="mono case-kicker">{active.subtitle}</p>
            <h3 id="case-title" className="display case-title">
              {active.title}
            </h3>
            <p className="case-summary">{active.summary}</p>
            {active.metrics?.length ? (
              <dl className="case-metrics">
                {active.metrics.map((metric) => (
                  <div key={metric.label}>
                    <dt>{metric.label}</dt>
                    <dd>{metric.value}</dd>
                  </div>
                ))}
              </dl>
            ) : null}
            <ul className="case-bullets">
              {active.bullets?.map((bullet) => (
                <li key={bullet}>{bullet}</li>
              ))}
            </ul>
            <ul className="project-tags">
              {active.tags?.map((tag) => (
                <li key={tag}>{tag}</li>
              ))}
            </ul>
            {active.confidential ? <p className="case-note">{t.ui.confidentialNote}</p> : null}
            {active.url ? (
              <a
                className="btn-primary case-link"
                href={active.url}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="view"
              >
                {t.ui.visitPlanquia}
              </a>
            ) : null}
          </aside>
        </div>
      ) : null}
    </section>
  );
};

export default ProjectsShowcase;
