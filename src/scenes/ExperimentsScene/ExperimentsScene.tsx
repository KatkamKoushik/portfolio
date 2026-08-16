"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { Physics, CuboidCollider } from "@react-three/rapier";
import { useVisualStore } from "@/state/visualStore";
import RigidObjects from "./RigidObjects";
import PointerBody from "./PointerBody";

export default function ExperimentsScene() {
  const groupRef = useRef<THREE.Group>(null);
  const themeProgress = useVisualStore((s) => s.themeProgress);
  const qualityLevel = useVisualStore((s) => s.qualityLevel);

  // Only render physics on medium/high quality, and only when the user is scrolled down
  // Let's say experiments section starts around themeProgress > 1.8
  // We'll keep it simple: always render if high quality, but maybe pause physics if out of view?
  // Physics component handles its own pausing if we wrap it, but for now we just mount it.

  // Only render physics when scrolled down to the Experiments section
  // to save CPU and prevent it from appearing in the Hero/Work sections.
  // Also unmount it when entering the Contact section (themeProgress > 3.0) for a quiet conclusion.
  if (qualityLevel === "low" || themeProgress < 1.5 || themeProgress > 3.0) return null;

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* Ambient lighting for the glass materials */}
      <ambientLight intensity={1.5} />
      <directionalLight position={[10, 10, 10]} intensity={2} castShadow />
      
      <Physics gravity={[0, -5, 0]}>
        <RigidObjects />
        <PointerBody />
        
        {/* Invisible floor bounds so they bounce around and don't fall forever */}
        <CuboidCollider position={[0, -5, 0]} args={[50, 1, 50]} />
        {/* Ceiling */}
        <CuboidCollider position={[0, 15, 0]} args={[50, 1, 50]} />
        {/* Walls */}
        <CuboidCollider position={[-10, 0, 0]} args={[1, 50, 50]} />
        <CuboidCollider position={[10, 0, 0]} args={[1, 50, 50]} />
      </Physics>
    </group>
  );
}
