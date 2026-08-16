"use client";

import { type ReactNode } from "react";
import { useLenisSetup } from "@/animation/scroll/useLenis";

/**
 * Smooth scroll provider — wraps the entire app.
 * Initializes Lenis and syncs with ScrollTrigger.
 */
export default function SmoothScroll({ children }: { children: ReactNode }) {
  useLenisSetup();
  return <>{children}</>;
}
