const TO = process.env.CONTACT_TO || "hello@halcer.com";
const FROM = process.env.CONTACT_FROM || "Halcer Website <onboarding@resend.dev>";

const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const clean = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "");

/** Contact form: emails the enquiry to hello@halcer.com through Resend. */
export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }

  // Hidden field that real visitors never fill in: silently accept and drop bot posts.
  if (clean(body.website, 200)) return Response.json({ ok: true });

  const name = clean(body.name, 120);
  const email = clean(body.email, 200);
  const interest = clean(body.interest, 120);
  const phone = clean(body.phone, 60);
  const message = clean(body.message, 5000);

  if (!name || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return Response.json({ error: "Please enter your name and a valid email address." }, { status: 400 });
  }

  const key = process.env.RESEND_API_KEY;
  if (!key) {
    return Response.json({ error: "Email sending is not set up yet." }, { status: 503 });
  }

  const rows: [string, string][] = [
    ["Name", name],
    ["Email", email],
    ["Interested in", interest || "—"],
    ["Phone", phone || "—"],
  ];
  const html =
    `<h2>New enquiry from the Halcer website</h2>` +
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
      subject: `Website enquiry from ${name}${interest ? ` — ${interest}` : ""}`,
      html,
      text,
    }),
  });

  if (!res.ok) {
    console.error("Contact email failed", res.status, await res.text().catch(() => ""));
    return Response.json({ error: "We could not send your message. Please try again." }, { status: 502 });
  }
  return Response.json({ ok: true });
}
