import React, { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { useI18n } from "../i18n/LanguageContext";
import LangToggle from "./LangToggle";

const Navbar = () => {
  const { personal, t } = useI18n();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "backdrop-blur-xl bg-[#07070a]/75 border-b border-white/5"
          : "bg-transparent"
      }`}
    >
      <div className="container-xl flex items-center justify-between h-16 gap-3">
        <a href="#top" className="flex items-center gap-2 group shrink-0">
          <span className="w-8 h-8 rounded-md bg-white text-[#0b0b10] grid place-items-center font-semibold mono">
            {personal.initials}
          </span>
          <span className="text-sm text-white/90 hidden sm:inline">
            {personal.name}
            <span className="text-[#38bdf8]">.</span>
          </span>
        </a>

        <nav className="hidden lg:flex items-center gap-5">
          {t.navLinks.map((l) => (
            <a key={l.href} href={l.href} className="nav-link text-sm">
              {l.label}
            </a>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-3 shrink-0">
          <LangToggle />
          <a
            href="#contact"
            className="btn-primary rounded-md px-4 py-2 text-sm font-medium"
          >
            {t.ui.contactMe}
          </a>
        </div>

        <div className="flex lg:hidden items-center gap-2">
          <LangToggle />
          <button
            className="text-white"
            aria-label={open ? t.ui.closeMenu : t.ui.openMenu}
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="lg:hidden border-t border-white/5 bg-[#07070a]/95 backdrop-blur-xl">
          <div className="container-xl py-4 flex flex-col gap-4">
            {t.navLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="nav-link text-sm"
                onClick={() => setOpen(false)}
              >
                {l.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="btn-primary rounded-md px-4 py-2 text-sm text-center"
            >
              {t.ui.contactMe}
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
