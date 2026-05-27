"use client";

import { useEffect, useState, type CSSProperties } from "react";

type Theme = "dark" | "light";

const STORAGE_KEY = "air-art-theme";

interface Props {
  variant?: "hero" | "header" | "floating";
}

function applyTheme(theme: Theme) {
  document.documentElement.dataset.theme = theme;
  document.documentElement.style.colorScheme = theme;
  window.localStorage.setItem(STORAGE_KEY, theme);
  window.dispatchEvent(new CustomEvent("air-art-theme-change", { detail: theme }));
}

export function ThemeToggle({ variant = "header" }: Props) {
  const [theme, setTheme] = useState<Theme>("dark");

  useEffect(() => {
    const syncTheme = () => {
      const current = document.documentElement.dataset.theme === "light" ? "light" : "dark";
      setTheme(current);
    };
    syncTheme();
    window.addEventListener("air-art-theme-change", syncTheme);
    window.addEventListener("storage", syncTheme);

    return () => {
      window.removeEventListener("air-art-theme-change", syncTheme);
      window.removeEventListener("storage", syncTheme);
    };
  }, []);

  const isLight = theme === "light";
  const nextTheme = isLight ? "dark" : "light";

  const toggleTheme = () => {
    setTheme(nextTheme);
    applyTheme(nextTheme);
  };

  if (variant === "floating") {
    const dockStyle: CSSProperties = {
      borderColor: isLight ? "rgba(11, 29, 58, 0.14)" : "rgba(255, 255, 255, 0.14)",
      color: isLight ? "rgba(11, 29, 58, 0.68)" : "rgba(255, 255, 255, 0.72)",
      background: isLight
        ? "linear-gradient(180deg, rgba(255,255,255,0.98), rgba(232,241,250,0.92)), radial-gradient(circle at 50% 12%, rgba(242,165,26,0.16), transparent 42%)"
        : "linear-gradient(180deg, rgba(12,25,43,0.96), rgba(4,9,16,0.92)), radial-gradient(circle at 50% 10%, rgba(23,136,213,0.22), transparent 42%)",
      boxShadow: isLight
        ? "0 24px 70px rgba(8,20,38,0.16), inset 0 1px 0 rgba(255,255,255,0.92)"
        : "0 28px 80px rgba(0,0,0,0.32), inset 0 1px 0 rgba(255,255,255,0.14)",
    };

    const thumbStyle: CSSProperties = {
      background: isLight
        ? "linear-gradient(145deg, rgba(255,255,255,0.98), rgba(207,238,255,0.82)), radial-gradient(circle at 32% 20%, rgba(255,255,255,0.95), transparent 42%)"
        : "linear-gradient(145deg, rgba(24,40,64,0.98), rgba(7,21,40,0.96)), radial-gradient(circle at 60% 35%, rgba(23,136,213,0.52), transparent 44%)",
      boxShadow: isLight
        ? "0 12px 28px rgba(8,20,38,0.18), 0 0 24px rgba(242,165,26,0.18), inset 0 1px 0 rgba(255,255,255,0.94)"
        : "0 12px 30px rgba(0,0,0,0.42), 0 0 30px rgba(23,136,213,0.34), inset 0 1px 0 rgba(255,255,255,0.18)",
    };

    return (
      <button
        type="button"
        aria-label={isLight ? "Dark mode" : "Light mode"}
        aria-pressed={isLight}
        title={isLight ? "Dark mode" : "Light mode"}
        data-state={theme}
        onClick={toggleTheme}
        className="theme-mode-dock group relative grid h-[98px] w-12 cursor-pointer place-items-center overflow-hidden rounded-full border p-1.5 backdrop-blur-xl transition-all duration-500 ease-out hover:-translate-x-1 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-tech sm:h-[116px] sm:w-14 sm:p-2"
        style={dockStyle}
      >
        <span
          className="absolute inset-2 rounded-full"
          style={{
            background: isLight
              ? "linear-gradient(180deg, rgba(11,29,58,0.055), transparent), rgba(255,255,255,0.48)"
              : "linear-gradient(180deg, rgba(255,255,255,0.06), transparent), rgba(255,255,255,0.035)",
          }}
          aria-hidden="true"
        />
        <span
          className="absolute left-0 top-3 h-[calc(100%-24px)] w-px"
          style={{
            background: isLight
              ? "linear-gradient(180deg, transparent, rgba(242,165,26,0.82), transparent)"
              : "linear-gradient(180deg, transparent, rgba(23,136,213,0.86), transparent)",
          }}
          aria-hidden="true"
        />
        <span
          className={`absolute left-1.5 top-1.5 h-9 w-9 rounded-full transition-transform duration-500 ease-out sm:left-2 sm:top-2 sm:h-10 sm:w-10 ${
            isLight ? "translate-y-0" : "translate-y-[50px] sm:translate-y-[62px]"
          }`}
          style={thumbStyle}
          aria-hidden="true"
        />
        <span
          className="absolute left-1/2 top-1.5 z-10 grid h-9 w-9 -translate-x-1/2 place-items-center rounded-full transition-all duration-300 sm:top-2 sm:h-10 sm:w-10"
          style={{
            color: isLight ? "var(--color-navy)" : "rgba(255, 255, 255, 0.42)",
            opacity: isLight ? 1 : 0.46,
          }}
          aria-hidden="true"
        >
          <svg className="h-4 w-4 sm:h-[18px] sm:w-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2" />
            <path d="M12 20v2" />
            <path d="m4.93 4.93 1.41 1.41" />
            <path d="m17.66 17.66 1.41 1.41" />
            <path d="M2 12h2" />
            <path d="M20 12h2" />
            <path d="m6.34 17.66-1.41 1.41" />
            <path d="m19.07 4.93-1.41 1.41" />
          </svg>
        </span>
        <span
          className="absolute bottom-1.5 left-1/2 z-10 grid h-9 w-9 -translate-x-1/2 place-items-center rounded-full transition-all duration-300 sm:bottom-2 sm:h-10 sm:w-10"
          style={{
            color: isLight ? "rgba(11, 29, 58, 0.46)" : "var(--color-tech-100)",
            opacity: isLight ? 0.5 : 1,
          }}
          aria-hidden="true"
        >
          <svg className="h-4 w-4 sm:h-[18px] sm:w-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
            <path d="M20.9 14.3A8 8 0 0 1 9.7 3.1 7 7 0 1 0 20.9 14.3Z" />
          </svg>
        </span>
      </button>
    );
  }

  return (
    <button
      type="button"
      aria-label={isLight ? "Dark mode" : "Light mode"}
      aria-pressed={isLight}
      onClick={toggleTheme}
      className={`theme-toggle theme-toggle-${variant} group relative inline-grid h-10 w-10 shrink-0 place-items-center overflow-hidden rounded-full border transition-all duration-300 ${
        variant === "hero"
          ? "border-white/18 bg-white/12 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.14)] backdrop-blur hover:bg-white/18"
          : "border-line bg-white text-navy shadow-sm hover:bg-mist"
      }`}
    >
      <span
        className={`absolute h-6 w-6 rounded-full transition-all duration-300 ${
          isLight ? "scale-100 bg-accent/14" : "scale-75 bg-tech/12"
        }`}
        aria-hidden="true"
      />
      <svg
        viewBox="0 0 24 24"
        className={`absolute h-[18px] w-[18px] transition-all duration-300 ${
          isLight ? "rotate-0 scale-100 opacity-100" : "-rotate-90 scale-50 opacity-0"
        }`}
        fill="none"
        stroke="currentColor"
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2" />
        <path d="M12 20v2" />
        <path d="m4.93 4.93 1.41 1.41" />
        <path d="m17.66 17.66 1.41 1.41" />
        <path d="M2 12h2" />
        <path d="M20 12h2" />
        <path d="m6.34 17.66-1.41 1.41" />
        <path d="m19.07 4.93-1.41 1.41" />
      </svg>
      <svg
        viewBox="0 0 24 24"
        className={`absolute h-[18px] w-[18px] transition-all duration-300 ${
          isLight ? "rotate-90 scale-50 opacity-0" : "rotate-0 scale-100 opacity-100"
        }`}
        fill="none"
        stroke="currentColor"
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M20.9 14.3A8 8 0 0 1 9.7 3.1 7 7 0 1 0 20.9 14.3Z" />
      </svg>
    </button>
  );
}
