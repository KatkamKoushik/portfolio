"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Flip } from "gsap/Flip";

/* Register plugins once — guarded against HMR re-registration */
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, Flip);
}

/* Default easing presets for the portfolio */
export const EASE = {
  /** Smooth out — for most reveals */
  smooth: "power3.out",
  /** Smooth in-out — for transitions */
  smoothInOut: "power2.inOut",
  /** Sharp out — for snappy UI */
  sharp: "power4.out",
  /** Elastic — for magnetic interactions */
  elastic: "elastic.out(1, 0.5)",
  /** Expo out — for dramatic reveals */
  expo: "expo.out",
  /** Custom cubic for text reveals */
  textReveal: "cubic-bezier(0.76, 0, 0.24, 1)",
} as const;

/* Duration presets */
export const DURATION = {
  fast: 0.3,
  normal: 0.6,
  slow: 1.0,
  dramatic: 1.4,
  cinematic: 2.0,
} as const;

/* Stagger presets */
export const STAGGER = {
  fast: 0.03,
  normal: 0.06,
  slow: 0.1,
  dramatic: 0.15,
} as const;

export { gsap, ScrollTrigger, Flip };
