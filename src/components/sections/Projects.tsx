import { useMemo, useState } from "react";
import { projects, categories, type Project } from "../../data/projects";
import ProjectCard from "../ui/ProjectCard";
import ProjectModal from "../ui/ProjectModel";
import SectionHeader from "../ui/SectionHeader";

const Projects = () => {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filtered = useMemo(() => {
    const list =
      activeCategory === "All"
        ? projects
        : projects.filter((p) => p.category === activeCategory);
    // Featured work leads
    return [...list].sort(
      (a, b) => Number(!!b.featured) - Number(!!a.featured),
    );
  }, [activeCategory]);

  const showFilter = categories.length > 1;

  return (
    <section id="projects" className="py-16 lg:py-20">
      <div className="max-w-6xl mx-auto px-5 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-5 mb-10">
          <div className="[&>div]:mb-0">
            <SectionHeader
              command="ls projects/"
              title="Projects"
              description="Click a screenshot to see more of each project."
            />
          </div>

          {showFilter && (
            <div
              role="group"
              aria-label="Filter projects by category"
              className="flex flex-wrap gap-1 p-1 rounded-lg bg-bg-deep border border-line"
            >
              {["All", ...categories].map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  aria-pressed={activeCategory === category}
                  className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors duration-150 ${
                    activeCategory === category
                      ? "bg-panel text-white shadow-[inset_0_0_0_1px_var(--color-line)]"
                      : "text-muted hover:text-fg"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filtered.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onOpen={setSelectedProject}
            />
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="py-16 text-muted">
            Nothing in this category yet. Choose another to see more work.
          </p>
        )}
      </div>

      <ProjectModal
        key={selectedProject?.id ?? "closed"}
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
};

export default Projects;
