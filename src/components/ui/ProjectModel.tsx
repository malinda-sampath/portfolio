import { useEffect, useRef, useState } from "react";
import { FaGithub } from "react-icons/fa";
import { X, ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";
import type { Project } from "../../data/projects";

type ProjectModalProps = {
  project: Project | null;
  onClose: () => void;
};

const ProjectModal = ({ project, onClose }: ProjectModalProps) => {
  const [activeMedia, setActiveMedia] = useState(0);
  const closeRef = useRef<HTMLButtonElement>(null);

  const media = project ? [project.image, ...(project.gallery ?? [])] : [];
  const hasVideo = !!project?.video;
  const slideCount = media.length + (hasVideo ? 1 : 0);

  // Lock scroll, move focus in, restore it on close; Escape and arrows work
  useEffect(() => {
    if (!project) return;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

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
      previouslyFocused?.focus();
    };
  }, [project, onClose, slideCount]);

  if (!project) return null;

  const isVideoSlide = hasVideo && activeMedia === media.length;
  const arrowClass =
    "absolute top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-lg bg-bg-deep/90 text-fg hover:bg-accent hover:text-black transition-colors duration-150";

  return (
    <div
      className="bg-bg-deep/85 fixed inset-0 z-[1000] flex items-center justify-center p-3 sm:p-6 backdrop-blur-sm animate-fadeIn"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label={`${project.title} screenshots`}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-5xl max-h-[92vh] overflow-y-auto rounded-xl bg-panel border border-line text-fg shadow-2xl"
      >
        <div className="flex items-center justify-between gap-4 px-5 py-3.5 border-b border-line">
          <div className="min-w-0">
            <h2 className="font-semibold text-lg truncate">{project.title}</h2>
            {slideCount > 1 && (
              <p className="text-sm text-fg/60" aria-live="polite">
                {isVideoSlide ? "Demo video" : "Screenshot"} {activeMedia + 1}{" "}
                of {slideCount}
              </p>
            )}
          </div>
          <button
            ref={closeRef}
            onClick={onClose}
            aria-label="Close"
            className="shrink-0 w-10 h-10 flex items-center justify-center rounded-lg text-fg/80 hover:bg-fg/10 hover:text-fg transition-colors duration-150"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="relative bg-bg-deep">
          {isVideoSlide ? (
            <iframe
              src={project.video}
              title={`${project.title} demo`}
              className="w-full aspect-[16/10]"
              allow="autoplay; encrypted-media; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <img
              src={media[activeMedia]}
              alt={`${project.title}, screenshot ${activeMedia + 1}`}
              className="w-full max-h-[68vh] object-contain"
            />
          )}

          {slideCount > 1 && (
            <>
              <button
                onClick={() =>
                  setActiveMedia((i) => (i - 1 + slideCount) % slideCount)
                }
                aria-label="Previous"
                className={`${arrowClass} left-3`}
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => setActiveMedia((i) => (i + 1) % slideCount)}
                aria-label="Next"
                className={`${arrowClass} right-3`}
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </>
          )}
        </div>

        {(project.liveUrl || project.githubUrl) && (
          <div className="flex flex-wrap gap-3 px-5 py-4 border-t border-line">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="btn btn-primary !py-2.5"
              >
                <ExternalLink className="w-4 h-4" />
                View live site
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="btn btn-line !py-2.5"
              >
                <FaGithub className="w-4 h-4" />
                Source code
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectModal;
