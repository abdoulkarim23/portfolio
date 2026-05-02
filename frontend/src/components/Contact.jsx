import React, { useState } from "react";
import { Mail, MapPin, Phone, Github, Linkedin, Send, ArrowUpRight } from "lucide-react";
import { personal } from "../mock";
import { useToast } from "../hooks/use-toast";

const Contact = () => {
  const { toast } = useToast();
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);

  const onChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const onSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast({
        title: "Champs manquants",
        description: "Merci de remplir tous les champs avant d'envoyer.",
      });
      return;
    }
    setLoading(true);
    // Mock: save to localStorage
    setTimeout(() => {
      const inbox = JSON.parse(localStorage.getItem("contact_inbox") || "[]");
      inbox.unshift({ ...form, at: new Date().toISOString() });
      localStorage.setItem("contact_inbox", JSON.stringify(inbox));
      setForm({ name: "", email: "", message: "" });
      setLoading(false);
      toast({
        title: "Message envoyé • (mock)",
        description: "Merci ! Je reviens vers toi très vite.",
      });
    }, 700);
  };

  return (
    <section id="contact" className="section-padding relative">
      <div className="container-xl">
        <div className="reveal max-w-2xl">
          <span className="section-eyebrow">// 07 — Entrons en contact</span>
          <h2 className="section-title mt-3">Discutons de votre projet</h2>
          <p className="mt-4 text-white/65">
            Je suis ouvert aux opportunités d'alternance à partir de septembre
            2026, ainsi qu'aux collaborations freelance via Conjectura.
          </p>
        </div>

        <div className="mt-12 grid md:grid-cols-12 gap-6">
          <div className="md:col-span-5 space-y-4 reveal">
            <a
              href={`mailto:${personal.email}`}
              className="card-surface rounded-xl p-5 flex items-center justify-between group"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-white/[0.04] border border-white/10 grid place-items-center text-[#38bdf8]">
                  <Mail size={18} />
                </div>
                <div>
                  <div className="text-white/55 text-xs mono">EMAIL</div>
                  <div className="text-white text-sm">{personal.email}</div>
                </div>
              </div>
              <ArrowUpRight className="text-white/40 group-hover:text-white transition" size={16} />
            </a>

            <a
              href={`tel:${personal.phone.replace(/\s/g, "")}`}
              className="card-surface rounded-xl p-5 flex items-center justify-between group"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-white/[0.04] border border-white/10 grid place-items-center text-[#38bdf8]">
                  <Phone size={18} />
                </div>
                <div>
                  <div className="text-white/55 text-xs mono">TÉLÉPHONE</div>
                  <div className="text-white text-sm">{personal.phone}</div>
                </div>
              </div>
              <ArrowUpRight className="text-white/40 group-hover:text-white transition" size={16} />
            </a>

            <div className="card-surface rounded-xl p-5 flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-white/[0.04] border border-white/10 grid place-items-center text-[#38bdf8]">
                <MapPin size={18} />
              </div>
              <div>
                <div className="text-white/55 text-xs mono">LOCALISATION</div>
                <div className="text-white text-sm">{personal.location}</div>
              </div>
            </div>

            <div className="flex gap-3 pt-1">
              <a
                href={personal.github}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline rounded-md px-4 py-2.5 text-sm inline-flex items-center gap-2"
              >
                <Github size={16} /> GitHub
              </a>
              <a
                href={personal.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline rounded-md px-4 py-2.5 text-sm inline-flex items-center gap-2"
              >
                <Linkedin size={16} /> LinkedIn
              </a>
            </div>
          </div>

          <form
            onSubmit={onSubmit}
            className="md:col-span-7 card-surface rounded-xl p-6 md:p-8 reveal"
          >
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-white/55 mono">NOM</label>
                <input
                  name="name"
                  value={form.name}
                  onChange={onChange}
                  placeholder="Votre nom"
                  className="mt-2 w-full bg-transparent border border-white/10 rounded-md px-3 py-2.5 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#38bdf8]/60"
                />
              </div>
              <div>
                <label className="text-xs text-white/55 mono">EMAIL</label>
                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={onChange}
                  placeholder="vous@exemple.com"
                  className="mt-2 w-full bg-transparent border border-white/10 rounded-md px-3 py-2.5 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#38bdf8]/60"
                />
              </div>
            </div>
            <div className="mt-4">
              <label className="text-xs text-white/55 mono">MESSAGE</label>
              <textarea
                name="message"
                value={form.message}
                onChange={onChange}
                rows={6}
                placeholder="Parlez-moi de votre projet, contexte, besoin…"
                className="mt-2 w-full bg-transparent border border-white/10 rounded-md px-3 py-2.5 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#38bdf8]/60 resize-none"
              />
            </div>
            <div className="mt-6 flex items-center justify-between gap-4 flex-wrap">
              <p className="text-xs text-white/45">
                Réponse sous 24–48h — je lis chaque message.
              </p>
              <button
                type="submit"
                disabled={loading}
                className="btn-primary rounded-md px-5 py-2.5 text-sm font-medium inline-flex items-center gap-2 disabled:opacity-60"
              >
                {loading ? "Envoi…" : "Envoyer le message"}
                <Send size={14} />
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
