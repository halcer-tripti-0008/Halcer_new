"use client";

import { useEffect, type RefObject } from "react";
import { prefersReducedMotion } from "@/lib/css";

const MOBILE = "(max-width: 700px)";

/**
 * Mobile "pinned" carousel for the Why Halcer cards (phones only; see the `max-width: 700px` rules in
 * globals.css).
 *
 * The section is made taller than the screen by exactly the distance the cards have to travel
 * (`--why-travel`), and its content is `position: sticky`. So while you scroll down through that extra
 * height the page stays put and the cards slide left, one after another; when the last card is in place
 * the page carries on. Scrolling back up plays it in reverse. The row position is derived from the scroll
 * position (not accumulated), so it always matches the page, and it is eased each frame so it never jumps.
 *
 * The card nearest the centre is full size, the others shrink slightly (`--s`), and a thin progress track
 * under the row follows along. With reduced motion there is no pinning: the row is a plain swipeable strip.
 */
export function useWhyCarousel(
  sectionRef: RefObject<HTMLElement | null>,
  gridRef: RefObject<HTMLElement | null>,
  trackRef: RefObject<HTMLElement | null>,
  thumbRef: RefObject<HTMLElement | null>,
) {
  useEffect(() => {
    const section = sectionRef.current;
    const grid = gridRef.current;
    const track = trackRef.current;
    const thumb = thumbRef.current;
    if (!section || !grid || !track || !thumb) return;

    const mq = matchMedia(MOBILE);
    const cards = [...track.querySelectorAll<HTMLElement>(".why__card")];

    if (prefersReducedMotion()) {
      grid.classList.add("is-native"); // plain horizontal swipe, no pinning
      return () => grid.classList.remove("is-native");
    }

    let x = 0; // where the row is
    let target = 0; // where the scroll position says it should be
    let max = 0; // how far the row can travel
    let pad = 0;
    let frame = 0;
    let last = 0;

    const measure = () => {
      if (!mq.matches) {
        section.style.removeProperty("--why-travel");
        max = 0;
        return;
      }
      pad = parseFloat(getComputedStyle(grid).paddingLeft) || 0;
      max = Math.max(0, track.scrollWidth - (grid.clientWidth - pad * 2));
      // About 1 px of scrolling per px of travel, so the cards keep pace with a finger.
      section.style.setProperty("--why-travel", `${Math.round(max)}px`);
    };

    // 0 when the section reaches the top of the screen, 1 when its pinned stretch is used up.
    const progress = () => {
      const travel = section.offsetHeight - innerHeight;
      if (travel <= 0) return 0;
      return Math.min(1, Math.max(0, -section.getBoundingClientRect().top / travel));
    };

    const render = () => {
      track.style.transform = `translate3d(${(-x).toFixed(2)}px, 0, 0)`;
      const ratio = Math.min(1, grid.clientWidth / Math.max(1, track.scrollWidth + pad * 2));
      const w = Math.max(ratio, 0.14);
      thumb.style.width = `${w * 100}%`;
      thumb.style.transform = `translateX(${(max > 0 ? x / max : 0) * (1 / w - 1) * 100}%)`;

      const mid = grid.getBoundingClientRect().left + grid.clientWidth / 2;
      for (const card of cards) {
        const r = card.getBoundingClientRect();
        const d = Math.min(1, Math.abs(r.left + r.width / 2 - mid) / r.width);
        card.style.setProperty("--s", (1 - d * 0.07).toFixed(3));
      }
    };

    const tick = (now: number) => {
      frame = 0;
      if (!mq.matches) return;
      const dt = Math.min(0.05, (now - last) / 1000 || 0);
      last = now;
      target = progress() * max;
      x += (target - x) * (1 - Math.exp(-dt * 9)); // ease toward the scroll position
      if (Math.abs(target - x) < 0.05) x = target;
      render();
      if (x !== target) frame = requestAnimationFrame(tick);
    };

    const wake = () => {
      if (frame || !mq.matches) return;
      last = performance.now();
      frame = requestAnimationFrame(tick);
    };

    // Keyboard: focusing a card scrolls the page to the point where that card is centred.
    const onFocusIn = (e: FocusEvent) => {
      if (!mq.matches || max <= 0) return;
      const card = (e.target as Element).closest<HTMLElement>(".why__card");
      if (!card) return;
      const want = Math.min(max, Math.max(0, card.offsetLeft - pad));
      const travel = section.offsetHeight - innerHeight;
      const top = section.getBoundingClientRect().top + scrollY;
      scrollTo({ top: top + (want / max) * travel, behavior: "smooth" });
    };

    const onResize = () => {
      measure();
      if (!mq.matches) {
        track.style.transform = "";
        cards.forEach((c) => c.style.removeProperty("--s"));
      }
      wake();
    };

    measure();
    render();
    wake();
    addEventListener("scroll", wake, { passive: true });
    addEventListener("resize", onResize);
    grid.addEventListener("focusin", onFocusIn);
    document.fonts?.ready.then(() => {
      measure();
      wake();
    });

    return () => {
      cancelAnimationFrame(frame);
      removeEventListener("scroll", wake);
      removeEventListener("resize", onResize);
      grid.removeEventListener("focusin", onFocusIn);
      section.style.removeProperty("--why-travel");
      track.style.transform = "";
    };
  }, [sectionRef, gridRef, trackRef, thumbRef]);
}
