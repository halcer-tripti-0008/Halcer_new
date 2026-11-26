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


/** Average brightness (0..1) of an image, cached by URL. Returns null until the image has been measured. */
const imageLum = new Map<string, number | null>();
function imageLuminance(src: string, onReady: () => void): number | null {
  if (imageLum.has(src)) return imageLum.get(src) ?? null;
  imageLum.set(src, null);
  const img = new Image();
  img.onload = () => {
    try {
      const size = 16;
      const canvas = document.createElement("canvas");
      canvas.width = canvas.height = size;
      const ctx = canvas.getContext("2d", { willReadFrequently: true });
      if (!ctx) return;
      ctx.drawImage(img, 0, 0, size, size);
      const d = ctx.getImageData(0, 0, size, size).data;
      let sum = 0;
      for (let i = 0; i < d.length; i += 4) sum += 0.2126 * d[i] + 0.7152 * d[i + 1] + 0.0722 * d[i + 2];
      imageLum.set(src, sum / (d.length / 4) / 255);
      onReady();
    } catch {
      /* tainted canvas: keep the default shade */
    }
  };
  img.src = src;
  return null;
}

/** Photo behind a point: an <img>, or a CSS background-image, but only inside [data-nav-image] areas. */
function photoSource(el: Element): string | null {
  if (!el.closest("[data-nav-image]")) return null;
  if (el instanceof HTMLImageElement) return el.currentSrc || el.src;
  const m = getComputedStyle(el).backgroundImage.match(/url\(["']?([^"')]+)["']?\)/);
  return m ? m[1] : null;
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
        const photo = photoSource(el);
        if (photo) {
          const lum = imageLuminance(photo, schedule);
          if (lum !== null) {
            shade = lum > 0.55 ? "light" : "dark";
            break outer;
          }
        }
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
