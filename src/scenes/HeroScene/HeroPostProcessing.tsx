import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import {
  EffectComposer,
  Bloom,
  Noise,
  ChromaticAberration,
} from "@react-three/postprocessing";
import {
  BlendFunction,
  type BloomEffect,
  type ChromaticAberrationEffect,
} from "postprocessing";
import { useVisualStore } from "@/state/visualStore";
import { useInteractionStore } from "@/state/interactionStore";

export default function HeroPostProcessing() {
  const qualityLevel = useVisualStore((s) => s.qualityLevel);
  const themeProgress = useVisualStore((s) => s.themeProgress);
  const pointerVelocity = useInteractionStore((s) => s.pointerVelocity);

  const chromaticRef = useRef<ChromaticAberrationEffect | null>(null);
  const bloomRef = useRef<BloomEffect | null>(null);

  useFrame((_, delta) => {
    // 1. Map themeProgress (0 to 2) to Bloom intensity/threshold
    // Brutalist (0 - 0.8): low bloom, sharp
    // Luxury (0.8 - 1.6): medium bloom, soft
    // Future (1.6 - 2.0): high bloom, neon glow
    if (bloomRef.current) {
      let targetIntensity = 0.5;

      if (themeProgress > 1.6) {
        // Future
        targetIntensity = 2.0;
      } else if (themeProgress > 0.8) {
        // Luxury
        targetIntensity = 1.0;
      } else {
        // Brutalist
        targetIntensity = 0.3;
      }

      bloomRef.current.intensity +=
        (targetIntensity - bloomRef.current.intensity) * delta * 2;
    }

    // 2. Map scroll velocity & pointer velocity to Chromatic Aberration
    if (chromaticRef.current) {
      const scrollVelocity = useVisualStore.getState().scrollVelocity;
      // Calculate a combined velocity scalar
      const vScroll = Math.abs(scrollVelocity) * 0.05;
      const vPointer =
        Math.sqrt(
          pointerVelocity.x * pointerVelocity.x +
            pointerVelocity.y * pointerVelocity.y
        ) * 50;

      const totalVelocity = Math.min(vScroll + vPointer, 0.05);

      // Damp the offset back to zero, or spike it based on velocity
      const targetOffset = totalVelocity;
      chromaticRef.current.offset.x +=
        (targetOffset - chromaticRef.current.offset.x) * delta * 10;
      chromaticRef.current.offset.y +=
        (targetOffset - chromaticRef.current.offset.y) * delta * 10;
    }
  });

  // Only render expensive effects on medium/high-end devices
  if (qualityLevel === "low") return null;

  return (
    <EffectComposer multisampling={0}>
      <Bloom
        ref={bloomRef}
        luminanceThreshold={0.9}
        luminanceSmoothing={0.025}
        intensity={0.3}
        mipmapBlur
      />
      <ChromaticAberration
        ref={chromaticRef}
        offset={[0, 0]}
      />
      <Noise premultiply blendFunction={BlendFunction.ADD} opacity={0.3} />
    </EffectComposer>
  );
}
