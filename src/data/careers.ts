/**
 * Careers page content (from the careers design). Roles, practice counts and copy are drafts to confirm
 * with the team before launch; practice counts are worked out from ROLES, so they always match the list.
 */

export type Practice = "ai" | "platforms" | "cloud" | "delivery";

export const PRACTICES: { id: Practice; label: string; tab: string }[] = [
  { id: "ai", label: "AI & GenAI", tab: "AI & GenAI" },
  { id: "platforms", label: "Platforms", tab: "Platforms" },
  { id: "cloud", label: "Cloud & Security", tab: "Cloud & Sec" },
  { id: "delivery", label: "Delivery", tab: "Delivery" },
];

export const CAREERS_HERO = {
  title: ["Find high-impact engineering", "& leadership roles."],
  accent: "Build the systems that matter.",
  lede:
    "We are deploying world-class specialists across AI & GenAI, platform engineering, distributed architecture, and mission-critical digital delivery.",
  disciplines: [
    "LLM Architecture",
    "MLOps",
    "Platform Engineering",
    "Kubernetes / Bare Metal",
    "AppSec & Zero Trust",
    "Pod Leadership",
  ],
};

export const LOCATIONS = ["Remote", "Hybrid", "London", "San Francisco", "New York", "Berlin"];

export type DomainIcon = "monitor" | "layers" | "cloud" | "bolt" | "doc" | "shield" | "sliders" | "server";

export interface Domain {
  id: string;
  title: string;
  practice: Practice;
  icon: DomainIcon;
}

export const DOMAINS_HEAD = {
  title: "Choose your practice domain",
  text: "Halcer operates as elite, modular capability pods. Select a discipline to explore technical mandates and ongoing deployment teams.",
};

export const DOMAINS: Domain[] = [
  { id: "ai-genai", title: "AI & GenAI Engineering", practice: "ai", icon: "monitor" },
  { id: "software-platforms", title: "Software & Platforms", practice: "platforms", icon: "layers" },
  { id: "cloud-data-security", title: "Cloud, Data & Security", practice: "cloud", icon: "cloud" },
  { id: "digital-delivery", title: "Digital Delivery & Product", practice: "delivery", icon: "bolt" },
  { id: "mlops-architecture", title: "MLOps & Architecture", practice: "ai", icon: "doc" },
  { id: "cybersecurity-soc", title: "Cybersecurity & SOC", practice: "cloud", icon: "shield" },
  { id: "product-leadership", title: "High-Tech Product Leadership", practice: "delivery", icon: "sliders" },
  { id: "infrastructure-sre", title: "Infrastructure & SRE", practice: "platforms", icon: "server" },
];

export interface Role {
  title: string;
  domain: string; // Domain id
  practice: Practice;
  tag: string;
  posted: string;
  text: string;
  location: string;
  type: string;
  tier: string;
}

export const ROLES_HEAD = {
  eyebrow: "Priority deployments",
  title: "Roles open now",
  text: "Active vacancies evaluated against Halcer pod standards.",
  note: "All engineering levels include competitive equity participation, private healthcare, and custom workstation budgets.",
};

export const ROLES: Role[] = [
  {
    title: "Principal GenAI Solutions Architect",
    domain: "ai-genai",
    practice: "ai",
    tag: "AI & GenAI",
    posted: "Posted 2d ago",
    text: "Architect high-throughput LLM pipelines, model fine-tuning runtimes, and agentic workflows for tier-1 financial and healthcare institutions.",
    location: "London / Hybrid",
    type: "Full-time pod lead",
    tier: "Staff / Principal tier",
  },
  {
    title: "Staff Distributed Systems Engineer",
    domain: "software-platforms",
    practice: "platforms",
    tag: "Software & Platforms",
    posted: "Posted 1d ago",
    text: "Build high-frequency distributed consensus engines and zero-loss event streaming fabrics with Go, Rust, and low-latency network layers.",
    location: "San Francisco / Remote",
    type: "Full-time practice",
    tier: "Staff specialist tier",
  },
  {
    title: "Lead Cloud Security & AppSec Architect",
    domain: "cloud-data-security",
    practice: "cloud",
    tag: "Cloud & Security",
    posted: "Posted 3d ago",
    text: "Lead enterprise zero-trust posture hardening, automated container vulnerability remediation, and cryptography policy across multi-cloud footprints.",
    location: "New York / Remote",
    type: "Full-time pod lead",
    tier: "Lead architect tier",
  },
  {
    title: "Technical Engagement Director & Pod Manager",
    domain: "digital-delivery",
    practice: "delivery",
    tag: "Digital Delivery",
    posted: "Posted 5d ago",
    text: "Bridge technical deep-dives and executive governance. Orchestrate elite delivery squads delivering critical enterprise modernization programs.",
    location: "Berlin / London (Hybrid)",
    type: "Practice leadership",
    tier: "Director tier",
  },
];

export const OPERATE_HEAD = {
  eyebrow: "The Halcer standard",
  title: "How we operate as a practice",
  text: "We operate with low bureaucracy and high engineering conviction. We hire specialists who thrive on production responsibility.",
};

export const OPERATE = [
  {
    n: "01",
    title: "High-trust engineering pods",
    text: "Autonomous multidisciplinary squads deploy directly with enterprise client CTOs and engineering leadership, avoiding non-technical middle management layers.",
    tag: "Direct execution authority",
  },
  {
    n: "02",
    title: "Production over prototypes",
    text: "We do not build disposable conference demos. We ship hardened, auditable architectures that operate at scale with measurable latency and SLA targets.",
    tag: "Production hardening SLA",
  },
  {
    n: "03",
    title: "Accelerated mastery & R&D",
    text: "20% dedicated time for open-source contributions, patent filings, and proprietary AI research, backed by generous lab compute budgets.",
    tag: "Compute & lab stipend",
  },
];

export const CAREERS_EMAIL = "careers@halcer.com";

export const OPEN_APPLICATION = {
  eyebrow: "Spontaneous application",
  title: "Don’t see your exact role? Bring us your track record.",
  text: "We continually open custom pods for extraordinary engineers, distributed architects, and technical leaders who alter the velocity of teams.",
  cta: "Send open application",
};
