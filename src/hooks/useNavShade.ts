"use client";

import { useEffect, type RefObject } from "react";

const MOBILE = "(max-width: 900px)";

/** Parses "rgb(a)" strings; returns null when the colour is transparent or unreadable. */
function opaqueLuminance(color: string): number | null {
  const m = color.match(/rgba?\(([^)]+)\)/);
  if (!m) return null;
  const [r, g, b, a = 1] = m[1]
    .split(/[ ,/]+/)
    .filter(Boolean)
    .map(parseFloat);
  if (!(a > 0.5)) return null;
  return (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
}

/**
 * Phones and tablets only: the sticky nav bar switches between a dark and a light style depending on
 * what is behind it while scrolling. It looks at the page element under the bar, walks up to the first
 * element with a solid background and sets `data-shade="light" | "dark"` on the header.
 */
export function useNavShade(navRef: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;
    const mq = matchMedia(MOBILE);
    let frame = 0;

    const update = () => {
      frame = 0;
      if (!mq.matches) {
        nav.removeAttribute("data-shade");
        return;
      }
      const box = nav.getBoundingClientRect();
      const x = innerWidth / 2;
      const y = box.top + box.height / 2;
      const stack = document
        .elementsFromPoint(x, y)
        .filter((el) => !nav.contains(el) && el !== nav);
      let shade = "dark";
      outer: for (const el of stack) {
        for (let node: Element | null = el; node; node = node.parentElement) {
          const lum = opaqueLuminance(getComputedStyle(node).backgroundColor);
          if (lum !== null) {
            shade = lum > 0.55 ? "light" : "dark";
            break outer;
          }
        }
      }
      if (nav.dataset.shade !== shade) nav.dataset.shade = shade;
    };

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    schedule();
    addEventListener("scroll", schedule, { passive: true });
    addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(frame);
      removeEventListener("scroll", schedule);
      removeEventListener("resize", schedule);
      nav.removeAttribute("data-shade");
    };
  }, [navRef]);
}
