"use client";

import { useMemo } from "react";
import * as THREE from "three";
import { InstancedRigidBodies, RapierRigidBody } from "@react-three/rapier";
import { useVisualStore } from "@/state/visualStore";

export default function RigidObjects() {
  const qualityLevel = useVisualStore((s) => s.qualityLevel);
  
  // Scale down count on low-end devices
  const count = qualityLevel === "low" ? 20 : 60;
  
  const { instances, colorArray } = useMemo(() => {
    const arr = [];
    const colorPalette = ["#ff3d00", "#c9a96e", "#00f0ff", "#8b5cf6", "#ffffff"];
    const colors = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      const scale = 0.5 + Math.random() * 1.5;
      
      arr.push({
        key: `instance_${i}`,
        position: [
          (Math.random() - 0.5) * 10,
          Math.random() * 10 + 5,
          (Math.random() - 0.5) * 10,
        ] as [number, number, number],
        rotation: [
          Math.random() * Math.PI,
          Math.random() * Math.PI,
          Math.random() * Math.PI,
        ] as [number, number, number],
        scale: [scale, scale, scale] as [number, number, number]
      });
      
      const c = new THREE.Color(colorPalette[Math.floor(Math.random() * colorPalette.length)]);
      c.toArray(colors, i * 3);
    }

    return { instances: arr, colorArray: colors };
  }, [count]);

  return (
    <InstancedRigidBodies
      instances={instances}
      colliders="cuboid"
      restitution={0.7} // Bouncy!
      friction={0.1}
    >
      <instancedMesh args={[undefined, undefined, count]} castShadow receiveShadow>
        <boxGeometry args={[1, 1, 1]}>
          <instancedBufferAttribute
            attach="attributes-color"
            args={[colorArray, 3]}
          />
        </boxGeometry>
        {/* Glass-like physical material */}
        <meshPhysicalMaterial
          vertexColors
          transmission={0.9}
          opacity={1}
          metalness={0.1}
          roughness={0.1}
          ior={1.5}
          thickness={0.5}
        />
      </instancedMesh>
    </InstancedRigidBodies>
  );
}
