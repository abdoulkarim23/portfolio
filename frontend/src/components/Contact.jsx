import React, { useState } from "react";
import {
  Mail,
  MapPin,
  Phone,
  Github,
  Linkedin,
  Send,
  ArrowUpRight,
  CheckCircle2,
} from "lucide-react";
import { personal } from "../mock";
import { useToast } from "../hooks/use-toast";

const FORMSUBMIT_URL =
  "https://formsubmit.co/ajax/5f89ddc9d69312d3a3a5d9e709830ec8";

const emptyForm = { name: "", email: "", message: "", website: "" };

const Contact = () => {
  const { toast } = useToast();
  const [form, setForm] = useState(emptyForm);
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const onChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    if (form.website) return;
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      toast({
        title: "Champs manquants",
        description: "Merci de remplir tous les champs avant d'envoyer.",
      });
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(FORMSUBMIT_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim(),
          message: form.message.trim(),
          _subject: `Portfolio — message de ${form.name.trim()}`,
          _template: "table",
          _captcha: "false",
        }),
      });

      const data = await res.json().catch(() => ({}));
      const failed =
        !res.ok || data.success === false || data.success === "false";
      if (failed) {
        throw new Error(data.message || "Envoi impossible");
      }

      setSent(true);
      setForm(emptyForm);
      toast({
        title: "Message envoyé",
        description: "Merci — je vous réponds sous 24–48h.",
      });
    } catch {
      toast({
        title: "Envoi impossible",
        description:
          "Réessayez dans un instant, ou écrivez-moi directement par email.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="section-padding relative">
      <div className="container-xl">
        <div className="reveal max-w-2xl">
          <span className="section-eyebrow">// 07 — Entrons en contact</span>
          <h2 className="section-title mt-3">Discutons de votre projet</h2>
          <p className="mt-4 text-white/65">
            Un système RAG à industrialiser, un déploiement on-premise, une
            collaboration autour de Planquia — écrivez-moi, je lis chaque
            message.
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
              <ArrowUpRight
                className="text-white/40 group-hover:text-white transition"
                size={16}
              />
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
              <ArrowUpRight
                className="text-white/40 group-hover:text-white transition"
                size={16}
              />
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

          {sent ? (
            <div className="md:col-span-7 card-surface rounded-xl p-6 md:p-8 reveal flex flex-col items-start justify-center min-h-[280px]">
              <div className="w-10 h-10 rounded-lg bg-emerald-400/10 border border-emerald-400/30 grid place-items-center text-emerald-400">
                <CheckCircle2 size={20} />
              </div>
              <h3 className="mt-4 text-white text-lg font-medium">
                Message bien envoyé
              </h3>
              <p className="mt-2 text-white/65 text-sm leading-relaxed max-w-md">
                Merci. Je reviens vers vous sous 24–48h à l'adresse indiquée.
              </p>
              <button
                type="button"
                onClick={() => setSent(false)}
                className="mt-6 btn-outline rounded-md px-4 py-2.5 text-sm"
              >
                Envoyer un autre message
              </button>
            </div>
          ) : (
            <form
              onSubmit={onSubmit}
              className="md:col-span-7 card-surface rounded-xl p-6 md:p-8 reveal relative overflow-hidden"
            >
              <div
                aria-hidden="true"
                className="absolute -left-[9999px] h-0 w-0 overflow-hidden"
              >
                <label htmlFor="website">Site web</label>
                <input
                  id="website"
                  name="website"
                  tabIndex={-1}
                  autoComplete="off"
                  value={form.website}
                  onChange={onChange}
                />
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-white/55 mono" htmlFor="name">
                    NOM
                  </label>
                  <input
                    id="name"
                    name="name"
                    value={form.name}
                    onChange={onChange}
                    required
                    placeholder="Votre nom"
                    className="mt-2 w-full bg-transparent border border-white/10 rounded-md px-3 py-2.5 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#38bdf8]/60"
                  />
                </div>
                <div>
                  <label className="text-xs text-white/55 mono" htmlFor="email">
                    EMAIL
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={onChange}
                    required
                    placeholder="vous@exemple.com"
                    className="mt-2 w-full bg-transparent border border-white/10 rounded-md px-3 py-2.5 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#38bdf8]/60"
                  />
                </div>
              </div>
              <div className="mt-4">
                <label className="text-xs text-white/55 mono" htmlFor="message">
                  MESSAGE
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={form.message}
                  onChange={onChange}
                  required
                  rows={6}
                  placeholder="Parlez-moi de votre projet, contexte, besoin…"
                  className="mt-2 w-full bg-transparent border border-white/10 rounded-md px-3 py-2.5 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#38bdf8]/60 resize-none"
                />
              </div>
              <div className="mt-6 flex items-center justify-between gap-4 flex-wrap">
                <p className="text-xs text-white/45">
                  Réponse sous 24–48h — le message m'arrive directement par
                  email.
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
          )}
        </div>
      </div>
    </section>
  );
};

export default Contact;
