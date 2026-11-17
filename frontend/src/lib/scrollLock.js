let locks = 0;

export function setScrollLock(on) {
  locks = Math.max(0, locks + (on ? 1 : -1));
  document.body.style.overflow = locks > 0 ? "hidden" : "";
  window.dispatchEvent(
    new CustomEvent("portfolio:lock", { detail: { locked: locks > 0 } })
  );
}
