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

export type BillingCycle = 'one-time' | 'monthly' | 'yearly';

export interface PricingPackage {
  id: string;
  name: string;
  subDescription?: string;
  tagline: string;
  badge?: string;
  category?: 'starter' | 'growth' | 'flagship';
  tierLevel?: number;
  popular?: boolean;
  priceUsd: number;
  priceKsh: number;
  monthlyUsd: number;
  monthlyKsh: number;
  yearlyUsd: number;
  yearlyKsh: number;
  timeline: string;
  deliverables: string[];
  idealFor: string;
  highlights?: string[];
  accentColor?: string;
}

export interface PackageCheckoutData {
  packageId: string;
  packageName: string;
  billingCycle: BillingCycle;
  priceUsd: number;
  priceKsh: number;
  currency: 'USD' | 'KSH' | 'BOTH';
  fullName: string;
  email: string;
  phone: string;
  company: string;
  paymentMethod: 'mpesa' | 'card' | 'wire';
  notes: string;
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

export interface MpesaPaymentDetails {
  recipientName: string;
  phoneNumber: string;
  formattedPhone: string;
  paybillNumber?: string;
  accountNumber?: string;
}

