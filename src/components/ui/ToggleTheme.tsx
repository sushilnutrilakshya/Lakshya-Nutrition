"use client";

import { Sun, Moon } from "lucide-react";
import { useTheme } from "@/lib/theme-context";
import { cn } from "@/lib/utils";

interface ToggleThemeProps {
  className?: string | undefined;
}

export function ToggleTheme({ className }: ToggleThemeProps) {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isDark}
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
      onClick={toggleTheme}
      className={cn(
        "relative flex items-center justify-center w-10 h-10 rounded-full",
        "border border-[var(--border-strong)] cursor-pointer",
        "hover:border-[var(--accent)] hover:bg-[rgba(0,230,118,0.08)]",
        "focus-visible:outline-2 focus-visible:outline-[var(--accent)]",
        "group overflow-hidden",
        className
      )}
      style={{ transition: "border-color 0.2s ease, background-color 0.2s ease" }}
    >
      {/* Sun icon */}
      <Sun
        size={18}
        className={cn(
          "absolute text-[var(--accent-gold)] transition-all duration-300",
          isDark ? "opacity-0 scale-50 rotate-90" : "opacity-100 scale-100 rotate-0"
        )}
        strokeWidth={2}
      />
      {/* Moon icon */}
      <Moon
        size={18}
        className={cn(
          "absolute text-[var(--text-secondary)] transition-all duration-300",
          isDark ? "opacity-100 scale-100 rotate-0" : "opacity-0 scale-50 -rotate-90"
        )}
        strokeWidth={2}
      />
    </button>
  );
}
