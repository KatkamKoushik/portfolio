"use client";

import { useEffect, useCallback, useRef } from "react";
import { useInteractionStore } from "@/state/interactionStore";

/**
 * Tracks pointer position and velocity across the viewport.
 * Feeds normalized values into the interaction store.
 */
export function usePointerTracking() {
  const setPointer = useInteractionStore((s) => s.setPointer);
  const setPointerVelocity = useInteractionStore((s) => s.setPointerVelocity);
  const setIsTouchDevice = useInteractionStore((s) => s.setIsTouchDevice);

  const lastPosition = useRef<Vec2>({ x: 0, y: 0 });
  const lastTime = useRef(0);

  const handlePointerMove = useCallback(
    (e: PointerEvent) => {
      const now = performance.now();
      const dt = Math.max(now - lastTime.current, 1); // Avoid division by zero

      const position: Vec2 = { x: e.clientX, y: e.clientY };
      const normalized: Vec2 = {
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1,
      };

      const velocity: Vec2 = {
        x: (e.clientX - lastPosition.current.x) / dt,
        y: (e.clientY - lastPosition.current.y) / dt,
      };
      const speed = Math.sqrt(
        velocity.x * velocity.x + velocity.y * velocity.y
      );

      setPointer(position, normalized);
      setPointerVelocity(velocity, Math.min(speed, 5));

      lastPosition.current = position;
      lastTime.current = now;
    },
    [setPointer, setPointerVelocity]
  );

  useEffect(() => {
    if (typeof window === "undefined") return;
    lastTime.current = performance.now();

    // Detect touch capability
    const isTouch =
      "ontouchstart" in window || navigator.maxTouchPoints > 0;
    setIsTouchDevice(isTouch);

    window.addEventListener("pointermove", handlePointerMove, {
      passive: true,
    });

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
    };
  }, [handlePointerMove, setIsTouchDevice]);
}
