/** Insights page content. Images were cropped from the design screenshot (low resolution, number labels removed): swap in the originals. */
const IMG = "/assets/images";

export const INSIGHTS_HERO = {
  eyebrow: "Insights",
  volume: "Vol. 01 · 2026",
  title: "Judgement from programmes that have to work",
  lede: "We write for CTOs and engineering leaders — on AI adoption, GenAI in production, and the platforms those systems sit on. Not for the news cycle.",
  meta: ["3 articles", "AI · GenAI · Platforms"],
};

export const DESK = {
  eyebrow: "The desk",
  heading: "Recent articles",
  note: "Client stories and industry briefs from programmes that have to ship — not the news cycle.",
};

export const LEAD_STORY = {
  slug: "delivery-team-rebuild-without-burnout",
  tag: "Lead story",
  section: "Delivery",
  kind: "Client story",
  date: "30 July 2026",
  read: "8 min",
  title: "How a delivery team rebuilt without burning out engineers",
  text: "A technology services company redesigned architecture and delivery around production outcomes — and restored trust in the work.",
  cta: "Read full story",
  image: `${IMG}/insights/featured-poster.jpg`, // sharp still from the video (also used on cards/article)
  video: "/assets/video/insights-featured.mp4", // looping background on the Insights featured card
};

export interface Brief {
  n: string;
  slug: string;
  kind: string;
  date: string;
  read: string;
  topic?: string;
  title: string;
  text?: string;
  cta: string;
  image: string;
}

export const BRIEFS: Brief[] = [
  {
    n: "02",
    slug: "genai-in-production",
    kind: "Industry brief",
    date: "14 July 2026",
    read: "10 min",
    topic: "AI & GenAI",
    title: "What GenAI changes when you put it into production",
    text: "From LLM engineering and evaluation to MLOps, the work that puts generative AI into production is not interchangeable.",
    cta: "Read full brief",
    image: `${IMG}/insights/brief-1.jpg`,
  },
  {
    n: "03",
    slug: "cloud-security-platforms-decide-delivery",
    kind: "Industry brief",
    date: "21 June 2026",
    read: "9 min",
    title: "AI grabs the headlines. Cloud, cybersecurity, and platform engineering still decide whether programmes ship.",
    cta: "Read full brief",
    image: `${IMG}/insights/brief-2.jpg`,
  },
  // DRAFT articles revealed by "See more articles": placeholder copy and reused site images — replace with real pieces.
  {
    n: "04",
    slug: "cloud-cost-is-architecture",
    kind: "Industry brief",
    date: "2 June 2026",
    read: "7 min",
    topic: "Cloud",
    title: "Cloud cost is an architecture problem, not a finance report",
    text: "Why FinOps only works when the platform team owns spend alongside reliability — and the three design choices that move the bill most.",
    cta: "Read full brief",
    image: `${IMG}/services-cloud.jpg`,
  },
  {
    n: "05",
    slug: "pilot-to-production-in-one-quarter",
    kind: "Client story",
    date: "19 May 2026",
    read: "6 min",
    topic: "Delivery",
    title: "From pilot to production in one quarter: what changed in the operating model",
    text: "Small pods, one accountable owner per outcome, and release gates the client's security team trusted from day one.",
    cta: "Read full story",
    image: `${IMG}/services-delivery.jpg`,
  },
  {
    n: "06",
    slug: "evaluating-llm-applications",
    kind: "Industry brief",
    date: "5 May 2026",
    read: "8 min",
    topic: "AI & GenAI",
    title: "Evaluating LLM applications before your users do",
    text: "Offline test sets, live guardrails and the metrics that actually predict whether a GenAI feature will hold up in production.",
    cta: "Read full brief",
    image: `${IMG}/services-ai.jpg`,
  },
  {
    n: "07",
    slug: "hiring-for-production-responsibility",
    kind: "Perspective",
    date: "22 April 2026",
    read: "5 min",
    topic: "Teams",
    title: "Hiring for production responsibility",
    text: "What we look for in engineers who own systems end to end — and why it matters more than any single framework on a CV.",
    cta: "Read full piece",
    image: `${IMG}/careers/careers-hero.jpg`,
  },
];

/** Articles shown before "See more", and how many each click reveals. */
export const BRIEFS_INITIAL = 3;
export const BRIEFS_STEP = 3;

export const OUTLOOK = {
  eyebrow: "Outlook 2026",
  title: "The AI-native IT organisation is already here",
  text: "Engineering teams now compose on-site core, remote specialists, and project-based AI experts in the same sprint. Those who prevail will blend those sources without confusing the architecture or diluting delivery culture.",
  quote:
    "Our outlook examines scarce capabilities, GenAI in production, and platforms that operators can use — written for people who run programmes, not for a headline.",
  cta: "Request the briefing",
  image: `${IMG}/insights/outlook.jpg`,
};
