"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";
import { ScrollTrigger } from "@/animation/gsap/config";
import { useVisualStore } from "@/state/visualStore";

/** Global Lenis instance — shared across the app */
let lenisInstance: Lenis | null = null;

export function getLenis(): Lenis | null {
  return lenisInstance;
}

/**
 * Initializes Lenis smooth scroll and syncs with GSAP ScrollTrigger.
 * Should be called once in the root layout.
 */
export function useLenisSetup() {
  const lenisRef = useRef<Lenis | null>(null);
  const setScrollVelocity = useVisualStore((s) => s.setScrollVelocity);
  const setScrollProgress = useVisualStore((s) => s.setScrollProgress);
  const reducedMotion = useVisualStore((s) => s.reducedMotion);

  useEffect(() => {
    if (reducedMotion) {
      // Don't use smooth scroll for reduced motion
      lenisInstance = null;
      return;
    }

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 1.5,
      infinite: false,
    });

    lenisRef.current = lenis;
    lenisInstance = lenis;

    // Sync Lenis with ScrollTrigger
    lenis.on("scroll", ScrollTrigger.update);

    // Feed scroll velocity into Zustand (clamped for stability)
    lenis.on(
      "scroll",
      (e: { velocity: number; progress: number }) => {
        setScrollVelocity(Math.min(Math.abs(e.velocity), 10));
        setScrollProgress(e.progress);
      }
    );

    // Use GSAP ticker for Lenis RAF loop
    const tickerCallback = (time: number) => {
      lenis.raf(time * 1000);
    };

    // Add Lenis to GSAP ticker for synced timing
    const gsapModule = import("gsap").then(({ gsap }) => {
      gsap.ticker.add(tickerCallback);
      gsap.ticker.lagSmoothing(0);
    });

    return () => {
      lenis.destroy();
      lenisInstance = null;
      lenisRef.current = null;
      gsapModule.then(() => {
        import("gsap").then(({ gsap }) => {
          gsap.ticker.remove(tickerCallback);
        });
      });
    };
  }, [reducedMotion, setScrollVelocity, setScrollProgress]);

  return lenisRef;
}
