import { ExternalLink, Images } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import type { Project } from "../../data/projects";

type ProjectCardProps = {
  project: Project;
  onOpen: (project: Project) => void;
};

const ProjectCard = ({ project, onOpen }: ProjectCardProps) => {
  const shotCount =
    1 + (project.gallery?.length ?? 0) + (project.video ? 1 : 0);
  const meta = [project.category, project.role, project.year].filter(Boolean);

  return (
    <article className="panel overflow-hidden flex flex-col">
      {/* Screenshot in a browser-style frame */}
      <button
        onClick={() => onOpen(project)}
        aria-label={`Open screenshots of ${project.title}`}
        className="group relative block w-full text-left border-b border-line"
      >
        <span className="flex items-center gap-1.5 px-3.5 py-2.5 bg-bg-deep border-b border-line">
          <span className="w-2.5 h-2.5 rounded-full bg-red/70" />
          <span className="w-2.5 h-2.5 rounded-full bg-yellow/70" />
          <span className="w-2.5 h-2.5 rounded-full bg-green/70" />
          {project.liveUrl && (
            <span className="ml-3 font-mono text-xs text-muted truncate">
              {project.liveUrl.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "")}
            </span>
          )}
        </span>
        <span className="block overflow-hidden bg-bg-deep">
          <img
            src={project.image}
            alt={`Screenshot of ${project.title}`}
            loading="lazy"
            className="w-full aspect-[16/10] object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
          />
        </span>
        <span className="absolute bottom-3 right-3 inline-flex items-center gap-2 rounded-md bg-bg-deep/90 border border-line px-2.5 py-1.5 text-xs font-medium text-fg transition-colors duration-150 group-hover:bg-accent group-hover:border-accent group-hover:text-black">
          <Images className="w-3.5 h-3.5" />
          {shotCount > 1 ? `${shotCount} screenshots` : "View larger"}
        </span>
      </button>

      <div className="p-5 sm:p-6 flex flex-col flex-1">
        <p className="font-mono text-xs text-muted mb-2">
          {meta.map((item, i) => (
            <span key={item}>
              {i > 0 && <span className="mx-2 text-line">/</span>}
              <span className={i === 0 ? "text-orange" : undefined}>{item}</span>
            </span>
          ))}
        </p>
        <h3 className="text-xl font-semibold text-white mb-3">
          {project.title}
        </h3>
        <p className="text-[0.925rem] leading-relaxed text-muted mb-5">
          {project.description}
        </p>

        <ul aria-label="Built with" className="flex flex-wrap gap-1.5 mb-6">
          {project.tech.map((tech) => (
            <li key={tech} className="chip">
              {tech}
            </li>
          ))}
        </ul>

        <div className="flex flex-wrap gap-3 mt-auto">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              className="btn btn-primary"
            >
              <ExternalLink className="w-4 h-4" />
              View live
            </a>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="btn btn-line"
            >
              <FaGithub className="w-4 h-4" />
              Source
            </a>
          )}
        </div>
      </div>
    </article>
  );
};

export default ProjectCard;
