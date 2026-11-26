export interface FooterColumn {
  title: string;
  links: string[];
}

export const FOOTER_COLUMNS: FooterColumn[] = [
  {
    title: "Navigation",
    links: ["Homepage", "Global Delivery", "Overview", "Expertise", "Projects", "Testimonials"],
  },
  { title: "Company", links: ["About us", "Services", "Insights", "Career", "Blogs"] },
  { title: "Legal", links: ["Terms of service", "Privacy policy", "Cookies", "Changelog"] },
];

/** Footer links that go somewhere; every other footer link is still a placeholder ("#"). */
export const FOOTER_HREFS: Record<string, string> = {
  Homepage: "/",
  "About us": "/about",
  Services: "/services",
  Insights: "/insights",
  Projects: "/#work", // the "Our Projects" section on the home page
};

export const NAV_LINKS = ["Home", "About", "Services", "Insights", "Careers"] as const;

export const NAV_HREFS: Record<(typeof NAV_LINKS)[number], string> = {
  Home: "/",
  About: "/about",
  Services: "/services",
  Insights: "/insights",
  Careers: "#",
};
