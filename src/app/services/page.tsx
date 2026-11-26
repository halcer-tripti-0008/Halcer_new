import type { Metadata } from "next";
import Link from "next/link";
import { Cursor } from "@/components/Cursor";
import { Footer } from "@/components/Footer";
import { PageEffects } from "@/components/PageEffects";
import { SiteHeader } from "@/components/SiteHeader";
import {
  DOMAINS,
  DOMAINS_HEAD,
  ENGAGE,
  SERVICES_CTA,
  SERVICES_HERO,
  SERVICE_LINES,
  type ServiceLine,
} from "@/data/services";
import { cssVars } from "@/lib/css";
import "./services.css";

export const metadata: Metadata = {
  title: "Services — Halcer",
  description: "Architecture, engineering and delivery composed as one practice.",
};

const Arrow = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M5 12h13M13 6l6 6-6 6" />
  </svg>
);
const Chevron = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M9 6l6 6-6 6" />
  </svg>
);

const ICONS: Record<ServiceLine["icon"], React.ReactNode> = {
  spark: <path d="M13 3L5 13h6l-1 8 8-10h-6l1-8z" />,
  code: <path d="M8 7l-5 5 5 5M16 7l5 5-5 5M14 5l-4 14" />,
  shield: <path d="M12 21s-8-5-8-11V6l8-3 8 3v4c0 6-8 11-8 11z" />,
  box: <path d="M5 11h14v10H5zM8 11V8a4 4 0 0 1 8 0v3" />,
};

export default function ServicesPage() {
  const h = SERVICES_HERO;
  return (
    <>
      <SiteHeader active="Services" />
      <main className="services">
        {/* 1. Hero */}
        <section className="sv-hero">
          <div className="sv-hero__copy">
            <p className="sv-eyebrow reveal" style={cssVars({ "--d": 0 })}>
              {h.eyebrow}
            </p>
            <h1 className="sv-hero__title reveal" style={cssVars({ "--d": 1 })}>
              {h.title.map((l) => (
                <span key={l}>{l} </span>
              ))}
              <em>{h.accent}</em>
            </h1>
            <p className="sv-hero__lede reveal" style={cssVars({ "--d": 2 })}>
              {h.lede}
            </p>
            <ul className="sv-steps reveal" style={cssVars({ "--d": 3 })} aria-label="How we work">
              {h.steps.map((s, i) => (
                <li key={s}>
                  <span>{s}</span>
                  {i < h.steps.length - 1 && <i aria-hidden="true">→</i>}
                </li>
              ))}
            </ul>
            <div className="sv-hero__actions reveal" style={cssVars({ "--d": 4 })}>
              <Link href="/contact" className="sv-btn sv-btn--light">
                <span>{h.cta}</span>
                <b>
                  <Arrow />
                </b>
              </Link>
              <a href="#engage" className="sv-textlink">
                {h.link}
                <i aria-hidden="true" />
              </a>
            </div>
          </div>

          <aside className="sv-index reveal" style={cssVars({ "--d": 3 })} aria-label="Service index">
            <p className="sv-index__head">
              <span>Service index</span>
              <span>{String(SERVICE_LINES.length).padStart(2, "0")}</span>
            </p>
            <ul>
              {SERVICE_LINES.map((s) => (
                <li key={s.n}>
                  <a href="#engage">
                    <span>{s.n}</span>
                    <span>{s.title}</span>
                    <Chevron />
                  </a>
                </li>
              ))}
            </ul>
          </aside>
        </section>

        {/* 2. How we engage (light) */}
        <section className="sv-engage" id="engage">
          <header className="sv-head sv-head--light reveal">
            <div>
              <p className="sv-eyebrow">{ENGAGE.eyebrow}</p>
              <h2>
                {ENGAGE.title} <em>{ENGAGE.accent}</em>
              </h2>
            </div>
            <p>{ENGAGE.text}</p>
          </header>
          <ul className="sv-lines">
            {SERVICE_LINES.map((s) => (
              <li key={s.n} className="sv-line reveal">
                <div className="sv-line__no">
                  <span>{s.n}</span>
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    {ICONS[s.icon]}
                  </svg>
                </div>
                <div className="sv-line__main">
                  <h3>{s.title}</h3>
                  <ul className="sv-tags">
                    {s.tags.map((t) => (
                      <li key={t}>{t}</li>
                    ))}
                  </ul>
                </div>
                <div className="sv-line__side">
                  <p>{s.text}</p>
                  <Link href="/contact" className="sv-explore">
                    Explore this service <Arrow />
                  </Link>
                </div>
                <Link href="/contact" className="sv-circle" aria-label={`Explore ${s.title}`}>
                  <Arrow />
                </Link>
              </li>
            ))}
          </ul>
        </section>

        {/* 3. Domains (dark) */}
        <section className="sv-domains">
          <header className="sv-head reveal">
            <div>
              <p className="sv-eyebrow">{DOMAINS_HEAD.eyebrow}</p>
              <h2>
                {DOMAINS_HEAD.title} <em>{DOMAINS_HEAD.accent}</em>
              </h2>
            </div>
            <p>{DOMAINS_HEAD.text}</p>
          </header>
          <ul className="sv-cards">
            {DOMAINS.map((d, i) => (
              <li key={d.n} className="sv-card reveal" style={cssVars({ "--d": i % 3 })}>
                <h3>{d.title}</h3>
                <ul className="sv-tags sv-tags--dark">
                  {d.tags.map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </section>

        {/* 4. CTA */}
        <section className="sv-cta">
          <p className="sv-eyebrow reveal">{SERVICES_CTA.eyebrow}</p>
          <h2 className="reveal" style={cssVars({ "--d": 1 })}>
            {SERVICES_CTA.title} <em>{SERVICES_CTA.accent}</em>
          </h2>
          <p className="sv-cta__text reveal" style={cssVars({ "--d": 2 })}>
            {SERVICES_CTA.text}
          </p>
          <div className="sv-hero__actions sv-cta__actions reveal" style={cssVars({ "--d": 3 })}>
            <Link href="/contact" className="sv-btn sv-btn--blue">
              <span>{SERVICES_CTA.button}</span>
              <b>
                <Arrow />
              </b>
            </Link>
            <a href={`mailto:${SERVICES_CTA.email}`} className="sv-mail">
              {SERVICES_CTA.email}
              <i aria-hidden="true" />
            </a>
          </div>
        </section>
      </main>
      <Footer />
      <Cursor />
      <PageEffects />
    </>
  );
}
