/** Services page content (copy from the live Halcer services page). */
export const SERVICES_HERO = {
  title: "Architecture, engineering, and delivery composed as",
  accent: "one practice.",
  lede: "For organisations advancing AI, GenAI, and cutting-edge technology. Nothing adjacent. Nothing generic.",
  cta: "Speak with a specialist",
};

const IMG = "/assets/images";

export type ServiceTone = "white" | "grey" | "black" | "blue";

export interface Service {
  id: string;
  tab: string;
  title: string;
  text: string;
  bullets: string[];
  image: string;
  /** CSS object-position for the picture (optional). */
  focus?: string;
  tone: ServiceTone;
}

export const SERVICES: Service[] = [
  {
    id: "ai-genai-engineering",
    tab: "AI & GenAI engineering",
    title: "AI & GenAI engineering",
    text: "LLM applications, retrieval, evaluation, MLOps, and AI product work — built against production outcomes, not a demo that expires.",
    bullets: ["LLM applications", "Retrieval & RAG", "Evaluation", "MLOps"],
    image: `${IMG}/about/hero-photo.jpg`,
    tone: "white",
  },
  {
    id: "software-platforms",
    tab: "Software & platforms",
    title: "Software & platforms",
    text: "Product engineering, architecture, quality, DevOps, and SRE for systems that have to run under load.",
    bullets: ["Product engineering", "Architecture", "Quality", "DevOps & SRE"],
    image: `${IMG}/industries/software.jpg`,
    tone: "grey",
  },
  {
    id: "cloud-data-security",
    tab: "Cloud, data & security",
    title: "Cloud, data & security",
    text: "Cloud architecture, data platforms, identity, and cybersecurity — the cutting-edge stack AI programmes sit on.",
    bullets: ["Cloud architecture", "Data platforms", "Identity", "Cybersecurity"],
    image: `${IMG}/insights/brief-2.jpg`,
    tone: "black",
  },
  {
    id: "digital-delivery",
    tab: "Digital delivery",
    title: "Digital delivery",
    text: "Project teams that modernise products, platforms, and data estates — or stand up the first production GenAI workflow.",
    bullets: ["Modernisation", "Delivery pods", "Data estates", "GenAI workflows"],
    image: `${IMG}/projects/photo.jpg`,
    tone: "blue",
  },
];

export const SERVICES_FOOT = {
  talk: { label: "Bring us the hard part.", title: "Get in touch", href: "/contact" },
  team: { label: "Join our team", title: "Careers", href: "#", image: `${IMG}/who/who-photo.jpg` },
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
