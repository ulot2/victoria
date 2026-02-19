import { useEffect, useRef, useCallback } from "react";

/**
 * Custom heart cursor with a fading trail.
 * Renders a canvas overlay that follows the mouse.
 */
export function CustomCursor() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const trailRef = useRef<
    { x: number; y: number; age: number; size: number }[]
  >([]);
  const mouseRef = useRef({ x: -100, y: -100 });
  const activeRef = useRef(false);

  const handleMove = useCallback((e: MouseEvent) => {
    mouseRef.current = { x: e.clientX, y: e.clientY };
    activeRef.current = true;

    // Add trail point
    trailRef.current.push({
      x: e.clientX,
      y: e.clientY,
      age: 0,
      size: Math.random() * 4 + 3,
    });

    // Cap trail length
    if (trailRef.current.length > 20) {
      trailRef.current.shift();
    }
  }, []);

  const handleLeave = useCallback(() => {
    activeRef.current = false;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Only enable on non-touch devices
    const isTouchDevice = "ontouchstart" in window;
    if (isTouchDevice) return;

    // Hide default cursor
    document.documentElement.style.cursor = "none";

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let animId: number;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const drawHeart = (cx: number, cy: number, size: number, alpha: number) => {
      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.fillStyle = "#fb7185";
      ctx.beginPath();
      const s = size;
      ctx.moveTo(cx, cy + s * 0.3);
      ctx.bezierCurveTo(cx, cy, cx - s, cy, cx - s, cy + s * 0.3);
      ctx.bezierCurveTo(cx - s, cy + s * 0.7, cx, cy + s, cx, cy + s * 1.2);
      ctx.bezierCurveTo(cx, cy + s, cx + s, cy + s * 0.7, cx + s, cy + s * 0.3);
      ctx.bezierCurveTo(cx + s, cy, cx, cy, cx, cy + s * 0.3);
      ctx.fill();
      ctx.restore();
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw trail hearts
      const trail = trailRef.current;
      for (let i = trail.length - 1; i >= 0; i--) {
        const p = trail[i];
        p.age += 0.03;
        const alpha = Math.max(0, 1 - p.age);

        if (alpha <= 0) {
          trail.splice(i, 1);
          continue;
        }

        drawHeart(
          p.x,
          p.y - p.age * 15,
          p.size * (1 - p.age * 0.3),
          alpha * 0.4,
        );
      }

      // Draw main cursor heart
      if (activeRef.current) {
        drawHeart(mouseRef.current.x, mouseRef.current.y, 8, 0.9);
      }

      animId = requestAnimationFrame(animate);
    };

    animate();

    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mouseleave", handleLeave);
    window.addEventListener("resize", resize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseleave", handleLeave);
      window.removeEventListener("resize", resize);
      document.documentElement.style.cursor = "";
    };
  }, [handleMove, handleLeave]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-[100]"
      aria-hidden="true"
    />
  );
}
