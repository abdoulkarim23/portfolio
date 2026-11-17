export function trackSpotlight(e) {
  const el = e.currentTarget;
  const r = el.getBoundingClientRect();
  el.style.setProperty("--mx", `${e.clientX - r.left}px`);
  el.style.setProperty("--my", `${e.clientY - r.top}px`);
  return r;
}

export function tiltCard(e) {
  trackSpotlight(e);
}

export function resetTilt() {}
