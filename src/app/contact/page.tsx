import type { Metadata } from "next";
import Link from "next/link";
import { ContactForm } from "@/components/ContactForm";
import { Cursor } from "@/components/Cursor";
import { Footer } from "@/components/Footer";
import { PageEffects } from "@/components/PageEffects";
import { SiteHeader } from "@/components/SiteHeader";
import { ADDRESSES, PHONES } from "@/data/contact";
import { cssVars } from "@/lib/css";
import "./contact.css";

export const metadata: Metadata = {
  title: "Contact us — Halcer",
  description: "Talk to Halcer about your AI and GenAI programme.",
};

export default function ContactPage() {
  return (
    <>
      <SiteHeader active={null} />
      <main className="contact">
        <nav className="ct-crumbs reveal" aria-label="Breadcrumb" style={cssVars({ "--d": 0 })}>
          <Link href="/">Home</Link>
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M9 6l6 6-6 6" />
          </svg>
          <span aria-current="page">Contact Us</span>
        </nav>

        <div className="ct-grid">
          <div className="reveal" style={cssVars({ "--d": 1 })}>
            <ContactForm />
          </div>

          <div className="ct-info">
            <section className="reveal" style={cssVars({ "--d": 2 })} aria-labelledby="ct-hello">
              <h1 id="ct-hello" className="ct-info__title">
                Say Hello
              </h1>
              <ul className="ct-cols">
                {PHONES.map((p) => (
                  <li key={p.label}>
                    <span className="ct-cols__label">{p.label}</span>
                    <a href={`tel:${p.value.replace(/[^+\d]/g, "")}`}>{p.value}</a>
                  </li>
                ))}
              </ul>
            </section>

            <section className="reveal" style={cssVars({ "--d": 3 })} aria-labelledby="ct-office">
              <h2 id="ct-office" className="ct-info__title">
                Office Address
              </h2>
              <ul className="ct-cols">
                {ADDRESSES.map((a) => (
                  <li key={a.label}>
                    <span className="ct-cols__label">{a.label}</span>
                    <address>
                      {a.lines.map((l) => (
                        <span key={l}>{l}</span>
                      ))}
                    </address>
                  </li>
                ))}
              </ul>
            </section>
          </div>
        </div>
      </main>
      <Footer />
      <Cursor />
      <PageEffects />
    </>
  );
}
