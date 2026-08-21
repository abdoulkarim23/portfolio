import React from "react";
import { useI18n } from "../i18n/LanguageContext";

const LangToggle = ({ className = "" }) => {
  const { lang, setLang, t } = useI18n();

  return (
    <div
      className={`inline-flex items-center rounded-md border border-white/10 p-0.5 ${className}`}
      role="group"
      aria-label={t.ui.langSwitch}
    >
      <button
        type="button"
        onClick={() => setLang("fr")}
        className={`px-2.5 py-1 rounded text-[11px] font-medium mono tracking-wide transition ${
          lang === "fr"
            ? "bg-white text-[#0b0b10]"
            : "text-white/55 hover:text-white"
        }`}
        aria-pressed={lang === "fr"}
      >
        FR
      </button>
      <button
        type="button"
        onClick={() => setLang("en")}
        className={`px-2.5 py-1 rounded text-[11px] font-medium mono tracking-wide transition ${
          lang === "en"
            ? "bg-white text-[#0b0b10]"
            : "text-white/55 hover:text-white"
        }`}
        aria-pressed={lang === "en"}
      >
        EN
      </button>
    </div>
  );
};

export default LangToggle;
