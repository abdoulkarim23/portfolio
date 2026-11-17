import React, { useEffect, useRef, useState } from "react";
import { useI18n } from "../i18n/LanguageContext";
import usePrefersReducedMotion from "../hooks/usePrefersReducedMotion";

function Counter({ stat, play }) {
  const [value, setValue] = useState(play ? 0 : stat.value);

  useEffect(() => {
    if (!play) {
      setValue(stat.value);
      return undefined;
    }
    const start = performance.now();
    const duration = 1100;
    let frame = 0;
    const tick = (now) => {
      const progress = Math.min(1, (now - start) / duration);
      const eased = 1 - (1 - progress) ** 3;
      setValue(Math.round(stat.value * eased));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [play, stat.value]);

  return (
    <span>
      {stat.prefix}
      {value}
      {stat.suffix}
    </span>
  );
}

const StoryAndStats = () => {
  const { t } = useI18n();
  const reduced = usePrefersReducedMotion();
  const statsRef = useRef(null);
  const [play, setPlay] = useState(reduced);
  const story = t.story;
  const jobs = t.experience?.items ?? [];
  const schools = t.education?.items ?? [];
  const stats = t.stats ?? [];

  useEffect(() => {
    if (reduced) {
      setPlay(true);
      return undefined;
    }
    const node = statsRef.current;
    if (!node) return undefined;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setPlay(true);
          observer.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [reduced]);

  if (!story) return null;

  return (
    <section id="experience" className="section-padding story">
      <div className="container-xl story-grid">
        <div className="story-sticky">
          <p className="section-eyebrow">{story.eyebrow}</p>
          <h2 className="display section-display">{story.heading}</h2>
          <p className="section-intro">{story.lede}</p>
        </div>
        <div className="story-body">
          {t.about?.paragraphs?.map((paragraph) => (
            <p key={paragraph} className="story-paragraph">
              {paragraph}
            </p>
          ))}

          <ol className="job-list">
            {jobs.map((job, index) => (
              <li key={job.id} className="job">
                <div className="job-meta">
                  <span className="mono">{String(index + 1).padStart(2, "0")}</span>
                  <span className="mono">{job.period}</span>
                  {job.current ? <span className="mono job-now">{t.ui.current}</span> : null}
                </div>
                <h3 className="job-role">{job.role}</h3>
                <p className="job-company">
                  {job.company}
                  <span> · {job.location}</span>
                </p>
                <p className="job-text">{job.description}</p>
              </li>
            ))}
          </ol>

          <div id="education" className="edu-block">
            <p className="section-eyebrow">{t.education?.eyebrow}</p>
            <ul className="edu-list">
              {schools.map((school) => (
                <li key={school.id}>
                  <span className="mono edu-period">{school.period}</span>
                  <strong>{school.school}</strong>
                  <span className="edu-degree">{school.degree}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="container-xl stats" ref={statsRef}>
        {stats.map((stat) => (
          <article key={stat.id} className="stat">
            <p className="display stat-value">
              <Counter stat={stat} play={play} />
            </p>
            <p className="mono stat-label">{stat.label}</p>
          </article>
        ))}
      </div>
    </section>
  );
};

export default StoryAndStats;
