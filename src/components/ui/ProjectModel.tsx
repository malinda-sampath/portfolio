import { useEffect, useState } from "react";
import { FaGithub } from "react-icons/fa";
import {
  X,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Calendar,
  User,
} from "lucide-react";
import type { Project } from "../../data/projects";

type ProjectModalProps = {
  project: Project | null;
  onClose: () => void;
};

const ProjectModal = ({ project, onClose }: ProjectModalProps) => {
  const [activeMedia, setActiveMedia] = useState(0);

  const media = project ? [project.image, ...(project.gallery ?? [])] : [];
  const hasVideo = !!project?.video;
  const slideCount = media.length + (hasVideo ? 1 : 0);

  // Lock scroll + Escape to close
  useEffect(() => {
    if (!project) return;
    document.body.style.overflow = "hidden";
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") setActiveMedia((i) => (i + 1) % slideCount);
      if (e.key === "ArrowLeft")
        setActiveMedia((i) => (i - 1 + slideCount) % slideCount);
    };
    window.addEventListener("keydown", handleKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKey);
    };
  }, [project, onClose, slideCount]);

  if (!project) return null;

  const isVideoSlide = hasVideo && activeMedia === media.length;

  return (
    <div
      className="fixed inset-0 z-[1000] flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-sm animate-fadeIn"
      style={{ animationDuration: "180ms" }}
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label={project.title}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-3xl max-h-[88vh] overflow-y-auto glass-edge rounded-2xl"
      >
        {/* Close */}
        <button
          onClick={onClose}
          aria-label="Close project details"
          className="absolute top-4 right-4 z-20 w-9 h-9 flex items-center justify-center rounded-full bg-black/60 backdrop-blur-sm border border-white/10 text-white/70 hover:text-primary hover:border-primary/40 transition-colors duration-200"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Media viewer */}
        <div className="relative aspect-[16/10] bg-black">
          {isVideoSlide ? (
            <iframe
              src={project.video}
              title={`${project.title} demo`}
              className="w-full h-full"
              allow="autoplay; encrypted-media; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <img
              src={media[activeMedia]}
              alt={`${project.title} screenshot ${activeMedia + 1}`}
              className="w-full h-full object-cover"
            />
          )}

          {slideCount > 1 && (
            <>
              <button
                onClick={() =>
                  setActiveMedia((i) => (i - 1 + slideCount) % slideCount)
                }
                aria-label="Previous media"
                className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center rounded-full bg-black/50 backdrop-blur-sm border border-white/10 text-white hover:border-primary/40 hover:text-primary transition-colors duration-200"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => setActiveMedia((i) => (i + 1) % slideCount)}
                aria-label="Next media"
                className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center rounded-full bg-black/50 backdrop-blur-sm border border-white/10 text-white hover:border-primary/40 hover:text-primary transition-colors duration-200"
              >
                <ChevronRight className="w-4 h-4" />
              </button>

              {/* Dots */}
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5">
                {Array.from({ length: slideCount }).map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveMedia(i)}
                    aria-label={`Go to media ${i + 1}`}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      i === activeMedia
                        ? "w-6 bg-primary"
                        : "w-1.5 bg-white/30 hover:bg-white/50"
                    }`}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        {/* Details */}
        <div className="p-6 sm:p-8">
          <div className="flex items-start justify-between gap-4 mb-1">
            <span className="text-[11px] font-mono uppercase tracking-[1.5px] text-primary/90">
              {project.category}
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-semibold text-white mb-3">
            {project.title}
          </h2>

          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 mb-5 text-xs font-mono text-white/40">
            {project.year && (
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" />
                {project.year}
              </span>
            )}
            {project.role && (
              <span className="flex items-center gap-1.5">
                <User className="w-3.5 h-3.5" />
                {project.role}
              </span>
            )}
          </div>

          <p className="text-sm sm:text-base text-white/70 leading-relaxed mb-6">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-2 mb-8">
            {project.tech.map((tech) => (
              <span
                key={tech}
                className="px-2.5 py-1 text-xs text-white/70 bg-white/5 border border-white/10 rounded-md font-mono"
              >
                {tech}
              </span>
            ))}
          </div>

          <div className="flex flex-wrap gap-3">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-black text-sm font-medium rounded-full hover:bg-primary/90 transition-colors duration-200"
              >
                <ExternalLink className="w-4 h-4" />
                View Live
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/5 border border-white/10 text-white text-sm font-medium rounded-full hover:border-primary/40 hover:text-primary transition-colors duration-200"
              >
                <FaGithub className="w-4 h-4" />
                Source
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;
