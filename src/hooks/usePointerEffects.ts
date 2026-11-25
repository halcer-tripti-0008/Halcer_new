"use client";

import { useEffect, useState, type RefObject } from "react";
import { prefersReducedMotion } from "@/lib/css";

const EASE = "cubic-bezier(0.19, 1, 0.22, 1)";

/**
 * Custom cursor that follows the pointer (grows over links/buttons, shows a label on [data-cursor]) and the
 * magnetic pull on every [data-magnetic] element. Returns false when the device has no fine pointer or
 * reduced motion is on, so the caller can drop the cursor element.
 */
export function usePointerEffects(
  cursorRef: RefObject<HTMLDivElement | null>,
  textRef: RefObject<HTMLSpanElement | null>,
): boolean {
  const [enabled, setEnabled] = useState(true);

  useEffect(() => {
    const cursor = cursorRef.current;
    const fine = matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (!cursor || !fine || prefersReducedMotion()) {
      setEnabled(false);
      return;
    }

    const pos = { x: innerWidth / 2, y: innerHeight / 2 };
    const target = { ...pos };
    let frame = 0;

    const onMove = (e: PointerEvent) => {
      target.x = e.clientX;
      target.y = e.clientY;
      cursor.classList.remove("is-hidden");
    };
    const onLeave = () => cursor.classList.add("is-hidden");
    const onOver = (e: PointerEvent) => {
      const el = e.target as Element | null;
      const labelled = el?.closest<HTMLElement>("[data-cursor]");
      const interactive = el?.closest("a, button");
      cursor.classList.toggle("has-text", !!labelled);
      cursor.classList.toggle("is-hover", !!interactive && !labelled);
      if (labelled && textRef.current) textRef.current.textContent = labelled.dataset.cursor ?? "";
    };
    addEventListener("pointermove", onMove);
    document.addEventListener("pointerleave", onLeave);
    document.addEventListener("pointerover", onOver);

    // Magnetic pull: the element drifts toward the pointer, its content a little more.
    const cleanups: Array<() => void> = [];
    document.querySelectorAll<HTMLElement>("[data-magnetic]").forEach((el) => {
      const inner = el.querySelector<HTMLElement>(".roll, svg, .brand-mark");
      const strength = el.classList.contains("btn") ? 0.28 : 0.38;

      const move = (e: PointerEvent) => {
        const r = el.getBoundingClientRect();
        const dx = e.clientX - (r.left + r.width / 2);
        const dy = e.clientY - (r.top + r.height / 2);
        el.style.transition = `transform 0.3s ${EASE}`;
        el.style.transform = `translate3d(${dx * strength}px, ${dy * strength}px, 0)`;
        if (inner) inner.style.transform = `translate3d(${dx * 0.12}px, ${dy * 0.12}px, 0)`;
      };
      const leave = () => {
        el.style.transition = `transform 0.9s ${EASE}`;
        el.style.transform = "";
        if (inner) {
          inner.style.transition = `transform 0.9s ${EASE}`;
          inner.style.transform = "";
        }
      };
      el.addEventListener("pointermove", move);
      el.addEventListener("pointerleave", leave);
      cleanups.push(() => {
        el.removeEventListener("pointermove", move);
        el.removeEventListener("pointerleave", leave);
      });
    });

    const tick = () => {
      pos.x += (target.x - pos.x) * 0.2;
      pos.y += (target.y - pos.y) * 0.2;
      cursor.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0)`;
      frame = requestAnimationFrame(tick);
    };
    tick();

    return () => {
      cancelAnimationFrame(frame);
      removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
      document.removeEventListener("pointerover", onOver);
      cleanups.forEach((fn) => fn());
    };
  }, [cursorRef, textRef]);

  return enabled;
}
