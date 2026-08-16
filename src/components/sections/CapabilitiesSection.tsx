"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, EASE, DURATION } from "@/animation/gsap/config";
import styles from "./CapabilitiesSection.module.css";

const CAPABILITY_PILLARS = [
  {
    label: "Creative Direction",
    items: ["Narrative UX", "Art Direction", "Visual Systems"],
  },
  {
    label: "Engineering",
    items: ["Next.js + TypeScript", "Interactive React", "State Architecture"],
  },
  {
    label: "Creative Technology",
    items: ["Three.js / R3F", "Shaders", "GSAP Motion"],
  },
  {
    label: "Intelligence",
    items: ["Machine Learning", "Applied AI", "Data Product Thinking"],
  },
];

export default function CapabilitiesSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (!sectionRef.current) return;

      const cards = sectionRef.current.querySelectorAll(`.${styles.card}`);
      gsap.fromTo(
        cards,
        { yPercent: 30, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          duration: DURATION.slow,
          ease: EASE.expo,
          stagger: 0.08,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        }
      );
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="capabilities"
      className={`section ${styles.capabilities}`}
      aria-label="Capabilities"
    >
      <div className="container">
        <span className={`text-caption ${styles.label}`}>Capabilities</span>
        <h2 className={`text-display ${styles.heading}`}>Built for concept-to-system execution.</h2>

        <div className={styles.grid}>
          {CAPABILITY_PILLARS.map((pillar) => (
            <article key={pillar.label} className={styles.card}>
              <h3 className={styles.cardTitle}>{pillar.label}</h3>
              <ul className={styles.list}>
                {pillar.items.map((item) => (
                  <li key={item} className={styles.item}>
                    {item}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
