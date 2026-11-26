/** Insights page content. Images were cropped from the design screenshot (low resolution): swap in the originals. */
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
  tag: "Lead story",
  section: "Delivery",
  kind: "Client story",
  date: "30 July 2026",
  read: "8 min",
  title: "How a delivery team rebuilt without burning out engineers",
  text: "A technology services company redesigned architecture and delivery around production outcomes — and restored trust in the work.",
  cta: "Read full story",
  image: `${IMG}/insights/lead.jpg`,
};

export interface Brief {
  n: string;
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
    kind: "Industry brief",
    date: "21 June 2026",
    read: "9 min",
    title: "AI grabs the headlines. Cloud, cybersecurity, and platform engineering still decide whether programmes ship.",
    cta: "Read full brief",
    image: `${IMG}/insights/brief-2.jpg`,
  },
];

export const OUTLOOK = {
  eyebrow: "Outlook 2026",
  title: "The AI-native IT organisation is already here",
  text: "Engineering teams now compose on-site core, remote specialists, and project-based AI experts in the same sprint. Those who prevail will blend those sources without confusing the architecture or diluting delivery culture.",
  quote:
    "Our outlook examines scarce capabilities, GenAI in production, and platforms that operators can use — written for people who run programmes, not for a headline.",
  cta: "Request the briefing",
  image: `${IMG}/insights/outlook.jpg`,
};
