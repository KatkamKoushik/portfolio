"use client";

import { useEffect } from "react";

/**
 * Detects the user's prefers-reduced-motion preference and returns it.
 * Also syncs with Zustand visual store if a setter is provided.
 */
export function useReducedMotion(onUpdate?: (reduced: boolean) => void): void {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handler = (e: MediaQueryListEvent | MediaQueryList) => {
      onUpdate?.(e.matches);
    };

    // Initial check
    handler(mq);

    mq.addEventListener("change", handler as (e: MediaQueryListEvent) => void);
    return () => {
      mq.removeEventListener(
        "change",
        handler as (e: MediaQueryListEvent) => void
      );
    };
  }, [onUpdate]);
}
