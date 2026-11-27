/** About page content. Images are placeholders taken from the existing Halcer assets. */
const IMG = "/assets/images";

export const ABOUT_HERO_VIDEO = "/assets/video/about-laptop-loop.mp4";
export const ABOUT_HERO_POSTER = `${IMG}/about/hero-poster.jpg`;

export const ABOUT_HERO_IMAGE = `${IMG}/about/hero-photo.jpg`;

export interface SpaceSlide {
  title: string;
  text: string;
  note: string;
  image: string;
}

export const SPACE_EYEBROW = "What we stand for";
export const SPACE_HEADING = "Four commitments we do not trade away.";
export const SPACE_INTRO =
  "These principles decide what we build, how we staff it, and when we tell a client the honest answer instead of the easy one.";

export const SPACE_SLIDES: SpaceSlide[] = [
  {
    title: "Production is the only proof",
    text: "A model in a notebook is a hypothesis. We measure ourselves on systems that stay up, stay accurate, and stay affordable under real load.",
    note: "Measured on uptime, accuracy, unit cost",
    image: `${IMG}/about/commit-1.jpg?v=nogrid`,
  },
  {
    title: "Governance from day one",
    text: "Policy, evaluation, and audit trails are designed in with the architecture—never retrofitted after an incident forces the conversation.",
    note: "Policy, evals, and audit trails by design",
    image: `${IMG}/about/commit-2.jpg?v=nogrid`,
  },
  {
    title: "Own the whole stack",
    text: "Data foundations, platform, application, and enablement sit with one accountable team—so nothing gets lost in the hand-off between vendors.",
    note: "One accountable team, end to end",
    image: `${IMG}/about/commit-3.jpg?v=nogrid`,
  },
  {
    title: "Leave teams stronger",
    text: "Every engagement ends with your engineers able to extend, debug, and operate what we built together. Dependency is not a business model.",
    note: "Enablement written into every statement of work",
    image: `${IMG}/about/commit-4.jpg?v=nogrid`,
  },
];

export const IDEA_TEXT =
  "Halcer was founded on a simple idea: that AI should work in production, not just in a demo. We design, build and run the systems behind it, from software and cloud to data and security.";

/** Words that stay highlighted at all times (compared lower-case, without punctuation). */
export const IDEA_KEYWORDS = ["ai", "production", "design", "build", "run", "software", "cloud", "data", "security"];

export interface AboutValue {
  label: string;
  image: string;
}

export const VALUES: AboutValue[] = [
  { label: "Engineering rigour", image: `${IMG}/industries/software.jpg` },
  { label: "Production first", image: `${IMG}/industries/industrial.jpg` },
  { label: "Clear ownership", image: `${IMG}/industries/banking.jpg` },
  { label: "Lasting partnership", image: `${IMG}/industries/lifesciences.jpg` },
];

export const APPROACH_IMAGE = `${IMG}/who/who-photo.jpg`;

export const INDUSTRIES_EYEBROW = "Where we work";
export const INDUSTRIES_HEADING = "AI built for how your industry actually runs.";
export const INDUSTRIES_INTRO =
  "From regulated finance to global trade, we embed with the teams who own the workflow and ship automation that holds up under real-world scrutiny.";

export interface IndustryCard {
  title: string;
  text: string;
  image: string;
}

export const INDUSTRY_CARDS: IndustryCard[] = [
  {
    title: "BFSI",
    text: "Agentic AI workflow automation for banks, lenders, fintechs, and asset managers - covering onboarding, KYC, compliance, and operations at scale.",
    image: `${IMG}/about/industry-1.jpg`,
  },
  {
    title: "Multilateral Development Banks",
    text: "Real-time credit limits monitoring, exposure tracking, risk, treasury, and compliance workflows for multilateral and development finance institutions.",
    image: `${IMG}/about/industry-2.jpg`,
  },
  {
    title: "Retail & Supply Chain",
    text: "AI-powered automations for procurement, order-to-cash, inventory, vendor management, and store operations.",
    image: `${IMG}/about/industry-3.jpg`,
  },
  {
    title: "Maritime & Logistics",
    text: "Workflow automation for vessel operations, HSEQ documentation, trade documents, billing, and compliance.",
    image: `${IMG}/about/industry-4.jpg`,
  },
];
