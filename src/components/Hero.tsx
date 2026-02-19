import { motion } from "framer-motion";
import { Heart, Play } from "lucide-react";

interface HeroProps {
  onStartDate: () => void;
}

const PARTICLES = [
  { left: "10%", delay: 0, size: 14 },
  { left: "25%", delay: 1.2, size: 10 },
  { left: "50%", delay: 0.6, size: 16 },
  { left: "70%", delay: 2.0, size: 12 },
  { left: "85%", delay: 0.3, size: 11 },
  { left: "40%", delay: 1.8, size: 9 },
];

export function Hero({ onStartDate }: HeroProps) {
  return (
    <div className="relative min-h-[70vh] w-full flex flex-col items-center justify-center text-center px-4 overflow-hidden py-16 md:py-0">
      {/* ── Ambient Background Gradient ── */}
      <div className="absolute inset-0 z-1 pointer-events-none">
        <div className="absolute inset-0 bg-linear-to-b from-rose-950/30 via-transparent to-transparent" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-rose-600/10 rounded-full blur-[120px]" />
      </div>

      {/* ── Floating Heart Particles ── */}
      <div className="absolute inset-0 z-1 pointer-events-none overflow-hidden">
        {PARTICLES.map((p, i) => (
          <span
            key={i}
            className="absolute bottom-0 text-rose-500/30 animate-float-up"
            style={{
              left: p.left,
              fontSize: `${p.size}px`,
              animationDelay: `${p.delay}s`,
              animationDuration: `${3.5 + i * 0.5}s`,
            }}
          >
            ♥
          </span>
        ))}
      </div>

      {/* ── Content ── */}
      <div className="z-10 flex flex-col items-center gap-8 max-w-2xl w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="flex flex-col items-center"
        >
          {/* Match Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-green-500/15 border border-green-500/25 text-green-400 text-xs font-semibold tracking-widest uppercase mb-6 backdrop-blur-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            <span>100% Match</span>
          </div>

          <h1
            className="text-5xl sm:text-6xl md:text-8xl font-bold tracking-tight mb-3 drop-shadow-2xl"
            style={{ color: "var(--text-primary)" }}
          >
            Dear{" "}
            <span className="bg-linear-to-r from-rose-500 to-orange-400 bg-clip-text text-transparent">
              Daisy,
            </span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="text-base md:text-xl font-light max-w-md"
            style={{ color: "var(--text-secondary)" }}
          >
            miles apart, but always the{" "}
            <span className="text-rose-400 font-normal">best part</span> of my
            day.
          </motion.p>
        </motion.div>

        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.95 }}
          onClick={onStartDate}
          className="group relative inline-flex items-center gap-3 px-10 py-4 bg-linear-to-r from-rose-600 to-rose-500 hover:from-rose-500 hover:to-rose-400 text-white rounded-full font-semibold text-lg transition-all cursor-pointer animate-pulse-glow"
        >
          <Play className="w-5 h-5 fill-current" />
          <span>Start Date</span>
          <Heart className="w-4 h-4 fill-current opacity-0 group-hover:opacity-100 transition-opacity" />
        </motion.button>

        {/* Metadata row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-[10px] sm:text-xs md:gap-3 mt-2 max-w-sm mx-auto"
          style={{ color: "var(--text-muted)" }}
        >
          <span
            className="px-2 py-0.5 rounded"
            style={{
              border: "1px solid var(--border)",
              color: "var(--text-secondary)",
            }}
          >
            ♥ Tolu & Daisy
          </span>
          <span>Miles Apart</span>
          <span>·</span>
          <span>Always Close</span>
          <span>·</span>
          <span className="text-rose-400">Forever Yours</span>
        </motion.div>
      </div>
    </div>
  );
}
