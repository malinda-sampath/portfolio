import { Cloud, Download, Server, Zap } from "lucide-react";
import { PERSONAL_INFO } from "../../utills/constants";
import SectionHeader from "../ui/SectionHeader";

const FOCUS_AREAS = [
  {
    icon: Server,
    title: "Backend Engineering",
    body: "Building scalable REST APIs, microservices, and enterprise applications using Java, Spring Boot, and modern software architecture.",
  },
  {
    icon: Cloud,
    title: "Cloud & DevOps",
    body: "Deploying and managing applications with Azure, Docker, Kubernetes, GitHub Actions, and CI/CD automation.",
  },
  {
    icon: Zap,
    title: "Problem Solving",
    body: "Focused on designing reliable solutions, improving system performance, and continuously learning modern engineering practices.",
  },
];

const NUMBERS = [
  { value: "2.5k+", label: "Code commits" },
  { value: "30+", label: "GitHub repositories" },
  { value: "1000+", label: "Development hours" },
];

const About = () => {
  return (
    <section id="about" className="py-16 lg:py-20">
      <div className="max-w-6xl mx-auto px-5 sm:px-6 lg:px-8">
        <SectionHeader command="cat about.md" title="About me" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-10 gap-y-10">
          <div className="lg:col-span-6">
            <div className="space-y-4 mb-8">
              {PERSONAL_INFO.bio.map((paragraph, i) => (
                <p
                  key={paragraph}
                  className={`leading-relaxed ${
                    i === 0 ? "text-[1.0625rem] text-fg" : "text-base text-muted"
                  }`}
                >
                  {paragraph}
                </p>
              ))}
            </div>

            <dl className="panel grid grid-cols-3 divide-x divide-line mb-8">
              {NUMBERS.map((n) => (
                <div key={n.label} className="flex flex-col-reverse px-4 py-4">
                  <dt className="text-xs sm:text-sm text-muted mt-1 leading-snug">
                    {n.label}
                  </dt>
                  <dd className="font-mono text-xl sm:text-2xl font-medium text-white">
                    {n.value}
                  </dd>
                </div>
              ))}
            </dl>

            <a
              href={`${import.meta.env.BASE_URL}${PERSONAL_INFO.resume}`}
              target="_blank"
              rel="noreferrer"
              className="btn btn-line"
            >
              <Download className="w-4 h-4" />
              Download resume
            </a>
          </div>

          <ul className="lg:col-span-6 space-y-4">
            {FOCUS_AREAS.map((area) => (
              <li key={area.title} className="panel flex gap-4 p-5">
                <span className="shrink-0 w-10 h-10 rounded-lg bg-accent/15 text-link flex items-center justify-center">
                  <area.icon className="w-5 h-5" />
                </span>
                <div>
                  <h3 className="text-base font-semibold text-white mb-1">
                    {area.title}
                  </h3>
                  <p className="text-[0.925rem] leading-relaxed text-muted">
                    {area.body}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default About;
