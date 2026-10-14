"use client";

import { useEffect, useRef } from "react";

export default function SignalField() {
  const ref = useRef(null);
  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)");
    let width = 0;
    let height = 0;
    let visible = false;
    let frame = 0;
    let last = 0;
    let elapsed = 0;
    let points = [];
    function resize() {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      const dpr = Math.min(devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = width < 400 ? 24 : 42;
      points = Array.from({ length: count }, (_, i) => ({
        x: ((i * 0.61803398875 + 0.13) % 1) * width,
        y: ((i * 0.41421356237 + 0.21) % 1) * height,
        phase: i * 2.399963,
        radius: i % 4 === 0 ? 1.8 : 1,
      }));
    }
    function draw(now) {
      frame = 0;
      if (!visible || document.hidden || reduced.matches) return;
      frame = requestAnimationFrame(draw);
      if (last && now - last < 40) return;
      elapsed += last ? Math.min(now - last, 80) : 0;
      last = now;
      const time = elapsed / 1000;
      ctx.clearRect(0, 0, width, height);
      const current = points.map((point) => ({
        ...point,
        x: point.x + Math.sin(time * 0.22 + point.phase) * 21,
        y: point.y + Math.cos(time * 0.18 + point.phase) * 26,
      }));
      for (let i = 0; i < current.length; i++) {
        const a = current[i];
        for (let j = i + 1; j < current.length; j++) {
          const b = current[j];
          const distance = Math.hypot(a.x - b.x, a.y - b.y);
          if (distance > 112) continue;
          ctx.strokeStyle = `rgba(184,146,255,${(1 - distance / 112) * 0.23})`;
          ctx.lineWidth = 0.7;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
        ctx.fillStyle = `rgba(211,183,255,${0.32 + (Math.sin(time + a.phase) + 1) * 0.18})`;
        ctx.beginPath();
        ctx.arc(a.x, a.y, a.radius, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    function sync() {
      cancelAnimationFrame(frame);
      frame = 0;
      last = 0;
      if (visible && !document.hidden && !reduced.matches)
        frame = requestAnimationFrame(draw);
      else if (reduced.matches) ctx.clearRect(0, 0, width, height);
    }
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);
    const visibilityObserver = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      sync();
    });
    visibilityObserver.observe(canvas);
    document.addEventListener("visibilitychange", sync);
    reduced.addEventListener("change", sync);
    return () => {
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      visibilityObserver.disconnect();
      document.removeEventListener("visibilitychange", sync);
      reduced.removeEventListener("change", sync);
    };
  }, []);
  return <canvas ref={ref} className="signal-field" aria-hidden="true" />;
}
