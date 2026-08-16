"use client";

import { type ReactNode, useCallback, useEffect, useRef } from "react";
import SmoothScroll from "@/components/layout/SmoothScroll";
import CustomCursor from "@/components/interactions/CustomCursor";
import { usePointerTracking } from "@/lib/hooks/usePointerTracking";
import { useReducedMotion } from "@/lib/performance/useReducedMotion";
import { useAdaptiveQuality } from "@/lib/performance/useAdaptiveQuality";
import { useVisualStore } from "@/state/visualStore";
import { ScrollTrigger } from "@/animation/gsap/config";
import ProjectTransition from "@/components/interactions/ProjectTransition";


/**
 * Client-side providers — initializes all global systems:
 * - Lenis smooth scroll
 * - Pointer tracking
 * - Reduced motion detection
 * - Adaptive quality
 * - Theme progress scroll driver
 * - Custom cursor
 */
export default function AppProviders({ children }: { children: ReactNode }) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const setReducedMotion = useVisualStore((s) => s.setReducedMotion);
  const setThemeProgress = useVisualStore((s) => s.setThemeProgress);

  // Initialize global systems
  usePointerTracking();
  useAdaptiveQuality();
  useReducedMotion(useCallback((reduced: boolean) => {
    setReducedMotion(reduced);
  }, [setReducedMotion]));

  // Drive themeProgress (0–2) via scroll position
  useEffect(() => {
    if (typeof window === "undefined") return;

    const trigger = ScrollTrigger.create({
      trigger: document.documentElement,
      start: "top top",
      end: "bottom bottom",
      scrub: 2,
      onUpdate: (self) => {
        // Map scroll progress (0–1) to theme progress (0–4)
        const progress = self.progress * 4;
        setThemeProgress(progress);

        // Update data-world attribute on body for CSS theme switching
        let world: "brutalist" | "luxury" | "future" | "quiet" = "brutalist";
        if (progress >= 3.2) world = "quiet";
        else if (progress >= 1.8) world = "future";
        else if (progress >= 0.8) world = "luxury";

        document.body.setAttribute("data-world", world);
        document.documentElement.style.setProperty(
          "--theme-progress",
          String(progress)
        );
      },
    });

    return () => {
      trigger.kill();
    };
  }, [setThemeProgress]);

  return (
    <SmoothScroll>
      <div ref={wrapperRef}>
        <CustomCursor />
        <ProjectTransition />
        {children}
      </div>
    </SmoothScroll>
  );
}
