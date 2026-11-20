"use client";

import { Moon, Sun } from "lucide-react";
import { useSyncExternalStore } from "react";
import { darkThemeQuery, themeStorageKey } from "@/config/theme";

function getIsDark() {
  const theme = document.documentElement.dataset.theme;
  return theme ? theme === "dark" : window.matchMedia(darkThemeQuery).matches;
}

function subscribe(onChange: () => void) {
  const media = window.matchMedia(darkThemeQuery);
  const root = document.documentElement;
  function updateSystemTheme() {
    root.toggleAttribute("data-system-dark", media.matches);
    onChange();
  }
  const observer = new MutationObserver(onChange);
  observer.observe(root, { attributes: true, attributeFilter: ["data-theme"] });
  media.addEventListener("change", updateSystemTheme);
  updateSystemTheme();

  return () => {
    observer.disconnect();
    media.removeEventListener("change", updateSystemTheme);
  };
}

function getServerIsDark() {
  return false;
}

export function ThemeToggle() {
  const isDark = useSyncExternalStore(subscribe, getIsDark, getServerIsDark);

  function toggleTheme() {
    const theme = getIsDark() ? "light" : "dark";
    document.documentElement.dataset.theme = theme;
    try {
      localStorage.setItem(themeStorageKey, theme);
    } catch {
      // The current page can still change theme when storage is unavailable.
    }
  }

  return (
    <button
      type="button"
      aria-label="Dark mode"
      aria-pressed={isDark}
      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
      onClick={toggleTheme}
      className="grid size-11 shrink-0 cursor-pointer place-items-center rounded-sm border border-border text-accent hover:border-accent hover:bg-accent/5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
    >
      {isDark ? <Sun size={20} aria-hidden="true" /> : <Moon size={20} aria-hidden="true" />}
    </button>
  );
}
