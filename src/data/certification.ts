export type Certification = {
  id: number;
  title: string;
  issuer: string;
  date: string;
  status: "completed" | "ongoing";
  credentialUrl?: string;
  icon: string;
};

export const certifications: Certification[] = [
  {
    id: 1,
    title: "Solace Certified Developer Practitioner",
    issuer: "Solace",
    date: "2025",
    status: "completed",
    credentialUrl: "#",
    icon: "",
  },
  {
    id: 2,
    title: "Docker & Kubernetes Masterclass",
    issuer: "Udemy",
    date: "In Progress",
    status: "ongoing",
    credentialUrl: "#",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
  },
  {
    id: 3,
    title: "Postman API Fundamentals — Student Expert",
    issuer: "Postman",
    date: "2025",
    status: "completed",
    credentialUrl: "#",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postman/postman-original.svg",
  },
  {
    id: 4,
    title: "WSO2 Certified Identity Server Developer — V7.0",
    issuer: "WSO2",
    date: "2025",
    status: "completed",
    credentialUrl: "#",
    icon: "",
  },
  {
    id: 5,
    title: "Master Git and GitHub",
    issuer: "GitHub",
    date: "2024",
    status: "completed",
    credentialUrl: "#",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg",
  },
];
