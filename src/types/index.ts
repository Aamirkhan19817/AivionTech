export interface TeamMember {
  id: string;
  name: string;
  role: string;
  initials: string;
  color: string;
  accent: string;
  image?: string;
}

export interface ServiceItem {
  number: string;
  title: string;
  description: string;
  features: string[];
  icon: string;
}

export interface DemoProject {
  id: string;
  name: string;
  category: string;
  path: string;
  htmlPath: string;
  tagline: string;
  description: string;
  style: string;
  accent: string;
  image?: string;
  highlights: string[];
}
