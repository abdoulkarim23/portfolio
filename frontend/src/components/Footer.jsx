import React from "react";
import { Github, Linkedin, Mail, ArrowUp } from "lucide-react";
import { useI18n } from "../i18n/LanguageContext";

const Footer = () => {
  const { personal, t } = useI18n();
  const year = new Date().getFullYear();
  return (
    <footer className="relative border-t border-white/5 mt-8">
      <div className="container-xl py-12 grid md:grid-cols-12 gap-8">
        <div className="md:col-span-5">
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-md bg-white text-[#0b0b10] grid place-items-center font-semibold mono">
              {personal.initials}
            </span>
            <span className="text-white/90">
              {personal.name}
              <span className="text-[#38bdf8]">.</span>
            </span>
          </div>
          <p className="mt-4 text-white/55 text-sm max-w-sm">
            {t.personal.footerBlurb}
          </p>
        </div>

        <div className="md:col-span-3">
          <h4 className="text-white/80 text-sm mono">{t.ui.navLabel}</h4>
          <ul className="mt-3 space-y-2 text-sm">
            {t.navLinks
              .filter((l) =>
                ["#about", "#experience", "#projects", "#planquia", "#contact"].includes(
                  l.href
                )
              )
              .map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="nav-link">
                    {l.label}
                  </a>
                </li>
              ))}
          </ul>
        </div>

        <div className="md:col-span-4">
          <h4 className="text-white/80 text-sm mono">{t.ui.elsewhere}</h4>
          <div className="mt-3 flex flex-col gap-2 text-sm">
            <a
              className="nav-link inline-flex items-center gap-2"
              href={personal.github}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github size={14} /> github.com/abdoulkarim23
            </a>
            <a
              className="nav-link inline-flex items-center gap-2"
              href={personal.linkedin}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Linkedin size={14} /> LinkedIn
            </a>
            <a
              className="nav-link inline-flex items-center gap-2"
              href={personal.planquia}
              target="_blank"
              rel="noopener noreferrer"
            >
              <ArrowUp size={14} className="rotate-45" /> planquia.com
            </a>
            <a
              className="nav-link inline-flex items-center gap-2"
              href={personal.company.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <ArrowUp size={14} className="rotate-45" /> conjectura.fr
            </a>
            <a
              className="nav-link inline-flex items-center gap-2"
              href={`mailto:${personal.email}`}
            >
              <Mail size={14} /> {personal.email}
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-white/5">
        <div className="container-xl py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/45">
          <span>
            © {year} {personal.name}. {t.ui.rights}
          </span>
          <span className="mono">{t.ui.crafted}</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
