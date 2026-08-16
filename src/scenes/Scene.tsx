"use client";

import dynamic from "next/dynamic";

/* Dynamic import for the 3D scene — prevents SSR issues with Three.js */
const SceneContainer = dynamic(() => import("@/scenes/SceneContainer"), {
  ssr: false,
});

export default function Scene() {
  return <SceneContainer />;
}
