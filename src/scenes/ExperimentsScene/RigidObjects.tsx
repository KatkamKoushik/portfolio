"use client";

import { useMemo } from "react";
import * as THREE from "three";
import { InstancedRigidBodies } from "@react-three/rapier";
import { useVisualStore } from "@/state/visualStore";

function pseudoRandom(seed: number) {
  const x = Math.sin(seed * 12.9898) * 43758.5453123;
  return x - Math.floor(x);
}

export default function RigidObjects() {
  const qualityLevel = useVisualStore((s) => s.qualityLevel);
  
  // Scale down count on low-end devices
  const count = qualityLevel === "low" ? 20 : 60;
  
  const { instances, colorArray } = useMemo(() => {
    const arr = [];
    const colorPalette = ["#ff3d00", "#c9a96e", "#00f0ff", "#8b5cf6", "#ffffff"];
    const colors = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      const rand1 = pseudoRandom(i * 17 + 1);
      const rand2 = pseudoRandom(i * 17 + 2);
      const rand3 = pseudoRandom(i * 17 + 3);
      const rand4 = pseudoRandom(i * 17 + 4);
      const rand5 = pseudoRandom(i * 17 + 5);
      const rand6 = pseudoRandom(i * 17 + 6);
      const rand7 = pseudoRandom(i * 17 + 7);
      const rand8 = pseudoRandom(i * 17 + 8);
      const scale = 0.5 + rand1 * 1.5;
      
      arr.push({
        key: `instance_${i}`,
        position: [
          (rand2 - 0.5) * 10,
          rand3 * 10 + 5,
          (rand4 - 0.5) * 10,
        ] as [number, number, number],
        rotation: [
          rand5 * Math.PI,
          rand6 * Math.PI,
          rand7 * Math.PI,
        ] as [number, number, number],
        scale: [scale, scale, scale] as [number, number, number]
      });
      
      const colorIndex = Math.floor(rand8 * colorPalette.length);
      const c = new THREE.Color(colorPalette[colorIndex]);
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
