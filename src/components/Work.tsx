"use client";

import { useInView } from "@/hooks/useInView";
import { cssVars } from "@/lib/css";

type Proximity = "is-far" | "is-near" | "is-active";

const CAPABILITIES: { label: string; state: Proximity; weight: number }[] = [
  { label: "Cloud Platforms", state: "is-far", weight: 0 },
  { label: "AI Strategy", state: "is-far", weight: 0 },
  { label: "Consulting", state: "is-near", weight: 1 },
  { label: "Engineering", state: "is-active", weight: 2 },
  { label: "Training", state: "is-near", weight: 3 },
  { label: "Responsible AI", state: "is-far", weight: 4 },
  { label: "Data Security", state: "is-far", weight: 4 },
];

/** Project showcase: a bento grid of tiles. */
export function Work() {
  const [ref, inView] = useInView<HTMLElement>();

  return (
    <section ref={ref} className={`work${inView ? " is-inview" : ""}`} id="work" aria-labelledby="work-title">
      <h2 className="work__title" id="work-title">
        <span className="line">
          <span>Our</span>
        </span>
        <span className="line line--last">
          <span>
            <span className="work__outline">Projects</span>
          </span>
        </span>
      </h2>

      <div className="work__frame">
        <div className="work__grid">
          {/* Logo glyph on its construction grid (redrawn as SVG) */}
          <div className="work__tile work__tile--mark" style={cssVars({ "--i": 0 })}>
            <svg className="work__logo work__fade" viewBox="0 0 660 530" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
              <path
                className="work__logo-grid"
                d="M141 0V530M221 0V530M440 0V530M518 0V530M0 74H660M0 153H660M0 295H660M0 376H660M0 455H660M0 130L400 530"
              />
              <g className="work__logo-glyph">
                <path
                  fillRule="evenodd"
                  d="M221 90Q221 75 236 75H410L495 144Q517 160 517 186V284Q517 296 505 296H453Q441 296 441 308V360Q441 375 426 375H258L154 284Q148 278 148 268V170Q148 153 165 153H206Q221 153 221 138ZM233 155H426Q438 155 438 167V281Q438 293 426 293H233Q221 293 221 281V167Q221 155 233 155Z"
                />
                <rect x="441" y="377" width="76" height="76" rx="14" />
              </g>
            </svg>
          </div>

          {/* Hero photo */}
          <div className="work__tile work__tile--photo" style={cssVars({ "--i": 2 })}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="work__fade"
              src="/assets/images/projects/photo.jpg"
              alt="Robotic arm on a production line"
              width={1429}
              height={882}
              loading="lazy"
              decoding="async"
            />
          </div>

          {/* Blue tile with tilted card stack */}
          <div className="work__tile work__tile--card" style={cssVars({ "--i": 1 })}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="work__back"
              src="/assets/images/projects/back.jpg"
              alt=""
              aria-hidden="true"
              width={598}
              height={772}
              loading="lazy"
              decoding="async"
            />
            <article className="work__card">
              <div className="work__card-media work__fade">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/assets/images/projects/card.jpg"
                  alt="Precision machine working on a circuit board"
                  width={746}
                  height={559}
                  loading="lazy"
                  decoding="async"
                />
                <span className="work__toggle" aria-hidden="true">
                  <b>Live</b>
                  <span>History</span>
                </span>
              </div>
              <div className="work__card-body work__fade">
                <h3>
                  Be AI-First and <em>Future-Ready</em>
                </h3>
                <p>We collaborate with clients and partners to accelerate innovation and deliver operational excellence.</p>
              </div>
            </article>
          </div>

          {/* Capability list */}
          <div className="work__tile work__tile--list" style={cssVars({ "--i": 3 })}>
            <ul className="work__list">
              {CAPABILITIES.map(({ label, state, weight }) => (
                <li key={label} className={state} style={cssVars({ "--w": weight })}>
                  {label}
                  {state === "is-active" && (
                    <svg viewBox="0 0 32 32" aria-hidden="true">
                      <path d="M9 22.5h-.5a6 6 0 0 1-.9-11.93A8 8 0 0 1 23.4 9.6 6.5 6.5 0 0 1 24 22.5h-1" />
                      <circle cx="16" cy="21" r="2.6" />
                      <path d="M16 15.6v1.8M16 24.6v1.8M10.6 21h1.8M19.6 21h1.8M12.2 17.2l1.3 1.3M18.5 23.5l1.3 1.3M12.2 24.8l1.3-1.3M18.5 18.5l1.3-1.3" />
                    </svg>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Tagline */}
          <div className="work__tile work__tile--brand" style={cssVars({ "--i": 4 })}>
            <p className="work__brand work__fade">
              <span>AI-first.</span>
              <span className="work__brand-accent">Future-ready.</span>
            </p>
          </div>

          {/* Typeface card stack */}
          <div className="work__tile work__tile--font" style={cssVars({ "--i": 5 })}>
            <span className="work__band" aria-hidden="true" />
            <div className="work__strip work__fade">
              <span>FONT</span>
              <strong>
                <em>Manrope</em>
              </strong>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
