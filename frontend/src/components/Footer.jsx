import React, { useEffect, useState } from "react";
import { useI18n } from "../i18n/LanguageContext";
import { useToast } from "../hooks/use-toast";
import usePrefersReducedMotion from "../hooks/usePrefersReducedMotion";
import useMagnetic from "../lib/useMagnetic";

function useClock(timeZone, locale) {
  const [text, setText] = useState("");

  useEffect(() => {
    const format = new Intl.DateTimeFormat(locale, {
      hour: "2-digit",
      minute: "2-digit",
      hourCycle: "h23",
      timeZone,
    });
    const tick = () => setText(format.format(new Date()));
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, [timeZone, locale]);

  return text;
}

const Footer = () => {
  const { personal, t, lang } = useI18n();
  const { toast } = useToast();
  const reduced = usePrefersReducedMotion();
  const magnet = useMagnetic(!reduced);
  const locale = lang === "en" ? "en-GB" : "fr-FR";
  const paris = useClock(personal.timeZone || "Europe/Paris", locale);
  const utc = useClock("UTC", locale);
  const year = new Date().getFullYear();

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(personal.email);
      toast({ title: t.ui.copiedTitle, description: t.ui.copiedBody });
    } catch {
      toast({ title: t.ui.copyFailed, description: personal.email });
    }
  };

  return (
    <footer className="site-footer">
      <div className="container-xl footer-cta">
        <h2 className="display footer-title">{t.cta?.heading}</h2>
        <p className="footer-body">{t.cta?.body}</p>
        <div className="footer-actions">
          <button
            ref={magnet}
            type="button"
            className="btn-primary magnet"
            data-cursor="copy"
            onClick={copyEmail}
          >
            {t.cta?.copy}
          </button>
          <a href="#contact" className="btn-outline" data-cursor="view">
            {t.ui.contactMe}
          </a>
        </div>
      </div>

      <div className="footer-status">
        <div className="container-xl status-row">
          <p className="mono status-clock">
            <time dateTime={paris}>
              {personal.clockCity} — {paris}
            </time>
            <time dateTime={utc}>UTC — {utc}</time>
          </p>
          <p className="status-links">
            <a href={personal.github} target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
            <a href={personal.linkedin} target="_blank" rel="noopener noreferrer">
              LinkedIn
            </a>
            <a href={personal.planquia} target="_blank" rel="noopener noreferrer">
              planquia.com
            </a>
          </p>
          <p className="mono status-meta">
            © {year} {personal.name}. {t.ui.rights}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
