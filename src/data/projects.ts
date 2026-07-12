export const projects = [
  {
    id: 1,
    title: "Cloud-Native Order Platform",
    description:
      "A microservices-based order management system built with Spring Boot, deployed on Azure with Kubernetes orchestration, RabbitMQ for async processing, and full CI/CD via GitHub Actions.",
    image: "https://placehold.co/800x500/0a0a0a/ffc107?text=Order+Platform",
    category: "Backend",
    tech: ["Java", "Spring Boot", "Azure", "Kubernetes", "RabbitMQ"],
    githubUrl: "https://github.com/example/order-platform",
    liveUrl: "https://example.com/order-platform",
    featured: true,
  },
  {
    id: 2,
    title: "Portfolio Site",
    description: "This site — React, Tailwind, and TypeScript.",
    image: "https://placehold.co/800x500/0a0a0a/ffc107?text=Portfolio",
    category: "Frontend",
    tech: ["React", "TypeScript", "Tailwind"],
    githubUrl: "https://github.com/example/portfolio",
    liveUrl: "https://example.com",
    featured: true,
  },
  {
    id: 3,
    title: "Identity Gateway",
    description:
      "Centralized auth and API gateway using Keycloak and WSO2, securing internal microservices with OAuth2/OIDC.",
    image: "https://placehold.co/800x500/0a0a0a/ffc107?text=Identity+Gateway",
    category: "Backend",
    tech: ["Keycloak", "WSO2", "Spring Security"],
    githubUrl: "https://github.com/example/identity-gateway",
    featured: false,
  },
  {
    id: 4,
    title: "Task Manager App",
    description:
      "Full-stack task tracker with real-time updates, built to explore MERN patterns alongside my Java backend work.",
    image: "https://placehold.co/800x500/0a0a0a/ffc107?text=Task+Manager",
    category: "Full Stack",
    tech: ["React", "Node.js", "MongoDB"],
    githubUrl: "https://github.com/example/task-manager",
    liveUrl: "https://example.com/tasks",
    featured: false,
  },
];

export const categories = [...new Set(projects.map((p) => p.category))];
