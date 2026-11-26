/** Services page content, taken from the design screenshot. */
export interface ServiceLine {
  n: string;
  title: string;
  tags: string[];
  text: string;
  icon: "spark" | "code" | "shield" | "box";
}

export const SERVICES_HERO = {
  eyebrow: "Services",
  title: ["Architecture, engineering,", "and delivery composed as"],
  accent: "one practice.",
  lede: "For organisations advancing AI, GenAI, and cutting-edge technology. Nothing adjacent. Nothing generic.",
  steps: ["Architect", "Build", "Operate"],
  cta: "Speak with a specialist",
  link: "How we enter the work",
};

export const SERVICE_LINES: ServiceLine[] = [
  {
    n: "01",
    title: "AI & GenAI engineering",
    tags: ["LLM applications", "Retrieval & RAG", "Evaluation", "MLOps"],
    text: "LLM applications, retrieval, evaluation, MLOps, and AI product work — built against production outcomes, not a demo that expires.",
    icon: "spark",
  },
  {
    n: "02",
    title: "Software & platforms",
    tags: ["Product engineering", "Architecture", "Quality", "DevOps & SRE"],
    text: "Product engineering, architecture, quality, DevOps, and SRE for systems that have to run under load.",
    icon: "code",
  },
  {
    n: "03",
    title: "Cloud, data & security",
    tags: ["Cloud architecture", "Data platforms", "Identity", "Cybersecurity"],
    text: "Cloud architecture, data platforms, identity, and cybersecurity — the cutting-edge stack AI programmes sit on.",
    icon: "shield",
  },
  {
    n: "04",
    title: "Digital delivery",
    tags: ["Modernisation", "Delivery pods", "Data estates", "GenAI workflows"],
    text: "Project teams that modernise products, platforms, and data estates — or stand up the first production GenAI workflow.",
    icon: "box",
  },
];

export const ENGAGE = {
  eyebrow: "How we engage",
  title: "Four ways we",
  accent: "enter the work.",
  text: "We design around how technology organisations actually ship — product pods, platform teams, and AI programmes — not a catalogue of unrelated industries.",
};

export const DOMAINS_HEAD = {
  eyebrow: "Where we go deep",
  title: "Domains we",
  accent: "inhabit.",
  text: "AI, GenAI, and cutting-edge technology — and the subdisciplines that sit inside them. Nowhere else.",
};

export const DOMAINS = [
  { n: "01", title: "Software engineering", tags: ["Product", "Full-stack", "Mobile", "Quality", "Architecture"] },
  { n: "02", title: "Cloud & platforms", tags: ["Cloud architecture", "DevOps", "SRE", "Platform", "FinOps"] },
  { n: "03", title: "Cybersecurity", tags: ["AppSec", "Cloud security", "Identity", "SOC"] },
  { n: "04", title: "Data & analytics", tags: ["Data engineering", "Analytics engineering", "ML platforms", "BI"] },
  { n: "05", title: "AI & GenAI", tags: ["LLM applications", "RAG", "Evaluation", "MLOps"] },
  { n: "06", title: "High-tech product", tags: ["SaaS", "Enterprise technology", "Programme delivery"] },
];

export const SERVICES_CTA = {
  eyebrow: "Work with Halcer",
  title: "Bring us the hard part.",
  accent: "We will bring the specialists.",
  text: "A stalled GenAI pilot, a platform that buckles under load, or a security bar you have to clear. Tell us what you are shipping and we will put the right practice around it.",
  button: "Speak with a specialist",
  email: "hello@halcer.com",
};
