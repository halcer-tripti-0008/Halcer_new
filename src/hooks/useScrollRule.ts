"use client";

import { useEffect, type RefObject } from "react";
import { prefersReducedMotion } from "@/lib/css";

/** The hairline above the Why Halcer header extends from the left as the section scrolls into view. */
export function useScrollRule(headRef: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const head = headRef.current;
    if (!head || prefersReducedMotion()) return;
    let queued = false;
    let frame = 0;

    const draw = () => {
      queued = false;
      const top = head.getBoundingClientRect().top;
      const p = (innerHeight * 0.95 - top) / (innerHeight * 0.55); // 0 when entering, 1 about mid-screen
      head.style.setProperty("--rule", Math.min(1, Math.max(0, p)).toFixed(3));
    };
    const queue = () => {
      if (!queued) {
        queued = true;
        frame = requestAnimationFrame(draw);
      }
    };

    addEventListener("scroll", queue, { passive: true });
    addEventListener("resize", queue);
    draw();
    return () => {
      removeEventListener("scroll", queue);
      removeEventListener("resize", queue);
      cancelAnimationFrame(frame);
    };
  }, [headRef]);
}
