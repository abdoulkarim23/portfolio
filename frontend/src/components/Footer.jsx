import React from "react";
import { Github, Linkedin, Mail, ArrowUp } from "lucide-react";
import { personal } from "../mock";

const Footer = () => {
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
            Ingénieur ML/GenAI/RAG — basé à Paris. Toujours curieux de nouveaux
            défis autour des LLMs et de la donnée.
          </p>
        </div>

        <div className="md:col-span-3">
          <h4 className="text-white/80 text-sm mono">NAVIGATION</h4>
          <ul className="mt-3 space-y-2 text-sm">
            <li><a href="#about" className="nav-link">À propos</a></li>
            <li><a href="#projects" className="nav-link">Projets</a></li>
            <li><a href="#experience" className="nav-link">Expérience</a></li>
            <li><a href="#contact" className="nav-link">Contact</a></li>
          </ul>
        </div>

        <div className="md:col-span-4">
          <h4 className="text-white/80 text-sm mono">AILLEURS</h4>
          <div className="mt-3 flex flex-col gap-2 text-sm">
            <a className="nav-link inline-flex items-center gap-2" href={personal.github} target="_blank" rel="noopener noreferrer">
              <Github size={14} /> github.com/abdoulkarim23
            </a>
            <a className="nav-link inline-flex items-center gap-2" href={personal.linkedin} target="_blank" rel="noopener noreferrer">
              <Linkedin size={14} /> LinkedIn
            </a>
            <a className="nav-link inline-flex items-center gap-2" href={personal.company.url} target="_blank" rel="noopener noreferrer">
              <ArrowUp size={14} className="rotate-45" /> conjectura.fr
            </a>
            <a className="nav-link inline-flex items-center gap-2" href={`mailto:${personal.email}`}>
              <Mail size={14} /> {personal.email}
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-white/5">
        <div className="container-xl py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/45">
          <span>© {year} {personal.name}. Tous droits réservés.</span>
          <span className="mono">Conçu & développé avec rigueur • Paris</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
