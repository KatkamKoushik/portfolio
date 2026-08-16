import { ReactNode } from "react";
import Link from "next/link";
import styles from "./layout.module.css";
import { PROJECTS } from "@/data/projects";

export default function ProjectLayout({ children }: { children: ReactNode }) {
  return (
    <div className={styles.projectLayout}>
      {/* Absolute back button that overlays the WebGL canvas and content */}
      <Link href="/#work" className={styles.backButton}>
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M19 12H5" />
          <path d="M12 19l-7-7 7-7" />
        </svg>
        <span className="text-caption">Back to Work</span>
      </Link>
      
      {/* Project Content */}
      <main className={styles.projectContent}>
        {children}
      </main>
    </div>
  );
}

export function generateStaticParams() {
  return PROJECTS.map((p) => ({
    id: p.id,
  }));
}
