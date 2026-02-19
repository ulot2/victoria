import { motion, AnimatePresence } from "framer-motion";
import { X, MonitorPlay, Gamepad2, Headphones, Heart } from "lucide-react";
import { useState } from "react";

interface DateModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const DATE_OPTIONS = [
  {
    id: "watch-party",
    icon: MonitorPlay,
    title: "The Watch Party",
    desc: "Synchronized movie stream + texting commentary + snacks",
    color: "rose",
    iconBg: "bg-rose-500/20",
    iconText: "text-rose-400",
    hoverBg: "group-hover:bg-rose-500",
  },
  {
    id: "game-night",
    icon: Gamepad2,
    title: "The Digital Adventure",
    desc: "Co-op mobile games & puzzles + voice call + friendly trash talk",
    color: "orange",
    iconBg: "bg-orange-500/20",
    iconText: "text-orange-400",
    hoverBg: "group-hover:bg-orange-500",
  },
  {
    id: "deep-talks",
    icon: Headphones,
    title: "The Midnight Café",
    desc: "Deep conversation + sharing playlists + virtual Q&A games",
    color: "purple",
    iconBg: "bg-purple-500/20",
    iconText: "text-purple-400",
    hoverBg: "group-hover:bg-purple-500",
  },
];

export function DateModal({ isOpen, onClose }: DateModalProps) {
  const [selected, setSelected] = useState<string | null>(null);

  const handleSelect = (id: string) => {
    setSelected(id);
  };

  const handleClose = () => {
    setSelected(null);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-slate-950/85 backdrop-blur-md z-40"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 30 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[92%] max-w-md z-50"
          >
            <div className="bg-slate-900/95 border border-white/10 rounded-2xl shadow-2xl overflow-hidden backdrop-blur-sm max-h-[90vh] overflow-y-auto">
              {/* Header */}
              <div className="relative h-36 bg-linear-to-br from-rose-600 via-rose-500 to-orange-500 p-6 flex items-center justify-center overflow-hidden">
                {/* Decorative circles */}
                <div className="absolute top-4 -left-6 w-24 h-24 bg-white/10 rounded-full" />
                <div className="absolute -bottom-4 -right-4 w-20 h-20 bg-white/10 rounded-full" />

                <button
                  type="button"
                  onClick={handleClose}
                  className="absolute top-4 right-4 p-2 bg-black/20 hover:bg-black/40 rounded-full text-white transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                  <p className="sr-only">Close</p>
                </button>

                <h2 className="text-3xl sm:text-4xl font-handwriting text-white transform -rotate-2 drop-shadow-lg">
                  Will you be my Valentine?
                </h2>
              </div>

              {/* Body */}
              <div className="p-6 space-y-6">
                <AnimatePresence mode="wait">
                  {!selected ? (
                    <motion.div
                      key="options"
                      initial={{ opacity: 1 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="space-y-3"
                    >
                      {DATE_OPTIONS.map((opt, i) => {
                        const Icon = opt.icon;
                        return (
                          <motion.div
                            key={opt.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.1 + i * 0.1 }}
                            onClick={() => handleSelect(opt.id)}
                            className="flex items-start gap-4 p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-all cursor-pointer group hover:border-white/15"
                          >
                            <div
                              className={`p-3 rounded-lg ${opt.iconBg} ${opt.iconText} ${opt.hoverBg} group-hover:text-white transition-colors`}
                            >
                              <Icon className="w-6 h-6" />
                            </div>
                            <div>
                              <h3 className="font-semibold text-white">
                                {opt.title}
                              </h3>
                              <p className="text-sm text-slate-400">
                                {opt.desc}
                              </p>
                            </div>
                          </motion.div>
                        );
                      })}
                    </motion.div>
                  ) : (
                    <motion.div
                      key="confirmed"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{
                        type: "spring",
                        damping: 15,
                        stiffness: 200,
                      }}
                      className="flex flex-col items-center justify-center py-8 gap-4"
                    >
                      {/* Celebration hearts */}
                      <div className="relative">
                        <motion.div
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{
                            repeat: Infinity,
                            duration: 1.5,
                            ease: "easeInOut",
                          }}
                        >
                          <Heart className="w-16 h-16 text-rose-500 fill-rose-500" />
                        </motion.div>
                        {[...Array(6)].map((_, i) => (
                          <motion.span
                            key={i}
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{
                              opacity: [0, 1, 0],
                              scale: [0.5, 1, 0.5],
                              x: Math.cos((i * Math.PI) / 3) * 50,
                              y: Math.sin((i * Math.PI) / 3) * 50 - 20,
                            }}
                            transition={{
                              duration: 2,
                              delay: i * 0.15,
                              repeat: Infinity,
                              repeatDelay: 1,
                            }}
                            className="absolute top-1/2 left-1/2 text-rose-400 text-lg"
                          >
                            ♥
                          </motion.span>
                        ))}
                      </div>

                      <h3 className="text-2xl font-handwriting text-rose-400 -rotate-1">
                        It's a date! 💕
                      </h3>
                      <p className="text-sm text-slate-400 text-center">
                        {DATE_OPTIONS.find((o) => o.id === selected)?.title} it
                        is!
                        <br />
                        <span className="text-slate-500">
                          Can't wait to talk to you ✨
                        </span>
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>

                {!selected && (
                  <div className="text-center pt-1">
                    <p className="text-[10px] text-slate-600 uppercase tracking-[0.2em]">
                      Tap an option to confirm
                    </p>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
