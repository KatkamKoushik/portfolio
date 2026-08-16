"use client";

import { useRef } from "react";
import { useRouter } from "next/navigation";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger, EASE, DURATION } from "@/animation/gsap/config";
import { useInteractionStore } from "@/state/interactionStore";
import { useProjectStore } from "@/state/projectStore";
import { useVisualStore } from "@/state/visualStore";
import { PROJECTS } from "@/data/projects";
import LuminousText from "@/components/ui/LuminousText";
import styles from "./WorkSection.module.css";

export default function WorkSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const setCursorState = useInteractionStore((s) => s.setCursorState);
  const openCaseStudy = useProjectStore((s) => s.openCaseStudy);
  const setThemeProgress = useVisualStore((s) => s.setThemeProgress);

  useGSAP(
    () => {
      if (!sectionRef.current) return;

      // Section heading reveal
      const heading = sectionRef.current.querySelector(
        `.${styles.sectionTitle}`
      );
      if (heading) {
        gsap.fromTo(
          heading,
          { yPercent: 60, opacity: 0 },
          {
            yPercent: 0,
            opacity: 1,
            duration: DURATION.slow,
            ease: EASE.expo,
            scrollTrigger: {
              trigger: heading,
              start: "top 85%",
              end: "top 40%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      // Pinning and crossfading projects
      const cards = gsap.utils.toArray(`.${styles.card}`) as HTMLElement[];
      if (cards.length > 0 && gridRef.current) {
        // Set all cards except the first to opacity 0 and scale 0.95
        gsap.set(cards.slice(1), { opacity: 0, scale: 0.95, yPercent: 10 });
        
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top top",
            end: `+=${cards.length * 100}%`,
            pin: true,
            scrub: 1,
            onUpdate: (self) => {
              // Set theme progress (1 to N based on project index, smoothly)
              const smoothThemeProgress = 1 + self.progress * (cards.length - 1);
              setThemeProgress(smoothThemeProgress);
            },
          },
        });

        cards.forEach((card, i) => {
          if (i === 0) return; // Skip first card, it's already visible
          
          // Fade out previous card
          tl.to(cards[i - 1], {
            opacity: 0,
            scale: 1.05,
            yPercent: -10,
            duration: 1,
            ease: "none",
          }, "+=0.5"); // Add a small pause between transitions

          // Fade in current card
          tl.to(card, {
            opacity: 1,
            scale: 1,
            yPercent: 0,
            duration: 1,
            ease: "none",
          }, "<"); // Run simultaneously with the previous card's fade out
        });
      }
    },
    { scope: sectionRef }
  );

  const handleProjectClick = (e: React.MouseEvent<HTMLElement>, id: string) => {
    // Get the bounding rect of the card that was clicked
    const rect = e.currentTarget.getBoundingClientRect();
    
    // Dispatch to store to start FLIP transition overlay
    openCaseStudy(id, {
      top: rect.top,
      left: rect.left,
      width: rect.width,
      height: rect.height,
    });
    
    // Navigate to the case study page
    router.push(`/work/${id}`);
  };

  return (
    <section
      ref={sectionRef}
      id="work"
      className={`section ${styles.work}`}
      aria-label="Selected Work"
    >
      <div className="container">
        <div className={styles.header}>
          <span className={`text-caption ${styles.sectionLabel}`}>
            Selected Work
          </span>
          <h2 className={`text-display ${styles.sectionTitle}`}>
            Projects
          </h2>
        </div>

        <div className={styles.grid} ref={gridRef}>
          {PROJECTS.map((project, i) => (
            <article
              key={project.id}
              className={styles.card}
              onClick={(e) => handleProjectClick(e, project.id)}
              onMouseEnter={() => setCursorState("project", "View")}
              onMouseLeave={() => setCursorState("default")}
              style={
                { "--project-color": project.color } as React.CSSProperties
              }
            >
              <div className={styles.cardBackground}>
                <LuminousText as="span" className={styles.cardNumber}>
                  {String(i + 1).padStart(2, "0")}
                </LuminousText>
              </div>

              <div className={styles.cardContent}>
                <div className={styles.cardMeta}>
                  <span className="text-caption">{project.category}</span>
                  <span className="text-caption">{project.year}</span>
                </div>

                <h3 className={styles.cardTitle}>{project.title}</h3>

                <p className={styles.cardDescription}>
                  {project.description}
                </p>

                <div className={styles.cardTech}>
                  {project.technologies.map((tech) => (
                    <span key={tech} className={styles.techTag}>
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className={styles.cardLine} />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
