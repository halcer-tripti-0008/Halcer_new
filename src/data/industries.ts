export interface Industry {
  /** Name split over lines; `muted` lines render in the lighter colour. */
  name: { text: string; muted?: boolean }[];
  label: string;
  description: string;
  image: string;
  alt: string;
  width: number;
  height: number;
}

export const INDUSTRIES: Industry[] = [
  {
    name: [{ text: "Banking &" }, { text: "Financial Services", muted: true }],
    label: "Banking and Financial Services",
    description: "Platforms that carry strict controls: identity, data lineage, resilience and evidence for reviewers.",
    image: "banking",
    alt: "Advisers reviewing financial analytics with a client",
    width: 735,
    height: 490,
  },
  {
    name: [{ text: "Insurance" }],
    label: "Insurance",
    description:
      "Empowering insurance businesses with intelligent technology to streamline operations, manage risk, and deliver seamless customer experiences.",
    image: "insurance",
    alt: "Rain on a clear umbrella",
    width: 1000,
    height: 1000,
  },
  {
    name: [{ text: "Healthcare" }],
    label: "Healthcare",
    description: "Regulated data, clinical workflows and research platforms where auditability matters as much as speed.",
    image: "healthcare",
    alt: "Gloved hand holding a petri dish",
    width: 1000,
    height: 1000,
  },
  {
    name: [{ text: "Life" }, { text: "Sciences", muted: true }],
    label: "Life Sciences",
    description: "Data-heavy environments that need reproducible pipelines and careful model evaluation.",
    image: "lifesciences",
    alt: "Researcher loading sample tubes with a pipette",
    width: 1000,
    height: 1000,
  },
  {
    name: [{ text: "Industrial" }],
    label: "Industrial",
    description: "Plant, fleet and supply-chain systems that have to keep running while they are modernised.",
    image: "industrial",
    alt: "Steel plant interior with overhead cranes",
    width: 1000,
    height: 1000,
  },
  {
    name: [{ text: "Software &" }, { text: "Hi-Tech", muted: true }],
    label: "Software and Hi-Tech",
    description: "Product companies scaling engineering teams, platforms and AI features at the same time.",
    image: "software",
    alt: "Hands typing on a laptop showing code",
    width: 1000,
    height: 1000,
  },
];
