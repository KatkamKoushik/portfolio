import { create } from "zustand";

interface InteractionState {
  /** Raw pointer position */
  pointer: Vec2;
  /** Normalized pointer position (-1 to 1) */
  pointerNormalized: Vec2;
  /** Pointer velocity */
  pointerVelocity: Vec2;
  /** Pointer speed (magnitude of velocity) */
  pointerSpeed: number;
  /** Current cursor visual state */
  cursorState: CursorState;
  /** Cursor label text (for "VIEW", project names, etc.) */
  cursorLabel: string;
  /** Whether the device supports touch */
  isTouchDevice: boolean;
  /** Whether pointer is currently over an interactive element */
  isHovering: boolean;
  /** Active section in viewport */
  activeSection: string;

  /* Actions */
  setPointer: (position: Vec2, normalized: Vec2) => void;
  setPointerVelocity: (velocity: Vec2, speed: number) => void;
  setCursorState: (state: CursorState, label?: string) => void;
  setIsTouchDevice: (touch: boolean) => void;
  setIsHovering: (hovering: boolean) => void;
  setActiveSection: (section: string) => void;
}

export const useInteractionStore = create<InteractionState>((set) => ({
  pointer: { x: 0, y: 0 },
  pointerNormalized: { x: 0, y: 0 },
  pointerVelocity: { x: 0, y: 0 },
  pointerSpeed: 0,
  cursorState: "default",
  cursorLabel: "",
  isTouchDevice: false,
  isHovering: false,
  activeSection: "hero",

  setPointer: (position, normalized) =>
    set({ pointer: position, pointerNormalized: normalized }),
  setPointerVelocity: (velocity, speed) =>
    set({ pointerVelocity: velocity, pointerSpeed: speed }),
  setCursorState: (state, label = "") =>
    set({ cursorState: state, cursorLabel: label }),
  setIsTouchDevice: (touch) => set({ isTouchDevice: touch }),
  setIsHovering: (hovering) => set({ isHovering: hovering }),
  setActiveSection: (section) => set({ activeSection: section }),
}));
