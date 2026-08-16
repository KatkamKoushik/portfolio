"use client";

import { Canvas } from "@react-three/fiber";
import { Preload } from "@react-three/drei";
import { Suspense, useEffect, useState } from "react";
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
  const [dpr, setDpr] = useState(1);

  // Theatre.js studio is disabled in production
  useEffect(() => {
    // initTheatreStudio();
  }, []);

  useEffect(() => {
    const deviceDpr = window.devicePixelRatio || 1;
    switch (qualityLevel) {
      case "low":
        setDpr(Math.min(deviceDpr, 1));
        break;
      case "medium":
        setDpr(Math.min(deviceDpr, 1.5));
        break;
      case "high":
        setDpr(Math.min(deviceDpr, 2));
        break;
    }
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
