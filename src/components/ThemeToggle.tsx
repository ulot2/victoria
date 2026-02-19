import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import { Moon, Sun } from "lucide-react";
import { motion } from "framer-motion";

type Theme = "dark" | "rose";

interface ThemeContextValue {
  theme: Theme;
  toggle: () => void;
}

const ThemeContext = createContext<ThemeContextValue>({
  theme: "dark",
  toggle: () => {},
});

export function useTheme() {
  return useContext(ThemeContext);
}

/* ── CSS variable maps for each theme ── */
const THEMES: Record<Theme, Record<string, string>> = {
  dark: {
    "--bg-primary": "#020617",
    "--bg-secondary": "rgba(255,255,255,0.03)",
    "--bg-card": "rgba(255,255,255,0.05)",
    "--text-primary": "rgba(255,255,255,0.87)",
    "--text-secondary": "#94a3b8",
    "--text-muted": "#475569",
    "--accent": "#e11d48",
    "--accent-soft": "rgba(225,29,72,0.2)",
    "--border": "rgba(255,255,255,0.1)",
    "--surface": "#0f172a",
  },
  rose: {
    "--bg-primary": "#fff1f2",
    "--bg-secondary": "rgba(225,29,72,0.05)",
    "--bg-card": "rgba(255,255,255,0.8)",
    "--text-primary": "#881337",
    "--text-secondary": "#9f1239",
    "--text-muted": "#be185d",
    "--accent": "#e11d48",
    "--accent-soft": "rgba(225,29,72,0.15)",
    "--border": "rgba(225,29,72,0.15)",
    "--surface": "#ffe4e6",
  },
};

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>("dark");

  useEffect(() => {
    const root = document.documentElement;
    const vars = THEMES[theme];
    for (const [key, value] of Object.entries(vars)) {
      root.style.setProperty(key, value);
    }

    if (theme === "dark") {
      root.classList.remove("theme-rose");
      root.classList.add("theme-dark");
      document.body.style.backgroundColor = "#020617";
    } else {
      root.classList.remove("theme-dark");
      root.classList.add("theme-rose");
      document.body.style.backgroundColor = "#fff1f2";
    }
  }, [theme]);

  const toggle = () => setTheme((t) => (t === "dark" ? "rose" : "dark"));

  return (
    <ThemeContext.Provider value={{ theme, toggle }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function ThemeToggle() {
  const { theme, toggle } = useTheme();

  return (
    <motion.button
      onClick={toggle}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="fixed top-5 right-5 z-50 p-3 rounded-full backdrop-blur-md border transition-colors cursor-pointer"
      style={{
        backgroundColor:
          theme === "dark" ? "rgba(255,255,255,0.08)" : "rgba(225,29,72,0.1)",
        borderColor:
          theme === "dark" ? "rgba(255,255,255,0.15)" : "rgba(225,29,72,0.2)",
        color: theme === "dark" ? "#fb7185" : "#881337",
      }}
      title={`Switch to ${theme === "dark" ? "Rose" : "Dark"} theme`}
    >
      {theme === "dark" ? (
        <Sun className="w-5 h-5" />
      ) : (
        <Moon className="w-5 h-5" />
      )}
    </motion.button>
  );
}
