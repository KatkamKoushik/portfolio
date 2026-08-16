import { create } from "zustand";

interface VisualState {
  /** 0 = Brutalist, 1 = Luxury, 2 = Future — continuously interpolated */
  themeProgress: number;
  /** Derived world identifier */
  currentWorld: WorldId;
  /** Scroll velocity from Lenis */
  scrollVelocity: number;
  /** Normalized scroll progress 0-1 */
  scrollProgress: number;
  /** Whether initial assets are loaded */
  isLoaded: boolean;
  /** Whether intro animation has completed */
  introComplete: boolean;
  /** Adaptive quality level */
  qualityLevel: QualityLevel;
  /** Whether the user prefers reduced motion */
  reducedMotion: boolean;
  /** Whether the device is mobile */
  isMobile: boolean;

  /* Actions */
  setThemeProgress: (progress: number) => void;
  setScrollVelocity: (velocity: number) => void;
  setScrollProgress: (progress: number) => void;
  setIsLoaded: (loaded: boolean) => void;
  setIntroComplete: (complete: boolean) => void;
  setQualityLevel: (level: QualityLevel) => void;
  setReducedMotion: (reduced: boolean) => void;
  setIsMobile: (mobile: boolean) => void;
}

function deriveWorld(progress: number): WorldId {
  if (progress < 0.8) return "brutalist";
  if (progress < 1.6) return "luxury";
  return "future";
}

export const useVisualStore = create<VisualState>((set) => ({
  themeProgress: 0,
  currentWorld: "brutalist",
  scrollVelocity: 0,
  scrollProgress: 0,
  isLoaded: false,
  introComplete: false,
  qualityLevel: "high",
  reducedMotion: false,
  isMobile: false,

  setThemeProgress: (progress) =>
    set({ themeProgress: progress, currentWorld: deriveWorld(progress) }),
  setScrollVelocity: (velocity) => set({ scrollVelocity: velocity }),
  setScrollProgress: (progress) => set({ scrollProgress: progress }),
  setIsLoaded: (loaded) => set({ isLoaded: loaded }),
  setIntroComplete: (complete) => set({ introComplete: complete }),
  setQualityLevel: (level) => set({ qualityLevel: level }),
  setReducedMotion: (reduced) => set({ reducedMotion: reduced }),
  setIsMobile: (mobile) => set({ isMobile: mobile }),
}));
