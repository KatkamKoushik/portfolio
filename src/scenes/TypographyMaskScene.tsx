"use client";

import { useFrame, useThree, createPortal } from "@react-three/fiber";
import { useFBO, OrthographicCamera, Text } from "@react-three/drei";
import { useMemo, useRef, useState, useEffect } from "react";
import * as THREE from "three";
import { useTypographyStore } from "@/state/typographyStore";

interface TypographyMaskSceneProps {
  onUpdateTexture: (tex: THREE.Texture) => void;
}

export default function TypographyMaskScene({ onUpdateTexture }: TypographyMaskSceneProps) {
  const { size, viewport } = useThree();
  const texts = useTypographyStore((s) => s.texts);
  
  // Create a separate scene for the mask
  const [maskScene] = useState(() => {
    const s = new THREE.Scene();
    s.background = new THREE.Color(0x000000);
    return s;
  });
  
  // Use a lower resolution FBO for performance and natural blurring
  const fbo = useFBO(size.width / 2, size.height / 2, {
    minFilter: THREE.LinearFilter,
    magFilter: THREE.LinearFilter,
    format: THREE.RGBAFormat,
    stencilBuffer: false,
    depthBuffer: false,
  });

  const orthoCamRef = useRef<THREE.OrthographicCamera>(null);

  useEffect(() => {
    onUpdateTexture(fbo.texture);
  }, [fbo.texture, onUpdateTexture]);

  useFrame((state) => {
    if (orthoCamRef.current) {
      const gl = state.gl;
      
      // Save current render target
      const oldTarget = gl.getRenderTarget();
      
      // Render the mask scene to our FBO
      gl.setRenderTarget(fbo);
      gl.render(maskScene, orthoCamRef.current);
      
      // Restore previous target
      gl.setRenderTarget(oldTarget);
    }
  });

  return (
    <>
      <OrthographicCamera
        ref={orthoCamRef}
        makeDefault={false}
        args={[0, size.width, 0, -size.height, 0.1, 1000]}
        position={[0, 0, 100]}
      />
      
      {createPortal(
        Object.values(texts).map((t) => {
          if (t.opacity <= 0.01) return null;
          
          // Map DOM coordinates to the Orthographic camera
          // The camera is set to top-left origin (0,0) and +x is right, -y is down.
          const centerX = t.rect.x + t.rect.width / 2;
          const centerY = t.rect.y + t.rect.height / 2;
          
          return (
            <group key={t.id} position={[centerX, -centerY, 0]}>
              {/* Soft diffused glow / atmospheric radiation */}
              <Text
                fontSize={t.fontSize * 1.15} // Larger for diffusion
                letterSpacing={t.letterSpacing / t.fontSize}
                color="#ffffff"
                anchorX="center"
                anchorY="middle"
                fillOpacity={t.opacity * 0.4} // Low opacity for soft edge
                outlineOpacity={0}
              >
                {t.text}
              </Text>
              
              {/* Crisp core */}
              <Text
                fontSize={t.fontSize}
                letterSpacing={t.letterSpacing / t.fontSize}
                color="#ffffff"
                anchorX="center"
                anchorY="middle"
                fillOpacity={t.opacity}
              >
                {t.text}
              </Text>
            </group>
          );
        }),
        maskScene
      )}
    </>
  );
}
