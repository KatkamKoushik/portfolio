"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, EASE, DURATION } from "@/animation/gsap/config";
import { useProjectStore } from "@/state/projectStore";
import { PROJECTS } from "@/data/projects";

export default function ProjectTransition() {
  const transitionRef = useRef<HTMLDivElement>(null);
  
  const { activeProjectId, activeProjectRect, transitionState, setTransitionState } =
    useProjectStore();

  const activeProject = PROJECTS.find((p) => p.id === activeProjectId);

  useGSAP(() => {
    if (!transitionRef.current || !activeProjectRect) return;

    if (transitionState === "expanding") {
      // Start from the exact position and dimensions of the card
      gsap.fromTo(
        transitionRef.current,
        {
          position: "fixed",
          top: activeProjectRect.top,
          left: activeProjectRect.left,
          width: activeProjectRect.width,
          height: activeProjectRect.height,
          backgroundColor: activeProject?.color || "#000",
          zIndex: 100,
          opacity: 0.8,
        },
        {
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          opacity: 1,
          duration: DURATION.normal,
          ease: EASE.expo,
          onComplete: () => {
            setTransitionState("expanded");
          },
        }
      );
    } else if (transitionState === "collapsing") {
      // Reverse animation back to the card's bounding rect
      gsap.fromTo(
        transitionRef.current,
        {
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          opacity: 1,
        },
        {
          top: activeProjectRect.top,
          left: activeProjectRect.left,
          width: activeProjectRect.width,
          height: activeProjectRect.height,
          opacity: 0,
          duration: DURATION.normal,
          ease: EASE.expo,
          onComplete: () => {
            setTransitionState("idle");
          },
        }
      );
    }
  }, [transitionState, activeProjectRect, activeProject]);

  if (transitionState === "idle" || !activeProject) return null;

  return <div ref={transitionRef} style={{ pointerEvents: "none" }} />;
}
