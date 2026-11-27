import type { Metadata } from "next";
import Link from "next/link";
import { Cursor } from "@/components/Cursor";
import { Footer } from "@/components/Footer";
import { PageEffects } from "@/components/PageEffects";
import { ServiceStack } from "@/components/ServiceStack";
import { SiteHeader } from "@/components/SiteHeader";
import { CLIENTS } from "@/data/clients";
import { DOMAINS, DOMAINS_HEAD, SERVICES_FOOT, SERVICES_HERO } from "@/data/services";
import { cssVars } from "@/lib/css";
import "./services.css";

export const metadata: Metadata = {
  title: "Services — Halcer",
  description: "Architecture, engineering and delivery composed as one practice.",
};

export default function ServicesPage() {
  const h = SERVICES_HERO;
  const logos = CLIENTS.filter((c) => c.ratio < 6 && c.ratio > 1);
  return (
    <>
      <SiteHeader active="Services" />
      <main className="services">
        <section className="sv-hero">
          <div className="sv-hero__art" aria-hidden="true">
            <i />
            <i />
            <i />
          </div>
          <div className="sv-hero__copy">
            <h1 className="reveal" style={cssVars({ "--d": 0 })}>
              {h.title} <em>{h.accent}</em>
            </h1>
            <p className="reveal" style={cssVars({ "--d": 1 })}>
              {h.lede}
            </p>
            <Link href="/contact" className="sv-cta reveal" style={cssVars({ "--d": 2 })} data-magnetic>
              {h.cta}
            </Link>
          </div>
          <div className="sv-logos reveal" style={cssVars({ "--d": 3 })} aria-label="Clients">
            <ul>
              {[...logos, ...logos].map((c, i) => (
                <li key={`${c.file}-${i}`} aria-hidden={i >= logos.length}>
                  <span
                    role="img"
                    aria-label={c.name}
                    style={cssVars({
                      "--logo": `url('/assets/logos/${c.file}')`,
                      "--ar": c.ratio,
                      "--w": Math.sqrt(c.ratio).toFixed(3),
                    })}
                  />
                </li>
              ))}
            </ul>
          </div>
        </section>

        <div className="sv-light">
          <ServiceStack />
        </div>

        <section className="sv-domains" aria-labelledby="sv-domains-title">
          <header className="sv-domains__head reveal">
            <div>
              <p className="sv-domains__eyebrow">{DOMAINS_HEAD.eyebrow}</p>
              <h2 id="sv-domains-title">
                {DOMAINS_HEAD.title} <em>{DOMAINS_HEAD.accent}</em>
              </h2>
            </div>
            <p>{DOMAINS_HEAD.text}</p>
          </header>
          <ul className="sv-domains__grid">
            {DOMAINS.map((d, i) => (
              <li key={d.n} className="sv-dom reveal" style={cssVars({ "--d": i % 3 })}>
                <span className="sv-dom__n">{d.n}</span>
                <span className="sv-dom__big" aria-hidden="true">
                  {d.n}
                </span>
                <span className="sv-dom__plus" aria-hidden="true" />
                <h3>{d.title}</h3>
                <ul className="sv-dom__tags">
                  {d.tags.map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </section>

        <div className="sv-light sv-light--tail">
          <section className="sv-foot" aria-label="Get in touch">
            {[
              { ...SERVICES_FOOT.talk, cls: "sv-tile--talk", style: cssVars({ "--d": 0 }) },
              {
                ...SERVICES_FOOT.team,
                cls: "sv-tile--photo",
                style: cssVars({ "--d": 1, "--photo": `url(${SERVICES_FOOT.team.image})` }),
              },
            ].map((t) => (
              <Link key={t.title} href={t.href} className={`sv-tile ${t.cls} reveal`} style={t.style}>
                <span className="sv-tile__row">
                  <span className="sv-tile__title">{t.title}</span>
                  <span className="sv-tile__go" aria-hidden="true">
                    <svg viewBox="0 0 24 24">
                      <path d="M7 17L17 7M9 7h8v8" />
                    </svg>
                  </span>
                </span>
              </Link>
            ))}
          </section>
        </div>
      </main>
      <Footer />
      <Cursor />
      <PageEffects />
    </>
  );
}
