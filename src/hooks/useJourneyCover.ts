"use client";

import { useEffect, type RefObject } from "react";

const MOBILE = "(max-width: 700px)";

/**
 * Phones only: the "Trusted by our clients" heading stays pinned while the testimonial cards scroll up
 * over it (see the `max-width: 700px` rules in globals.css). As the cards cover it, the heading fades,
 * blurs and shrinks slightly. `--cover` (0 to 1) is set on the section from the first card's position,
 * eased each frame so it never jumps.
 */
export function useJourneyCover(sectionRef: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const mq = matchMedia(MOBILE);
    const head = section.querySelector<HTMLElement>(".journey__head");
    const first = section.querySelector<HTMLElement>(".jcard");
    if (!head || !first) return;

    let value = 0;
    let frame = 0;
    let last = 0;

    const tick = (now: number) => {
      frame = 0;
      if (!mq.matches) {
        section.style.removeProperty("--cover");
        return;
      }
      const dt = Math.min(0.05, (now - last) / 1000 || 0);
      last = now;
      const h = head.getBoundingClientRect();
      const c = first.getBoundingClientRect();
      // 0 while the first card is below the heading, 1 once it has risen over the heading's whole height.
      const target = Math.min(1, Math.max(0, (h.bottom - c.top) / Math.max(1, h.height * 1.6)));
      value += (target - value) * (1 - Math.exp(-dt * 12));
      if (Math.abs(target - value) < 0.002) value = target;
      section.style.setProperty("--cover", value.toFixed(3));
      if (value !== target) frame = requestAnimationFrame(tick);
    };

    const wake = () => {
      if (frame || !mq.matches) return;
      last = performance.now();
      frame = requestAnimationFrame(tick);
    };

    wake();
    addEventListener("scroll", wake, { passive: true });
    addEventListener("resize", wake);
    return () => {
      cancelAnimationFrame(frame);
      removeEventListener("scroll", wake);
      removeEventListener("resize", wake);
      section.style.removeProperty("--cover");
    };
  }, [sectionRef]);
}
