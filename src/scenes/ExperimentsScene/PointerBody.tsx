"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { RigidBody, RapierRigidBody } from "@react-three/rapier";
import { useInteractionStore } from "@/state/interactionStore";

export default function PointerBody() {
  const bodyRef = useRef<RapierRigidBody>(null);
  const vec = new THREE.Vector3();

  useFrame((state) => {
    if (!bodyRef.current) return;

    // Get pointer in normalized device coordinates (-1 to +1)
    const pointer = useInteractionStore.getState().pointerNormalized;
    
    // Convert NDC to world space coordinates
    // We unproject the pointer onto a plane slightly in front of the camera
    vec.set(pointer.x, pointer.y, 0.5);
    vec.unproject(state.camera);
    
    const dir = vec.sub(state.camera.position).normalize();
    // Raycast distance (approx where the objects are falling)
    const distance = 8; 
    
    const targetPos = state.camera.position.clone().add(dir.multiplyScalar(distance));
    
    // Kinematic translation means it forcibly moves to this position,
    // imparting massive forces to anything in its path.
    bodyRef.current.setNextKinematicTranslation(targetPos);
  });

  return (
    <RigidBody
      ref={bodyRef}
      type="kinematicPosition"
      colliders="ball"
      restitution={1.2} // Extra bouncy!
      friction={0.1}
    >
      {/* Invisible sphere just for collisions */}
      <mesh visible={false}>
        <sphereGeometry args={[1.5, 16, 16]} />
        <meshBasicMaterial />
      </mesh>
    </RigidBody>
  );
}
