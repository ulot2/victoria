import { useEffect, useRef } from "react";

/**
 * Full-screen animated starfield / bokeh particle canvas.
 * Renders behind all content (fixed, z-0).
 */
export function Starfield() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let width = window.innerWidth;
    let height = document.documentElement.scrollHeight;

    const resize = () => {
      width = window.innerWidth;
      height = Math.max(
        document.documentElement.scrollHeight,
        window.innerHeight,
      );
      canvas.width = width;
      canvas.height = height;
    };

    resize();

    // --- Particles ---
    interface Particle {
      x: number;
      y: number;
      r: number;
      alpha: number;
      alphaDir: number;
      speed: number;
      hue: number;
    }

    const COUNT = 120;
    const particles: Particle[] = [];

    for (let i = 0; i < COUNT; i++) {
      const isBokeh = Math.random() < 0.15;
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        r: isBokeh ? Math.random() * 4 + 2 : Math.random() * 1.5 + 0.3,
        alpha: Math.random() * 0.6 + 0.1,
        alphaDir: (Math.random() - 0.5) * 0.005,
        speed: Math.random() * 0.15 + 0.02,
        hue: isBokeh ? (Math.random() < 0.5 ? 340 : 25) : 0,
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      for (const p of particles) {
        // Twinkle
        p.alpha += p.alphaDir;
        if (p.alpha > 0.8 || p.alpha < 0.05) p.alphaDir *= -1;

        // Drift upward slowly
        p.y -= p.speed;
        if (p.y < -10) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);

        if (p.hue > 0) {
          // Bokeh — colored glow
          ctx.fillStyle = `hsla(${p.hue}, 70%, 65%, ${p.alpha * 0.5})`;
          ctx.shadowBlur = p.r * 6;
          ctx.shadowColor = `hsla(${p.hue}, 70%, 60%, ${p.alpha * 0.4})`;
        } else {
          // Star — white dot
          ctx.fillStyle = `rgba(255, 255, 255, ${p.alpha})`;
          ctx.shadowBlur = p.r * 3;
          ctx.shadowColor = `rgba(255, 255, 255, ${p.alpha * 0.5})`;
        }

        ctx.fill();
        ctx.shadowBlur = 0;
      }

      animationId = requestAnimationFrame(draw);
    };

    draw();

    window.addEventListener("resize", resize);
    // Re-measure when content changes (e.g. modal open)
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(document.documentElement);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-0"
      aria-hidden="true"
    />
  );
}
