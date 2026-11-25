"use client";

import { useEffect, type RefObject } from "react";
import { prefersReducedMotion } from "@/lib/css";

// Offsets of each card in the overlapping stack, measured from the reference:
// [x, y] as a fraction of card width, rotation in degrees.
const STACK: ReadonlyArray<readonly [number, number, number]> = [
  [0.26, 0.28, -8.4],
  [0, -0.03, 0],
  [-0.19, 0.24, 9.2],
  [0.17, -0.33, -20],
  [0.02, -0.42, 19],
];

// Cycle (seconds): grid hold, gather, stack hold, spread.
const PHASES = { grid: 1.1, gather: 0.55, stack: 0.45, spread: 0.6 };
const CYCLE = PHASES.grid + PHASES.gather + PHASES.stack + PHASES.spread;
const easeInOut = (x: number) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2);

function stackAmount(t: number): number {
  const { grid, gather, stack, spread } = PHASES;
  t = ((t % CYCLE) + CYCLE) % CYCLE;
  if (t < grid) return 0;
  if (t < grid + gather) return easeInOut((t - grid) / gather);
  if (t < grid + gather + stack) return 1;
  return 1 - easeInOut(Math.min(1, (t - grid - gather - stack) / spread));
}

/** Testimonial cards loop between an organised grid and an overlapping, swaying stack (wide screens only). */
export function useJourneyStack(cardsRef: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const container = cardsRef.current;
    if (!container || prefersReducedMotion()) return;
    const cards = [...container.querySelectorAll<HTMLElement>(".jcard")];
    if (cards.length !== STACK.length) return;

    const wide = matchMedia("(min-width: 1001px)");
    let visible = false;
    let running = false;
    let time = 0;
    let last = 0;
    let frame = 0;

    const reset = () => cards.forEach((c) => (c.style.transform = ""));

    const tick = (now: number) => {
      if (!visible || !wide.matches || document.hidden) {
        running = false;
        reset();
        return;
      }
      time += Math.min(0.05, (now - last) / 1000 || 0);
      last = now;
      const w = cards[0].offsetWidth;
      const gap = parseFloat(getComputedStyle(container).columnGap) || 0;
      cards.forEach((card, k) => {
        const p = stackAmount(time - k * 0.03); // slight stagger keeps it organic
        const [x, y, r] = STACK[k];
        const drift = Math.sin(time * 2.2 + k * 1.7) * 0.6 * p; // gentle sway while stacked
        // The stack offsets were measured for two small cards centred in the bottom row. The bottom
        // cards are now wider and fill the row, so shift them back to where those small cards sat.
        let fix = 0;
        let scale = 1;
        if (k >= 3) {
          scale = 1 + (w / card.offsetWidth - 1) * 0.65 * p; // wide cards shrink toward the others' size
          const oldCenter = container.offsetWidth / 2 + ((k === 3 ? -1 : 1) * (w + gap)) / 2;
          fix = oldCenter - (card.offsetLeft - container.offsetLeft + card.offsetWidth / 2);
        }
        card.style.transform = `translate3d(${(x * w * p + fix * p).toFixed(2)}px, ${(y * w * p).toFixed(2)}px, 0) rotate(${(r * p + drift).toFixed(3)}deg) scale(${scale.toFixed(4)})`;
      });
      frame = requestAnimationFrame(tick);
    };

    const start = () => {
      if (running || !visible || !wide.matches) return;
      running = true;
      last = performance.now();
      frame = requestAnimationFrame(tick);
    };

    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) {
        time = 0; // every visit starts from the organised grid
        start();
      }
    });
    observer.observe(container);

    const onWide = () => (wide.matches ? start() : reset());
    const onVisibility = () => !document.hidden && start();
    wide.addEventListener("change", onWide);
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      observer.disconnect();
      wide.removeEventListener("change", onWide);
      document.removeEventListener("visibilitychange", onVisibility);
      cancelAnimationFrame(frame);
      reset();
    };
  }, [cardsRef]);
}
