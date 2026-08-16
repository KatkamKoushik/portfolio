/* Global type declarations */

/** Visual world identifier */
type WorldId = "brutalist" | "luxury" | "future";

/** Quality level for adaptive rendering */
type QualityLevel = "high" | "medium" | "low";

/** Cursor states for the custom cursor system */
type CursorState = "default" | "project" | "drag" | "link" | "view" | "hidden";

/** 2D vector */
interface Vec2 {
  x: number;
  y: number;
}

/** Normalized pointer data */
interface PointerData {
  position: Vec2;
  normalized: Vec2;
  velocity: Vec2;
  direction: Vec2;
  speed: number;
}

/** Project data model */
interface ProjectData {
  id: string;
  title: string;
  category: string;
  year: number;
  role: string;
  description: string;
  technologies: string[];
  problem: string;
  approach: string;
  solution: string;
  outcome: string;
  metrics?: string[];
  thumbnail: string;
  images: string[];
  color: string;
}
