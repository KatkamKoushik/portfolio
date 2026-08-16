"use client";

import { useSyncExternalStore } from "react";

/**
 * Responsive media query hook.
 */
export function useMediaQuery(query: string): boolean {
  const getSnapshot = () =>
    typeof window !== "undefined" ? window.matchMedia(query).matches : false;

  const subscribe = (onStoreChange: () => void) => {
    if (typeof window === "undefined") return () => {};
    const mq = window.matchMedia(query);
    mq.addEventListener("change", onStoreChange);
    return () => mq.removeEventListener("change", onStoreChange);
  };

  return useSyncExternalStore(subscribe, getSnapshot, () => false);
}

/* Preset breakpoints */
export const BREAKPOINTS = {
  mobile: "(max-width: 767px)",
  tablet: "(min-width: 768px) and (max-width: 1279px)",
  desktop: "(min-width: 1280px)",
  wide: "(min-width: 1920px)",
} as const;
