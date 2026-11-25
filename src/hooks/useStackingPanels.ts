"use client";

import { useEffect, type RefObject } from "react";
import { prefersReducedMotion } from "@/lib/css";

const PEEK = 16; // matches the per-panel sticky offset in globals.css
const ease = (t: number) => t * t * (3 - 2 * t);

/**
 * Industries panels pin via CSS (position: sticky). As each panel slides over the one before, every
 * panel buried beneath it shrinks (from its top edge), dims and fades its text a little more, so the pile
 * reads as a receding stack of narrower slivers.
 */
export function useStackingPanels(sectionRef: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const section = sectionRef.current;
    if (!section || prefersReducedMotion()) return;
    const cards = [...section.querySelectorAll<HTMLElement>(".ind__card")];
    if (cards.length < 2) return;

    let ticking = false;
    let visible = false;
    let frame = 0;

    const update = () => {
      ticking = false;
      // How far each panel has slid over the one before it (0 = still below, 1 = fully on top, eased).
      const arrived = cards.map((card, i) => {
        if (i === 0) return 0;
        const prev = cards[i - 1].getBoundingClientRect();
        const cur = card.getBoundingClientRect();
        return ease(1 - Math.min(1, Math.max(0, (cur.top - prev.top - PEEK) / cur.height)));
      });
      cards.forEach((card, i) => {
        let depth = 0;
        for (let k = i + 1; k < cards.length; k++) depth += arrived[k];
        const d = Math.min(depth, 3);
        card.style.transform = d > 0.001 ? `scale(${(1 - d * 0.045).toFixed(4)})` : "";
        card.style.filter = d > 0.001 ? `brightness(${(1 - d * 0.2).toFixed(3)})` : "";
        const copy = card.querySelector<HTMLElement>(".ind__copy");
        if (copy) copy.style.opacity = (1 - Math.min(1, depth) * 0.55).toFixed(3);
      });
    };

    const queue = () => {
      if (visible && !ticking) {
        ticking = true;
        frame = requestAnimationFrame(update);
      }
    };

    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) update();
    });
    observer.observe(section);
    addEventListener("scroll", queue, { passive: true });
    addEventListener("resize", update);

    return () => {
      observer.disconnect();
      removeEventListener("scroll", queue);
      removeEventListener("resize", update);
      cancelAnimationFrame(frame);
    };
  }, [sectionRef]);
}
