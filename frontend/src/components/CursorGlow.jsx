import React, { useEffect, useRef } from "react";
import usePrefersReducedMotion from "../hooks/usePrefersReducedMotion";

const CursorGlow = () => {
  const ref = useRef(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el || reduced) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    let x = window.innerWidth / 2;
    let y = window.innerHeight / 3;
    let tx = x;
    let ty = y;
    let raf = 0;
    let running = true;

    const tick = () => {
      if (!running) return;
      x += (tx - x) * 0.14;
      y += (ty - y) * 0.14;
      el.style.transform = `translate3d(${x - 160}px, ${y - 160}px, 0)`;
      raf = requestAnimationFrame(tick);
    };

    const onMove = (e) => {
      tx = e.clientX;
      ty = e.clientY;
    };
    const onVis = () => {
      running = !document.hidden;
      if (running) tick();
      else cancelAnimationFrame(raf);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("visibilitychange", onVis);
    tick();

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, [reduced]);

  if (reduced) return null;

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none fixed top-0 left-0 z-[20] hidden h-[320px] w-[320px] rounded-full md:block"
      style={{
        background:
          "radial-gradient(circle, rgba(56,189,248,0.16), transparent 68%)",
      }}
    />
  );
};

export default CursorGlow;
