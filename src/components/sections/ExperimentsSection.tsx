"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, EASE, DURATION } from "@/animation/gsap/config";
import styles from "./ExperimentsSection.module.css";

export default function ExperimentsSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (!sectionRef.current) return;

      const heading = sectionRef.current.querySelector(`.${styles.heading}`);
      const text = sectionRef.current.querySelector(`.${styles.text}`);

      gsap.fromTo(
        [heading, text],
        { yPercent: 40, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          duration: DURATION.normal,
          ease: EASE.expo,
          stagger: 0.1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            end: "top 25%",
            toggleActions: "play none none reverse",
          },
        }
      );
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} id="experiments" className={`section ${styles.experiments}`}>
      <div className={`container ${styles.container}`}>
        <div className={styles.content}>
          <span className="text-caption" style={{ color: "var(--accent)", marginBottom: "var(--space-4)", display: "block" }}>
            03 // Physics Lab
          </span>
          <h2 className={`text-display ${styles.heading}`}>
            Tactile<br />
            Digital<br />
            Reality.
          </h2>
          <p className={`text-lg ${styles.text}`}>
            A rigid-body physics simulation running at 60fps on the GPU. 
            Scroll down to drop the glass bodies, and use your mouse to interact with them.
          </p>
        </div>
      </div>
      
      {/* Invisible spacer to give the user room to play with the physics */}
      <div className={styles.playgroundSpacer} />
    </section>
  );
}
