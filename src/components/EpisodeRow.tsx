import { useState, useRef, useEffect, useCallback } from "react";
import { Polaroid } from "./Polaroid";
import { Lightbox } from "./Lightbox";

const MEMORIES = [
  {
    id: 1,
    src: "/images/WhatsApp Image 2026-02-19 at 00.56.11.jpeg",
    note: "The one where it all started... I really really like this picture 😂",
    rotation: -3,
    episode: "S1 · E1",
  },
  {
    id: 3,
    src: "/images/WhatsApp Image 2026-02-19 at 00.56.12 (1).jpeg",
    note: "I was looking at this picture and thinking about how gorgeous you are, inside and out.",
    rotation: -1.5,
    episode: "S1 · E3",
  },
  {
    id: 4,
    src: "/images/WhatsApp Image 2026-02-19 at 00.56.12 (2).jpeg",
    note: "But even a picture can't capture how genuinely kind, smart, and amazing you are.",
    rotation: 3.5,
    episode: "S1 · E4",
  },
  {
    id: 5,
    src: "/images/WhatsApp Image 2026-02-19 at 00.56.12 (3).jpeg",
    note: "You have this beautiful way of making my day so much brighter, even from miles away. I love you so much ❤️",
    rotation: -2,
    episode: "S1 · E5",
  },
];

export function EpisodeRow() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [activeCard, setActiveCard] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  // Track which card is most visible via IntersectionObserver
  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const idx = cardRefs.current.indexOf(
              entry.target as HTMLDivElement,
            );
            if (idx !== -1) setActiveCard(idx);
          }
        }
      },
      { root: container, threshold: 0.6 },
    );

    for (const ref of cardRefs.current) {
      if (ref) observer.observe(ref);
    }

    return () => observer.disconnect();
  }, []);

  // Scroll to a specific card when a dot is tapped
  const scrollToCard = useCallback((index: number) => {
    const card = cardRefs.current[index];
    if (card) {
      card.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
    }
  }, []);

  return (
    <>
      <section className="py-12 w-full overflow-hidden flex flex-col gap-6">
        {/* Section Header */}
        <div className="px-6 md:px-16">
          <h2
            className="text-xl md:text-2xl font-semibold mb-1 tracking-tight"
            style={{ color: "var(--text-primary)" }}
          >
            Best Moments
          </h2>
          <p
            className="text-xs md:text-sm"
            style={{ color: "var(--text-muted)" }}
          >
            Because I couldn't stop thinking about you
          </p>
        </div>

        {/* Horizontal Scrolling Row */}
        <div
          ref={scrollRef}
          className="flex md:justify-center gap-6 md:gap-10 px-6 md:px-16 overflow-x-auto pb-8 pt-8 scrollbar-hide snap-x snap-mandatory"
        >
          {MEMORIES.map((mem, index) => (
            <div
              key={mem.id}
              ref={(el) => {
                cardRefs.current[index] = el;
              }}
              className="snap-center shrink-0"
            >
              <Polaroid
                src={mem.src}
                note={mem.note}
                rotation={mem.rotation}
                delay={index}
                episode={mem.episode}
                onLightbox={() => openLightbox(index)}
              />
            </div>
          ))}
        </div>

        {/* Scroll indicator dots — mobile only */}
        <div className="flex justify-center gap-2 pb-4 md:hidden">
          {MEMORIES.map((_, i) => (
            <button
              key={i}
              onClick={() => scrollToCard(i)}
              aria-label={`Scroll to photo ${i + 1}`}
              className="transition-all duration-300 rounded-full cursor-pointer"
              style={{
                width: activeCard === i ? 24 : 8,
                height: 8,
                backgroundColor:
                  activeCard === i
                    ? "var(--accent, #e11d48)"
                    : "var(--border, rgba(255,255,255,0.15))",
              }}
            />
          ))}
        </div>
      </section>

      {/* Lightbox (rendered outside the scroll container) */}
      <Lightbox
        images={MEMORIES.map((m) => ({ src: m.src, note: m.note }))}
        currentIndex={lightboxIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        onNavigate={setLightboxIndex}
      />
    </>
  );
}
