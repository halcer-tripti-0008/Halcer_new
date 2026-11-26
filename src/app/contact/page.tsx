import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";
import { Cursor } from "@/components/Cursor";
import { Footer } from "@/components/Footer";
import { PageEffects } from "@/components/PageEffects";
import { SiteHeader } from "@/components/SiteHeader";
import { CONTACT_ADDRESS, CONTACT_EMAIL, CONTACT_PHONE, FAQ_LEAD, FAQS, MAP_SRC } from "@/data/contact";
import { cssVars } from "@/lib/css";
import "./contact.css";

export const metadata: Metadata = {
  title: "Contact us — Halcer",
  description: "Talk to Halcer about your AI and GenAI programme.",
};

const Icon = ({ children }: { children: React.ReactNode }) => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    {children}
  </svg>
);

const INFO = [
  {
    title: "Call Us",
    text: "Speak to the team directly about a project, a partnership or an existing programme.",
    label: CONTACT_PHONE.label,
    href: CONTACT_PHONE.href,
    icon: (
      <Icon>
        <path d="M6.6 3.5h3l1.4 4-2 1.3a11 11 0 0 0 5.2 5.2l1.3-2 4 1.4v3a2 2 0 0 1-2.2 2A15.5 15.5 0 0 1 4.6 5.7a2 2 0 0 1 2-2.2z" />
      </Icon>
    ),
  },
  {
    title: "Visit Us",
    text: "Drop by one of our offices. Let us know ahead of time and we will have a team member ready.",
    label: CONTACT_ADDRESS,
    href: "#map",
    icon: (
      <Icon>
        <path d="M12 21s7-6.2 7-11.5A7 7 0 0 0 5 9.5C5 14.8 12 21 12 21z" />
        <circle cx="12" cy="9.5" r="2.4" />
      </Icon>
    ),
  },
  {
    title: "Live Chat",
    text: "Prefer to write? Send us an email and we will reply within two working days.",
    label: "Email us",
    href: `mailto:${CONTACT_EMAIL}`,
    icon: (
      <Icon>
        <path d="M4 5.5h16v11H9.5L5 20.5v-4H4z" />
      </Icon>
    ),
  },
];

export default function ContactPage() {
  return (
    <>
      <SiteHeader active={null} />
      <main className="contact">
        <section className="ct-top">
          <h1 className="ct-title reveal" style={cssVars({ "--d": 0 })}>
            Get in touch
          </h1>
          <div className="ct-grid">
            <div className="reveal" style={cssVars({ "--d": 1 })}>
              <ContactForm />
            </div>
            <ul className="ct-info reveal" style={cssVars({ "--d": 2 })}>
              {INFO.map((i) => (
                <li key={i.title}>
                  <h3>{i.title}</h3>
                  <p>{i.text}</p>
                  <a className="ct-chip" href={i.href}>
                    <span className="ct-chip__icon">{i.icon}</span>
                    <span>{i.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="ct-map reveal" id="map" aria-label="Map">
          <iframe src={MAP_SRC} title="Halcer office location" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
        </section>

        <section className="ct-faq" aria-labelledby="ct-faq-title">
          <div className="reveal">
            <p className="ct-faq__eyebrow">FAQ</p>
            <h2 id="ct-faq-title">
              Frequently asked questions.
            </h2>
          </div>
          <div className="reveal" style={cssVars({ "--d": 1 })}>
            <h3 className="ct-faq__lead">{FAQ_LEAD.title}</h3>
            <p className="ct-faq__text">{FAQ_LEAD.text}</p>
            <div className="ct-faq__list">
              {FAQS.map((f) => (
                <details key={f.q}>
                  <summary>
                    <span>{f.q}</span>
                    <i aria-hidden="true" />
                  </summary>
                  <p>{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <Cursor />
      <PageEffects />
    </>
  );
}
