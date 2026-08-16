"use client";

import React, { useEffect, useRef, useId, forwardRef } from "react";
import { useTypographyStore } from "@/state/typographyStore";
import { useVisualStore } from "@/state/visualStore";

interface LuminousTextProps extends React.HTMLAttributes<HTMLElement> {
  as?: React.ElementType;
  children: string;
}

const LuminousText = forwardRef<HTMLElement, LuminousTextProps>(
  ({ as: Component = "h1", children, className, ...props }, forwardedRef) => {
    const localRef = useRef<HTMLElement>(null);
    const id = useId();
    const registerText = useTypographyStore((s) => s.registerText);
    const updateTextRect = useTypographyStore((s) => s.updateTextRect);
    const unregisterText = useTypographyStore((s) => s.unregisterText);
    const reducedMotion = useVisualStore((s) => s.reducedMotion);

    // Merge refs
    const setRef = (node: HTMLElement) => {
      // @ts-ignore - Handle mutable ref object vs function ref
      localRef.current = node;
      if (typeof forwardedRef === "function") {
        forwardedRef(node);
      } else if (forwardedRef) {
        forwardedRef.current = node;
      }
    };

  useEffect(() => {
    if (reducedMotion || !localRef.current) return;
    const el = localRef.current;
    
    // Initial registration
    const style = window.getComputedStyle(el);
    registerText({
      id,
      text: children,
      rect: { x: 0, y: 0, width: 0, height: 0, top: 0, left: 0 },
      fontSize: parseFloat(style.fontSize),
      fontWeight: style.fontWeight,
      letterSpacing: parseFloat(style.letterSpacing) || 0,
      opacity: parseFloat(style.opacity),
      fontFamily: style.fontFamily
    });
    
    let rafId: number;
    let lastTime = 0;
    
    // Throttle to 30fps to avoid excessive layout thrashing if needed, 
    // but rAF is usually fine. We'll just read rect on every frame.
    const updateRect = (time: number) => {
      // Only measure every ~32ms (30fps) for performance, or every frame for smoothness?
      // Since Lenis scrolls smoothly, doing it every frame is best for perfectly tracking the mask.
      const rect = el.getBoundingClientRect();
      
      // Calculate effective opacity by traversing up the DOM
      let currentOpacity = 1;
      let node: HTMLElement | null = el;
      while (node && node !== document.body) {
        const nodeOpacity = parseFloat(window.getComputedStyle(node).opacity);
        if (!isNaN(nodeOpacity)) {
          currentOpacity *= nodeOpacity;
        }
        node = node.parentElement;
      }
      
      updateTextRect(id, {
        x: rect.x,
        y: rect.y,
        width: rect.width,
        height: rect.height,
        top: rect.top,
        left: rect.left
      }, currentOpacity);
      
      rafId = requestAnimationFrame(updateRect);
    };
    
    rafId = requestAnimationFrame(updateRect);
    
    return () => {
      cancelAnimationFrame(rafId);
      unregisterText(id);
    };
  }, [id, children, registerText, updateTextRect, unregisterText, reducedMotion]);

  return (
    <Component ref={setRef} className={className} {...props}>
      {children}
    </Component>
  );
});

LuminousText.displayName = "LuminousText";
export default LuminousText;
