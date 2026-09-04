export type ProjectCategory = 'All' | 'Luxury & E-Commerce' | 'SaaS & Tech' | 'FinTech' | 'Architecture & Culture';

export interface Project {
  id: string;
  title: string;
  client: string;
  category: ProjectCategory;
  year: string;
  tagline: string;
  description: string;
  challenge: string;
  solution: string;
  metrics: { label: string; value: string }[];
  tags: string[];
  accentColor: string;
  theme: 'gold' | 'red' | 'mono';
  previewDetails: {
    heroMetric: string;
    deliverables: string[];
    timeline: string;
    testimonial?: {
      quote: string;
      author: string;
      role: string;
    };
  };
}

export interface Service {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  deliverables: string[];
  techStack: string[];
  timeline: string;
  idealFor: string;
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  company: string;
  metric: string;
  year: string;
}

export interface ContactFormData {
  fullName: string;
  email: string;
  company: string;
  service: string;
  budget: string;
  timeline: string;
  message: string;
}
