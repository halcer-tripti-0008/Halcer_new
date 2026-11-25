export interface Testimonial {
  quote: string;
  tone: "grey" | "blue";
}

// PLACEHOLDER CONTENT: these quotes are drafts and the clients are unnamed.
// Replace them with real, approved client testimonials before publishing.
export const TESTIMONIALS: Testimonial[] = [
  {
    tone: "grey",
    quote:
      "Halcer helped us agree exactly what the system needed to decide, and what a wrong answer would cost, before any code was written.",
  },
  {
    tone: "blue",
    quote:
      "The prototype ran on our own records and was judged against a test set we wrote together, so we trusted what we were seeing.",
  },
  {
    tone: "grey",
    quote:
      "Guardrails, identity, logging and cost controls were built in from the start. It felt like proper software engineering, not an experiment.",
  },
  {
    tone: "blue",
    quote:
      "Regression suites and a staged rollout with a clear rollback path gave our risk team the confidence to sign off.",
  },
  {
    tone: "blue",
    quote:
      "Long after launch they still watch quality, drift and spend, and the roadmap follows what our users actually do.",
  },
];
