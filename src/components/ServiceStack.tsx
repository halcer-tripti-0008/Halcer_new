"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { SERVICES } from "@/data/services";
import { cssVars } from "@/lib/css";

/** Sticky tab bar + stacked service cards. The active tab follows the scroll; a tab click scrolls to its card. */
export function ServiceStack() {
  const [active, setActive] = useState(0);
  const bar = useRef<HTMLDivElement>(null);
  const cards = useRef<(HTMLElement | null)[]>([]);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);

  const offset = () => (bar.current?.offsetHeight ?? 70) + 40;

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const line = offset() + 20;
      let cur = 0;
      cards.current.forEach((c, i) => {
        if (c && c.getBoundingClientRect().top - line <= 0) cur = i;
      });
      setActive(cur);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    addEventListener("scroll", onScroll, { passive: true });
    addEventListener("resize", onScroll);
    return () => {
      removeEventListener("scroll", onScroll);
      removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  // keep the active tab visible when the bar scrolls sideways on phones
  useEffect(() => {
    const t = tabs.current[active];
    const b = bar.current;
    if (t && b && b.scrollWidth > b.clientWidth) b.scrollTo({ left: t.offsetLeft - 16, behavior: "smooth" });
  }, [active]);

  const go = useCallback((i: number) => {
    const c = cards.current[i];
    if (!c) return;
    scrollTo({ top: c.getBoundingClientRect().top + scrollY - offset(), behavior: "smooth" });
  }, []);

  return (
    <section className="sx" aria-label="Services">
      <div className="sx__bar" ref={bar} role="tablist">
        {SERVICES.map((s, i) => (
          <button
            key={s.id}
            ref={(el) => {
              tabs.current[i] = el;
            }}
            role="tab"
            type="button"
            aria-selected={i === active}
            className={`sx__tab${i === active ? " is-on" : ""}`}
            onClick={() => go(i)}
          >
            {s.tab}
          </button>
        ))}
      </div>

      <div className="sx__list">
        {SERVICES.map((s, i) => (
          <article
            key={s.id}
            id={s.id}
            ref={(el) => {
              cards.current[i] = el;
            }}
            className={`sx__card sx__card--${s.tone} reveal${i === active ? " is-active" : ""}`}
            style={cssVars({ "--d": 0 })}
          >
            <div className="sx__copy">
              <h2>{s.title}</h2>
              <div className="sx__body">
                <p>{s.text}</p>
                <p className="sx__bullets">{s.bullets.join(" • ")}</p>
                <Link href={`/services/${s.id}`} className="sx__more">
                  Explore this service
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M5 12h13M13 6l6 6-6 6" />
                  </svg>
                </Link>
              </div>
            </div>
            <div className="sx__img">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={s.image} alt="" style={s.focus ? { objectPosition: s.focus } : undefined} />
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
