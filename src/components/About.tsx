"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  ABOUT_HERO_IMAGE,
  APPROACH_IMAGE,
  IDEA_KEYWORDS,
  INDUSTRIES_EYEBROW,
  INDUSTRIES_HEADING,
  INDUSTRIES_INTRO,
  INDUSTRY_CARDS,
  IDEA_TEXT,
  SPACE_EYEBROW,
  SPACE_HEADING,
  SPACE_INTRO,
  SPACE_SLIDES,
  VALUES,
} from "@/data/about";
import { useInView } from "@/hooks/useInView";
import { useScrollVar } from "@/hooks/useScrollVar";
import { cssVars } from "@/lib/css";

/* ---------- 1. Header ---------- */

export function AboutHero() {
  return (
    <section className="ab-hero" aria-labelledby="ab-title">
      <div
        className="ab-hero__visual"
        style={{ backgroundImage: `url(${ABOUT_HERO_IMAGE})` }}
        role="img"
        aria-label="Engineers working at their desks"
      />
      <div className="ab-hero__top">
        <div className="ab-hero__head">
          <p className="ab-eyebrow reveal" style={cssVars({ "--d": 0 })}>
            About Halcer
          </p>
          <h1 id="ab-title" className="headline ab-title">
            <span className="line">
              <span style={cssVars({ "--d": 1 })}>We build the AI layer</span>
            </span>
            <span className="line">
              <span style={cssVars({ "--d": 2 })}>
                enterprises <em>actually run on.</em>
              </span>
            </span>
          </h1>
        </div>
        <p className="lede reveal" style={cssVars({ "--d": 5 })}>
          Halcer is a consulting and engineering firm built for the AI era. We partner with organisations to{" "}
          <strong>design strategy, ship production GenAI,</strong> and leave teams equipped to run it long after
          go-live.
        </p>
      </div>
    </section>
  );
}

/* ---------- 2. Slider: "How we build for <word>" ---------- */

export function AboutSpace() {
  const [index, setIndex] = useState(0);
  const trackRef = useRef<HTMLElement>(null);
  const total = SPACE_SLIDES.length;

  // The card is pinned while the (taller) track scrolls past; scroll progress picks the slide.
  const progress = useCallback((r: DOMRect) => -r.top / (r.height - innerHeight), []);
  useScrollVar(trackRef, progress);
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const p = Math.min(1, Math.max(0, progress(track.getBoundingClientRect())));
      setIndex(Math.min(total - 1, Math.floor(p * total)));
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    addEventListener("scroll", schedule, { passive: true });
    addEventListener("resize", schedule);
    return () => {
      removeEventListener("scroll", schedule);
      removeEventListener("resize", schedule);
      cancelAnimationFrame(frame);
    };
  }, [progress, total]);

  return (
    <section ref={trackRef} className="ab-space-track" style={cssVars({ "--n": total })} aria-label="What we stand for">
      <div className="ab-space">
      <div className="ab-space__copy">
        <p className="ab-eyebrow">{SPACE_EYEBROW}</p>
        <h2 className="ab-space__heading">{SPACE_HEADING}</h2>
        <p className="ab-space__intro">{SPACE_INTRO}</p>

        <div className="ab-space__slides" aria-live="polite">
          {SPACE_SLIDES.map((s, i) => (
            <article
              key={s.title}
              className={i === index ? "is-on" : i < index ? "is-past" : undefined}
              aria-hidden={i !== index}
            >
              <h3 className="ab-space__title">
                <span>{s.title}</span>
              </h3>
              <p className="ab-space__text">{s.text}</p>
              <p className="ab-space__note">{s.note}</p>
            </article>
          ))}
        </div>

        <p className="ab-space__count" aria-hidden="true">
          <span className="ab-space__num">
            {SPACE_SLIDES.map((_, i) => (
              <span key={i} className={i === index ? "is-on" : i < index ? "is-past" : undefined}>
                {String(i + 1).padStart(2, "0")}
              </span>
            ))}
          </span>
          <span className="ab-space__total">/{String(total).padStart(2, "0")}</span>
          <span className="ab-space__bar" />
        </p>
      </div>

      <div className="ab-space__media">
        {SPACE_SLIDES.map((s, i) => (
          <div key={s.image} className={`ab-space__img${i === index ? " is-on" : ""}`} aria-hidden={i !== index}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={s.image} alt="" loading="lazy" />
          </div>
        ))}
      </div>
      </div>
    </section>
  );
}

/* ---------- 3. The idea behind: words light up with scroll ---------- */

export function AboutIdea() {
  const ref = useRef<HTMLElement>(null);
  const words = IDEA_TEXT.split(" ");
  // 0 when the block enters the bottom of the screen, 1 when it reaches ~35% from the top.
  useScrollVar(ref, useCallback((r) => (innerHeight * 0.85 - r.top) / (r.height + innerHeight * 0.1), []));

  return (
    <section ref={ref} className="ab-idea">
      <p className="ab-eyebrow">The idea behind Halcer</p>
      <p className="ab-idea__text" aria-label={IDEA_TEXT}>
        {words.map((w, i) => (
          <span key={i} aria-hidden="true">
            <span
              className={`ab-idea__word${IDEA_KEYWORDS.includes(w.toLowerCase().replace(/[^a-z]/g, "")) ? " is-key" : ""}`}
              style={cssVars({ "--i": i, "--n": words.length })}
            >
              {w}
            </span>{" "}
          </span>
        ))}
      </p>
    </section>
  );
}

/* ---------- 4. Values list with image pills ---------- */

export function AboutValues() {
  const [active, setActive] = useState(0);
  const rows = useRef<(HTMLLIElement | null)[]>([]);

  // Touch screens have no hover: the row crossing the middle of the screen becomes the active one.
  useEffect(() => {
    if (!matchMedia("(hover: none)").matches) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(rows.current.indexOf(e.target as HTMLLIElement));
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );
    rows.current.forEach((r) => r && io.observe(r));
    return () => io.disconnect();
  }, []);

  const [ref, inView] = useInView<HTMLElement>();

  return (
    <section ref={ref} className={`ab-values${inView ? " is-inview" : ""}`} aria-labelledby="ab-values-title">
      <p className="ab-eyebrow" id="ab-values-title">
        Our values
      </p>
      <ul className="ab-values__list" onPointerLeave={(e) => e.pointerType === "mouse" && setActive(-1)}>
        {VALUES.map((v, i) => (
          <li
            key={v.label}
            ref={(el) => {
              rows.current[i] = el;
            }}
            className={i === active ? "is-on" : undefined}
            style={cssVars({ "--i": i })}
            onPointerEnter={(e) => e.pointerType === "mouse" && setActive(i)}
          >
            <h3>{v.label}</h3>
          </li>
        ))}
      </ul>
    </section>
  );
}

/* ---------- 5. Sticky image with parallax + rising columns ---------- */

export function AboutApproach() {
  const ref = useRef<HTMLElement>(null);
  // Section is tall; progress runs while its sticky stage is pinned.
  useScrollVar(ref, useCallback((r) => -r.top / (r.height - innerHeight), []));

  return (
    <section ref={ref} className="ab-approach" aria-labelledby="ab-approach-title">
      <div className="ab-approach__stage">
        <div className="ab-approach__bg" style={{ backgroundImage: `url(${APPROACH_IMAGE})` }} aria-hidden="true" />
        <div className="ab-approach__shade" aria-hidden="true" />
        <h2 id="ab-approach-title" className="ab-approach__title">
          Our considered
          <br />
          <em>approach</em>
        </h2>
        <div className="ab-approach__cols">
          <p>Every programme is shaped around your outcomes, with engineers embedded alongside your teams from the first workshop to the last release.</p>
          <p>The result is AI that is observable, secure and cost-aware, systems your people understand and can own long after we step back.</p>
        </div>
      </div>
    </section>
  );
}

/* ---------- 6. Industry cards ---------- */

export function AboutGallery() {
  const [ref, inView] = useInView<HTMLElement>();
  return (
    <section ref={ref} className={`ab-industries${inView ? " is-inview" : ""}`} aria-labelledby="ab-ind-title">
      <header className="ab-industries__head">
        <p className="ab-eyebrow">{INDUSTRIES_EYEBROW}</p>
        <h2 id="ab-ind-title">{INDUSTRIES_HEADING}</h2>
        <p>{INDUSTRIES_INTRO}</p>
      </header>
      <ul className="ab-gallery">
        {INDUSTRY_CARDS.map((c, i) => (
          <li key={c.title} style={cssVars({ "--i": i })}>
            <article className="ab-card">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={c.image} alt="" loading="lazy" />
              <div className="ab-card__body">
                <h3>{c.title}</h3>
                <p>{c.text}</p>
              </div>
            </article>
          </li>
        ))}
      </ul>
    </section>
  );
}
