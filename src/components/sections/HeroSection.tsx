"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, EASE, DURATION } from "@/animation/gsap/config";
import { useVisualStore } from "@/state/visualStore";
import LuminousText from "@/components/ui/LuminousText";

import styles from "./HeroSection.module.css";

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  const reducedMotion = useVisualStore((s) => s.reducedMotion);

  useGSAP(
    () => {
      if (reducedMotion || !sectionRef.current) return;

      const tl = gsap.timeline({
        defaults: { ease: EASE.expo, duration: DURATION.dramatic },
      });

      // Cinematic entry sequence - Physical, luminous reveal
      tl.fromTo(
        nameRef.current,
        { 
          yPercent: 20, 
          opacity: 0, 
          scale: 1.05,
          filter: "blur(20px) brightness(2)"
        },
        { 
          yPercent: 0, 
          opacity: 1, 
          scale: 1,
          filter: "blur(0px) brightness(1)",
          duration: DURATION.cinematic,
          ease: EASE.expo // Custom easing can be added if needed, expo is good for inertia
        }
      )
        .fromTo(
          subtitleRef.current,
          { 
            yPercent: 20, 
            opacity: 0,
            filter: "blur(10px)"
          },
          { 
            yPercent: 0, 
            opacity: 1, 
            filter: "blur(0px)",
            duration: DURATION.slow 
          },
          "-=1.2"
        )
        .fromTo(
          scrollIndicatorRef.current,
          { opacity: 0, y: -10 },
          { opacity: 1, y: 0, duration: DURATION.normal },
          "-=0.5"
        );

      // Scroll-driven parallax on the hero content
      gsap.to(nameRef.current, {
        yPercent: -30,
        opacity: 0.3,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.5,
        },
      });

      gsap.to(subtitleRef.current, {
        yPercent: -15,
        opacity: 0,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "20% top",
          end: "80% top",
          scrub: 1.5,
        },
      });
    },
    { scope: sectionRef, dependencies: [reducedMotion] }
  );

  return (
    <section
      ref={sectionRef}
      id="hero"
      className={styles.hero}
      aria-label="Introduction"
    >
      <div className={styles.content}>
        <div className={styles.nameWrapper}>
          <LuminousText ref={nameRef} as="h1" className={styles.name}>
            KOUSHIK
          </LuminousText>
        </div>

        <p className={styles.manifesto}>
          Creative technologist crafting cinematic systems where design, code, and
          intelligence move as one.
        </p>

        <div className={styles.subtitleWrapper}>
          <p ref={subtitleRef} className={styles.subtitle}>
            <span className={styles.subtitleLine}>Brutalist</span>
            <span className={styles.subtitleDivider}>→</span>
            <span className={styles.subtitleLine}>Luxury</span>
            <span className={styles.subtitleDivider}>→</span>
            <span className={styles.subtitleLine}>Future</span>
          </p>
        </div>

        <div ref={scrollIndicatorRef} className={styles.scrollIndicator}>
          <span className={styles.scrollText}>Scroll</span>
          <div className={styles.scrollLine} />
        </div>
      </div>
    </section>
  );
}
