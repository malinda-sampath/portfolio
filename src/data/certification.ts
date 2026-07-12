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
    title: "WSO2 Certified Identity Server Developer — V7.0",
    issuer: "WSO2",
    date: "2026",
    status: "completed",
    credentialUrl:
      "https://certification.wso2.com/certificate/CID-05177327/a09VM00000EIP9ZYAX",
    icon: "../../public/icons/WSO2-Logo-White.png",
  },
  {
    id: 2,
    title: "Docker & Kubernetes Masterclass",
    issuer: "Udemy",
    date: "In Progress",
    status: "ongoing",
    credentialUrl:
      "https://www.udemy.com/course/kubernetes-online-training/?src=sac&kw=Docker+Kubernetes+MasterClass%3A+DevOps+from+Scratch",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
  },

  {
    id: 3,
    title: "Solace Certified Developer Practitioner",
    issuer: "Solace",
    date: "2026",
    status: "completed",
    credentialUrl:
      "https://badges.solace.com/0f587252-bda3-4c43-ae03-9e63a611d814#acc.hDY6jBpz",
    icon: "",
  },
  {
    id: 4,
    title: "Postman API Fundamentals — Student Expert",
    issuer: "Postman",
    date: "2025",
    status: "completed",
    credentialUrl:
      "https://badges.parchment.com/public/assertions/a8iTJQl-SdyIsCKmOZrDlw?identity__email=malindasampath45@gmail.com",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postman/postman-original.svg",
  },
  {
    id: 5,
    title: "Master Git and GitHub",
    issuer: "GitHub",
    date: "2025",
    status: "completed",
    credentialUrl:
      "https://www.udemy.com/certificate/UC-c45c84e2-b795-4994-bfa2-646c67fb9ee2/",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg",
  },
];
