"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useVisualStore } from "@/state/visualStore";

/**
 * Dynamic lighting that morphs across the three worlds.
 * Brutalist: harsh, contrasty | Luxury: warm, soft | Future: cool, atmospheric
 */
export default function HeroLighting() {
  const directionalRef = useRef<THREE.DirectionalLight>(null);
  const pointLight1Ref = useRef<THREE.PointLight>(null);
  const pointLight2Ref = useRef<THREE.PointLight>(null);

  // Colors for each world
  const brutalistColor = useRef(new THREE.Color("#ffffff"));
  const luxuryColor = useRef(new THREE.Color("#c9a96e"));
  const luxuryAmbient = useRef(new THREE.Color("#2e1f0a"));
  const futureColor1 = useRef(new THREE.Color("#00f0ff"));
  const futureColor2 = useRef(new THREE.Color("#8b5cf6"));

  const smoothTheme = useRef(0);

  useFrame(() => {
    const themeProgress = useVisualStore.getState().themeProgress;
    smoothTheme.current += (themeProgress - smoothTheme.current) * 0.05;
    const t = smoothTheme.current;

    if (directionalRef.current) {
      // Brutalist: harsh white, Luxury: warm gold, Future: dim
      const intensity = t < 1
        ? THREE.MathUtils.lerp(1.5, 0.8, t)
        : THREE.MathUtils.lerp(0.8, 0.3, t - 1);
      directionalRef.current.intensity = intensity;

      if (t < 1) {
        directionalRef.current.color.lerpColors(brutalistColor.current, luxuryColor.current, t);
      } else {
        directionalRef.current.color.lerpColors(luxuryColor.current, futureColor1.current, t - 1);
      }
    }

    if (pointLight1Ref.current) {
      // Only active in Luxury and Future worlds
      const intensity = t < 0.5 ? 0 : t < 1 ? (t - 0.5) * 4 : 2.0;
      pointLight1Ref.current.intensity = intensity;

      if (t < 1) {
        pointLight1Ref.current.color.copy(luxuryColor.current);
      } else {
        pointLight1Ref.current.color.lerpColors(luxuryColor.current, futureColor1.current, t - 1);
      }
    }

      if (pointLight2Ref.current) {
      // Only active in Future world
      const intensity = t < 1.2 ? 0 : (t - 1.2) * 3;
      pointLight2Ref.current.intensity = intensity;
      pointLight2Ref.current.color.copy(futureColor2.current);
    }

    // Quiet Conclusion: Fade out all lights when approaching Contact section
    if (t > 3.0) {
      const fadeOut = Math.max(0, 1.0 - (t - 3.0));
      if (directionalRef.current) directionalRef.current.intensity *= fadeOut;
      if (pointLight1Ref.current) pointLight1Ref.current.intensity *= fadeOut;
      if (pointLight2Ref.current) pointLight2Ref.current.intensity *= fadeOut;
    }
  });

  return (
    <>
      <ambientLight intensity={0.15} color="#111111" />
      <directionalLight
        ref={directionalRef}
        position={[5, 5, 3]}
        intensity={1.5}
        color="#ffffff"
      />
      <pointLight
        ref={pointLight1Ref}
        position={[-3, 2, 2]}
        intensity={0}
        distance={12}
        decay={2}
      />
      <pointLight
        ref={pointLight2Ref}
        position={[3, -2, -1]}
        intensity={0}
        distance={10}
        decay={2}
        color="#8b5cf6"
      />
    </>
  );
}
