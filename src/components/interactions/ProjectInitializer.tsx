"use client";

import { useEffect } from "react";
import { useProjectStore } from "@/state/projectStore";

export default function ProjectInitializer({ projectId }: { projectId: string }) {
  const setActiveProject = useProjectStore((s) => s.setActiveProject);
  const setTransitionState = useProjectStore((s) => s.setTransitionState);
  
  useEffect(() => {
    // Wait a frame so the FLIP expansion animation doesn't get interrupted if we just navigated here
    // But if it's a hard refresh, set it immediately
    setActiveProject(projectId);
    
    // Cleanup on unmount (navigating away)
    return () => {
      // setActiveProject(null);
      // Wait, we don't want to clear it immediately on unmount because the collapse animation needs the ID
    };
  }, [projectId, setActiveProject]);

  return null;
}
