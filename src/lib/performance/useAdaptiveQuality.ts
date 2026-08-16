"use client";

import { useEffect, useRef } from "react";
import { useVisualStore } from "@/state/visualStore";

/**
 * Detects device capabilities and adjusts quality level accordingly.
 * Monitors FPS and downgrades quality if performance drops.
 */
export function useAdaptiveQuality() {
  const setQualityLevel = useVisualStore((s) => s.setQualityLevel);
  const setIsMobile = useVisualStore((s) => s.setIsMobile);
  const frameTimesRef = useRef<number[]>([]);
  const lastFrameRef = useRef(performance.now());

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Device detection
    const isMobile =
      /Android|iPhone|iPad|iPod|webOS|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      ) || window.innerWidth < 768;
    setIsMobile(isMobile);

    // Initial quality based on device
    const dpr = window.devicePixelRatio || 1;
    const width = window.innerWidth;

    if (isMobile || dpr < 1.5 || width < 768) {
      setQualityLevel("low");
    } else if (dpr <= 2 && width < 1920) {
      setQualityLevel("medium");
    } else {
      setQualityLevel("high");
    }

    // FPS monitoring — downgrade if consistently below 30fps
    let rafId: number;
    let checkInterval: ReturnType<typeof setInterval>;

    const measureFrame = (now: number) => {
      const delta = now - lastFrameRef.current;
      lastFrameRef.current = now;

      frameTimesRef.current.push(delta);
      if (frameTimesRef.current.length > 60) {
        frameTimesRef.current.shift();
      }

      rafId = requestAnimationFrame(measureFrame);
    };

    rafId = requestAnimationFrame(measureFrame);

    // Check every 3 seconds
    checkInterval = setInterval(() => {
      const times = frameTimesRef.current;
      if (times.length < 30) return;

      const avgDelta = times.reduce((a, b) => a + b, 0) / times.length;
      const avgFPS = 1000 / avgDelta;

      if (avgFPS < 24) {
        setQualityLevel("low");
      } else if (avgFPS < 45) {
        setQualityLevel("medium");
      }
    }, 3000);

    return () => {
      cancelAnimationFrame(rafId);
      clearInterval(checkInterval);
    };
  }, [setQualityLevel, setIsMobile]);
}
