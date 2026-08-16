"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useVisualStore } from "@/state/visualStore";
import { useInteractionStore } from "@/state/interactionStore";
import { PerspectiveCamera } from "@react-three/drei";

/**
 * Reactive camera that subtly follows pointer and responds to scroll/theme.
 * Base position is driven by Theatre.js choreography; pointer adds offset.
 */
export default function HeroCamera() {
  const pointerGroup = useRef<THREE.Group>(null);
  
  useFrame(() => {

    // Pointer sway on top of Theatre animation
    if (pointerGroup.current) {
      const pointer = useInteractionStore.getState().pointerNormalized;
      const isTouchDevice = useInteractionStore.getState().isTouchDevice;
      const reducedMotion = useVisualStore.getState().reducedMotion;

      if (reducedMotion) {
        pointerGroup.current.position.set(0, 0, 0);
        return;
      }

      // Pointer influence (reduced for touch devices)
      const pointerInfluence = isTouchDevice ? 0.1 : 0.3;
      const px = pointer.x * pointerInfluence;
      const py = pointer.y * pointerInfluence * 0.6;
      
      pointerGroup.current.position.lerp(new THREE.Vector3(px, py, 0), 0.05);
      
      // Subtle rotation for parallax
      const targetRotation = new THREE.Euler(-py * 0.1, px * 0.1, 0);
      pointerGroup.current.quaternion.slerp(new THREE.Quaternion().setFromEuler(targetRotation), 0.05);
    }
  });

  return (
    <group ref={pointerGroup}>
      <PerspectiveCamera
        makeDefault
        position={[0, 0, 6]}
        fov={45}
        near={0.1}
        far={50}
      />
    </group>
  );
}
