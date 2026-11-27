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
  slug: string; // job page: /careers/[slug]
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
    slug: "principal-genai-solutions-architect",
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
    slug: "staff-distributed-systems-engineer",
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
    slug: "lead-cloud-security-appsec-architect",
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
    slug: "technical-engagement-director-pod-manager",
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

/* ---------- Job pages (/careers/[slug]) ---------- */

export interface JobDetail {
  about: string[];
  responsibilities: string[];
  requirements: string[];
  niceToHave?: string[];
}

/** DRAFT job descriptions written to fill the layout — confirm with the hiring team before launch. */
export const JOB_DETAILS: Record<string, JobDetail> = {
  "principal-genai-solutions-architect": {
    about: [
      "You will lead the architecture of production GenAI systems for tier-1 financial and healthcare clients — from retrieval and model choice to evaluation, guardrails and cost.",
      "You will work inside a small, senior pod that reports directly to the client's engineering leadership, and you will own the technical outcome end to end.",
    ],
    responsibilities: [
      "Design LLM pipelines, retrieval systems and agentic workflows that hold up under real load.",
      "Set up evaluation suites and guardrails before anything ships, and keep them running in production.",
      "Make model, hosting and cost trade-offs with client CTOs and explain them clearly.",
      "Mentor engineers in the pod and raise the bar on code review and design.",
    ],
    requirements: [
      "Significant experience shipping ML or GenAI systems to production, not just prototypes.",
      "Strong software engineering in Python and at least one typed language.",
      "Hands-on experience with retrieval, fine-tuning or serving large models.",
      "Comfort working directly with senior client stakeholders.",
    ],
    niceToHave: ["Experience in regulated industries such as banking or healthcare.", "Open-source or research contributions in ML."],
  },
  "staff-distributed-systems-engineer": {
    about: [
      "You will build the high-throughput, low-latency backbone that our clients' products run on: consensus, event streaming and the network layers in between.",
    ],
    responsibilities: [
      "Design and build distributed services in Go and Rust with clear failure modes.",
      "Own reliability: observability, load testing and incident follow-through.",
      "Lead technical design reviews across pods and document decisions.",
    ],
    requirements: [
      "Deep experience building and operating distributed systems in production.",
      "Strong Go or Rust, and a solid understanding of networking and concurrency.",
      "Experience with event streaming platforms and consistency trade-offs.",
    ],
    niceToHave: ["Contributions to open-source infrastructure projects."],
  },
  "lead-cloud-security-appsec-architect": {
    about: [
      "You will lead zero-trust hardening, application security and cryptography policy across multi-cloud estates, working inside delivery pods rather than as a final gate.",
    ],
    responsibilities: [
      "Define and automate security controls in delivery pipelines.",
      "Lead threat modelling with engineering teams early in design.",
      "Drive container and dependency vulnerability remediation at scale.",
      "Advise client leadership on identity, data protection and cryptography.",
    ],
    requirements: [
      "Strong background in cloud security across at least two major providers.",
      "Hands-on application security experience, including secure code review.",
      "Experience automating security checks in CI/CD.",
    ],
    niceToHave: ["Relevant certifications (e.g. CISSP, OSCP, cloud security specialities)."],
  },
  "technical-engagement-director-pod-manager": {
    about: [
      "You will bridge deep technical work and executive governance, leading several delivery pods through critical enterprise modernisation programmes.",
    ],
    responsibilities: [
      "Own delivery outcomes, risks and stakeholder communication for your programmes.",
      "Shape pods: staffing, ways of working and engineering standards.",
      "Run governance with client executives without slowing teams down.",
    ],
    requirements: [
      "Track record leading complex technology programmes to production.",
      "An engineering background and the credibility to go deep with technical teams.",
      "Excellent written and spoken communication with senior stakeholders.",
    ],
  },
};

export const EXPERIENCE_OPTIONS = ["0–2 years", "3–5 years", "6–10 years", "10+ years"];

export const getRole = (slug: string) => ROLES.find((r) => r.slug === slug);
