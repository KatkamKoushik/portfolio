"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, EASE, DURATION } from "@/animation/gsap/config";
import styles from "./ExperienceSection.module.css";

const EXPERIENCE = [
  {
    year: "2025",
    title: "AI Security Prototyping",
    detail: "Designed and built applied AI experiences focused on real-time signal interpretation.",
  },
  {
    year: "2024",
    title: "Full-stack Product Delivery",
    detail: "Shipped production websites blending business conversion goals with cinematic UI direction.",
  },
  {
    year: "Now",
    title: "Data Science @ KUCET",
    detail: "Building at the intersection of model thinking, systems engineering, and interactive media.",
  },
];

export default function ExperienceSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (!sectionRef.current) return;
      gsap.fromTo(
        sectionRef.current.querySelectorAll(`.${styles.item}`),
        { yPercent: 35, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          duration: DURATION.slow,
          ease: EASE.expo,
          stagger: 0.1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
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
      id="experience"
      className={`section ${styles.experience}`}
      aria-label="Experience"
    >
      <div className="container">
        <span className={`text-caption ${styles.label}`}>Experience</span>
        <h2 className={`text-display ${styles.heading}`}>From experiments to production outcomes.</h2>

        <ol className={styles.timeline}>
          {EXPERIENCE.map((item) => (
            <li key={item.title} className={styles.item}>
              <span className={styles.year}>{item.year}</span>
              <div>
                <h3 className={styles.title}>{item.title}</h3>
                <p className={styles.detail}>{item.detail}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
