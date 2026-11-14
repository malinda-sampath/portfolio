import portfolioHero from "../../public/assets/projects/portfolio/Hero_section.png";
import connect from "../../public/assets/projects/portfolio/Connect.png";
import skills from "../../public/assets/projects/portfolio/Skills.png";
import azure from "../../public/assets/projects/portfolio/Azure.png";
import portfolioProjects from "../../public/assets/projects/portfolio/Projects.png";
import apirraLanding from "../../public/assets/projects/apirra/Landing.png";
import apirraExplorer from "../../public/assets/projects/apirra/Explorer.jpg";
import apirraEndpoint from "../../public/assets/projects/apirra/Endpoint.jpg";

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
    gallery: [skills, portfolioProjects, connect, azure],
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
  {
    id: 5,
    title: "Apirra",
    description:
      "A browser-based API explorer. Paste the URL of an OpenAPI or Swagger document and Apirra lists every endpoint, pre-fills request bodies from the schema, and sends real requests straight from the tab, with no install and no account. It also copies any request as cURL and keeps a short history per endpoint.",
    image: apirraLanding,
    gallery: [apirraExplorer, apirraEndpoint],
    category: "Developer Tools",
    tech: [
      "React",
      "TypeScript",
      "Vite",
      "Tailwind CSS",
      "React Router",
      "Axios",
    ],
    githubUrl: "https://github.com/malinda-sampath/apirra-saas-frontned",
    liveUrl: "https://apirra.malindasampath.com/",
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
