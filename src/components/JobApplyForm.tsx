"use client";

import { useRef, useState, type DragEvent, type FormEvent } from "react";
import { EXPERIENCE_OPTIONS } from "@/data/careers";

const MAX_FILE = 4 * 1024 * 1024;
const OK_EXT = ["pdf", "doc", "docx"];

/** Job application form: posts to /api/apply, which emails it (with the résumé) to the careers inbox. */
export function JobApplyForm({ role, roleTitle }: { role: string; roleTitle: string }) {
  const [file, setFile] = useState<File | null>(null);
  const [drag, setDrag] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);
  const input = useRef<HTMLInputElement>(null);

  const pick = (f: File | undefined) => {
    if (!f) return;
    const ext = f.name.split(".").pop()?.toLowerCase() ?? "";
    if (!OK_EXT.includes(ext)) return setError("Please choose a PDF, DOC or DOCX file.");
    if (f.size > MAX_FILE) return setError("Your résumé must be 4 MB or smaller.");
    setError("");
    setFile(f);
  };

  const onDrop = (e: DragEvent) => {
    e.preventDefault();
    setDrag(false);
    pick(e.dataTransfer.files[0]);
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (busy) return;
    if (!file) return setError("Please attach your résumé.");
    const data = new FormData(e.currentTarget);
    data.set("resume", file);
    setBusy(true);
    setError("");
    try {
      const res = await fetch("/api/apply", { method: "POST", body: data });
      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        throw new Error(j.error || "Something went wrong.");
      }
      setSent(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setBusy(false);
    }
  };

  if (sent) {
    return (
      <div className="jb-form jb-sent" role="status">
        <span className="jb-sent__tick" aria-hidden="true">
          <svg viewBox="0 0 24 24">
            <path d="M5 12.5l4.5 4.5L19 7.5" />
          </svg>
        </span>
        <h2>Application sent</h2>
        <p>Thank you for applying for {roleTitle}. Our team reviews every application and will be in touch.</p>
      </div>
    );
  }

  return (
    <form className="jb-form" onSubmit={onSubmit}>
      <h2>Application</h2>
      <input type="hidden" name="role" value={role} />
      {/* honeypot: hidden from people, bots fill it in */}
      <input type="text" name="website" tabIndex={-1} autoComplete="off" className="jb-hp" aria-hidden="true" />

      <div className="jb-row">
        <label className="jb-field">
          <span>
            First name <b aria-hidden="true">*</b>
          </span>
          <input name="firstName" required autoComplete="given-name" placeholder="First name" />
        </label>
        <label className="jb-field">
          <span>
            Last name <b aria-hidden="true">*</b>
          </span>
          <input name="lastName" required autoComplete="family-name" placeholder="Last name" />
        </label>
      </div>
      <div className="jb-row">
        <label className="jb-field">
          <span>
            Email <b aria-hidden="true">*</b>
          </span>
          <input name="email" type="email" required autoComplete="email" placeholder="Email" />
        </label>
        <label className="jb-field">
          <span>Phone number</span>
          <input name="phone" type="tel" autoComplete="tel" placeholder="Phone number" />
        </label>
      </div>
      <label className="jb-field">
        <span>What would you like us to know about you?</span>
        <textarea name="message" rows={5} placeholder="Your message" />
      </label>

      <div className="jb-field">
        <span id="jb-resume-label">
          Résumé <b aria-hidden="true">*</b>
        </span>
        <div
          className={`jb-drop${drag ? " is-drag" : ""}${file ? " has-file" : ""}`}
          onDragOver={(e) => {
            e.preventDefault();
            setDrag(true);
          }}
          onDragLeave={() => setDrag(false)}
          onDrop={onDrop}
        >
          {file ? (
            <p>
              <strong>{file.name}</strong> · {(file.size / 1024 / 1024).toFixed(1)} MB{" "}
              <button type="button" className="jb-link" onClick={() => setFile(null)}>
                Remove
              </button>
            </p>
          ) : (
            <p>
              Drop your résumé here or{" "}
              <button type="button" className="jb-link" onClick={() => input.current?.click()}>
                browse
              </button>
            </p>
          )}
          <small>Max. file size: 4 MB (PDF, DOC, DOCX)</small>
          <input
            ref={input}
            type="file"
            accept=".pdf,.doc,.docx"
            className="jb-file"
            aria-labelledby="jb-resume-label"
            onChange={(e) => pick(e.target.files?.[0])}
          />
        </div>
      </div>

      <fieldset className="jb-field jb-radios">
        <legend>How much experience do you have?</legend>
        {EXPERIENCE_OPTIONS.map((o, i) => (
          <label key={o}>
            <input type="radio" name="experience" value={o} defaultChecked={i === 1} />
            <span>{o}</span>
          </label>
        ))}
      </fieldset>

      {error && (
        <p className="jb-error" role="alert">
          {error}
        </p>
      )}
      <button type="submit" className="jb-submit" disabled={busy}>
        {busy ? "Sending…" : "Submit application"}
      </button>
    </form>
  );
}

/** "Share this job": native share sheet where available, otherwise copies the link. */
export function ShareJob({ title }: { title: string }) {
  const [copied, setCopied] = useState(false);
  const share = async () => {
    const url = location.href;
    try {
      if (navigator.share) await navigator.share({ title: `${title} — Halcer`, url });
      else {
        await navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 1800);
      }
    } catch {
      /* share sheet dismissed */
    }
  };
  return (
    <button type="button" className="jb-chip jb-chip--btn" onClick={share} aria-live="polite">
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M4 13v6a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-6M12 3v12M7 8l5-5 5 5" />
      </svg>
      {copied ? "Link copied" : "Share this job"}
    </button>
  );
}
