function finePointer() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(pointer: fine)").matches &&
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

export function trackSpotlight(e) {
  const el = e.currentTarget;
  const r = el.getBoundingClientRect();
  el.style.setProperty("--mx", `${e.clientX - r.left}px`);
  el.style.setProperty("--my", `${e.clientY - r.top}px`);
  return r;
}

export function tiltCard(e, max = 4.5) {
  const el = e.currentTarget;
  const r = trackSpotlight(e);
  if (!finePointer() || !r.width || !r.height) return;
  const px = (e.clientX - r.left) / r.width - 0.5;
  const py = (e.clientY - r.top) / r.height - 0.5;
  el.style.transition =
    "opacity 0.8s ease, border-color 0.25s ease, box-shadow 0.25s ease";
  el.style.transform = `perspective(900px) rotateX(${(-py * max).toFixed(2)}deg) rotateY(${(px * max).toFixed(2)}deg) translateY(-3px)`;
}

export function resetTilt(e) {
  e.currentTarget.style.transition = "";
  e.currentTarget.style.transform = "";
}
