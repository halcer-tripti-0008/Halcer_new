"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { NAV_LINKS } from "@/data/footer";
import { cssVars } from "@/lib/css";
import { Roll } from "./Roll";

const ACTIVE = 0;

/** Primary navigation with a pill that slides under the hovered/focused link and back to the active one. */
export function NavLinks() {
  const [hover, setHover] = useState<number | null>(null);
  const linkRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const indicatorRef = useRef<HTMLSpanElement>(null);

  const place = useCallback((index: number) => {
    const link = linkRefs.current[index];
    const indicator = indicatorRef.current;
    if (!link || !indicator) return;
    indicator.style.width = `${link.offsetWidth}px`;
    indicator.style.transform = `translateX(${link.offsetLeft}px)`;
  }, []);

  const current = hover ?? ACTIVE;
  useLayoutEffect(() => place(current), [current, place]);

  useEffect(() => {
    const refresh = () => place(hover ?? ACTIVE);
    document.fonts?.ready.then(refresh);
    addEventListener("resize", refresh);
    return () => removeEventListener("resize", refresh);
  }, [hover, place]);

  const away = hover !== null && hover !== ACTIVE;

  return (
    <nav
      className={`nav-links reveal${away ? " is-hovering" : ""}`}
      aria-label="Primary navigation"
      style={cssVars({ "--d": 1 })}
      onPointerLeave={() => setHover(null)}
    >
      <span className="nav-links__indicator" ref={indicatorRef} aria-hidden="true" />
      {NAV_LINKS.map((label, i) => {
        const classes = [i === ACTIVE && !away ? "is-active" : "", away && hover === i ? "is-hover" : ""]
          .filter(Boolean)
          .join(" ");
        return (
          <a
            key={label}
            href="#"
            ref={(el) => {
              linkRefs.current[i] = el;
            }}
            className={classes || undefined}
            aria-current={i === ACTIVE ? "page" : undefined}
            onPointerEnter={() => setHover(i)}
            onFocus={() => setHover(i)}
          >
            <Roll>{label}</Roll>
          </a>
        );
      })}
    </nav>
  );
}
