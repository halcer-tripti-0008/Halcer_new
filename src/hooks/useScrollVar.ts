"use client";

import { useEffect, type RefObject } from "react";
import { prefersReducedMotion } from "@/lib/css";

/**
 * Writes a 0..1 progress value to the CSS variable `--p` on the element while it is near the viewport.
 * No React state: one passive scroll listener + rAF, gated by an IntersectionObserver so off-screen
 * sections cost nothing. With reduced motion the final state (1) is applied once.
 */
export function useScrollVar<T extends HTMLElement>(
  ref: RefObject<T | null>,
  progress: (rect: DOMRect) => number,
) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (prefersReducedMotion()) {
      el.style.setProperty("--p", "1");
      return;
    }
    let frame = 0;
    let live = false;
    const update = () => {
      frame = 0;
      const p = Math.min(1, Math.max(0, progress(el.getBoundingClientRect())));
      el.style.setProperty("--p", p.toFixed(4));
    };
    const schedule = () => {
      if (live && !frame) frame = requestAnimationFrame(update);
    };
    const io = new IntersectionObserver(
      ([entry]) => {
        live = entry.isIntersecting;
        if (live) schedule();
      },
      { rootMargin: "20% 0px 20% 0px" },
    );
    io.observe(el);
    addEventListener("scroll", schedule, { passive: true });
    addEventListener("resize", schedule);
    update();
    return () => {
      io.disconnect();
      removeEventListener("scroll", schedule);
      removeEventListener("resize", schedule);
      cancelAnimationFrame(frame);
    };
  }, [ref, progress]);
}
