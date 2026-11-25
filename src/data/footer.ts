export interface FooterColumn {
  title: string;
  links: string[];
}

export const FOOTER_COLUMNS: FooterColumn[] = [
  {
    title: "Navigation",
    links: ["Homepage", "Global Delivery", "Overview", "Expertise", "Projects", "Testimonials"],
  },
  { title: "Company", links: ["About us", "Career", "Blogs"] },
  { title: "Legal", links: ["Terms of service", "Privacy policy", "Cookies", "Changelog"] },
];

export const NAV_LINKS = ["Home", "About", "Services", "Insights", "Careers"] as const;
