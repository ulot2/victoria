import { motion, AnimatePresence } from "framer-motion";
import { Heart } from "lucide-react";

interface LoadingScreenProps {
  isLoading: boolean;
}

export function LoadingScreen({ isLoading }: LoadingScreenProps) {
  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-200 flex flex-col items-center justify-center gap-8"
          style={{ backgroundColor: "#020617" }}
        >
          {/* Subtle radial glow */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-rose-600/10 rounded-full blur-[100px]" />
          </div>

          {/* Pulsing heart icon */}
          <motion.div
            animate={{ scale: [1, 1.15, 1] }}
            transition={{
              repeat: Infinity,
              duration: 1.4,
              ease: "easeInOut",
            }}
          >
            <Heart className="w-12 h-12 text-rose-500 fill-rose-500 drop-shadow-[0_0_20px_rgba(225,29,72,0.5)]" />
          </motion.div>

          {/* Title */}
          <div className="text-center z-10">
            <h1 className="text-4xl sm:text-5xl font-bold text-white tracking-tight">
              Dear{" "}
              <span className="bg-linear-to-r from-rose-500 to-orange-400 bg-clip-text text-transparent">
                Daisy,
              </span>
            </h1>
          </div>

          {/* Streaming-style buffering spinner */}
          <div className="relative w-10 h-10">
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-transparent border-t-rose-500 border-r-rose-500/30"
              animate={{ rotate: 360 }}
              transition={{
                repeat: Infinity,
                duration: 1,
                ease: "linear",
              }}
            />
          </div>

          {/* Loading text */}
          <motion.p
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="text-xs text-slate-500 tracking-[0.3em] uppercase"
          >
            Loading our story...
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
