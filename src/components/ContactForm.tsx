"use client";

import { useState, type FormEvent } from "react";
import { COUNTRY_CODES } from "@/data/contact";

/**
 * Inquiry form. PLACEHOLDER: there is no backend yet, so a valid submit only shows the thank-you
 * state. Wire `onSubmit` to the real endpoint (or a server action) before publishing.
 */
export function ContactForm() {
  const [sent, setSent] = useState(false);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSent(true);
  };

  if (sent) {
    return (
      <div className="ct-card ct-sent" role="status">
        <span className="ct-sent__tick" aria-hidden="true">
          <svg viewBox="0 0 24 24">
            <path d="M5 12.5l4.5 4.5L19 7.5" />
          </svg>
        </span>
        <h2>Thank you.</h2>
        <p>Your inquiry is on its way. A member of the Halcer team will get back to you shortly.</p>
        <button type="button" className="ct-link" onClick={() => setSent(false)}>
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form className="ct-card" onSubmit={onSubmit}>
      <h2 className="ct-card__title">Get in Touch</h2>
      <p className="ct-card__intro">
        Seeking a strategic partnership or have a specific project in mind? We&rsquo;re eager to explore how we can
        collaborate.
      </p>

      <label className="ct-field">
        <span>Name*</span>
        <input name="name" type="text" autoComplete="name" required />
      </label>

      <label className="ct-field">
        <span>Email*</span>
        <input name="email" type="email" autoComplete="email" required />
      </label>

      <div className="ct-field">
        <label htmlFor="ct-phone">Phone</label>
        <div className="ct-phone">
          <select name="dial" aria-label="Country code" defaultValue="+91">
            {COUNTRY_CODES.map((c) => (
              <option key={c.code} value={c.code}>
                {c.flag} {c.code}
              </option>
            ))}
          </select>
          <input id="ct-phone" name="phone" type="tel" autoComplete="tel-national" inputMode="tel" />
        </div>
      </div>

      <label className="ct-field">
        <span>Country*</span>
        <input name="country" type="text" autoComplete="country-name" required />
      </label>

      <label className="ct-field">
        <span>Company*</span>
        <input name="company" type="text" autoComplete="organization" required />
      </label>

      <label className="ct-field">
        <span>Message</span>
        <textarea name="message" rows={5} />
      </label>

      <label className="ct-consent">
        <input type="checkbox" name="consent" required />
        <span>
          I agree to the use or processing of my personal information by Halcer for the purpose of fulfilling this
          request and in accordance with Halcer <a href="#">Privacy Policy</a>.
        </span>
      </label>

      <button className="ct-submit" type="submit" data-magnetic>
        <span>Send your inquiry</span>
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M5 12h13M13 6l6 6-6 6" />
        </svg>
      </button>
    </form>
  );
}
