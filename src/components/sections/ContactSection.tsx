"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, EASE, DURATION } from "@/animation/gsap/config";
import { useInteractionStore } from "@/state/interactionStore";
import { useVisualStore } from "@/state/visualStore";
import { PROJECTS } from "@/data/projects";
import styles from "./ContactSection.module.css";

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const setCursorState = useInteractionStore((s) => s.setCursorState);

  useGSAP(
    () => {
      if (!sectionRef.current) return;

      const setThemeProgress = useVisualStore.getState().setThemeProgress;

      // Update theme progress for particle fade-out
      gsap.to(sectionRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom bottom",
          scrub: true,
          onUpdate: (self) => {
            // themeProgress goes from N (last project) to N+1
            setThemeProgress(PROJECTS.length + self.progress);
          },
        },
      });

      const elements = sectionRef.current.querySelectorAll("[data-reveal]");
      elements.forEach((el) => {
        gsap.fromTo(
          el,
          { yPercent: 50, opacity: 0 },
          {
            yPercent: 0,
            opacity: 1,
            duration: DURATION.dramatic,
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
      id="contact"
      className={`section ${styles.contact}`}
      aria-label="Contact"
    >
      <div className="container">
        <div className={styles.content}>
          <span className="text-caption" data-reveal>
            Let&apos;s create together
          </span>

          <h2 className={styles.heading} data-reveal>
            <span className={styles.headingLine}>Have a vision?</span>
            <span className={styles.headingLine}>
              Let&apos;s make it{" "}
              <em className={styles.headingAccent}>real</em>.
            </span>
          </h2>

          <div className={styles.cta} data-reveal>
            <a
              href="mailto:koushikkatkam@gmail.com"
              className={styles.emailLink}
              onMouseEnter={() => setCursorState("link")}
              onMouseLeave={() => setCursorState("default")}
            >
              koushikkatkam@gmail.com
            </a>
          </div>

          <div className={styles.socials} data-reveal>
            <a
              href="https://github.com/KatkamKoushik"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialLink}
              onMouseEnter={() => setCursorState("link")}
              onMouseLeave={() => setCursorState("default")}
            >
              GitHub
            </a>
            <a
              href="https://linkedin.com/in/koushik-katkam"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialLink}
              onMouseEnter={() => setCursorState("link")}
              onMouseLeave={() => setCursorState("default")}
            >
              LinkedIn
            </a>
          </div>
        </div>

        <footer className={styles.footer} data-reveal>
          <span className={styles.footerText}>
            © {new Date().getFullYear()} Koushik Katkam
          </span>
          <span className={styles.footerText}>
            Data Science Student @ Kakatiya University
          </span>
        </footer>
      </div>
    </section>
  );
}
