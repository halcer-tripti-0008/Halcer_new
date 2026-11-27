import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Cursor } from "@/components/Cursor";
import { Footer } from "@/components/Footer";
import { PageEffects } from "@/components/PageEffects";
import { SiteHeader } from "@/components/SiteHeader";
import { SERVICE_PAGES, getServicePage } from "@/data/service-pages";
import { SERVICES } from "@/data/services";
import { cssVars } from "@/lib/css";
import "../services.css";
import "./detail.css";

export function generateStaticParams() {
  return SERVICE_PAGES.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const page = getServicePage((await params).slug);
  return page ? { title: `${page.name} — Halcer Services`, description: page.lede } : {};
}

const Arrow = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M5 12h13M13 6l6 6-6 6" />
  </svg>
);
const num = (i: number) => String(i + 1).padStart(2, "0");

export default async function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const page = getServicePage((await params).slug);
  if (!page) notFound();
  const others = SERVICES.filter((s) => s.id !== page.slug);

  return (
    <>
      <SiteHeader active="Services" />
      <main className="services sd">
        {/* Hero */}
        <section className="sd-hero">
          <div className="sd-hero__art" aria-hidden="true">
            <i />
            <i />
          </div>
          <nav className="sd-crumb reveal" aria-label="Breadcrumb">
            <Link href="/services">Services</Link>
            <span aria-hidden="true">/</span>
            <span>{page.name}</span>
          </nav>
          <h1 className="reveal" style={cssVars({ "--d": 1 })}>
            {page.title}
          </h1>
          <p className="sd-hero__lede reveal" style={cssVars({ "--d": 2 })}>
            {page.lede}
          </p>
          <Link href="/contact" className="sv-cta reveal" style={cssVars({ "--d": 3 })} data-magnetic>
            Speak with a specialist
          </Link>
          <dl className="sd-meta reveal" style={cssVars({ "--d": 4 })}>
            {page.meta.map((m) => (
              <div key={m.label}>
                <dt>{m.label}</dt>
                <dd>{m.value}</dd>
              </div>
            ))}
          </dl>
        </section>

        {/* What this covers */}
        <section className="sd-light sd-cover">
          <header className="sd-head reveal">
            <div>
              <p className="sd-eyebrow">What this covers</p>
              <h2>
                {page.coverHead[0]} <em>{page.coverHead[1]}</em>
              </h2>
            </div>
            <p>{page.coverIntro}</p>
          </header>
          <ul className="sd-caps">
            {page.capabilities.map((c, i) => (
              <li key={c.title} className="sd-cap reveal" style={cssVars({ "--d": i % 3 })}>
                <span className="sd-cap__n">{num(i)}</span>
                <h3>{c.title}</h3>
                <p>{c.text}</p>
              </li>
            ))}
          </ul>
        </section>

        {/* In practice */}
        <section className="sd-quote">
          <p className="sd-eyebrow reveal">In practice</p>
          <blockquote className="reveal" style={cssVars({ "--d": 1 })}>
            {page.quote}
          </blockquote>
        </section>

        {/* When to call us + what you leave with */}
        <section className="sd-light sd-two">
          <div className="sd-col reveal">
            <p className="sd-eyebrow">When to call us</p>
            <h2>
              {page.whenHead[0]} <em>{page.whenHead[1]}</em>
            </h2>
            <ul className="sd-signals">
              {page.signals.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </div>
          <div className="sd-col reveal" style={cssVars({ "--d": 1 })}>
            <p className="sd-eyebrow">What you leave with</p>
            <h2>
              {page.leaveHead[0]} <em>{page.leaveHead[1]}</em>
            </h2>
            <ol className="sd-leave">
              {page.leave.map((l, i) => (
                <li key={l}>
                  <span>{num(i)}</span>
                  {l}
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* How it runs */}
        <section className="sd-light sd-run">
          <header className="sd-head reveal">
            <div>
              <p className="sd-eyebrow">How it runs</p>
              <h2>
                {page.runHead[0]} <em>{page.runHead[1]}</em>
              </h2>
            </div>
            <p>{page.runIntro}</p>
          </header>
          <div className="sd-tools reveal">
            <p>Tools we tend to reach for</p>
            <ul>
              {page.tools.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          </div>
          <ol className="sd-steps">
            {page.steps.map((s, i) => (
              <li key={s.title} className="sd-step reveal" style={cssVars({ "--d": i })}>
                <span className="sd-step__n">{num(i)}</span>
                <span className="sd-step__when">{s.when}</span>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* Also in this practice */}
        <section className="sd-light sd-more">
          <header className="sd-head reveal">
            <div>
              <p className="sd-eyebrow">Also in this practice</p>
              <h2>
                These rarely travel <em>alone.</em>
              </h2>
            </div>
            <Link href="/services" className="sd-all">
              All services <Arrow />
            </Link>
          </header>
          <ul className="sd-others">
            {others.map((o, i) => (
              <li key={o.id} className="reveal" style={cssVars({ "--d": i })}>
                <Link href={`/services/${o.id}`}>
                  <h3>{o.title}</h3>
                  <p>{o.text}</p>
                  <span>
                    Explore <Arrow />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </main>
      <Footer />
      <Cursor />
      <PageEffects />
    </>
  );
}
