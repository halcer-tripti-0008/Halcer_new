/**
 * Article pages (/insights/[slug]). Card details (title, date, image…) come from insights.ts; this file adds
 * the body text. ALL BODIES ARE DRAFT PLACEHOLDER COPY written to fill the layout — replace with the real
 * articles before launch.
 */
import { BRIEFS, LEAD_STORY } from "./insights";

export interface ArticleSection {
  heading: string;
  paragraphs: string[];
}

export interface Article {
  slug: string;
  title: string;
  summary: string;
  kind: string;
  topic: string;
  date: string;
  read: string;
  image: string;
  intro: string[];
  sections: ArticleSection[];
  closing?: string;
}

const BODIES: Record<string, Pick<Article, "intro" | "sections" | "closing">> = {
  "delivery-team-rebuild-without-burnout": {
    intro: [
      "When a technology services company asked us to help with delivery, the symptoms looked familiar: missed releases, a growing backlog of production incidents, and senior engineers quietly updating their CVs. The instinct was to add people. We started somewhere else — with how work moved from idea to production.",
      "Here is what changed, and why the team ended up shipping more while working fewer late nights.",
    ],
    sections: [
      {
        heading: "Make one person accountable for each outcome",
        paragraphs: [
          "Work had been split by layer — front end, back end, platform — so every feature needed three hand-offs and nobody owned the result. We reorganised into small pods, each owning a customer-facing outcome end to end, with a single accountable lead.",
          "Hand-offs dropped, and so did the meetings that existed only to coordinate them.",
        ],
      },
      {
        heading: "Fix the architecture that caused the pages",
        paragraphs: [
          "Most out-of-hours incidents traced back to two shared services that every team depended on and no team could change safely. We split them along the same lines as the pods, added contract tests, and gave each pod the right to deploy on its own schedule.",
          "Within a quarter, after-hours pages fell sharply and the remaining ones went to the team that could actually fix them.",
        ],
      },
      {
        heading: "Measure production, not activity",
        paragraphs: [
          "Velocity charts were replaced with four numbers every pod could see: lead time, deployment frequency, change failure rate and time to restore. Conversations moved from \"are we busy?\" to \"is it working for customers?\".",
        ],
      },
    ],
    closing:
      "None of this required heroics. It required making ownership clear, removing the architectural traps that created emergencies, and trusting teams with the numbers that matter.",
  },
  "genai-in-production": {
    intro: [
      "A GenAI demo can be built in an afternoon. A GenAI feature that customers rely on is a different piece of engineering, and most of the work happens after the prototype looks finished.",
    ],
    sections: [
      {
        heading: "LLM engineering is software engineering",
        paragraphs: [
          "Prompts, retrieval pipelines and tool calls need versioning, review and tests like any other code. Teams that treat them as configuration end up debugging behaviour they cannot reproduce.",
        ],
      },
      {
        heading: "Evaluation is the product",
        paragraphs: [
          "Without a test set that reflects real user questions, every model or prompt change is a guess. We build evaluation suites before tuning anything, and run them on every change.",
        ],
      },
      {
        heading: "MLOps keeps it alive",
        paragraphs: [
          "Models drift, providers change pricing and latency, and data sources move. Monitoring quality, cost and response time in production is what turns a launch into a service.",
        ],
      },
    ],
  },
  "cloud-security-platforms-decide-delivery": {
    intro: [
      "AI programmes get the attention, but when they stall it is rarely the model. It is the platform underneath: environments that take weeks to provision, security reviews that start too late, and data that cannot leave the system it lives in.",
    ],
    sections: [
      {
        heading: "Platforms set the pace",
        paragraphs: [
          "Self-service environments, paved deployment paths and shared observability decide how quickly any team can ship — AI teams included.",
        ],
      },
      {
        heading: "Security has to start on day one",
        paragraphs: [
          "Threat modelling, identity and data classification are far cheaper at design time than as a release blocker. Bringing security engineers into the pod changes the conversation from approval to collaboration.",
        ],
      },
      {
        heading: "Cloud foundations pay for everything else",
        paragraphs: [
          "Landing zones, network design and cost controls are unglamorous. They are also what lets every later programme move without renegotiating the basics.",
        ],
      },
    ],
  },
  "cloud-cost-is-architecture": {
    intro: [
      "Most cloud cost programmes start with a dashboard and end with a list of instances to resize. The savings are real but small, because the biggest costs were decided when the system was designed.",
    ],
    sections: [
      {
        heading: "Give the platform team the bill",
        paragraphs: [
          "When the people who design the platform also see what it costs, trade-offs between reliability, performance and spend happen in design reviews rather than finance meetings.",
        ],
      },
      {
        heading: "Three choices that move the bill most",
        paragraphs: [
          "Data movement between regions and services, always-on capacity sized for peak, and storage that is never tiered or deleted. Each is an architecture decision, and each is cheaper to fix early.",
        ],
      },
      {
        heading: "Make cost a feature of the release process",
        paragraphs: [
          "Estimating the cost impact of a change alongside its performance impact keeps spend predictable without slowing teams down.",
        ],
      },
    ],
  },
  "pilot-to-production-in-one-quarter": {
    intro: [
      "The pilot had worked for months. Getting it into production had not. The client's question was simple: what would it take to have this live, safely, within one quarter?",
    ],
    sections: [
      {
        heading: "Small pods with one owner",
        paragraphs: [
          "We formed two pods, each with an accountable owner and the skills to ship without waiting on other teams — engineering, data, security and product in the same stand-up.",
        ],
      },
      {
        heading: "Release gates the security team trusted",
        paragraphs: [
          "Instead of a final review, security criteria were agreed up front and automated in the pipeline. By launch, the security team had already seen every check pass many times.",
        ],
      },
      {
        heading: "Production from the first sprint",
        paragraphs: [
          "The first deployment went to a production environment in week two, behind a feature flag. Every later sprint was a step towards customers, not towards a big-bang launch.",
        ],
      },
    ],
  },
  "evaluating-llm-applications": {
    intro: [
      "If your users are the first people to find out how your GenAI feature fails, your evaluation started too late. Good evaluation is cheap to begin and compounds over time.",
    ],
    sections: [
      {
        heading: "Start with an offline test set",
        paragraphs: [
          "Collect real questions, expected answers and known failure cases. Even a hundred well-chosen examples will catch most regressions when prompts, models or retrieval change.",
        ],
      },
      {
        heading: "Add guardrails in production",
        paragraphs: [
          "Input and output checks, grounding against sources and clear fallbacks keep failures contained when something new slips through.",
        ],
      },
      {
        heading: "Track the metrics that predict trust",
        paragraphs: [
          "Answer accuracy, groundedness, refusal rate, latency and cost per request tell you far more than overall satisfaction scores — and they move before users complain.",
        ],
      },
    ],
  },
  "hiring-for-production-responsibility": {
    intro: [
      "Frameworks change every few years. The engineers who make the biggest difference are the ones who take responsibility for how their systems behave once real people depend on them.",
    ],
    sections: [
      {
        heading: "Ownership over output",
        paragraphs: [
          "We ask candidates about systems they have run, not just built: what broke, how they found out, and what they changed afterwards.",
        ],
      },
      {
        heading: "Comfort across the stack",
        paragraphs: [
          "Production problems rarely respect team boundaries. Engineers who can follow an issue from the interface to the database to the network resolve it in hours, not weeks.",
        ],
      },
      {
        heading: "Clear communication under pressure",
        paragraphs: [
          "Incidents are as much about communication as code. Explaining impact and next steps calmly is a skill we look for as deliberately as technical depth.",
        ],
      },
    ],
  },
};

/** Every article card on the Insights page, as one list (lead story first). */
export const ARTICLES: Article[] = [
  {
    slug: LEAD_STORY.slug,
    title: LEAD_STORY.title,
    summary: LEAD_STORY.text,
    kind: LEAD_STORY.kind,
    topic: LEAD_STORY.section,
    date: LEAD_STORY.date,
    read: LEAD_STORY.read,
    image: LEAD_STORY.image,
    ...BODIES[LEAD_STORY.slug],
  },
  ...BRIEFS.map((b) => ({
    slug: b.slug,
    title: b.title,
    summary: b.text ?? "",
    kind: b.kind,
    topic: b.topic ?? b.kind,
    date: b.date,
    read: b.read,
    image: b.image,
    ...BODIES[b.slug],
  })),
];

export const getArticle = (slug: string) => ARTICLES.find((a) => a.slug === slug);
