import { motion } from "framer-motion";
import { useState, useRef, useCallback } from "react";

interface PolaroidProps {
  src: string;
  note: string;
  rotation: number;
  delay?: number;
  episode?: string;
  onLightbox?: () => void;
}

export function Polaroid({
  src,
  note,
  rotation,
  delay = 0,
  episode,
  onLightbox,
}: PolaroidProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const clickTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const longPressRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Distinguish single-click (flip) from double-click (lightbox)
  const handleClick = useCallback(() => {
    if (clickTimerRef.current) {
      // Double-click detected
      clearTimeout(clickTimerRef.current);
      clickTimerRef.current = null;
      onLightbox?.();
    } else {
      clickTimerRef.current = setTimeout(() => {
        clickTimerRef.current = null;
        setIsFlipped((f) => !f);
      }, 250);
    }
  }, [onLightbox]);

  // Long-press (mobile) → lightbox
  const handlePointerDown = useCallback(() => {
    longPressRef.current = setTimeout(() => {
      onLightbox?.();
    }, 500);
  }, [onLightbox]);

  const handlePointerUp = useCallback(() => {
    if (longPressRef.current) {
      clearTimeout(longPressRef.current);
      longPressRef.current = null;
    }
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: delay * 0.15, ease: "easeOut" }}
      whileHover={{ scale: 1.05, rotate: 0, zIndex: 20 }}
      style={{ rotate: rotation }}
      className="relative cursor-pointer select-none"
      onClick={handleClick}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
    >
      {/* 3D Perspective Container */}
      <div className="perspective-1000 w-56 h-72 sm:w-64 sm:h-80">
        {/* Inner rotating card */}
        <div
          className="relative w-full h-full preserve-3d"
          style={{
            transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
            transition: "transform 600ms ease-in-out",
          }}
        >
          {/* ═══ FRONT FACE ═══ */}
          <div
            className="absolute inset-0 backface-hidden p-2.5 pb-10 rounded-sm"
            style={{
              backgroundColor: "var(--bg-card, white)",
              boxShadow: "0 8px 30px rgba(0,0,0,0.4)",
            }}
          >
            {/* Tape strip */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-12 h-6 bg-yellow-100/60 rotate-1 z-10 shadow-sm" />

            {/* Image */}
            <div className="w-full h-full bg-slate-200 overflow-hidden relative">
              <img
                src={src}
                alt="Memory"
                className="w-full h-full object-cover"
                loading="lazy"
                draggable={false}
              />
              <div className="absolute inset-0 bg-linear-to-tr from-amber-500/10 to-blue-500/5 mix-blend-overlay pointer-events-none" />
            </div>

            {/* Episode tag */}
            {episode && (
              <div className="absolute bottom-2 left-0 right-0 text-center">
                <span
                  className="text-[10px] tracking-widest uppercase font-medium"
                  style={{ color: "var(--text-muted, #94a3b8)" }}
                >
                  {episode}
                </span>
              </div>
            )}
          </div>

          {/* ═══ BACK FACE ═══ */}
          <div
            className="absolute inset-0 backface-hidden p-6 rounded-sm flex items-center justify-center text-center"
            style={{
              transform: "rotateY(180deg)",
              backgroundColor: "#fdfcf0",
              backgroundImage:
                'url("https://www.transparenttextures.com/patterns/paper.png")',
              boxShadow: "0 8px 30px rgba(0,0,0,0.4)",
            }}
          >
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-12 h-6 bg-yellow-100/60 -rotate-2 z-10 shadow-sm" />
            <p className="font-handwriting text-1xl sm:text-2xl text-slate-700 leading-relaxed -rotate-2 px-2">
              {note}
            </p>
          </div>
        </div>
      </div>

      {/* Double-click hint (subtle) */}
      {onLightbox && (
        <div className="absolute -bottom-6 left-0 right-0 text-center opacity-0 group-hover:opacity-100 transition-opacity">
          <span className="text-[9px] text-slate-600 tracking-wider">
            double-click to expand
          </span>
        </div>
      )}
    </motion.div>
  );
}
