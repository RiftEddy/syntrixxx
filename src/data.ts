import { Project, Service, Testimonial, PricingPackage } from './types';

export const SERVICES: Service[] = [
  {
    id: 'web-design',
    number: '01',
    title: 'Bespoke Web Design',
    subtitle: 'Artisanal digital architecture crafted pixel-by-pixel',
    description: 'We don’t use themes or boilerplate patterns. Every layout, typographical scale, and spatial rhythm is tailored specifically to elevate your brand’s authority and emotional resonance.',
    deliverables: [
      'Custom Responsive UI / UX',
      'Interactive Micro-Animations',
      'Mobile-First Layout Engineering',
      'Component Library & Design Tokens',
      'Accessibility AA Compliance'
    ],
    techStack: ['Figma', 'React 19', 'Tailwind CSS', 'Motion'],
    timeline: '3 - 5 Weeks',
    idealFor: 'High-growth brands and luxury labels seeking unmistakable prestige.'
  },
  {
    id: 'ui-ux',
    number: '02',
    title: 'UI/UX & Product Strategy',
    subtitle: 'High-conversion design backed by cognitive psychology',
    description: 'We untangle complex workflows into intuitive, razor-sharp user experiences. From multi-tiered SaaS platforms to high-ticket checkout flows, we optimize for retention and effortless clarity.',
    deliverables: [
      'Customer Journey Mapping',
      'Information Architecture Audits',
      'High-Fidelity Interactive Prototypes',
      'Design System Governance',
      'Usability & Conversion Optimization'
    ],
    techStack: ['Figma', 'Design Systems', 'User Research', 'Analytics Integration'],
    timeline: '4 - 6 Weeks',
    idealFor: 'Tech startups, FinTech platforms, and SaaS products requiring seamless usability.'
  },
  {
    id: 'creative-branding',
    number: '03',
    title: 'Brand Identity & Creative Direction',
    subtitle: 'Provocative visual languages that refuse to be ignored',
    description: 'A website is only as strong as the identity behind it. We sculpt complete visual universes—iconography, typographical hierarchy, color harmony, and motion signatures that command attention.',
    deliverables: [
      'Logo Lockups & Emblem Design',
      'Editorial Typography Selection',
      'Color Space & Contrast Matrices',
      'Digital & Print Brand Guidelines',
      'Social & Marketing Asset Kits'
    ],
    techStack: ['Vector Artistry', 'Typography Licensing', '3D Asset Creation', 'Brand Books'],
    timeline: '2 - 4 Weeks',
    idealFor: 'New ventures launching publicly or established enterprises executing a rebrand.'
  },
  {
    id: 'headless-engineering',
    number: '04',
    title: 'Full-Stack Digital Engineering',
    subtitle: 'Sub-second speeds with robust modern architectures',
    description: 'We engineer blazingly fast websites using modern modern stacks. Zero bloat, instant transitions, and flawless Core Web Vitals that rank high on search and convert visitors on arrival.',
    deliverables: [
      'Clean Modular TypeScript',
      'Headless CMS Integrations',
      'Dynamic API Orchestration',
      'SEO & OpenGraph Optimization',
      'Automated CI/CD Deployment Pipelines'
    ],
    techStack: ['Next.js / Vite', 'TypeScript', 'Node.js', 'Vercel / Cloud Run'],
    timeline: '3 - 6 Weeks',
    idealFor: 'Enterprises needing uncompromising performance, security, and scalability.'
  },
  {
    id: 'motion-3d',
    number: '05',
    title: 'Motion & Interactive WebGL',
    subtitle: 'Cinematic storytelling through interactive motion',
    description: 'Engage your visitors with fluid gesture controls, scroll-tied physics, and interactive 3D elements that turn passive browsing into a memorable sensory journey.',
    deliverables: [
      'Scroll-Triggered Sequences',
      'GPU-Accelerated Visual Effects',
      'Interactive Product Explorers',
      'Dynamic SVG & Canvas Graphics',
      'Performance Budget Auditing'
    ],
    techStack: ['Motion', 'Three.js / WebGL', 'GLSL Shaders', 'Canvas API'],
    timeline: '3 - 5 Weeks',
    idealFor: 'Visionary product launches, premium physical products, and creative tech.'
  },
  {
    id: 'performance-seo',
    number: '06',
    title: 'Performance & Technical SEO',
    subtitle: 'Engineered for search supremacy and instant loading',
    description: 'A beautiful site that loads slowly loses customers. We audit, streamline, and optimize web assets to achieve near-perfect 100 Lighthouse metrics and technical SEO dominance.',
    deliverables: [
      'Core Web Vitals Perfection',
      'Structured Schema Markup',
      'Asset Compression & Edge Caching',
      'Automated Sitemap & Meta Governance',
      'Internationalization (i18n) Setup'
    ],
    techStack: ['Lighthouse 100', 'Edge CDN', 'JSON-LD Schema', 'Web Vitals'],
    timeline: '1 - 2 Weeks',
    idealFor: 'Existing platforms losing conversions to slow load times and technical debt.'
  }
];

export const PROJECTS: Project[] = [
  {
    id: 'aura-horlogerie',
    title: 'Aura Haute Horlogerie',
    client: 'Aura Geneva',
    category: 'Luxury & E-Commerce',
    year: '2025',
    tagline: 'Ultra-luxury Swiss timepiece e-commerce with real-time 3D craftsmanship showcase',
    description: 'A bespoke digital boutique for an avant-garde Geneva watchmaker. We engineered a dark, atmospheric shopping experience featuring interactive 360-degree exploded movement views and concierge reservation flows.',
    challenge: 'The client needed a digital presentation that mirrored the physical weight and mechanical wonder of $80,000+ limited edition timepieces without sacrificing mobile load times.',
    solution: 'Engineered a bespoke black-and-gold interactive canvas with smooth camera transitions, custom typography, and sub-500ms image asset hydration.',
    metrics: [
      { label: 'Conversion Uplift', value: '+142%' },
      { label: 'Avg Session Duration', value: '5m 18s' },
      { label: 'VIP Inquiries', value: '4.8x' }
    ],
    tags: ['React', 'WebGL', 'E-Commerce', 'Luxury UI'],
    accentColor: '#FFD700',
    theme: 'gold',
    previewDetails: {
      heroMetric: '+142% sales conversion in first 60 days',
      deliverables: ['Custom E-Commerce Frontend', '3D Movement Inspector', 'VIP Concierge Booking Engine', 'Brand Soundscapes'],
      timeline: '7 Weeks',
      testimonial: {
        quote: 'Syntrix by nialekaeti captured the soul of Swiss horology with breathtaking precision. Our collectors were astonished.',
        author: 'Alexandre Meyer',
        role: 'Creative Director, Aura Geneva'
      }
    }
  },
  {
    id: 'vortex-gpu',
    title: 'Vortex Cloud Compute',
    client: 'Vortex AI Technologies',
    category: 'SaaS & Tech',
    year: '2025',
    tagline: 'High-velocity developer platform for cluster orchestration and inference benchmarking',
    description: 'A developer-first portal blending raw computational power with minimalist elegance. Features live GPU cluster telemetry, interactive command-line simulations, and instant cluster provisioning.',
    challenge: 'Traditional cloud compute platforms feel dense, sterile, and confusing. Vortex needed to communicate raw speed and developer empathy.',
    solution: 'Designed a high-contrast dark theme with sharp yellow data accents, monospaced typography, and real-time interactive latency calculators.',
    metrics: [
      { label: 'Sign-up Velocity', value: '+210%' },
      { label: 'Time-to-Deploy', value: '-65%' },
      { label: 'Core Web Vitals', value: '99/100' }
    ],
    tags: ['TypeScript', 'Tailwind', 'Realtime Telemetry', 'Developer UX'],
    accentColor: '#FFD700',
    theme: 'gold',
    previewDetails: {
      heroMetric: '210% increase in developer account activations',
      deliverables: ['Documentation Architecture', 'Interactive CLI Simulator', 'Pricing & Cluster Matrix', 'Performance Dashboard'],
      timeline: '5 Weeks',
      testimonial: {
        quote: 'Niale and the Syntrix team took our technical product and turned it into the most talked-about developer site in the AI space.',
        author: 'Dr. Elena Rostova',
        role: 'Co-Founder & CTO, Vortex AI'
      }
    }
  },
  {
    id: 'aetheria-fintech',
    title: 'Aetheria Sovereign Wealth',
    client: 'Aetheria Capital Ltd',
    category: 'FinTech',
    year: '2024',
    tagline: 'Next-generation institutional liquidity terminal and sovereign asset allocation',
    description: 'An ultra-exclusive institutional investment interface designed for private family offices managing $500M+ in cross-border capital.',
    challenge: 'Communicating high security and institutional rigor while breaking away from dated Wall Street blue templates.',
    solution: 'Crafted an impenetrable obsidian-black design language with subtle gold data streams and encrypted client onboarding portals.',
    metrics: [
      { label: 'AUM Onboarded', value: '$420M+' },
      { label: 'Lead Quality Score', value: '98%' },
      { label: 'Lighthouse Score', value: '100' }
    ],
    tags: ['FinTech UI', 'Security Architecture', 'Data Viz', 'Tailwind'],
    accentColor: '#FFD700',
    theme: 'gold',
    previewDetails: {
      heroMetric: '$420M+ institutional assets onboarded in Q1',
      deliverables: ['Investor Portal Architecture', 'Real-Time Yield Visualizer', 'Encrypted Document Vault UI', 'Mobile Executive View'],
      timeline: '6 Weeks',
      testimonial: {
        quote: 'The level of craftsmanship is unmatched. In institutional finance, trust is visual, and Syntrix engineered pure confidence.',
        author: 'Marcus Vance',
        role: 'Managing Partner, Aetheria Capital'
      }
    }
  },
  {
    id: 'monolith-atelier',
    title: 'Monolith Architecture',
    client: 'Monolith Spatial Studio',
    category: 'Architecture & Culture',
    year: '2024',
    tagline: 'Brutalist spatial portfolio showcasing award-winning concrete and timber sanctuaries',
    description: 'An editorial tribute to physical structure. Heavy typography, asymmetrical image balances, and smooth cinematic transitions that celebrate tactile materiality.',
    challenge: 'Presenting high-resolution architectural photography without slowing page transitions or overwhelming the visitor.',
    solution: 'Curated custom full-bleed split galleries, subtle scroll-linked pan effects, and refined architectural blueprints overlays.',
    metrics: [
      { label: 'Design Awards', value: '3x Gold' },
      { label: 'Inbound Inquiries', value: '+175%' },
      { label: 'Bounce Rate', value: '21%' }
    ],
    tags: ['Editorial Design', 'Photography Showcase', 'Motion UI', 'Architecture'],
    accentColor: '#FFFFFF',
    theme: 'mono',
    previewDetails: {
      heroMetric: 'Won 3 international design awards within 30 days',
      deliverables: ['Custom Editorial Portfolio', 'Project Blueprint Viewer', 'Bespoke Typography Licensing', 'Press & Monograph Archive'],
      timeline: '4 Weeks',
      testimonial: {
        quote: 'Syntrix understands space and negative void like architects do. Our work has never looked more monumental.',
        author: 'Kenji Takahashi',
        role: 'Principal Architect, Monolith'
      }
    }
  },
  {
    id: 'hyperion-hypercars',
    title: 'Hyperion Automotive',
    client: 'Hyperion Motor Group',
    category: 'Luxury & E-Commerce',
    year: '2024',
    tagline: 'Real-time custom electric hypercar configurator & allocation reservation suite',
    description: 'An aerodynamic digital sanctuary where prospective owners configure bespoke carbon fiber weaves, interior leather stitching, and track aero packages.',
    challenge: 'Delivering fluid 60 FPS customization across 140+ individual bespoke options directly in the browser.',
    solution: 'Built a lightweight custom canvas pipeline with instant state synchronicity and dynamic build-sheet PDF generation.',
    metrics: [
      { label: 'Pre-Orders Sold', value: '100% Sold Out' },
      { label: 'Avg Config Time', value: '8m 42s' },
      { label: 'Mobile Conversion', value: '64%' }
    ],
    tags: ['3D Configurator', 'Automotive', 'Vite', 'High-Performance UI'],
    accentColor: '#FF2A2A',
    theme: 'red',
    previewDetails: {
      heroMetric: 'All 75 hypercar build allocations reserved in 48 hours',
      deliverables: ['Interactive 3D Exterior Configurator', 'Custom Build Sheet Generator', 'Deposit Escrow Gateway', 'Press Room'],
      timeline: '8 Weeks',
      testimonial: {
        quote: 'An astonishing technical and creative achievement. Syntrix brought the thrill of our hypercar to the digital screen.',
        author: 'Julian Thorne',
        role: 'Head of Brand, Hyperion'
      }
    }
  },
  {
    id: 'kinetix-audio',
    title: 'Kinetix Spatial Sound',
    client: 'Kinetix Labs',
    category: 'SaaS & Tech',
    year: '2024',
    tagline: 'Generative spatial acoustic studio for next-generation cinematic game engines',
    description: 'An auditory and visual playground where audio engineers audition dynamic reverberation models in real-time right inside the browser.',
    challenge: 'Visualizing acoustic waves and frequency responses dynamically with low CPU overhead.',
    solution: 'Interactive Web Audio API canvas visualizer with stark monochromatic geometry and electric gold frequency nodes.',
    metrics: [
      { label: 'User Engagement', value: '+320%' },
      { label: 'Plugin Downloads', value: '85k+' },
      { label: 'Community Growth', value: '4.2x' }
    ],
    tags: ['Web Audio API', 'Interactive Canvas', 'Creative Coding', 'Design'],
    accentColor: '#FFD700',
    theme: 'gold',
    previewDetails: {
      heroMetric: '85,000+ audio plugin downloads driven directly by the web experience',
      deliverables: ['Interactive Sound Canvas', 'Realtime Audio Playground', 'Developer SDK Documentation', 'Subscription Funnel'],
      timeline: '5 Weeks',
      testimonial: {
        quote: 'Niale Kaeti’s design leadership made our audio technology look as groundbreaking as it sounds.',
        author: 'Soren Lindqvist',
        role: 'Lead Sound Architect, Kinetix'
      }
    }
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    quote: 'Syntrix doesn’t just design websites; they construct digital powerhouses. The split-second precision, the bold black-and-gold visual weight, and the radical performance skyrocketed our enterprise pipeline.',
    author: 'Seraphina Sterling',
    role: 'Chief Marketing Officer',
    company: 'Sterling & Co. Private Equity',
    metric: '3.4x Pipeline Growth',
    year: '2025'
  },
  {
    id: '2',
    quote: 'Working directly with Niale Kaeti was a masterclass in creative direction. He eliminated all SaaS clichés and gave us an identity and digital home that makes competitors look ten years behind.',
    author: 'Dmitri Gallagher',
    role: 'Founder & CEO',
    company: 'Vortex AI Technologies',
    metric: '99.4% CSAT',
    year: '2025'
  },
  {
    id: '3',
    quote: 'Our previous agency spent 6 months producing generic templates. Syntrix delivered a bespoke, breathtaking flagship platform in 7 weeks. Our conversion rate doubled overnight.',
    author: 'Claire Montclaire',
    role: 'VP of Digital Experience',
    company: 'Aura Luxury Group',
    metric: '+142% Sales Conversion',
    year: '2024'
  }
];

export const AGENCY_STATS = [
  { label: 'Flagship Digital Launches', value: '45+' },
  { label: 'Average Conversion Uplift', value: '+160%' },
  { label: 'Sub-Second Average Speed', value: '< 400ms' }
];

export const AGENCY_EMAIL = 'thef1nanceguy@hotmail.com';

export const MPESA_PAYMENT_INFO = {
  recipientName: 'Niale Kaeti (Syntrix Digital)',
  phone: '0712345678',
  formattedPhone: '+254 712 345 678',
  ussdCode: '*334*1#',
  tillNumber: '174379'
};

export const EXCHANGE_RATE_USD_KSH = 130;

export const PACKAGES: PricingPackage[] = [
  {
    id: 'website-no-hosting',
    name: 'Glacier',
    subDescription: 'Website (No Hosting)',
    tagline: 'Clean, modern responsive website engineered for high speed. You provide your own hosting; we deliver production-ready code & deployment files.',
    badge: '15K Essential',
    category: 'starter',
    tierLevel: 1,
    priceUsd: 115,
    priceKsh: 15000,
    monthlyUsd: 19,
    monthlyKsh: 2500,
    yearlyUsd: 192,
    yearlyKsh: 25000,
    timeline: '3 – 4 Days',
    idealFor: 'Solopreneurs, consultants, and brands who already possess hosting or cPanel and need a sharp, modern website built.',
    highlights: [
      '1 – 3 Responsive Pages / Sections',
      'Client brings own hosting',
      'Turnaround in 3 – 4 days'
    ],
    deliverables: [
      '1 – 3 Tailored Responsive Web Pages / Sections',
      'Mobile & Tablet Responsive Layouts (Zero template bloat)',
      'Fast Loading Speeds & Lightweight Semantic HTML / React',
      'Interactive Contact Form with WhatsApp & Email Routing',
      'Complete Production ZIP / GitHub Source Code Transfer',
      'Deployment Guidance for cPanel, Netlify, or Vercel',
      '7-Day Handover Revisions & Bug-Fix Guarantee'
    ],
    accentColor: '#FFFFFF'
  },
  {
    id: 'website-with-hosting',
    name: 'Phantom',
    subDescription: 'Website + 1-Yr Cloud Hosting',
    tagline: 'Complete turnkey launch package. Custom website with 1 full year of fast cloud hosting, free custom domain, and SSL security certificate.',
    badge: 'Best Starter Value',
    popular: true,
    category: 'starter',
    tierLevel: 2,
    priceUsd: 192,
    priceKsh: 25000,
    monthlyUsd: 29,
    monthlyKsh: 3800,
    yearlyUsd: 292,
    yearlyKsh: 38000,
    timeline: '4 – 6 Days',
    idealFor: 'Businesses wanting an all-in-one hands-off setup with zero technical headache and 1 year of hosting & domain covered.',
    highlights: [
      'Up to 5 custom pages',
      '1-Year cloud hosting included',
      'Free .com / .co.ke domain & SSL'
    ],
    deliverables: [
      'Up to 5 Bespoke Responsive Business Pages',
      '1 Full Year High-Speed Cloud Hosting (99.9% Uptime Guarantee)',
      'Free Custom Domain (.com / .co.ke) Registered for 1 Year',
      'Free Automated SSL Certificate (HTTPS Security Padlock)',
      '2 Professional Branded Webmail Inboxes (info@yourdomain.com)',
      'Instant Floating Click-to-WhatsApp Chat Integration',
      'High-Speed Edge Caching & Mobile Velocity Optimization',
      '14-Day Post-Launch Support & Minor Revisions'
    ],
    accentColor: '#FFD700'
  },
  {
    id: 'google-identity-pack',
    name: 'Vanguard',
    subDescription: 'Google Identification & Maps Pack',
    tagline: 'Dominate local search. Complete website + 1-Yr hosting with verified Google Business Profile, Maps listing, and Google Search Console indexing.',
    badge: 'Google Verified',
    category: 'starter',
    tierLevel: 3,
    priceUsd: 292,
    priceKsh: 38000,
    monthlyUsd: 42,
    monthlyKsh: 5500,
    yearlyUsd: 420,
    yearlyKsh: 55000,
    timeline: '6 – 8 Days',
    idealFor: 'Local businesses, clinics, legal firms, shops, and service providers who need paying customers to find them on Google Maps & Search.',
    highlights: [
      'Google Maps & Business Profile verified',
      'Google Search Console indexing',
      'Includes 1-Yr hosting & domain'
    ],
    deliverables: [
      'Complete Website + 1-Yr Cloud Hosting & Free Domain (.com / .co.ke)',
      'Official Google Business Profile Setup & Map Pin Verification',
      'Google Search Console Setup & XML Sitemap Indexing Submission',
      'Google Analytics 4 (GA4) Live Visitor Traffic Dashboard',
      'Local Business Schema Markup (JSON-LD Local SEO Snippets)',
      'Direct Click-to-Call & "Get Directions" Map Triggers',
      'Social Profiles Synchronization & OpenGraph Social Cards',
      '30-Day Google Search Indexing & Health Monitoring'
    ],
    accentColor: '#00D09C'
  },
  {
    id: 'growth-marketing-sprint',
    name: 'Apex',
    subDescription: 'Growth Web & Marketing Sprint',
    tagline: 'High-converting sales engine with Google & Meta Ads tracking pixels, conversion copywriting, and targeted traffic launchpad.',
    badge: 'Marketing & Leads',
    category: 'growth',
    tierLevel: 4,
    priceUsd: 500,
    priceKsh: 65000,
    monthlyUsd: 73,
    monthlyKsh: 9500,
    yearlyUsd: 730,
    yearlyKsh: 95000,
    timeline: '8 – 12 Days',
    idealFor: 'Established ventures, real estate, education, and scaling agencies ready to run paid ads and convert traffic into qualified inquiries.',
    highlights: [
      'Meta Pixel & Google Ads setup',
      'Conversion-focused copywriting',
      'Full Google Identity & SEO'
    ],
    deliverables: [
      'Complete High-Converting Multi-Page Platform + 1-Yr Hosting/Domain',
      'Complete Google Identification (Google Maps, Search Console, GA4)',
      'Meta Pixel (Facebook & Instagram) & Conversion API Integration',
      'Google Ads (Search & Performance Max) Campaign Foundation',
      'High-Conversion Sales Copywriting & Clear Value Proposition',
      'Lead Magnet Funnel with Automated Email & WhatsApp Inquiries',
      'Core Web Vitals Optimization for 95+ Ad Quality Rank',
      '30-Day Advertising Conversion & Retargeting Audit'
    ],
    accentColor: '#FFD700'
  },
  {
    id: 'task-retainer',
    name: 'Spectre',
    subDescription: 'Agile Retainer & Task Sprint',
    tagline: 'Targeted high-velocity design & engineering sprint for focused optimizations, speed tuning, and key feature builds.',
    badge: 'Flexible Sprint',
    category: 'growth',
    tierLevel: 5,
    priceUsd: 850,
    priceKsh: 110500,
    monthlyUsd: 650,
    monthlyKsh: 85000,
    yearlyUsd: 6500,
    yearlyKsh: 850000,
    timeline: '3 – 5 Days',
    idealFor: 'Existing platforms requiring speed optimization, high-converting funnel redesigns, or specific feature additions.',
    highlights: [
      'Dedicated 20-hour sprint',
      'Lighthouse 100 performance tune',
      'Immediate delivery within 5 days'
    ],
    deliverables: [
      'Dedicated 20-Hour High-Velocity Senior Sprint',
      'Performance Overhaul & Core Web Vitals Optimization',
      'High-Conversion Funnel & Checkout UX Redesign',
      'Custom Interactive Component or Custom Calculator',
      'Clean Modular TypeScript Delivery with Documentation',
      'Direct Code Reviews & Cross-Device QA'
    ],
    accentColor: '#FFFFFF'
  },
  {
    id: 'commerce-mpesa-engine',
    name: 'Obsidian',
    subDescription: 'Commerce & M-Pesa Engine',
    tagline: 'Full commercial platform with automated M-Pesa STK push checkout, product catalog, customer accounts, and automated SMS/WhatsApp alerts.',
    badge: 'M-Pesa Commerce',
    category: 'growth',
    tierLevel: 6,
    priceUsd: 920,
    priceKsh: 120000,
    monthlyUsd: 110,
    monthlyKsh: 14500,
    yearlyUsd: 1115,
    yearlyKsh: 145000,
    timeline: '2 – 3 Weeks',
    idealFor: 'Retailers, boutique brands, wholesalers, and e-commerce stores wanting seamless automated instant Kenyan and global payments.',
    highlights: [
      'Automated M-Pesa STK Push API',
      'Product catalog & inventory admin',
      'Instant SMS / WhatsApp alerts'
    ],
    deliverables: [
      'Full Dynamic E-Commerce Storefront with Product Catalog & Filtering',
      'Instant Automated M-Pesa STK Push / Paybill / Till API Integration',
      'Credit/Debit Card Global Checkout (Stripe / Pesapal)',
      'Real-Time Admin Dashboard for Orders, Stock & Customer Management',
      'Automated WhatsApp & SMS Instant Customer Order Confirmations',
      'Google Merchant Center Product Catalog Feed & Structured Schema',
      'High-Performance Cloud VPS Architecture & 1-Year Hosting',
      '45-Day Priority Post-Launch Technical Support & Staff Walkthrough'
    ],
    accentColor: '#00D09C'
  },
  {
    id: 'sprint-launch',
    name: 'Monolith',
    subDescription: 'Sprint Launch',
    tagline: 'High-impact bespoke web sanctuary engineered for rapid velocity and instant market authority.',
    badge: 'Bespoke Velocity',
    category: 'flagship',
    tierLevel: 7,
    priceUsd: 2500,
    priceKsh: 325000,
    monthlyUsd: 290,
    monthlyKsh: 38000,
    yearlyUsd: 2920,
    yearlyKsh: 380000,
    timeline: '1 – 2 Weeks',
    idealFor: 'Founders launching an MVP, venture spin-outs, or single-product flagship landing sanctuaries.',
    highlights: [
      '1 – 3 Bespoke responsive pages',
      'Sub-400ms edge performance',
      'Lead capture & instant routing'
    ],
    deliverables: [
      '1 – 3 Custom Tailored Responsive Pages',
      'Pixel-Perfect Layouts (Zero templates or boilerplate)',
      'Sub-400ms High-Velocity Edge CDN Deployment',
      'Lead Capture & Email Routing to your inbox',
      'Core Web Vitals Perfection (98+ Google Lighthouse)',
      'Mobile Gestures & Polished Micro-Interactions',
      'Technical SEO Foundation & OpenGraph Meta Cards',
      '14-Day Post-Launch Hypercare & Revisions'
    ],
    accentColor: '#FFFFFF'
  },
  {
    id: 'flagship-platform',
    name: 'Aether',
    subDescription: 'Flagship Platform',
    tagline: 'The definitive web presence designed to command premium pricing and absolute category dominance.',
    badge: 'Atelier Flagship',
    popular: true,
    category: 'flagship',
    tierLevel: 8,
    priceUsd: 5800,
    priceKsh: 754000,
    monthlyUsd: 600,
    monthlyKsh: 78000,
    yearlyUsd: 6000,
    yearlyKsh: 780000,
    timeline: '3 – 4 Weeks',
    idealFor: 'Scaling startups, enterprise corporations, and luxury brands requiring undeniable prestige.',
    highlights: [
      'Up to 8 bespoke pages',
      'Headless CMS integration',
      'Custom kinetic micro-interactions'
    ],
    deliverables: [
      'Up to 8 Bespoke Architecture Pages',
      'Headless CMS Setup (Sanity / Strapi / Custom self-serve)',
      'Custom Motion Choreography & Kinetic Transitions',
      'Interactive Product or Dynamic Service Explorers',
      'Full Design Tokens & Scalable UI Component Library',
      'Technical SEO Architecture & JSON-LD Structured Data',
      'Interactive Lead Funnels & Custom Form Automations',
      '30-Day Dedicated VIP Post-Launch Support & Warranty'
    ],
    accentColor: '#FFD700'
  },
  {
    id: 'haute-architecture',
    name: 'Hyperion',
    subDescription: 'Haute Architecture & Rebrand',
    tagline: 'Uncompromising digital transformation featuring custom 3D/WebGL experiences and brand identity.',
    badge: 'Executive Flagship',
    category: 'flagship',
    tierLevel: 9,
    priceUsd: 12500,
    priceKsh: 1625000,
    monthlyUsd: 1230,
    monthlyKsh: 160000,
    yearlyUsd: 12300,
    yearlyKsh: 1600000,
    timeline: '5 – 7 Weeks',
    idealFor: 'Market leaders, luxury commerce, and visionary innovators wanting an avant-garde digital statement.',
    highlights: [
      'Unlimited bespoke digital ecosystem',
      'Interactive 3D / WebGL canvas visualizer',
      'Complete brand identity & design system'
    ],
    deliverables: [
      'Unlimited Bespoke Multi-Page Architecture',
      'Interactive 3D / WebGL Visualizers & Shaders',
      'Complete Visual Identity System (Logo Suite, Typography, Brand Book)',
      'Bespoke High-Ticket Checkout or Portal Architecture',
      'Multi-Language & Multi-Currency Engine',
      'Direct 1-on-1 Creative Direction with Niale Kaeti',
      'Full Production CI/CD Pipelines & Server Infrastructure',
      '60-Day Priority Retainer & Quarterly Conversion Audits'
    ],
    accentColor: '#FF0000'
  }
];

export const SOCIAL_LINKS = {
  founder: {
    handle: '@nialekaeti',
    url: 'https://instagram.com/nialekaeti',
    label: 'Founder & Creative Lead',
    name: 'Niale Kaeti'
  },
  company: {
    handle: '@syntrixinc',
    url: 'https://instagram.com/syntrixinc',
    label: 'Syntrix Digital Atelier',
    name: 'Syntrix'
  }
};
