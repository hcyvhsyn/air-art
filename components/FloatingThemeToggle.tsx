"use client";

import { ThemeToggle } from "./ThemeToggle";

export function FloatingThemeToggle() {
  return (
    <div className="fixed right-2.5 top-[62%] z-[80] -translate-y-1/2 sm:right-5 sm:top-1/2">
      <div className="theme-mode-dock-wrap">
        <ThemeToggle variant="floating" />
      </div>
    </div>
  );
}
