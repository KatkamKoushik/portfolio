"use client";

import { Suspense, useState, useCallback } from "react";
import * as THREE from "three";
import HeroParticles from "./HeroParticles";
import HeroLighting from "./HeroLighting";
import HeroCamera from "./HeroCamera";
import HeroPostProcessing from "./HeroPostProcessing";
import TypographyMaskScene from "../TypographyMaskScene";

/**
 * Main hero 3D scene — orchestrates particles, lighting, and camera.
 * All sub-components read from Zustand stores for unified state.
 */
export default function HeroScene() {
  const [textMaskTexture, setTextMaskTexture] = useState<THREE.Texture | null>(null);

  // useCallback to prevent unnecessary re-renders when passing to child
  const handleUpdateTexture = useCallback((tex: THREE.Texture) => {
    setTextMaskTexture(tex);
  }, []);

  return (
    <Suspense fallback={null}>
      <TypographyMaskScene onUpdateTexture={handleUpdateTexture} />
      <HeroCamera />
      <HeroLighting />
      <HeroParticles textMaskTexture={textMaskTexture} />
      <HeroPostProcessing />
      {/* Subtle fog for depth — themed via parent */}
      <fog attach="fog" args={["#0a0a0a", 5, 15]} />
    </Suspense>
  );
}
