"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, EASE } from "@/animation/gsap/config";
import { useInteractionStore } from "@/state/interactionStore";
import { getLenis } from "@/animation/scroll/useLenis";
import styles from "./Header.module.css";

const NAV_ITEMS = [
  { label: "Work", href: "#work" },
  { label: "Experiments", href: "#experiments" },
  { label: "About", href: "#about" },
  { label: "Capabilities", href: "#capabilities" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

export default function Header() {
  const headerRef = useRef<HTMLElement>(null);
  const setCursorState = useInteractionStore((s) => s.setCursorState);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useGSAP(
    () => {
      if (!headerRef.current) return;

      gsap.fromTo(
        headerRef.current,
        { yPercent: -100, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: 0.8, ease: EASE.expo, delay: 1.5 }
      );
    },
    { scope: headerRef }
  );

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      const lenis = getLenis();
      if (lenis) {
        lenis.scrollTo(target as HTMLElement, { offset: -40 });
      } else {
        target.scrollIntoView({ behavior: "smooth" });
      }
    }
    setIsMenuOpen(false);
  };

  return (
    <header ref={headerRef} className={styles.header} role="banner">
      <div className={styles.inner}>
        <a
          href="#hero"
          className={styles.logo}
          onClick={(e) => handleNavClick(e, "#hero")}
          onMouseEnter={() => setCursorState("link")}
          onMouseLeave={() => setCursorState("default")}
          aria-label="Back to top"
        >
          KK
        </a>

        <nav
          className={`${styles.nav} ${isMenuOpen ? styles.navOpen : ""}`}
          role="navigation"
          aria-label="Main navigation"
        >
          <ul className={styles.navList}>
            {NAV_ITEMS.map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  className={styles.navLink}
                  onClick={(e) => handleNavClick(e, item.href)}
                  onMouseEnter={() => setCursorState("link")}
                  onMouseLeave={() => setCursorState("default")}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <button
          className={`${styles.menuToggle} ${isMenuOpen ? styles.menuOpen : ""}`}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-nav"
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        >
          <span className={styles.menuLine} />
          <span className={styles.menuLine} />
        </button>
      </div>
    </header>
  );
}
