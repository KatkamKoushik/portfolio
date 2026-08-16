import { create } from "zustand";
import { Project } from "@/data/projects";

type Rect = {
  top: number;
  left: number;
  width: number;
  height: number;
};

interface ProjectState {
  /** All projects */
  projects: Project[];
  /** Currently active/focused project ID */
  activeProjectId: string | null;
  /** Initial bounding rect of the card that was clicked */
  activeProjectRect: Rect | null;
  /** Whether a project case study is open */
  isCaseStudyOpen: boolean;
  /** Transition state for FLIP animations */
  transitionState: "idle" | "expanding" | "expanded" | "collapsing";

  /* Actions */
  setActiveProject: (id: string | null) => void;
  openCaseStudy: (id: string, rect: Rect) => void;
  closeCaseStudy: () => void;
  setTransitionState: (
    state: "idle" | "expanding" | "expanded" | "collapsing"
  ) => void;
}

export const useProjectStore = create<ProjectState>((set) => ({
  projects: [],
  activeProjectId: null,
  activeProjectRect: null,
  isCaseStudyOpen: false,
  transitionState: "idle",

  setActiveProject: (id) => set({ activeProjectId: id }),
  
  openCaseStudy: (id, rect) =>
    set({
      activeProjectId: id,
      activeProjectRect: rect,
      isCaseStudyOpen: true,
      transitionState: "expanding",
    }),
    
  closeCaseStudy: () =>
    set({
      isCaseStudyOpen: false,
      transitionState: "collapsing",
      // Keep activeProjectRect so reverse animation has a target
    }),
    
  setTransitionState: (state) => {
    if (state === "idle") {
      set({ transitionState: state, activeProjectId: null, activeProjectRect: null });
    } else {
      set({ transitionState: state });
    }
  },
}));
