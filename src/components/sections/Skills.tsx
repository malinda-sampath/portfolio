import { useMemo, useState } from "react";
import { Code2 } from "lucide-react";
import { skills } from "../../data/skills";
import FadeIn from "../animations/Fadein";

type Skill = {
  id: number;
  name: string;
  icon: string;
};

const CATEGORIES = Object.keys(skills);

const SkillIcon = ({ skill }: { skill: Skill }) => {
  const [errored, setErrored] = useState(!skill.icon);

  if (errored) {
    return (
      <div className="w-4 h-4 rounded bg-primary/10 flex items-center justify-center shrink-0">
        <Code2 className="w-2.5 h-2.5 text-primary" />
      </div>
    );
  }

  return (
    <img
      src={skill.icon}
      alt=""
      loading="lazy"
      onError={() => setErrored(true)}
      className="w-4 h-4 object-contain shrink-0"
    />
  );
};

const Skills = () => {
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const visibleEntries = useMemo(() => {
    const entries = Object.entries(skills) as [string, Skill[]][];
    if (activeCategory === "All") return entries;
    return entries.filter(([category]) => category === activeCategory);
  }, [activeCategory]);

  const totalCount = useMemo(
    () => Object.values(skills).reduce((sum, list) => sum + list.length, 0),
    [],
  );

  return (
    <section id="skills" className="relative overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <FadeIn delay={0}>
          <div className="text-center mb-4">
            <div className="inline-flex items-center gap-2.5 px-5 py-2.5 border border-primary/30 bg-primary/10 rounded-full w-fit mb-6">
              <Code2 className="w-4 h-4 text-primary" />
              <span className="text-sm text-primary font-medium">
                {totalCount} Technologies
              </span>
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={60}>
          <h2 className="text-4xl lg:text-5xl font-normal text-white leading-tight text-center mb-4">
            Tools I Work With
          </h2>
        </FadeIn>

        <FadeIn delay={120}>
          <p className="text-base text-white/60 max-w-xl mx-auto text-center mb-12">
            A stack built across backend systems, cloud infrastructure, and
            modern frontend tooling.
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
            {CATEGORIES.map((category) => (
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

        {/* Skill Groups */}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          {visibleEntries.map(([category, skillList], groupIndex) => (
            <FadeIn key={category} delay={groupIndex * 80}>
              <div className="group relative break-inside-avoid">
                <div className="absolute inset-0 bg-linear-to-br from-primary/10 to-primary/5 rounded-2xl blur-xl opacity-0 group-hover:opacity-60 transition-opacity duration-300" />
                <div className="relative bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-primary/30 transition-all duration-300">
                  <div className="flex items-center justify-between mb-5">
                    <h3 className="text-base font-semibold text-white tracking-wide">
                      {category}
                    </h3>
                    <span className="text-xs font-mono text-white/40">
                      {String(skillList.length).padStart(2, "0")}
                    </span>
                  </div>

                  {/* Compact chip layout instead of stacked rows */}
                  <div className="flex flex-wrap gap-2">
                    {skillList.map((skill) => (
                      <div
                        key={skill.id}
                        className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-full bg-white/5 border border-white/10 hover:border-primary/40 hover:bg-primary/5 transition-colors duration-200"
                      >
                        <SkillIcon skill={skill} />
                        <span className="text-xs text-white/80 whitespace-nowrap">
                          {skill.name}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
