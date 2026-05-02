import React, { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { navLinks, personal } from "../mock";

const Navbar = () => {
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
      <div className="container-xl flex items-center justify-between h-16">
        <a href="#top" className="flex items-center gap-2 group">
          <span className="w-8 h-8 rounded-md bg-white text-[#0b0b10] grid place-items-center font-semibold mono">
            {personal.initials}
          </span>
          <span className="text-sm text-white/90 hidden sm:inline">
            {personal.name}
            <span className="text-[#38bdf8]">.</span>
          </span>
        </a>

        <nav className="hidden md:flex items-center gap-7">
          {navLinks.map((l) => (
            <a key={l.href} href={l.href} className="nav-link text-sm">
              {l.label}
            </a>
          ))}
        </nav>

        <a
          href="#contact"
          className="hidden md:inline-flex btn-primary rounded-md px-4 py-2 text-sm font-medium"
        >
          Me contacter
        </a>

        <button
          className="md:hidden text-white"
          aria-label="Ouvrir le menu"
          onClick={() => setOpen((o) => !o)}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-white/5 bg-[#07070a]/95 backdrop-blur-xl">
          <div className="container-xl py-4 flex flex-col gap-4">
            {navLinks.map((l) => (
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
              Me contacter
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
