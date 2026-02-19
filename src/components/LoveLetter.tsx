import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const LINES = [
  "Dear Daisy,",
  "",
  "I know I haven't called you that in a long time,",
  "but this seems like the perfect chance to.",
  "",
  "So I was thinking about what to say here...",
  "I could say a lot of things",
  "but I'll keep it short and sweet.",
  "",
  "Hearing your voice and seeing your name pop up on my screen",
  "are genuinely the best parts of my day.",
  "",
  "You mean way too much to me to let a calendar dictate when we celebrate.",
  "Distance doesn't change how much I care about you,",
  "or how much I love getting to know you.",
  "",
  "You've been such an important person in my life",
  "and I'm so grateful for you.",
  "",
  "I built this to appreciate you",
  "and to let you know how amazing you are.",
  "",
  "So here's to more memories together",
  "Happy Belated Valentine's Day to us",
  "",
  "Always yours,",
  "— Tolu ♥",
];

function LetterLine({ text, index }: { text: string; index: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px 0px" });

  if (text === "") {
    return <span ref={ref} className="block h-6" />;
  }

  return (
    <motion.span
      ref={ref}
      className="block"
      initial={{ opacity: 0, y: 15, filter: "blur(4px)" }}
      animate={
        isInView
          ? { opacity: 1, y: 0, filter: "blur(0px)" }
          : { opacity: 0, y: 15, filter: "blur(4px)" }
      }
      transition={{
        duration: 0.7,
        delay: index * 0.04,
        ease: "easeOut",
      }}
    >
      {text}
    </motion.span>
  );
}

export function LoveLetter() {
  return (
    <section className="relative py-20 px-6 md:px-16 flex justify-center">
      {/* Paper-like container */}
      <div className="relative max-w-lg w-full">
        {/* Decorative corner marks */}
        <div className="absolute -top-3 -left-3 w-8 h-8 border-t-2 border-l-2 border-rose-500/30 rounded-tl-sm" />
        <div className="absolute -top-3 -right-3 w-8 h-8 border-t-2 border-r-2 border-rose-500/30 rounded-tr-sm" />
        <div className="absolute -bottom-3 -left-3 w-8 h-8 border-b-2 border-l-2 border-rose-500/30 rounded-bl-sm" />
        <div className="absolute -bottom-3 -right-3 w-8 h-8 border-b-2 border-r-2 border-rose-500/30 rounded-br-sm" />

        <div className="bg-white/[0.03] border border-white/10 rounded-xl p-8 md:p-12 backdrop-blur-sm">
          <div className="font-handwriting text-2xl sm:text-3xl md:text-4xl text-rose-100/90 leading-relaxed tracking-wide space-y-1">
            {LINES.map((line, i) => (
              <LetterLine key={i} text={line} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
