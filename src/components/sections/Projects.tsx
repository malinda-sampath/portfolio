import { useMemo, useState } from "react";
import { projects, categories, type Project } from "../../data/projects";
import FadeIn from "../animations/Fadein";
import ProjectTile from "../ui/ProjectTile";
import ProjectModal from "../ui/ProjectModel";

const Projects = () => {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filtered = useMemo(() => {
    if (activeCategory === "All") return projects;
    return projects.filter((p) => p.category === activeCategory);
  }, [activeCategory]);

  return (
    <section id="projects" className="relative py-20 overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <FadeIn delay={0}>
          <div className="text-center mb-4">
            <div className="inline-flex items-center gap-2.5 px-5 py-2.5 border border-primary/30 bg-primary/10 rounded-full w-fit mx-auto mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-primary motion-safe:animate-pulse" />
              <span className="text-sm text-primary font-medium font-mono">
                {String(projects.length).padStart(2, "0")} Projects Shipped
              </span>
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={60}>
          <h2 className="text-4xl lg:text-5xl font-normal text-white leading-tight text-center mb-4">
            Selected Work
          </h2>
        </FadeIn>

        <FadeIn delay={120}>
          <p className="text-base text-white/60 max-w-xl mx-auto text-center mb-12">
            Click any project to see the full breakdown — screenshots, demo, and
            stack.
          </p>
        </FadeIn>

        {/* Category Filter */}
        <FadeIn delay={180}>
          <div className="flex flex-wrap justify-center gap-2 mb-14">
            <button
              onClick={() => setActiveCategory("All")}
              className={`px-4 py-2 text-sm font-medium rounded-full border transition-all duration-300 ${
                activeCategory === "All"
                  ? "bg-primary text-black border-primary"
                  : "bg-white/5 text-white/70 border-white/10 hover:border-white/25 hover:text-white"
              }`}
            >
              All
            </button>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 text-sm font-medium rounded-full border transition-all duration-300 ${
                  activeCategory === category
                    ? "bg-primary text-black border-primary"
                    : "bg-white/5 text-white/70 border-white/10 hover:border-white/25 hover:text-white"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </FadeIn>

        {/* Compact tile grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filtered.map((project, index) => (
            <FadeIn key={project.id} delay={index * 70}>
              <ProjectTile project={project} onOpen={setSelectedProject} />
            </FadeIn>
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="text-center text-white/40 py-16 font-mono text-sm">
            No projects in this category yet.
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
