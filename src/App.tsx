import { useState, useEffect } from "react";
import "./App.css";
import { Hero } from "./components/Hero";
import { EpisodeRow } from "./components/EpisodeRow";
import { DateModal } from "./components/DateModal";
import { Starfield } from "./components/Starfield";
import { LoveLetter } from "./components/LoveLetter";
import { CustomCursor } from "./components/CustomCursor";
import { ThemeProvider, ThemeToggle } from "./components/ThemeToggle";
import { LoadingScreen } from "./components/LoadingScreen";

function AppContent() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading delay for splash screen
    const timer = setTimeout(() => setIsLoading(false), 2200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <LoadingScreen isLoading={isLoading} />
      <CustomCursor />
      <Starfield />
      <ThemeToggle />

      <div
        className="relative z-[1] min-h-screen w-full overflow-x-hidden transition-colors duration-500"
        style={{ color: "var(--text-primary)" }}
      >
        <main>
          <Hero onStartDate={() => setIsModalOpen(true)} />

          <div className="relative z-10 -mt-16 pb-8 space-y-4">
            <EpisodeRow />
            <LoveLetter />
          </div>
        </main>

        <DateModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

        {/* Footer */}
        <footer
          className="py-10 text-center text-xs tracking-widest uppercase"
          style={{ color: "var(--text-muted)" }}
        >
          <p>Made with ❤️ for you</p>
        </footer>
      </div>
    </>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;
