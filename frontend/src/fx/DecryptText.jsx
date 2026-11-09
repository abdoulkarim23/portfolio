import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import usePrefersReducedMotion from "../hooks/usePrefersReducedMotion";

const GLYPHS = "01ABCDEF<>/{}[]_#";

const DecryptText = ({ text, className, as: Tag = "span", inView = false }) => {
  const reduced = usePrefersReducedMotion();
  const ref = useRef(null);
  const [out, setOut] = useState(text);
  const [active, setActive] = useState(!inView);

  useEffect(() => {
    if (reduced || !inView) {
      setActive(!reduced);
      return undefined;
    }
    setActive(false);
    const el = ref.current;
    if (!el) return undefined;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActive(true);
          io.disconnect();
        }
      },
      { threshold: 0.65 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [inView, text, reduced]);

  useEffect(() => {
    if (reduced || !active) {
      setOut(text);
      return undefined;
    }

    const state = { n: 0 };
    const tween = gsap.to(state, {
      n: text.length,
      duration: Math.min(1.7, 0.7 + text.length * 0.03),
      ease: "none",
      onUpdate: () => {
        const revealed = Math.floor(state.n);
        let next = "";
        for (let i = 0; i < text.length; i += 1) {
          const ch = text[i];
          if (ch === " ") next += " ";
          else if (i < revealed) next += ch;
          else next += GLYPHS[(i * 3 + Math.floor(state.n * 5)) % GLYPHS.length];
        }
        setOut(next);
      },
    });

    return () => tween.kill();
  }, [text, reduced, active]);

  return (
    <Tag ref={ref} className={className}>
      {out}
    </Tag>
  );
};

export function ScrambleTitle({ children }) {
  return (
    <h2 className="section-title mt-3">
      <DecryptText text={children} inView />
    </h2>
  );
}

export default DecryptText;
