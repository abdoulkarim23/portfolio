import React, { useEffect, useRef } from "react";

const HeroField = ({ reduced }) => {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return undefined;
    const ctx = canvas.getContext("2d");
    const mouse = { x: 0.72, y: 0.42 };

    const draw = () => {
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      ctx.clearRect(0, 0, width, height);
      const gap = width < 720 ? 42 : 32;
      const cx = mouse.x * width;
      const cy = mouse.y * height;
      for (let y = gap * 0.5; y < height; y += gap) {
        for (let x = gap * 0.5; x < width; x += gap) {
          const dx = cx - x;
          const dy = cy - y;
          const dist = Math.hypot(dx, dy) || 1;
          const pull = reduced ? 0 : Math.max(0, 1 - dist / 320);
          const ang = Math.atan2(dy, dx);
          const len = 7 + pull * 18;
          ctx.strokeStyle = `rgba(180, 240, 0, ${0.14 + pull * 0.75})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(x, y);
          ctx.lineTo(x + Math.cos(ang) * len, y + Math.sin(ang) * len);
          ctx.stroke();
        }
      }
    };

    const resize = () => {
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      canvas.width = Math.max(1, Math.floor(width * dpr));
      canvas.height = Math.max(1, Math.floor(height * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      draw();
    };

    const onMove = (event) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = (event.clientX - rect.left) / rect.width;
      mouse.y = (event.clientY - rect.top) / rect.height;
      draw();
    };

    resize();
    window.addEventListener("resize", resize);
    if (!reduced) window.addEventListener("pointermove", onMove);

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
    };
  }, [reduced]);

  return <canvas ref={ref} className="hero-field" aria-hidden="true" />;
};

export default HeroField;
