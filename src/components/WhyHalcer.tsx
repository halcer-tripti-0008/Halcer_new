"use client";

import { useRef, useState, type ReactNode } from "react";
import { useInView } from "@/hooks/useInView";
import { useScrollRule } from "@/hooks/useScrollRule";
import { cssVars } from "@/lib/css";

interface WhyCard {
  icon: ReactNode;
  photo: string;
  blue?: boolean;
  wide?: boolean;
  /** Big headline + caption (blue cards) or a plain sentence. */
  big?: string;
  caption?: string;
  text?: string;
}

const row3: WhyCard[] = [
  {
    blue: true,
    big: "End-to-end",
    caption: "Trusted partner for the AI era",
    photo: "industries/banking",
    icon: (
      <>
        <rect x="3.5" y="3.5" width="17" height="17" rx="2" />
        <path d="M8 15.5l2.2-7h.6l2.2 7M8.7 13.3h3.6M16 8.5v7" />
      </>
    ),
  },
  {
    text: "Local expertise, with global scale",
    photo: "industries/industrial",
    icon: (
      <>
        <circle cx="12" cy="12" r="8.5" />
        <path d="M3.5 12h17M12 3.5c2.4 2.4 3.6 5.2 3.6 8.5s-1.2 6.1-3.6 8.5c-2.4-2.4-3.6-5.2-3.6-8.5S9.6 5.9 12 3.5z" />
      </>
    ),
  },
  {
    blue: true,
    big: "AI-powered",
    caption: "Solutions & accelerators",
    photo: "industries/software",
    icon: <path d="M12 3v18M3 12h18M5.6 5.6l12.8 12.8M18.4 5.6L5.6 18.4" />,
  },
];

const row2: WhyCard[] = [
  {
    wide: true,
    text: "Knowledge-obsessed digital leaders: innovators, thought leaders and active open-source contributors, driven to be the authority in the markets we serve",
    photo: "who/who-photo",
    icon: (
      <>
        <path d="M6 3.5h9.5L19 7v13.5H6z" />
        <path d="M9 9h7M9 12h7M9 15h3.5M13.5 17.5l1.6 1.6 3.2-3.4" />
      </>
    ),
  },
  {
    wide: true,
    text: "AI-driven solutions and accelerators that help you achieve your business goals faster and more effectively",
    photo: "projects/card",
    icon: (
      <>
        <path d="M4 17l5.5-5.5 3.5 3.5L20 8" />
        <path d="M14.5 8H20v5.5" />
      </>
    ),
  },
];

/** One row of expanding cards: the card under the pointer (or focused) becomes the active, wide one. */
function WhyRow({ cards, variant, firstIndex }: { cards: WhyCard[]; variant: "3" | "2"; firstIndex: number }) {
  const [active, setActive] = useState(0);

  return (
    <ul className={`why__row why__row--${variant}`} data-active={active}>
      {cards.map((card, i) => {
        const classes = ["why__card", card.blue && "why__card--blue", card.wide && "why__card--wide", i === active && "is-active"]
          .filter(Boolean)
          .join(" ");
        return (
          <li
            key={card.photo}
            className={classes}
            style={cssVars({ "--n": firstIndex + i })}
            tabIndex={0}
            onPointerEnter={() => setActive(i)}
            onFocus={() => setActive(i)}
          >
            <svg className="why__icon" viewBox="0 0 24 24" aria-hidden="true">
              {card.icon}
            </svg>
            <span className="why__go" aria-hidden="true">
              <svg viewBox="0 0 24 24">
                <path d="M7 17L17 7M8 7h9v9" />
              </svg>
            </span>
            {card.big ? (
              <div className="why__body">
                <strong className="why__big">{card.big}</strong>
                <span className="why__caption">{card.caption}</span>
              </div>
            ) : (
              <p className="why__body why__text">{card.text}</p>
            )}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="why__photo"
              src={`/assets/images/${card.photo}.jpg`}
              alt=""
              aria-hidden="true"
              loading="lazy"
              decoding="async"
            />
          </li>
        );
      })}
    </ul>
  );
}

export function WhyHalcer() {
  const [ref, inView] = useInView<HTMLElement>();
  const headRef = useRef<HTMLElement>(null);
  useScrollRule(headRef);

  return (
    <section ref={ref} className={`why${inView ? " is-inview" : ""}`} id="why" aria-labelledby="why-title">
      <div className="why__inner">
        <header className="why__head" ref={headRef}>
          <h2 className="why__label" id="why-title">
            <span className="why__line">Why</span>
            <span className="why__line why__line--last">
              <span className="why__outline">Halcer ?</span>
            </span>
          </h2>
          <p className="why__intro">
            Halcer is a trusted partner, delivering seamless value across strategy, execution, and ongoing enablement.
            With deep experience across industries and teams that work across regions, we bring domain knowledge, global
            best practices, and local insights to every engagement.
          </p>
        </header>

        <div className="why__grid">
          <WhyRow cards={row3} variant="3" firstIndex={0} />
          <WhyRow cards={row2} variant="2" firstIndex={3} />
        </div>
      </div>
    </section>
  );
}
