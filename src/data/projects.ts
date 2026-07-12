import portfolioHero from "../../public/assets/projects/portfolio/Hero_section.png";
import connect from "../../public/assets/projects/portfolio/Connect.png";
import skills from "../../public/assets/projects/portfolio/Skills.png";
import azure from "../../public/assets/projects/portfolio/Azure.png";

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
    title: "Personal Portfolio Website",
    description:
      "A modern developer portfolio built with React, TypeScript, and Tailwind CSS, showcasing software engineering projects, technical skills, and professional experience. Deployed on Azure Kubernetes Service with Docker, and automated CI/CD pipelines using GitHub Actions.",
    image: portfolioHero,
    gallery: [skills, connect, azure],
    category: "Frontend",
    tech: [
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Docker",
      "Azure",
      "Kubernetes",
      "GitHub Actions",
    ],
    githubUrl: "https://github.com/malinda-sampath/portfolio",
    liveUrl: "https://www.malindasampath.com/",
    featured: true,
    role: "Solo project",
    year: "2026",
  },
  // {
  //   id: 2,
  //   title: "API Gateway with WSO2",
  //   description:
  //     "Implemented an API Gateway using WSO2 API Manager to manage and secure REST APIs, including authentication, rate limiting, and analytics.",
  //   image: "https://placehold.co/800x500/0a0a0a/ffc107?text=API+Gateway",
  //   category: "Backend",
  //   tech: ["WSO2", "API Management", "Security"],
  //   githubUrl: "https://github.com/example/api-gateway",
  //   liveUrl: "https://example.com/api-gateway",
  //   featured: false,
  //   role: "Team project",
  //   year: "2024",
  // },
  // {
  //   id: 3,
  //   title: "Postman API Testing Suite",
  //   description:
  //     "Developed a comprehensive API testing suite using Postman, including automated test scripts, environment configurations, and CI/CD integration for continuous testing.",
  //   image: "https://placehold.co/800x500/0a0a0a/ffc107?text=Postman+Suite",
  //   category: "Testing",
  //   tech: ["Postman", "API Testing", "Automation"],
  //   githubUrl: "https://github.com/example/postman-suite",
  //   liveUrl: "https://example.com/postman-suite",
  //   featured: false,
  //   role: "Team project",
  //   year: "2024",
  // },
  // {
  //   id: 4,
  //   title: "Cloud-Native Inventory Management",
  //   description:
  //     "Built a cloud-native inventory management system using Spring Boot and deployed on Azure with Kubernetes orchestration.",
  //   image: "https://placehold.co/800x500/0a0a0a/ffc107?text=Inventory+System",
  //   category: "Backend",
  //   tech: ["Java", "Spring Boot", "Azure", "Kubernetes"],
  //   githubUrl: "https://github.com/example/inventory-system",
  //   liveUrl: "https://example.com/inventory-system",
  //   featured: false,
  //   role: "Team project",
  //   year: "2024",
  // },
];

export const categories = [...new Set(projects.map((p) => p.category))];
