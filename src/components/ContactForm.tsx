"use client";

import { useState, type FormEvent } from "react";
import { COUNTRY_CODES, INTERESTS } from "@/data/contact";

/**
 * Message form. PLACEHOLDER: there is no backend yet, so a valid submit only shows the thank-you
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
      <div className="ct-sent" role="status">
        <span className="ct-sent__tick" aria-hidden="true">
          <svg viewBox="0 0 24 24">
            <path d="M5 12.5l4.5 4.5L19 7.5" />
          </svg>
        </span>
        <h3>Thank you.</h3>
        <p>Your message is on its way. A member of the Halcer team will get back to you shortly.</p>
        <button type="button" className="ct-link" onClick={() => setSent(false)}>
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form className="ct-form" onSubmit={onSubmit}>
      <h2 className="ct-form__title">Send a Message</h2>
      <p className="ct-form__intro">
        Seeking a strategic partnership or have a specific project in mind? Tell us a little and we will be in touch.
      </p>

      <div className="ct-row">
        <label className="ct-field">
          <span>Name</span>
          <input name="name" type="text" autoComplete="name" required />
        </label>
        <label className="ct-field">
          <span>Email Address</span>
          <input name="email" type="email" autoComplete="email" required />
        </label>
      </div>

      <div className="ct-row">
        <label className="ct-field">
          <span>Interested In</span>
          <select name="interest" defaultValue="">
            <option value="" disabled hidden />
            {INTERESTS.map((i) => (
              <option key={i} value={i}>
                {i}
              </option>
            ))}
          </select>
        </label>
        <div className="ct-field">
          <label htmlFor="ct-phone">Phone Number</label>
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
      </div>

      <label className="ct-field">
        <span>Message</span>
        <textarea name="message" rows={4} />
      </label>

      <div className="ct-form__foot">
        <button className="ct-submit" type="submit" data-magnetic>
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M5 12h13M13 6l6 6-6 6" />
          </svg>
          <span>Submit</span>
        </button>
      </div>
    </form>
  );
}
