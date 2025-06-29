"use client";
import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted)
    return (
      <button
        aria-label="Toggle theme"
        className="rounded-full p-2 opacity-0 pointer-events-none"
        tabIndex={-1}
      >
        <Sun className="w-5 h-5" />
      </button>
    );

  return (
    <button
      aria-label="Toggle theme"
      className="rounded-full p-2 hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-colors"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
    >
      {resolvedTheme === "dark" ? (
        <Sun className="w-5 h-5" />
      ) : (
        <Moon className="w-5 h-5" />
      )}
    </button>
  );
}
