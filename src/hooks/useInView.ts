"use client";

import { useEffect, useRef, useState } from "react";
import { prefersReducedMotion } from "@/lib/css";

/**
 * Section entrance: returns a ref and whether the section is "in view". It switches on when a quarter
 * of the section (or of the window, for tall sections) is visible and resets once the section has fully
 * left the screen, so the entrance plays again on every visit.
 */
export function useInView<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const section = ref.current;
    if (!section) return;
    if (prefersReducedMotion() || !("IntersectionObserver" in window)) {
      setInView(true);
      return;
    }
    const thresholds = Array.from({ length: 21 }, (_, i) => i / 20);
    const observer = new IntersectionObserver(
      ([entry]) => {
        const need = Math.min(entry.boundingClientRect.height * 0.25, innerHeight * 0.25);
        if (entry.isIntersecting && entry.intersectionRect.height >= need) setInView(true);
        else if (!entry.isIntersecting) setInView(false);
      },
      { threshold: thresholds },
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return [ref, inView] as const;
}
