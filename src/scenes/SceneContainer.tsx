"use client";

import { Canvas } from "@react-three/fiber";
import { Preload } from "@react-three/drei";
import { Suspense, useMemo } from "react";
import HeroScene from "./HeroScene/HeroScene";
import ExperimentsScene from "./ExperimentsScene/ExperimentsScene";
import { useVisualStore } from "@/state/visualStore";
import ErrorBoundary from "@/components/layout/ErrorBoundary";

/**
 * Main R3F Canvas container.
 * Fixed behind DOM content, full viewport, adaptive DPR.
 */
export default function SceneContainer() {
  const qualityLevel = useVisualStore((s) => s.qualityLevel);
  const dpr = useMemo(() => {
    if (typeof window === "undefined") return 1;
    const deviceDpr = window.devicePixelRatio || 1;
    if (qualityLevel === "low") return Math.min(deviceDpr, 1);
    if (qualityLevel === "medium") return Math.min(deviceDpr, 1.5);
    return Math.min(deviceDpr, 2);
  }, [qualityLevel]);

  return (
    <div className="canvas-container" aria-hidden="true">
      <ErrorBoundary>
        <Canvas
          dpr={dpr}
          performance={{ min: 0.5 }}
        gl={{
          antialias: qualityLevel === "high",
          alpha: true,
          powerPreference: "high-performance",
          stencil: false,
          depth: true,
        }}
        camera={{ position: [0, 0, 6], fov: 45, near: 0.1, far: 50 }}
        style={{ background: "transparent" }}
        >
          <Suspense fallback={null}>
            <HeroScene />
            <ExperimentsScene />
            <Preload all />
          </Suspense>
        </Canvas>
      </ErrorBoundary>
    </div>
  );
}
