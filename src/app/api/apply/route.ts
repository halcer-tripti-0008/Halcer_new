import { CAREERS_EMAIL, getRole } from "@/data/careers";

const TO = process.env.CAREERS_TO || CAREERS_EMAIL;
const FROM = process.env.CONTACT_FROM || "Halcer Website <onboarding@resend.dev>";
const MAX_FILE = 4 * 1024 * 1024; // 4 MB
const FILE_TYPES: Record<string, string> = {
  pdf: "application/pdf",
  doc: "application/msword",
  docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
};

const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const clean = (v: FormDataEntryValue | null, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "");

/** Job application form: emails the application (with the résumé attached) to the careers inbox via Resend. */
export async function POST(request: Request) {
  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }

  // Hidden field real visitors never fill in: silently accept and drop bot posts.
  if (clean(form.get("website"), 200)) return Response.json({ ok: true });

  const role = getRole(clean(form.get("role"), 120));
  const first = clean(form.get("firstName"), 80);
  const last = clean(form.get("lastName"), 80);
  const email = clean(form.get("email"), 200);
  const phone = clean(form.get("phone"), 60);
  const experience = clean(form.get("experience"), 40);
  const message = clean(form.get("message"), 5000);
  const resume = form.get("resume");

  if (!role) return Response.json({ error: "This role is no longer open." }, { status: 400 });
  if (!first || !last || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return Response.json({ error: "Please enter your first name, last name and a valid email address." }, { status: 400 });
  }

  let attachment: { filename: string; content: string } | null = null;
  if (resume instanceof File && resume.size > 0) {
    const ext = resume.name.split(".").pop()?.toLowerCase() ?? "";
    if (!FILE_TYPES[ext]) return Response.json({ error: "Please upload your résumé as a PDF, DOC or DOCX file." }, { status: 400 });
    if (resume.size > MAX_FILE) return Response.json({ error: "Your résumé must be 4 MB or smaller." }, { status: 400 });
    const safeName = `${first}-${last}-resume.${ext}`.replace(/[^\w.-]+/g, "_");
    attachment = { filename: safeName, content: Buffer.from(await resume.arrayBuffer()).toString("base64") };
  } else {
    return Response.json({ error: "Please attach your résumé." }, { status: 400 });
  }

  const key = process.env.RESEND_API_KEY;
  if (!key) return Response.json({ error: "Applications cannot be sent yet. Please email us directly." }, { status: 503 });

  const name = `${first} ${last}`;
  const rows: [string, string][] = [
    ["Role", role.title],
    ["Name", name],
    ["Email", email],
    ["Phone", phone || "—"],
    ["Experience", experience || "—"],
  ];
  const html =
    `<h2>New application: ${esc(role.title)}</h2>` +
    `<table cellpadding="6">${rows.map(([k, v]) => `<tr><td><b>${k}</b></td><td>${esc(v)}</td></tr>`).join("")}</table>` +
    `<h3>Message</h3><p style="white-space:pre-wrap">${esc(message || "(no message)")}</p>`;
  const text = `${rows.map(([k, v]) => `${k}: ${v}`).join("\n")}\n\nMessage:\n${message || "(no message)"}`;

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: FROM,
      to: [TO],
      reply_to: email,
      subject: `Application: ${role.title} — ${name}`,
      html,
      text,
      attachments: [attachment],
    }),
  });

  if (!res.ok) {
    console.error("Application email failed", res.status, await res.text().catch(() => ""));
    return Response.json({ error: "We could not send your application. Please try again." }, { status: 502 });
  }
  return Response.json({ ok: true });
}
