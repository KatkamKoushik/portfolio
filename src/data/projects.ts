export type Project = {
  id: string;
  title: string;
  category: string;
  year: number;
  role: string;
  description: string;
  technologies: string[];
  color: string;
  challenge: string;
  research?: string;
  experiment?: string;
  failure?: string;
  breakthrough?: string;
  solution: string;
  outcome: string;
  metrics?: string[];
  demoUrl?: string;
  repoUrl?: string;
};

export const PROJECTS: Project[] = [
  {
    id: "aroma-fine-dine",
    title: "Aroma Fine Dine",
    category: "Web Development",
    year: 2024,
    role: "Full Stack Developer",
    description:
      "A complete digital presence for Aroma Fine Dine Restaurant and Banquet Hall. Features an interactive menu, reservation system, and banquet hall booking capabilities.",
    technologies: ["React", "Next.js", "Tailwind CSS", "TypeScript"],
    color: "#ff3d00",
    challenge:
      "The client needed a modern, performant website that could handle both restaurant table reservations and large banquet hall inquiries, while maintaining the brand's premium aesthetic.",
    research:
      "Mapped booking friction points from phone-first users and benchmarked premium hospitality experiences with low cognitive load.",
    experiment:
      "Tested a single-page booking funnel vs segmented service-specific flows for restaurant and banquet requests.",
    failure:
      "A unified mega-form reduced clarity and increased abandonment on mobile.",
    breakthrough:
      "Split intent early into contextual booking journeys with focused microcopy and adaptive validation.",
    solution:
      "Developed a responsive, fast-loading application using Next.js. Implemented dedicated flows for restaurant reservations and event bookings, ensuring a seamless user experience across all devices.",
    outcome:
      "Increased online reservations and streamlined the event inquiry process for the banquet hall management.",
    metrics: ["Faster inquiry completion on mobile", "Lower booking drop-off"],
    demoUrl: "https://aroma-fine-dine-restaurant-banquet.vercel.app/",
    repoUrl: "https://github.com/KatkamKoushik/aroma-fine-dine-restaurant-banquet-hall",
  },
  {
    id: "sampradaya-restaurant",
    title: "Sampradaya Multicuisine",
    category: "Web Application",
    year: 2024,
    role: "Frontend Developer",
    description:
      "A rich, culturally-themed web experience for Sampradaya Multicuisine Family Restaurant, highlighting traditional dishes and family dining experiences.",
    technologies: ["React", "Vite", "Framer Motion", "CSS Modules"],
    color: "#c9a96e",
    challenge:
      "Creating a digital experience that reflects the traditional warmth and diverse menu of a multicuisine family restaurant.",
    research:
      "Audited how families scan dense menus on mobile and where visual hierarchy usually breaks in food interfaces.",
    experiment:
      "Prototyped category-first navigation and motion-led dish discovery with progressive content reveal.",
    failure:
      "High-motion transitions looked impressive but distracted from core ordering information.",
    breakthrough:
      "Reduced motion intensity and prioritized menu clarity while preserving cultural visual richness.",
    solution:
      "Utilized smooth animations and a warm color palette to create an inviting online presence. Structured the menu into intuitive categories for easy browsing.",
    outcome:
      "Enhanced brand visibility and provided a central hub for customers to explore the menu and operating hours.",
    metrics: ["Improved menu discoverability", "Stronger repeat visitor engagement"],
    demoUrl: "https://sampradaya-multicuisine-family-rest.vercel.app/",
    repoUrl: "https://github.com/KatkamKoushik/Sampradaya-Multicuisine-Family-Restaurant",
  },
  {
    id: "mandiwala",
    title: "Mandiwala Arabian",
    category: "E-commerce & Web",
    year: 2024,
    role: "Developer",
    description:
      "An authentic digital storefront for Mandiwala Arabian Restaurant, specializing in visually showcasing Mandi dishes and Arabian cuisine.",
    technologies: ["Next.js", "Tailwind CSS", "Vercel"],
    color: "#00f0ff",
    challenge:
      "Showcasing visually rich Arabian dishes in a way that drives customer appetite and online orders.",
    research:
      "Benchmarked image-heavy storefronts and measured perceived load impact on conversion behavior.",
    experiment:
      "Balanced hero imagery quality against compressed responsive assets and deferred non-critical media.",
    failure:
      "Initial unoptimized visuals hurt first-load perception despite strong aesthetics.",
    breakthrough:
      "Adopted prioritized media loading and optimized formats to preserve appetite appeal without performance loss.",
    solution:
      "Designed an image-forward UI with high-performance image loading through Next.js. Built a streamlined navigation system for the expansive menu.",
    outcome:
      "Delivered a fast, accessible platform that perfectly represents the restaurant's authentic Arabian brand.",
    metrics: ["Higher engagement on menu detail views", "Improved time-to-interactive"],
    demoUrl: "https://mandiwala-arabian-restaurant.vercel.app/",
    repoUrl: "https://github.com/KatkamKoushik/mandiwala-arabian-restaurant",
  },
  {
    id: "vl-gym",
    title: "VL Gym Fitness",
    category: "Fitness Platform",
    year: 2024,
    role: "Full Stack Developer",
    description:
      "A comprehensive digital platform for VL Gym Fitness Centre, featuring membership information, class schedules, and trainer profiles.",
    technologies: ["React", "TypeScript", "Tailwind CSS"],
    color: "#8b5cf6",
    challenge:
      "The gym needed a centralized platform to communicate membership tiers, facility details, and class schedules to prospective members.",
    research:
      "Studied local fitness landing pages to identify trust drivers: trainer credibility, schedule clarity, and social proof.",
    experiment:
      "Iterated CTA hierarchy and membership comparison modules for quick decision-making.",
    failure:
      "Dense feature blocks diluted urgency and hid the membership path.",
    breakthrough:
      "Reframed the experience around a clear progression: discover → compare → commit.",
    solution:
      "Built a high-energy, dark-themed website that aligns with fitness aesthetics. Included clear CTAs for membership signups and detailed sections for gym amenities.",
    outcome:
      "Improved local discoverability and provided a professional first impression for new gym members.",
    metrics: ["Stronger CTA interaction rate", "Clearer membership path"],
    demoUrl: "https://vl-gym-fitness-centre.vercel.app/",
    repoUrl: "https://github.com/KatkamKoushik/VL-Gym-Fitness-Centre",
  },
  {
    id: "guardai",
    title: "Guardai",
    category: "AI & Security",
    year: 2025,
    role: "Data Science / Developer",
    description:
      "An innovative AI-powered application focused on security and intelligent monitoring.",
    technologies: ["Python", "Machine Learning", "Next.js", "API"],
    color: "#ff6b4a",
    challenge:
      "Integrating complex machine learning models into a user-friendly web interface for real-time security analysis.",
    research:
      "Mapped analyst workflows and identified the minimum signal set needed for high-confidence triage.",
    experiment:
      "Tested multiple alert confidence visualizations and event clustering models in the dashboard layer.",
    failure:
      "Early UI surfaced too many low-priority events, causing alert fatigue.",
    breakthrough:
      "Introduced confidence-weighted summaries and contextual grouping for faster operator decisions.",
    solution:
      "Developed a robust backend to handle AI inference and a clean, responsive frontend dashboard to visualize security metrics and alerts.",
    outcome:
      "Created a scalable prototype demonstrating the potential of AI in enhancing digital and physical security systems.",
    metrics: ["Faster high-priority alert triage", "Reduced noisy-event overwhelm"],
    demoUrl: "https://guardai-six.vercel.app/",
    repoUrl: "https://github.com/KatkamKoushik/guardai",
  },
];
