import { useEffect, useState } from "react";
import usePrefersReducedMotion from "../hooks/usePrefersReducedMotion";

const GLYPHS = "01<>/{}[]_#";

const DecryptText = ({ text, className, as: Tag = "span" }) => {
  const reduced = usePrefersReducedMotion();
  const [out, setOut] = useState(text);

  useEffect(() => {
    if (reduced) {
      setOut(text);
      return undefined;
    }

    let frame = 0;
    const total = 26;
    const id = window.setInterval(() => {
      frame += 1;
      const revealed = Math.floor((frame / total) * text.length);
      let next = "";
      for (let i = 0; i < text.length; i += 1) {
        const ch = text[i];
        if (ch === " ") next += " ";
        else if (i < revealed) next += ch;
        else next += GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
      }
      setOut(next);
      if (frame >= total) window.clearInterval(id);
    }, 34);

    return () => window.clearInterval(id);
  }, [text, reduced]);

  return <Tag className={className}>{out}</Tag>;
};

export default DecryptText;
