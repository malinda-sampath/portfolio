export type Project = {
  id: number;
  title: string;
  description: string;
  image: string;
  gallery?: string[];
  video?: string;
  category: string;
  tech: string[];
  githubUrl?: string;
  liveUrl?: string;
  featured?: boolean;
  role?: string;
  year?: string;
};

export const projects: Project[] = [
  {
    id: 1,
    title: "Cloud-Native Order Platform",
    description:
      "A microservices-based order management system built with Spring Boot, deployed on Azure with Kubernetes orchestration, RabbitMQ for async processing, and full CI/CD via GitHub Actions.",
    image: "https://placehold.co/800x500/0a0a0a/ffc107?text=Order+Platform",
    gallery: [
      "https://placehold.co/1200x750/0a0a0a/ffc107?text=Dashboard",
      "https://placehold.co/1200x750/0a0a0a/ffc107?text=Order+Flow",
      "https://placehold.co/1200x750/0a0a0a/ffc107?text=Architecture",
    ],
    category: "Backend",
    tech: ["Java", "Spring Boot", "Azure", "Kubernetes", "RabbitMQ"],
    githubUrl: "https://github.com/example/order-platform",
    liveUrl: "https://example.com/order-platform",
    featured: true,
    role: "Solo project",
    year: "2025",
  },
  {
    id: 2,
    title: "API Gateway with WSO2",
    description:
      "Implemented an API Gateway using WSO2 API Manager to manage and secure REST APIs, including authentication, rate limiting, and analytics.",
    image: "https://placehold.co/800x500/0a0a0a/ffc107?text=API+Gateway",
    category: "Backend",
    tech: ["WSO2", "API Management", "Security"],
    githubUrl: "https://github.com/example/api-gateway",
    liveUrl: "https://example.com/api-gateway",
    featured: false,
    role: "Team project",
    year: "2024",
  },
  {
    id: 3,
    title: "Postman API Testing Suite",
    description:
      "Developed a comprehensive API testing suite using Postman, including automated test scripts, environment configurations, and CI/CD integration for continuous testing.",
    image: "https://placehold.co/800x500/0a0a0a/ffc107?text=Postman+Suite",
    category: "Testing",
    tech: ["Postman", "API Testing", "Automation"],
    githubUrl: "https://github.com/example/postman-suite",
    liveUrl: "https://example.com/postman-suite",
    featured: false,
    role: "Team project",
    year: "2024",
  },
  {
    id: 4,
    title: "Cloud-Native Inventory Management",
    description:
      "Built a cloud-native inventory management system using Spring Boot and deployed on Azure with Kubernetes orchestration.",
    image: "https://placehold.co/800x500/0a0a0a/ffc107?text=Inventory+System",
    category: "Backend",
    tech: ["Java", "Spring Boot", "Azure", "Kubernetes"],
    githubUrl: "https://github.com/example/inventory-system",
    liveUrl: "https://example.com/inventory-system",
    featured: false,
    role: "Team project",
    year: "2024",
  },
];

export const categories = [...new Set(projects.map((p) => p.category))];
