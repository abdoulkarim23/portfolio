import { useEffect, useRef } from "react";

export default function useMagnetic(active) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !active) return undefined;
    if (!window.matchMedia("(pointer: fine)").matches) return undefined;

    const move = (event) => {
      const rect = el.getBoundingClientRect();
      const x = event.clientX - (rect.left + rect.width / 2);
      const y = event.clientY - (rect.top + rect.height / 2);
      el.style.transform = `translate(${x * 0.28}px, ${y * 0.38}px)`;
    };
    const leave = () => {
      el.style.transform = "translate(0, 0)";
    };

    el.addEventListener("pointermove", move);
    el.addEventListener("pointerleave", leave);
    return () => {
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerleave", leave);
    };
  }, [active]);

  return ref;
}
