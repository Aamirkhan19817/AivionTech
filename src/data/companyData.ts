import { TeamMember, ServiceItem, DemoProject } from '../types';

export const COMPANY_INFO = {
  name: "AIVION TECH",
  subtitle: "SOFTWARE HOUSE",
  tagline: "Your Vision | Our Code",
  email: "aiviontech01@gmail.com",
  phone: "0313-0524729",
  address: "SSA, Sarwar Rd, Barakahu, Islamabad",
  description: "We design and build modern digital experiences, intelligent applications, and powerful software solutions.",
  aboutHeading: "WE TURN IDEAS INTO DIGITAL PRODUCTS.",
  aboutText: "AIVION TECH is a software house focused on creating modern digital experiences, intelligent applications and custom software solutions."
};

export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: "ceo",
    name: "Muhammad Aamir Khan",
    role: "CEO",
    initials: "MK",
    color: "from-cyan-500/20 to-blue-600/30",
    accent: "#06b6d4"
  },
  {
    id: "coo",
    name: "Akram Latif",
    role: "COO",
    initials: "AL",
    color: "from-indigo-500/20 to-violet-600/30",
    accent: "#8b5cf6"
  },
  {
    id: "hr",
    name: "Mubashir Salim",
    role: "HR",
    initials: "MS",
    color: "from-blue-500/20 to-indigo-600/30",
    accent: "#3b82f6"
  },
  {
    id: "cto",
    name: "Mujeeb ur Rehman",
    role: "CTO",
    initials: "MR",
    color: "from-teal-500/20 to-cyan-600/30",
    accent: "#14b8a6"
  },
  {
    id: "cmo",
    name: "Amanullah",
    role: "CMO",
    initials: "A",
    color: "from-sky-500/20 to-blue-700/30",
    accent: "#0ea5e9"
  }
];

export const SERVICES: ServiceItem[] = [
  {
    number: "01",
    title: "Web Development",
    description: "Modern, responsive and scalable websites built for businesses, brands and digital products.",
    features: ["Custom React & Next.js architectures", "High-performance responsive design", "Ultra-fast load speeds & SEO mastery", "Scalable component design systems"],
    icon: "Globe"
  },
  {
    number: "02",
    title: "Mobile App Development",
    description: "Beautiful and functional mobile applications designed for Android and iOS experiences.",
    features: ["Cross-platform Flutter & React Native", "Fluid native 60fps animations", "Offline-first local synchronization", "App Store & Google Play compliance"],
    icon: "Smartphone"
  },
  {
    number: "03",
    title: "AI & Machine Learning",
    description: "Intelligent systems, predictive models and AI-powered solutions designed around real business needs.",
    features: ["Custom neural network pipelines", "Predictive business analytics", "Natural language & vision automation", "Enterprise model integration"],
    icon: "Cpu"
  },
  {
    number: "04",
    title: "Custom Software Development",
    description: "Custom-built software designed around specific workflows, businesses and operational requirements.",
    features: ["Tailored enterprise business logic", "Robust REST & GraphQL APIs", "Secure relational database schemas", "High-throughput cloud architecture"],
    icon: "Code"
  }
];

export const ABOUT_PILLARS = [
  { title: "Innovation", desc: "Pushing technical frontiers with modern architectures and cutting-edge paradigms." },
  { title: "Technology", desc: "Engineered with resilient, modern stacks that scale cleanly without technical debt." },
  { title: "Creativity", desc: "Synthesizing deep aesthetic craft with mathematical precision and tactile interfaces." },
  { title: "Problem Solving", desc: "Turning complex enterprise challenges into intuitive, streamlined digital workflows." },
  { title: "User Experience", desc: "Obsessive attention to micro-interactions, ergonomics, and seamless navigation." },
  { title: "Custom Solutions", desc: "Bespoke digital engines specifically constructed around your business objectives." }
];

export const DEMO_PROJECTS: DemoProject[] = [
  {
    id: "restaurant",
    name: "NOOR TABLE",
    category: "Restaurant / Food",
    path: "/AivionTech/demos/restaurant",
    htmlPath: "/AivionTech/demos/restaurant.html",
    tagline: "Artisan Gastronomy & Midnight Dining Experience",
    description: "A dark, warm, and sophisticated fine dining experience with an artisan tasting menu, sommelier pairings, and seamless real-time table reservations.",
    style: "Elegant Â· Dark Â· Premium Â· Warm",
    accent: "#eab308",
    image: "/AivionTech/assets/images/culinary_noor_table_1790952115305.jpg",
    highlights: ["Interactive Tasting Menu", "Real-Time Reservation Modal", "Sommelier Cellar Showcase", "Chef's Table Experience"]
  },
  {
    id: "ecommerce",
    name: "VANTA STORE",
    category: "E-Commerce",
    path: "/AivionTech/demos/ecommerce",
    htmlPath: "/AivionTech/demos/ecommerce.html",
    tagline: "Minimalist Obsidian Hardware & Designer Acoustics",
    description: "An ultra-refined minimal luxury store featuring bespoke acoustic hardware, interactive drawer cart, instant search filtering, and seamless checkout experience.",
    style: "Modern Â· Minimal Â· Premium",
    accent: "#06b6d4",
    image: "/AivionTech/assets/images/vanta_minimal_audio_1790952130423.jpg",
    highlights: ["Interactive Drawer Cart", "Instant Category Filtering", "Wishlist & Quick-View Modal", "Zero-Latency Checkout Flow"]
  },
  {
    id: "saas",
    name: "FLOWSTACK",
    category: "SaaS Platform",
    path: "/AivionTech/demos/saas",
    htmlPath: "/AivionTech/demos/saas.html",
    tagline: "Unified Cloud Infrastructure & Developer Velocity",
    description: "A high-velocity SaaS operations platform with interactive telemetry graphs, feature tabs, annual/monthly pricing calculator, and enterprise ROI proof.",
    style: "Sleek Â· High-Velocity Â· Cloud Native",
    accent: "#3b82f6",
    image: "/AivionTech/assets/images/saas_flowstack_preview_1790954815731.jpg",
    highlights: ["Live Analytics Dashboard Preview", "Monthly/Annual Pricing Toggle", "Feature Capability Matrix", "Interactive FAQ Accordion"]
  },
  {
    id: "ai",
    name: "NEURALCORE",
    category: "AI & Machine Learning",
    path: "/AivionTech/demos/ai",
    htmlPath: "/AivionTech/demos/ai.html",
    tagline: "Autonomous Machine Intelligence & Model Workflows",
    description: "A technical AI platform featuring real-time neural topology rendering, inference latency metrics, automated pipeline orchestrator, and interactive model playground.",
    style: "Futuristic Â· Technical Â· Advanced",
    accent: "#10b981",
    image: "/AivionTech/assets/images/ai_neuralcore_preview_1790954831631.jpg",
    highlights: ["Live Neural Network Topology", "Inference Benchmark Simulator", "Automated Pipeline Engine", "Enterprise Model Endpoints"]
  },
  {
    id: "mobile-app",
    name: "PULSE",
    category: "Mobile Application",
    path: "/AivionTech/demos/mobile-app",
    htmlPath: "/AivionTech/demos/mobile-app.html",
    tagline: "Biometric Telemetry & Autonomous Wellness OS",
    description: "An interactive mobile application showcase featuring an interactive 3D phone frame mockup with screen switching, health metrics telemetry, and QR download simulator.",
    style: "Dynamic Â· Ergonomic Â· Mobile-First",
    accent: "#ec4899",
    image: "/AivionTech/assets/images/mobile_pulse_preview_1790954847686.jpg",
    highlights: ["Interactive 3D Phone Screen Switcher", "Biometric Vitals Dashboard", "Haptic Experience Showcase", "Instant QR App Clip Demo"]
  },
  {
    id: "real-estate",
    name: "ARCSTONE",
    category: "Real Estate",
    path: "/AivionTech/demos/real-estate",
    htmlPath: "/AivionTech/demos/real-estate.html",
    tagline: "Architectural Masterpieces & Prime Coastal Sanctuaries",
    description: "A luxury architectural property showcase with dynamic price and typography filters, interactive floorplan viewer, private showing reservation, and curated locations.",
    style: "Luxury Â· Elegant Â· Professional",
    accent: "#f59e0b",
    image: "/AivionTech/assets/images/arcstone_luxury_villa_1790952149752.jpg",
    highlights: ["Filter by Price & Archetype", "Full-Screen Architectural Modal", "Interactive Virtual Showing Form", "Global Sanctuary Locations"]
  },
  {
    id: "corporate",
    name: "VERTEX GROUP",
    category: "Corporate Enterprise",
    path: "/AivionTech/demos/corporate",
    htmlPath: "/AivionTech/demos/corporate.html",
    tagline: "Strategic Capital & Enterprise Transformation",
    description: "A commanding enterprise advisory platform with interactive global performance metrics, sector dossiers, senior advisory governance, and private inquiry desk.",
    style: "Authoritative Â· Global Â· Strategic",
    accent: "#64748b",
    image: "/AivionTech/assets/images/vertex_corporate_hq_1790954179058.jpg",
    highlights: ["Key Enterprise Indicators", "Global Sector Focus Areas", "Advisory Governance Board", "Institutional Inquiry Portal"]
  },
  {
    id: "creative-studio",
    name: "MONO STUDIO",
    category: "Creative Studio",
    path: "/AivionTech/demos/creative-studio",
    htmlPath: "/AivionTech/demos/creative-studio.html",
    tagline: "Kinetic Spatial Art & Avant-Garde Digital Objects",
    description: "An experimental brutalist digital atelier featuring dynamic kinetic project showcases, multidisciplinary manifesto, typography experiments, and custom commissions.",
    style: "Editorial Â· Creative Â· Experimental",
    accent: "#a855f7",
    image: "/AivionTech/assets/images/mono_studio_art_1790952166074.jpg",
    highlights: ["Kinetic Art Installation Gallery", "Disciplinary Philosophy Manifesto", "Full-Bleed Exhibition Modal", "Commission Request Portal"]
  }
];

export const TECH_STACK = {
  Frontend: ["HTML", "CSS", "JavaScript", "React", "Next.js"],
  Backend: ["Node.js", "Python", "PHP"],
  Mobile: ["Flutter"],
  AI: ["Python", "Machine Learning", "AI"],
  Database: ["MySQL", "PostgreSQL", "MongoDB"]
};

export const PROCESS_STEPS = [
  {
    step: "01",
    title: "DISCOVER",
    description: "Understand the idea, business and requirements.",
    detail: "We conduct deep discovery sessions to analyze target objectives, functional requirements, technical viability, and user journeys."
  },
  {
    step: "02",
    title: "DESIGN",
    description: "Create user-focused interfaces and experiences.",
    detail: "Crafting wireframes, ergonomic design systems, high-fidelity interactive prototypes, and refined aesthetic directions."
  },
  {
    step: "03",
    title: "DEVELOP",
    description: "Build the software using modern technologies.",
    detail: "Writing pristine, scalable, modular code with robust architectures, security best practices, and continuous performance audits."
  },
  {
    step: "04",
    title: "DELIVER",
    description: "Test, optimize and deliver the final product.",
    detail: "Comprehensive automated and manual QA, load stress testing, deployment, and seamless production handover."
  }
];


