import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useI18n } from "../i18n/LanguageContext";
import usePrefersReducedMotion from "../hooks/usePrefersReducedMotion";
import useMagnetic from "../lib/useMagnetic";
import { setScrollLock } from "../lib/scrollLock";
import LangToggle from "./LangToggle";

const Navbar = () => {
  const { personal, t } = useI18n();
  const reduced = usePrefersReducedMotion();
  const magnet = useMagnetic(!reduced);
  const [open, setOpen] = useState(false);
  const [hover, setHover] = useState(0);
  const links = t.navLinks ?? [];
  const preview = links[hover] || links[0];

  useEffect(() => {
    if (!open) return undefined;
    setScrollLock(true);
    const closeBtn = document.getElementById("menu-close");
    closeBtn?.focus();
    const onKey = (event) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      setScrollLock(false);
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <header className="site-header">
      <div className="container-xl header-bar">
        <a href="#top" className="brand" onClick={close}>
          <span className="brand-mark">{personal.initials}</span>
          <span className="brand-name">
            {personal.name}
          </span>
        </a>
        <div className="header-actions">
          <LangToggle />
          <a
            ref={magnet}
            href="#contact"
            className="btn-primary magnet"
            data-cursor="view"
          >
            {t.ui.letsTalk}
          </a>
          <button
            type="button"
            className="menu-toggle"
            aria-expanded={open}
            aria-controls="site-menu"
            onClick={() => setOpen((value) => !value)}
          >
            {open ? t.ui.closeMenu : t.ui.menu}
          </button>
        </div>
      </div>

      {open && createPortal(
        <div
          id="site-menu"
          className="menu-overlay"
          role="dialog"
          aria-modal="true"
          aria-label={t.ui.menu}
        >
          <div className="container-xl menu-grid">
            <nav className="menu-nav" aria-label={t.ui.navLabel}>
              {links.map((link, index) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="menu-link display"
                  onMouseEnter={() => setHover(index)}
                  onFocus={() => setHover(index)}
                  onClick={close}
                >
                  <span className="mono menu-index">{link.index}</span>
                  <span>{link.label}</span>
                </a>
              ))}
            </nav>
            <aside className="menu-preview">
              <p className="display menu-preview-index">{preview?.index}</p>
              <p className="menu-preview-text">{preview?.preview}</p>
              <div className="menu-social">
                <p className="mono menu-social-label">{t.ui.elsewhere}</p>
                <a
                  href={personal.github}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GitHub
                </a>
                <a
                  href={personal.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  LinkedIn
                </a>
                <a
                  href={personal.planquia}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  planquia.com
                </a>
              </div>
            </aside>
          </div>
          <div className="menu-tools">
            <LangToggle />
            <button id="menu-close" type="button" className="menu-close" onClick={close}>
              {t.ui.closeMenu}
            </button>
          </div>
        </div>,
        document.body
      )}
    </header>
  );
};

export default Navbar;
