"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, EASE, DURATION } from "@/animation/gsap/config";
import styles from "./AboutSection.module.css";

const CAPABILITIES = [
  "Data Science & Analytics",
  "Machine Learning",
  "Python & AI",
  "React & Next.js",
  "Web Development",
  "Interactive Experiences",
  "Database Management",
  "Performance Engineering",
];

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (!sectionRef.current) return;

      const elements = sectionRef.current.querySelectorAll("[data-reveal]");
      elements.forEach((el) => {
        gsap.fromTo(
          el,
          { yPercent: 40, opacity: 0 },
          {
            yPercent: 0,
            opacity: 1,
            duration: DURATION.slow,
            ease: EASE.expo,
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="about"
      className={`section ${styles.about}`}
      aria-label="About"
    >
      <div className="container">
        <div className={styles.grid}>
          <div className={styles.intro}>
            <span className="text-caption" data-reveal>
              About
            </span>
            <h2 className="text-display" data-reveal>
              Building at the intersection of data and engineering
            </h2>
          </div>

          <div className={styles.body}>
            <p className={styles.paragraph} data-reveal>
              I am a 3rd-year Data Science student at Kakatiya University College of Engineering and Technology in Warangal, Telangana (B.Tech, August 2024 – Present). 
            </p>
            <p className={styles.paragraph} data-reveal>
              With deep expertise in both machine learning and full-stack web development, I build intelligent systems that feel less like software and more like carefully directed experiences. Every project is an opportunity to push the boundary between what&apos;s expected and what&apos;s possible.
            </p>
          </div>

          <div className={styles.capabilities} data-reveal>
            <h3 className="text-caption">Capabilities</h3>
            <ul className={styles.capList}>
              {CAPABILITIES.map((cap, i) => (
                <li key={cap} className={styles.capItem}>
                  <span className={styles.capIndex}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className={styles.capName}>{cap}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
