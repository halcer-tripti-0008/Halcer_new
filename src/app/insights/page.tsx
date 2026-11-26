import type { Metadata } from "next";
import Link from "next/link";
import { Cursor } from "@/components/Cursor";
import { Footer } from "@/components/Footer";
import { PageEffects } from "@/components/PageEffects";
import { SiteHeader } from "@/components/SiteHeader";
import { BRIEFS, DESK, INSIGHTS_HERO, LEAD_STORY, OUTLOOK } from "@/data/insights";
import { cssVars } from "@/lib/css";
import "./insights.css";

export const metadata: Metadata = {
  title: "Insights — Halcer",
  description: "Client stories and industry briefs from AI and GenAI programmes that have to ship.",
};

const Arrow = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M5 12h13M13 6l6 6-6 6" />
  </svg>
);

export default function InsightsPage() {
  const h = INSIGHTS_HERO;
  return (
    <>
      <SiteHeader active="Insights" />
      <main className="insights" data-nav-image>
        <section className="in-hero">
          <p className="in-eyebrow reveal" style={cssVars({ "--d": 0 })}>
            <span>{h.eyebrow}</span>
            <i />
            <span className="in-eyebrow__muted">{h.volume}</span>
          </p>
          <h1 className="in-hero__title reveal" style={cssVars({ "--d": 1 })}>
            {h.title}
          </h1>
          <p className="in-hero__lede reveal" style={cssVars({ "--d": 2 })}>
            {h.lede}
          </p>
          <div className="in-hero__meta reveal" style={cssVars({ "--d": 3 })}>
            {h.meta.map((m) => (
              <span key={m}>{m}</span>
            ))}
            <a href="#recent">
              Jump to recent <Arrow />
            </a>
          </div>
        </section>

        <section className="in-desk" id="recent">
          <header className="in-desk__head reveal">
            <div>
              <p className="in-eyebrow in-eyebrow--dark">
                <span>{DESK.eyebrow}</span>
              </p>
              <h2>{DESK.heading}</h2>
            </div>
            <p>{DESK.note}</p>
          </header>

          <Link href="#" className="in-lead reveal">
            <span className="in-lead__bg" style={{ backgroundImage: `url(${LEAD_STORY.image})` }} aria-hidden="true" />
            <div className="in-lead__body">
              <p className="in-lead__tags">
                <b>{LEAD_STORY.tag}</b>
                <i />
                <span>{LEAD_STORY.section}</span>
              </p>
              <p className="in-mono">
                {LEAD_STORY.kind} / {LEAD_STORY.date} / {LEAD_STORY.read}
              </p>
              <h3>{LEAD_STORY.title}</h3>
              <p className="in-lead__text">{LEAD_STORY.text}</p>
              <span className="in-read in-read--light">
                {LEAD_STORY.cta} <Arrow />
              </span>
            </div>
          </Link>

          <div className="in-briefs">
            {BRIEFS.map((b, i) => (
              <article key={b.n} className={`in-brief reveal${i % 2 ? " is-flip" : ""}`}>
                <Link href="#" className="in-brief__img" tabIndex={-1} aria-hidden="true">
                  <span className="in-brief__pic" style={{ backgroundImage: `url(${b.image})` }} />
                </Link>
                <div className="in-brief__body">
                  <p className="in-mono">
                    {b.kind} / {b.date} / {b.read}
                  </p>
                  {b.topic && <p className="in-brief__topic">{b.topic}</p>}
                  <h3>{b.title}</h3>
                  {b.text && <p className="in-brief__text">{b.text}</p>}
                  <Link href="#" className="in-read">
                    {b.cta} <Arrow />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="in-outlook">
          <div className="in-outlook__copy reveal">
            <p className="in-eyebrow">
              <span>{OUTLOOK.eyebrow}</span>
            </p>
            <h2>{OUTLOOK.title}</h2>
            <p>{OUTLOOK.text}</p>
            <blockquote>{OUTLOOK.quote}</blockquote>
            <a href="mailto:hello@halcer.com?subject=Request%20the%20Outlook%202026%20briefing" className="in-cta">
              {OUTLOOK.cta} <Arrow />
            </a>
          </div>
          <div className="in-outlook__img reveal">
            <span style={{ backgroundImage: `url(${OUTLOOK.image})` }} />
          </div>
        </section>
      </main>
      <Footer />
      <Cursor />
      <PageEffects />
    </>
  );
}
