import { getProject } from "@theatre/core";

// Initialize Theatre.js project
// The state.json will eventually hold our cinematic keyframes.
// For now, we start with a clean project.
export const portfolioProject = getProject("Portfolio", { state: {} });

export const heroSheet = portfolioProject.sheet("Hero Scene");

/**
 * Conditionally loads Theatre.js Studio in development mode only.
 */
export async function initTheatreStudio() {
  if (process.env.NODE_ENV === "development") {
    // Dynamically import studio so it doesn't get bundled in production
    const studio = (await import("@theatre/studio")).default;
    studio.initialize();
  }
}
