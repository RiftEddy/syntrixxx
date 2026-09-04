import { Project, Service, Testimonial } from './types';

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
  { label: 'Client Revenue Influenced', value: '$380M+' },
  { label: 'Sub-Second Average Speed', value: '< 400ms' }
];

export const AGENCY_EMAIL = 'thef1nanceguy@hotmail.com';

export const SOCIAL_LINKS = {
  founder: {
    handle: '@nialekaeti',
    url: 'https://instagram.com/nialekaeti',
    label: 'Founder & Creative Lead',
    name: 'Niale Kaeti'
  },
  company: {
    handle: '@syntrixdev',
    url: 'https://instagram.com/syntrixdev',
    label: 'Syntrix Digital Atelier',
    name: 'Syntrix'
  }
};
