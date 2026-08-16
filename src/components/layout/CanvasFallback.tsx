"use client";

import styles from "./CanvasFallback.module.css";

export default function CanvasFallback() {
  return (
    <div className={styles.fallback}>
      <div className={styles.noise} />
      <div className={styles.gradient} />
    </div>
  );
}
