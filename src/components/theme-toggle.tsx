"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => setMounted(true), []);

  if (!mounted) {
    // Avoid a hydration mismatch: render a fixed-size placeholder until the client
    // knows the resolved (system or stored) theme.
    return <div className="h-11 w-11" aria-hidden />;
  }

  const isDark = resolvedTheme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className="flex h-11 w-11 items-center justify-center rounded-full border border-ink-200 bg-white text-ink-600 transition-colors hover:border-brand-300 hover:text-brand-600 dark:border-white/15 dark:bg-white/5 dark:text-ink-300 dark:hover:border-white/30 dark:hover:text-white"
    >
      {isDark ? <Sun className="h-4 w-4" aria-hidden /> : <Moon className="h-4 w-4" aria-hidden />}
    </button>
  );
}
