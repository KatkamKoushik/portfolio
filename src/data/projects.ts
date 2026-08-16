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
  solution: string;
  outcome: string;
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
    solution:
      "Developed a responsive, fast-loading application using Next.js. Implemented dedicated flows for restaurant reservations and event bookings, ensuring a seamless user experience across all devices.",
    outcome:
      "Increased online reservations and streamlined the event inquiry process for the banquet hall management.",
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
    solution:
      "Utilized smooth animations and a warm color palette to create an inviting online presence. Structured the menu into intuitive categories for easy browsing.",
    outcome:
      "Enhanced brand visibility and provided a central hub for customers to explore the menu and operating hours.",
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
    solution:
      "Designed an image-forward UI with high-performance image loading through Next.js. Built a streamlined navigation system for the expansive menu.",
    outcome:
      "Delivered a fast, accessible platform that perfectly represents the restaurant's authentic Arabian brand.",
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
    solution:
      "Built a high-energy, dark-themed website that aligns with fitness aesthetics. Included clear CTAs for membership signups and detailed sections for gym amenities.",
    outcome:
      "Improved local discoverability and provided a professional first impression for new gym members.",
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
    solution:
      "Developed a robust backend to handle AI inference and a clean, responsive frontend dashboard to visualize security metrics and alerts.",
    outcome:
      "Created a scalable prototype demonstrating the potential of AI in enhancing digital and physical security systems.",
    demoUrl: "https://guardai-six.vercel.app/",
    repoUrl: "https://github.com/KatkamKoushik/guardai",
  },
];
