import { FaGithub } from "react-icons/fa";
import { ExternalLink, ArrowUpRight } from "lucide-react";
import TiltCard from "../ui/TiltCard";

type ProjectCardProps = {
  project: {
    id: number;
    title: string;
    description: string;
    image: string;
    category: string;
    tech: string[];
    githubUrl?: string;
    liveUrl?: string;
    featured?: boolean;
  };
  featured: boolean;
};

const ProjectCard = ({ project, featured }: ProjectCardProps) => {
  return (
    <TiltCard
      className="group glass-edge scan-hover rounded-2xl overflow-hidden hover:border-primary/30 transition-colors duration-300"
      maxTilt={4}
    >
      <div
        className={`grid ${featured ? "md:grid-cols-2" : "grid-cols-1"} h-full`}
      >
        {/* Image */}
        <div
          className={`relative overflow-hidden ${
            featured ? "aspect-[4/3] md:aspect-auto" : "aspect-[16/10]"
          }`}
        >
          <img
            src={project.image}
            alt={project.title}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent md:bg-gradient-to-r md:from-transparent md:via-transparent md:to-black/20" />

          {project.featured && (
            <span className="absolute top-4 left-4 px-3 py-1 text-[11px] font-mono uppercase tracking-[1.5px] text-primary bg-black/60 backdrop-blur-sm border border-primary/30 rounded-full">
              Featured
            </span>
          )}

          {/* Hover overlay links */}
          <div className="absolute inset-0 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 bg-black/40 backdrop-blur-[2px] transition-opacity duration-300">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                aria-label={`View ${project.title} live`}
                onClick={(e) => e.stopPropagation()}
                className="w-11 h-11 flex items-center justify-center rounded-full bg-primary text-black hover:scale-110 transition-transform duration-200"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                aria-label={`View ${project.title} source`}
                onClick={(e) => e.stopPropagation()}
                className="w-11 h-11 flex items-center justify-center rounded-full bg-white/10 border border-white/20 text-white hover:scale-110 hover:border-primary/50 transition-all duration-200"
              >
                <FaGithub className="w-4 h-4" />
              </a>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="p-6 flex flex-col">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[11px] font-mono uppercase tracking-[1.5px] text-primary/80">
              {project.category}
            </span>
            <ArrowUpRight className="w-4 h-4 text-white/30 group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300" />
          </div>

          <h3 className="text-xl font-semibold text-white mb-2">
            {project.title}
          </h3>

          <p
            className={`text-sm text-white/60 leading-relaxed mb-5 ${
              featured ? "" : "line-clamp-3"
            }`}
          >
            {project.description}
          </p>

          <div className="flex flex-wrap gap-2 mt-auto">
            {project.tech.map((tech) => (
              <span
                key={tech}
                className="px-2.5 py-1 text-xs text-white/70 bg-white/5 border border-white/10 rounded-md font-mono"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </TiltCard>
  );
};

export default ProjectCard;
