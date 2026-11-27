/** Copy for the four service detail pages (taken from the live Halcer site). */
export interface ServicePage {
  slug: string;
  name: string;
  title: string;
  lede: string;
  meta: { label: string; value: string }[];
  coverHead: [string, string];
  coverIntro: string;
  capabilities: { title: string; text: string }[];
  quote: string;
  whenHead: [string, string];
  signals: string[];
  leaveHead: [string, string];
  leave: string[];
  runHead: [string, string];
  runIntro: string;
  tools: string[];
  steps: { title: string; when: string; text: string }[];
}

export const SERVICE_PAGES: ServicePage[] = [
  {
    "slug": "ai-genai-engineering",
    "name": "AI & GenAI engineering",
    "title": "LLM systems that survive contact with production.",
    "lede": "LLM applications, retrieval, evaluation, MLOps, and AI product work — built against production outcomes, not a demo that expires.",
    "meta": [
      {
        "label": "Typical start",
        "value": "Two-week architecture sprint"
      },
      {
        "label": "First release",
        "value": "6–10 weeks"
      },
      {
        "label": "Team shape",
        "value": "AI engineers · Data · SRE"
      }
    ],
    "coverHead": [
      "The work, named",
      "precisely."
    ],
    "coverIntro": "Six capabilities we staff and own end to end. You can engage one of them or the whole practice.",
    "capabilities": [
      {
        "title": "LLM application engineering",
        "text": "Assistive and agentic workflows wired into your systems of record, with fallbacks, rate limits, and cost ceilings designed in from the first commit."
      },
      {
        "title": "Retrieval & RAG",
        "text": "Chunking, embeddings, hybrid search, and re-ranking tuned on your own corpus — so answers cite something real and stay current."
      },
      {
        "title": "Evaluation harnesses",
        "text": "Golden sets, regression suites, and judge pipelines that run in CI, so you can prove a change helped before it reaches a user."
      },
      {
        "title": "MLOps & serving",
        "text": "Model routing, caching, observability, and spend controls across hosted providers and self-hosted weights."
      },
      {
        "title": "Guardrails & governance",
        "text": "Prompt-injection defence, PII handling, and audit trails your risk function can sign off without a six-month review."
      },
      {
        "title": "AI product leadership",
        "text": "Embedded product thinking that keeps scope tied to a measurable business outcome rather than model novelty."
      }
    ],
    "quote": "Every model we ship is wired to an evaluation harness before it is wired to a user.",
    "whenHead": [
      "Signals this is",
      "your problem."
    ],
    "signals": [
      "A pilot demos well but has stalled on the way to production.",
      "Answer quality drifts and nobody can prove whether a change helped.",
      "Inference spend is climbing faster than adoption.",
      "Risk, legal, or compliance have parked the release."
    ],
    "leaveHead": [
      "Assets you",
      "keep and run."
    ],
    "leave": [
      "A reference architecture and a costed delivery path",
      "An evaluation harness wired into CI, running your golden sets",
      "Observability, spend controls, and runbooks for the live system",
      "Engineers on your side who can extend it without us"
    ],
    "runHead": [
      "From first call to",
      "your team owning it."
    ],
    "runIntro": "Every engagement is sequenced so you can stop, review, or redirect at a known point — never a twelve-month commitment on faith.",
    "tools": [
      "OpenAI",
      "Anthropic",
      "Azure OpenAI",
      "Bedrock",
      "LangGraph",
      "pgvector",
      "Pinecone",
      "Ragas",
      "Langfuse",
      "Kubernetes"
    ],
    "steps": [
      {
        "title": "Architecture sprint",
        "when": "Weeks 1–2",
        "text": "We map the use case onto data, models, and guardrails, then hand back a costed architecture and a delivery path you can fund."
      },
      {
        "title": "Thin slice to production",
        "when": "Weeks 3–6",
        "text": "One narrow journey goes end to end on real data with evaluation wired in, so the decision to scale rests on evidence."
      },
      {
        "title": "Harden and scale",
        "when": "Weeks 7–14",
        "text": "Retrieval quality, latency, spend, and failure modes get engineered until the system holds under real traffic."
      },
      {
        "title": "Operate and hand over",
        "when": "Ongoing",
        "text": "Runbooks, dashboards, and paired delivery until your team runs and extends it without us in the room."
      }
    ]
  },
  {
    "slug": "software-platforms",
    "name": "Software & platforms",
    "title": "Product engineering for systems that run under load.",
    "lede": "Product engineering, architecture, quality, DevOps, and SRE for systems that have to run under load.",
    "meta": [
      {
        "label": "Typical start",
        "value": "Architecture & discovery"
      },
      {
        "label": "Cadence",
        "value": "Two-week increments"
      },
      {
        "label": "Team shape",
        "value": "Product · Full-stack · SRE"
      }
    ],
    "coverHead": [
      "The work, named",
      "precisely."
    ],
    "coverIntro": "Six capabilities we staff and own end to end. You can engage one of them or the whole practice.",
    "capabilities": [
      {
        "title": "Product engineering",
        "text": "Full-stack and mobile delivery in small increments your teams can review, with design working alongside engineering rather than ahead of it."
      },
      {
        "title": "Architecture & modernisation",
        "text": "Decomposition, contracts, and migration paths that let you retire the monolith without a two-year feature freeze."
      },
      {
        "title": "Quality engineering",
        "text": "Test strategy, automation, and performance work that makes releases boring instead of heroic."
      },
      {
        "title": "DevOps & CI/CD",
        "text": "Pipelines, environments, and release engineering so shipping is a routine event rather than a Friday night."
      },
      {
        "title": "SRE & reliability",
        "text": "SLOs, error budgets, incident practice, and observability that turn outages into signal you can act on."
      },
      {
        "title": "Platform engineering",
        "text": "Internal platforms and paved roads that make the correct path the easy path for every product team."
      }
    ],
    "quote": "Architecture decisions are cheap on a whiteboard and expensive at 3am. We make them once, properly.",
    "whenHead": [
      "Signals this is",
      "your problem."
    ],
    "signals": [
      "Releases are slow, manual, or quietly feared.",
      "The monolith blocks every roadmap conversation.",
      "Incidents repeat and post-mortems never change the system.",
      "Four teams have built the same plumbing four different ways."
    ],
    "leaveHead": [
      "Assets you",
      "keep and run."
    ],
    "leave": [
      "A target architecture with a sequenced migration path",
      "Pipelines, environments, and automated test suites you own",
      "SLOs and observability matched to how the business measures uptime",
      "A paved road so the next team ships faster than the last"
    ],
    "runHead": [
      "From first call to",
      "your team owning it."
    ],
    "runIntro": "Every engagement is sequenced so you can stop, review, or redirect at a known point — never a twelve-month commitment on faith.",
    "tools": [
      "TypeScript",
      "React",
      "Next.js",
      "Node",
      "Go",
      "Python",
      "Terraform",
      "Kubernetes",
      "GitHub Actions",
      "OpenTelemetry"
    ],
    "steps": [
      {
        "title": "Discovery & architecture",
        "when": "Weeks 1–3",
        "text": "We audit the system as it really is, agree the target state, and sequence the path between them against your roadmap."
      },
      {
        "title": "Stand up the paved road",
        "when": "Weeks 4–8",
        "text": "Pipelines, environments, test automation, and observability go in first, so every increment after this one ships faster."
      },
      {
        "title": "Deliver in increments",
        "when": "Weeks 9+",
        "text": "Product and platform work ships in reviewable slices, with quality gates that keep regressions out of production."
      },
      {
        "title": "Reliability & handover",
        "when": "Ongoing",
        "text": "SLOs, incident practice, and documentation land with your teams so reliability outlives the engagement."
      }
    ]
  },
  {
    "slug": "cloud-data-security",
    "name": "Cloud, data & security",
    "title": "The stack your AI programme actually stands on.",
    "lede": "Cloud architecture, data platforms, identity, and cybersecurity — the cutting-edge stack AI programmes sit on.",
    "meta": [
      {
        "label": "Typical start",
        "value": "Platform assessment"
      },
      {
        "label": "First milestone",
        "value": "8–12 weeks"
      },
      {
        "label": "Team shape",
        "value": "Cloud · Data · Security"
      }
    ],
    "coverHead": [
      "The work, named",
      "precisely."
    ],
    "coverIntro": "Six capabilities we staff and own end to end. You can engage one of them or the whole practice.",
    "capabilities": [
      {
        "title": "Cloud architecture",
        "text": "Landing zones, networking, and tenancy designed for the workloads you are about to run, not the ones you already had."
      },
      {
        "title": "Data platforms & pipelines",
        "text": "Ingestion, modelling, and data contracts that give GenAI and analytics one trustworthy source instead of six copies."
      },
      {
        "title": "Identity & access",
        "text": "Workforce and workload identity, least privilege, and secrets handling that scale past the pilot."
      },
      {
        "title": "Cloud security",
        "text": "Posture management, threat detection, and control mapping aligned to the frameworks you are actually audited against."
      },
      {
        "title": "FinOps",
        "text": "Unit economics, tagging, and guardrails so growth in usage never surprises the finance team."
      },
      {
        "title": "Analytics enablement",
        "text": "Semantic layers and BI that let people answer their own questions without raising a ticket."
      }
    ],
    "quote": "The security bar is not a gate at the end. It is the shape of the platform from day one.",
    "whenHead": [
      "Signals this is",
      "your problem."
    ],
    "signals": [
      "GenAI work keeps stalling on data quality or data access.",
      "Cloud spend grows and nobody can attribute it to a team.",
      "Security review is the longest step in every launch.",
      "Every team maintains its own copy of the same data."
    ],
    "leaveHead": [
      "Assets you",
      "keep and run."
    ],
    "leave": [
      "A landing zone and reference architecture with guardrails enforced in code",
      "Governed data products with owners, contracts, and quality checks",
      "Identity and secrets patterns documented and rolled out",
      "Cost visibility per team, product, and workload"
    ],
    "runHead": [
      "From first call to",
      "your team owning it."
    ],
    "runIntro": "Every engagement is sequenced so you can stop, review, or redirect at a known point — never a twelve-month commitment on faith.",
    "tools": [
      "AWS",
      "Azure",
      "GCP",
      "Databricks",
      "Snowflake",
      "dbt",
      "Terraform",
      "Entra ID",
      "Okta",
      "OpenTofu"
    ],
    "steps": [
      {
        "title": "Assess and baseline",
        "when": "Weeks 1–3",
        "text": "We establish what exists across cloud, data, and identity, then rank the gaps that block the programme in front of you."
      },
      {
        "title": "Lay the foundation",
        "when": "Weeks 4–10",
        "text": "Landing zone, data platform, and identity patterns go in as code, with guardrails that hold without manual policing."
      },
      {
        "title": "Migrate and govern",
        "when": "Weeks 11+",
        "text": "Workloads and data products move across in waves, each one arriving with an owner, contracts, and quality checks."
      },
      {
        "title": "Run and optimise",
        "when": "Ongoing",
        "text": "Posture, reliability, and unit cost get reviewed on a cadence your platform team carries forward."
      }
    ]
  },
  {
    "slug": "digital-delivery",
    "name": "Digital delivery",
    "title": "Teams that ship the modernisation.",
    "lede": "Project teams that modernise products, platforms, and data estates — or stand up the first production GenAI workflow.",
    "meta": [
      {
        "label": "Typical start",
        "value": "Pod running in 2–3 weeks"
      },
      {
        "label": "Engagement",
        "value": "Outcome or capacity based"
      },
      {
        "label": "Team shape",
        "value": "Lead · Engineers · QA"
      }
    ],
    "coverHead": [
      "The work, named",
      "precisely."
    ],
    "coverIntro": "Six capabilities we staff and own end to end. You can engage one of them or the whole practice.",
    "capabilities": [
      {
        "title": "Delivery pods",
        "text": "Cross-functional teams with a lead who owns the outcome — not a pile of contractors you have to manage yourself."
      },
      {
        "title": "Modernisation programmes",
        "text": "Legacy products and platforms moved forward in slices, with the lights on for users throughout."
      },
      {
        "title": "Data estate migration",
        "text": "Warehouses, pipelines, and reporting moved onto a governed platform without losing history or trust."
      },
      {
        "title": "First GenAI workflow",
        "text": "One real workflow taken from idea to production, so the organisation has a reference implementation to build on."
      },
      {
        "title": "Programme management",
        "text": "Dependencies, risk, and reporting handled so your leaders see the truth early rather than at the deadline."
      },
      {
        "title": "Enablement & handover",
        "text": "Documentation, pairing, and training so the capability stays with your people after we leave."
      }
    ],
    "quote": "A pod that ships weekly beats a programme that reports monthly.",
    "whenHead": [
      "Signals this is",
      "your problem."
    ],
    "signals": [
      "You have the roadmap but not the hands to deliver it.",
      "A migration has been eighty percent done for two quarters.",
      "Hiring will take longer than the window you have.",
      "Previous vendors left systems nobody internally understands."
    ],
    "leaveHead": [
      "Assets you",
      "keep and run."
    ],
    "leave": [
      "A delivery pod with a named lead and a visible plan",
      "Working software shipped in reviewable increments",
      "Documentation and runbooks written as the work happens",
      "A trained internal team holding the keys at the end"
    ],
    "runHead": [
      "From first call to",
      "your team owning it."
    ],
    "runIntro": "Every engagement is sequenced so you can stop, review, or redirect at a known point — never a twelve-month commitment on faith.",
    "tools": [
      "Scrum",
      "Kanban",
      "Jira",
      "Linear",
      "GitHub",
      "Figma",
      "Confluence",
      "Slack"
    ],
    "steps": [
      {
        "title": "Shape the outcome",
        "when": "Weeks 1–2",
        "text": "We agree what done looks like, what it is worth, and which constraints are real, before anyone writes code."
      },
      {
        "title": "Stand up the pod",
        "when": "Weeks 2–3",
        "text": "A lead and the right specialists land together, already briefed, with the delivery plan visible to everyone."
      },
      {
        "title": "Deliver in slices",
        "when": "Ongoing",
        "text": "Work ships in increments you can review, with progress reported against the outcome rather than activity."
      },
      {
        "title": "Hand over the keys",
        "when": "Closing",
        "text": "Pairing, documentation, and training until your team can extend and operate everything we built together."
      }
    ]
  }
];

export const getServicePage = (slug: string) => SERVICE_PAGES.find((p) => p.slug === slug);
