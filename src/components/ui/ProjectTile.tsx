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
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent" />

        {project.featured && (
          <span className="absolute top-3 left-3 px-2.5 py-1 text-[10px] font-mono uppercase tracking-[1.5px] text-primary bg-black/60 backdrop-blur-sm border border-primary/30 rounded-full">
            Featured
          </span>
        )}

        {/* Expand hint */}
        <div className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-full bg-black/50 backdrop-blur-sm border border-white/10 text-white/70 opacity-0 group-hover:opacity-100 group-hover:text-primary transition-all duration-300">
          <Expand className="w-3.5 h-3.5" />
        </div>

        {/* Title overlay */}
        <div className="absolute inset-x-0 bottom-0 p-4">
          <span className="text-[10px] font-mono uppercase tracking-[1.5px] text-primary/90">
            {project.category}
          </span>
          <h3 className="text-base font-semibold text-white leading-snug mt-0.5">
            {project.title}
          </h3>
        </div>
      </div>
    </button>
  );
};

export default ProjectTile;
