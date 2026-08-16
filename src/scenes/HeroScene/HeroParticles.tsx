"use client";

import { useRef, useMemo, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useVisualStore } from "@/state/visualStore";
import { useInteractionStore } from "@/state/interactionStore";
import { useTypographyStore } from "@/state/typographyStore";
import { PROJECTS } from "@/data/projects";

import particleVertex from "@/shaders/particles/vertex.glsl";
import particleFragment from "@/shaders/particles/fragment.glsl";

interface HeroParticlesProps {
  count?: number;
  textMaskTexture?: THREE.Texture | null;
}

function pseudoRandom(seed: number) {
  const x = Math.sin(seed * 12.9898) * 43758.5453123;
  return x - Math.floor(x);
}

export default function HeroParticles({ count: overrideCount, textMaskTexture }: HeroParticlesProps) {
  const pointsRef = useRef<THREE.Points>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  const qualityLevel = useVisualStore((s) => s.qualityLevel);
  const isMobile = useVisualStore((s) => s.isMobile);

  // Adaptive particle count - Reduced drastically for huge macro bokeh effect
  const count = useMemo(() => {
    if (overrideCount) return overrideCount;
    if (isMobile) return 50;
    switch (qualityLevel) {
      case "low":
        return 80;
      case "medium":
        return 150;
      case "high":
        return 300;
      default:
        return 150;
    }
  }, [overrideCount, qualityLevel, isMobile]);

  // Generate particle attributes
  const { offsets, scales, speeds, phases } = useMemo(() => {
    const off = new Float32Array(count * 3);
    const sc = new Float32Array(count);
    const sp = new Float32Array(count);
    const ph = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      const rand1 = pseudoRandom(i * 11 + 1);
      const rand2 = pseudoRandom(i * 11 + 2);
      const rand3 = pseudoRandom(i * 11 + 3);
      const rand4 = pseudoRandom(i * 11 + 4);
      const rand5 = pseudoRandom(i * 11 + 5);
      const rand6 = pseudoRandom(i * 11 + 6);

      // Distribute in a much larger sphere for massive overlapping bokeh
      const theta = rand1 * Math.PI * 2;
      const phi = Math.acos(2 * rand2 - 1);
      const r = Math.pow(rand3, 0.3) * 12; // increased radius

      off[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      off[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      off[i * 3 + 2] = (r * Math.cos(phi)) * 0.5 - 2.0; // push slightly back

      sc[i] = 1.0 + rand4 * 4.0; // larger scale variation
      sp[i] = 0.1 + rand5 * 0.3; // slower, calmer speed
      ph[i] = rand6 * Math.PI * 2;
    }

    return { offsets: off, scales: sc, speeds: sp, phases: ph };
  }, [count]);

  // Shader uniforms
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uThemeProgress: { value: 0 },
      uScrollVelocity: { value: 0 },
      uPointer: { value: new THREE.Vector2(0, 0) },
      uPointerSpeed: { value: 0 },
      uDPR: {
        value:
          typeof window !== "undefined" ? Math.min(window.devicePixelRatio, 2) : 1,
      },
      uProjectColor: { value: new THREE.Color("#ffffff") },
      uProjectMode: { value: 0 },
      uGlobalOpacity: { value: 1.0 },
      uTextActive: { value: 0.0 },
      uTextMask: { value: null },
      uResolution: { value: new THREE.Vector2(
        typeof window !== "undefined" ? window.innerWidth : 1000,
        typeof window !== "undefined" ? window.innerHeight : 1000
      ) },
    }),
    []
  );

  // Update uniforms when props/viewport change
  useEffect(() => {
    if (materialRef.current && textMaskTexture) {
      materialRef.current.uniforms.uTextMask.value = textMaskTexture;
    }
  }, [textMaskTexture]);

  useEffect(() => {
    const handleResize = () => {
      if (materialRef.current) {
        materialRef.current.uniforms.uResolution.value.set(
          window.innerWidth,
          window.innerHeight
        );
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Smooth interpolation refs for high-frequency values
  const smoothPointer = useRef(new THREE.Vector2(0, 0));
  const smoothVelocity = useRef(0);
  const smoothTheme = useRef(0);
  const smoothProjectMode = useRef(0);

  useFrame((state) => {
    if (!materialRef.current) return;

    const mat = materialRef.current;
    const pointer = useInteractionStore.getState().pointerNormalized;
    const pointerSpeed = useInteractionStore.getState().pointerSpeed;
    const themeProgress = useVisualStore.getState().themeProgress;
    const scrollVelocity = useVisualStore.getState().scrollVelocity;
    
    // Smooth interpolation (avoid jitter)
    const lerpFactor = 0.08;
    smoothPointer.current.lerp(
      new THREE.Vector2(pointer.x, pointer.y),
      lerpFactor
    );
    smoothVelocity.current +=
      (scrollVelocity - smoothVelocity.current) * lerpFactor;
    smoothTheme.current +=
      (themeProgress - smoothTheme.current) * lerpFactor * 0.5;

    // In work section (themeProgress >= 1), interpolate project colors based on scroll
    const targetProjectMode = themeProgress >= 0.8 ? 1.0 : 0.0;
    smoothProjectMode.current += (targetProjectMode - smoothProjectMode.current) * lerpFactor;
    
    // Calculate current project index based on themeProgress (1-indexed for projects)
    if (themeProgress >= 0.8) {
      // themeProgress goes from 1 to PROJECTS.length
      const progressZeroBased = Math.max(0, themeProgress - 1);
      const index1 = Math.min(Math.floor(progressZeroBased), PROJECTS.length - 1);
      const index2 = Math.min(index1 + 1, PROJECTS.length - 1);
      const fract = progressZeroBased - index1;
      
      const color1 = new THREE.Color(PROJECTS[index1].color);
      const color2 = new THREE.Color(PROJECTS[index2].color);
      
      const targetColor = color1.clone().lerp(color2, fract);
      mat.uniforms.uProjectColor.value.lerp(targetColor, lerpFactor);
    }

    mat.uniforms.uTime.value = state.clock.elapsedTime;
    mat.uniforms.uThemeProgress.value = smoothTheme.current;
    mat.uniforms.uScrollVelocity.value = smoothVelocity.current;
    mat.uniforms.uPointer.value.copy(smoothPointer.current);
    mat.uniforms.uPointerSpeed.value +=
      (pointerSpeed - mat.uniforms.uPointerSpeed.value) * 0.1;
    mat.uniforms.uProjectMode.value = smoothProjectMode.current;

    // Fade out particles globally after all projects (e.g. entering Contact section)
    let opacity = 1.0;
    if (themeProgress > PROJECTS.length) {
      opacity = 1.0 - (themeProgress - PROJECTS.length);
      opacity = Math.max(0, Math.min(1, opacity));
    }
    
    // Calculate global text activity (max opacity of any active luminous text)
    const texts = useTypographyStore.getState().texts;
    let maxTextOpacity = 0;
    for (const key in texts) {
      maxTextOpacity = Math.max(maxTextOpacity, texts[key].opacity);
    }
    // Smooth it out
    mat.uniforms.uTextActive.value += (maxTextOpacity - mat.uniforms.uTextActive.value) * 0.1;
    
    // Decrease background intensity slightly when text is very active (visual hierarchy)
    mat.uniforms.uGlobalOpacity.value = opacity * (1.0 - (mat.uniforms.uTextActive.value * 0.4));
  });

  return (
    <points ref={pointsRef} frustumCulled={false}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[offsets, 3]}
        />
        <bufferAttribute
          attach="attributes-aOffset"
          args={[offsets, 3]}
        />
        <bufferAttribute
          attach="attributes-aScale"
          args={[scales, 1]}
        />
        <bufferAttribute
          attach="attributes-aSpeed"
          args={[speeds, 1]}
        />
        <bufferAttribute
          attach="attributes-aPhase"
          args={[phases, 1]}
        />
      </bufferGeometry>
      <shaderMaterial
        ref={materialRef}
        vertexShader={particleVertex}
        fragmentShader={particleFragment}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}
