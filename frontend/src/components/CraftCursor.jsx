import React, { useEffect, useState } from "react";
import { useI18n } from "../i18n/LanguageContext";
import usePrefersReducedMotion from "../hooks/usePrefersReducedMotion";

const CraftCursor = () => {
  const { t } = useI18n();
  const reduced = usePrefersReducedMotion();
  const [on, setOn] = useState(false);
  const [pos, setPos] = useState({ x: -80, y: -80 });
  const [mode, setMode] = useState("");

  useEffect(() => {
    if (reduced) return undefined;
    if (!window.matchMedia("(pointer: fine)").matches) return undefined;

    document.documentElement.classList.add("has-craft-cursor");
    setOn(true);

    const labels = {
      view: t.ui.cursorView,
      drag: t.ui.cursorDrag,
      copy: t.ui.cursorCopy,
    };

    const move = (event) => {
      setPos({ x: event.clientX, y: event.clientY });
      const hit = event.target.closest?.("[data-cursor]");
      const key = hit?.getAttribute("data-cursor") || "";
      setMode(labels[key] ? key : "");
    };
    const hide = () => setPos({ x: -80, y: -80 });

    window.addEventListener("pointermove", move);
    window.addEventListener("pointerleave", hide);
    return () => {
      document.documentElement.classList.remove("has-craft-cursor");
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerleave", hide);
    };
  }, [reduced, t]);

  if (!on) return null;

  const label =
    mode === "view"
      ? t.ui.cursorView
      : mode === "drag"
        ? t.ui.cursorDrag
        : mode === "copy"
          ? t.ui.cursorCopy
          : "";

  return (
    <div
      className={`craft-cursor${label ? " is-hot" : ""}`}
      style={{ transform: `translate3d(${pos.x}px, ${pos.y}px, 0)` }}
      aria-hidden="true"
    >
      {label}
    </div>
  );
};

export default CraftCursor;
