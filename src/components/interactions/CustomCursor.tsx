"use client";

import { useRef, useCallback, useEffect } from "react";
import { gsap } from "@/animation/gsap/config";
import { useInteractionStore } from "@/state/interactionStore";

/**
 * Premium custom cursor — multi-state, mix-blend-mode difference.
 * Hidden on touch devices. Respects reduced-motion.
 */
export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  const isTouchDevice = useInteractionStore((s) => s.isTouchDevice);
  const cursorState = useInteractionStore((s) => s.cursorState);
  const cursorLabel = useInteractionStore((s) => s.cursorLabel);

  const moveCursor = useCallback(
    (e: PointerEvent) => {
      if (!cursorRef.current) return;
      gsap.to(cursorRef.current, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.15,
        ease: "power2.out",
        overwrite: true,
      });
    },
    []
  );

  useEffect(() => {
    if (isTouchDevice) return;

    window.addEventListener("pointermove", moveCursor, { passive: true });
    return () => window.removeEventListener("pointermove", moveCursor);
  }, [isTouchDevice, moveCursor]);

  // Update cursor visual state
  useEffect(() => {
    if (!dotRef.current) return;

    const sizes: Record<CursorState, { w: number; h: number }> = {
      default: { w: 4, h: 4 },
      project: { w: 60, h: 60 },
      drag: { w: 40, h: 40 },
      link: { w: 12, h: 12 },
      view: { w: 60, h: 60 },
      hidden: { w: 0, h: 0 },
    };

    const size = sizes[cursorState] || sizes.default;
    gsap.to(dotRef.current, {
      width: size.w,
      height: size.h,
      duration: 0.35,
      ease: "power3.out",
    });
  }, [cursorState]);

  if (isTouchDevice) return null;

  return (
    <div
      ref={cursorRef}
      className={`custom-cursor custom-cursor--${cursorState}`}
      style={{ transform: "translate(-50%, -50%)" }}
    >
      <div ref={dotRef} className="custom-cursor__dot" />
      <span ref={labelRef} className="custom-cursor__label">
        {cursorLabel}
      </span>
    </div>
  );
}
