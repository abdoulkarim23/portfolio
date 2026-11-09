import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import gsap from "gsap";
import usePrefersReducedMotion from "../hooks/usePrefersReducedMotion";

const MAGNET = ".btn-primary, .btn-outline";

const NeonCursor = () => {
  const reduced = usePrefersReducedMotion();
  const ringRef = useRef(null);
  const dotRef = useRef(null);

  useEffect(() => {
    if (reduced) return undefined;

    const ring = ringRef.current;
    const dot = dotRef.current;
    if (!ring || !dot) return undefined;

    gsap.set([ring, dot], { x: -120, y: -120, opacity: 0 });
    const ringX = gsap.quickTo(ring, "x", { duration: 0.45, ease: "power3.out" });
    const ringY = gsap.quickTo(ring, "y", { duration: 0.45, ease: "power3.out" });
    const dotX = gsap.quickTo(dot, "x", { duration: 0.12, ease: "power2.out" });
    const dotY = gsap.quickTo(dot, "y", { duration: 0.12, ease: "power2.out" });

    let armed = false;
    const pull = (e) => {
      if (e.pointerType && e.pointerType !== "mouse") return;
      if (!armed) {
        armed = true;
        document.documentElement.classList.add("neon-cursor-on");
        gsap.to([ring, dot], { opacity: 1, duration: 0.2 });
      }
      ringX(e.clientX);
      ringY(e.clientY);
      dotX(e.clientX);
      dotY(e.clientY);

      document.querySelectorAll(MAGNET).forEach((btn) => {
        const rect = btn.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = e.clientX - cx;
        const dy = e.clientY - cy;
        const reach = 140;
        if (dx * dx + dy * dy < reach * reach) {
          btn.style.transform = `translate(${dx * 0.42}px, ${dy * 0.48}px)`;
          btn.dataset.magnet = "1";
        } else if (btn.dataset.magnet === "1") {
          btn.style.transform = "";
          delete btn.dataset.magnet;
        }
      });
    };

    const onOver = (e) => {
      const hot = e.target.closest("a, button");
      gsap.to(ring, { scale: hot ? 1.55 : 1, duration: 0.25, overwrite: "auto" });
    };

    const reset = () => {
      document.querySelectorAll(MAGNET).forEach((btn) => {
        btn.style.transform = "";
        delete btn.dataset.magnet;
      });
    };

    window.addEventListener("pointermove", pull, { passive: true });
    window.addEventListener("mousemove", pull, { passive: true });
    window.addEventListener("pointerover", onOver);
    window.addEventListener("blur", reset);
    return () => {
      window.removeEventListener("pointermove", pull);
      window.removeEventListener("mousemove", pull);
      window.removeEventListener("pointerover", onOver);
      window.removeEventListener("blur", reset);
      document.documentElement.classList.remove("neon-cursor-on");
      reset();
    };
  }, [reduced]);

  if (reduced || typeof document === "undefined") return null;

  return createPortal(
    <>
      <div ref={ringRef} className="neon-cursor" aria-hidden="true" />
      <div ref={dotRef} className="neon-cursor-dot" aria-hidden="true" />
    </>,
    document.body
  );
};

export default NeonCursor;
