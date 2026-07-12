import { Expand } from "lucide-react";
import type { Project } from "../../data/projects";

type ProjectTileProps = {
  project: Project;
  onOpen: (project: Project) => void;
};

const ProjectTile = ({ project, onOpen }: ProjectTileProps) => {
  return (
    <button
      onClick={() => onOpen(project)}
      className="group relative text-left glass-edge scan-hover rounded-2xl overflow-hidden hover:border-primary/30 transition-colors duration-300 w-full"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={project.image}
          alt={project.title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-108"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

        {/* Featured / Category Badge */}
        <span
          className={`
      absolute top-2 left-2 sm:top-3 sm:left-3
      px-2 py-0.5 sm:px-2.5 sm:py-1
      text-[9px] sm:text-[10px]
      font-mono uppercase tracking-[1.5px]
      rounded-full
      backdrop-blur-md
      border
      shadow-[0_0_12px_rgba(124,255,91,0.2)]
      transition-all duration-300

      ${
        project.featured
          ? "text-primary bg-black/60 border-primary/30"
          : "text-white/80 bg-black/50 border-white/10"
      }
    `}
        >
          {project.featured ? "Featured" : project.category}
        </span>

        {/* Expand Hint */}
        <div
          className="
      absolute top-2 right-2 sm:top-3 sm:right-3
      w-7 h-7 sm:w-8 sm:h-8
      flex items-center justify-center
      rounded-full
      bg-black/50
      backdrop-blur-md
      border border-white/10
      text-white/70
      opacity-0
      group-hover:opacity-100
      group-hover:text-primary
      scale-90
      group-hover:scale-100
      transition-all duration-300
    "
        >
          <Expand className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
        </div>

        {/* Title Overlay */}
        <div
          className="
      absolute inset-x-0 bottom-0
      p-3 sm:p-4
    "
        >
          <h3
            className="
        text-sm sm:text-base
        font-semibold
        leading-snug
        text-white
        line-clamp-2
      "
          >
            {project.title}
          </h3>
        </div>
      </div>
    </button>
  );
};

export default ProjectTile;
