import { useState } from "react";
import { Code2 } from "lucide-react";
import { skills } from "../../data/skills";
import SectionHeader from "../ui/SectionHeader";

type Skill = {
  id: number;
  name: string;
  icon: string;
};

const SKILLS = skills as Record<string, Skill[]>;

/*
  The stack is drawn in the order a request meets it. Each stop pulls its
  tools from one or more categories in data/skills.ts, so editing that file
  updates the diagram. Categories not named here fall into "Also in the toolbox".
*/
const STOPS: { title: string; body: string; groups: string[] }[] = [
  {
    title: "Languages",
    body: "What the code is written in.",
    groups: ["Languages"],
  },
  {
    title: "Gateway & Identity",
    body: "API management, authentication and single sign-on.",
    groups: ["Identity & API Management"],
  },
  {
    title: "Services",
    body: "REST APIs and microservices.",
    groups: ["Backend Development"],
  },
  {
    title: "Messaging",
    body: "Queues and event brokers between services.",
    groups: ["Messaging & Integration"],
  },
  {
    title: "Data",
    body: "Relational databases.",
    groups: ["Databases"],
  },
];

const PLATFORM_GROUP = "Cloud & DevOps";

const placed = new Set([...STOPS.flatMap((s) => s.groups), PLATFORM_GROUP]);
const AROUND = Object.keys(SKILLS).filter((category) => !placed.has(category));

const SkillIcon = ({ skill }: { skill: Skill }) => {
  const [errored, setErrored] = useState(!skill.icon);

  return (
    // Light tile so dark-on-transparent logos stay visible on the dark theme
    <span className="w-6 h-6 rounded bg-fg flex items-center justify-center shrink-0">
      {errored ? (
        <Code2 className="w-3.5 h-3.5 text-accent" aria-hidden="true" />
      ) : (
        <img
          src={skill.icon}
          alt=""
          loading="lazy"
          onError={() => setErrored(true)}
          className="w-4 h-4 object-contain"
        />
      )}
    </span>
  );
};

const SkillList = ({ category }: { category: string }) => (
  <ul className="space-y-2.5">
    {(SKILLS[category] ?? []).map((skill) => (
      <li key={skill.id} className="flex items-center gap-2.5">
        <SkillIcon skill={skill} />
        <span className="text-[0.925rem] text-fg">{skill.name}</span>
      </li>
    ))}
  </ul>
);

const Skills = () => {
  return (
    <section
      id="skills"
      className="py-16 lg:py-20 overflow-hidden"
    >
      <div className="max-w-6xl mx-auto px-5 sm:px-6 lg:px-8">
        <SectionHeader
          command="ls stack/"
          title="Tech stack"
          description="The languages I write in, then the stack in the order a request travels through a backend: gateway, services, messaging, database."
        />

        {/* Request path */}
        <p className="font-mono text-sm mb-5">
          <span className="text-muted">request</span>{" "}
          <span className="text-yellow font-medium">POST</span>{" "}
          <span className="text-fg">/api/orders</span>
        </p>

        <div className="relative">
          {/* Rail: horizontal on desktop, vertical on small screens */}
          <div
            aria-hidden="true"
            className="absolute bg-line left-[6px] top-2 bottom-0 w-0.5 lg:left-0 lg:right-0 lg:top-[6px] lg:bottom-auto lg:w-auto lg:h-0.5"
          >
            <span className="rail-pulse hidden lg:block absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-14 h-0.5 bg-linear-to-r from-transparent to-green shadow-[0_0_10px_1px_rgba(124,255,91,0.6)]" />
          </div>

          <ol className="grid grid-cols-1 lg:grid-cols-5 gap-4">
            {STOPS.map((stop) => (
              <li
                key={stop.title}
                className="relative pl-8 lg:pl-0 lg:pt-8 flex flex-col"
              >
                {/* Node on the rail */}
                <span
                  aria-hidden="true"
                  className="absolute w-3.5 h-3.5 rounded-full bg-bg-deep border-2 border-green left-0 top-5 lg:top-0 lg:left-5"
                />
                <div className="panel p-5 lg:p-4 flex-1">
                  <h3 className="text-base font-semibold text-white mb-1">
                    {stop.title}
                  </h3>
                  <p className="text-sm text-muted leading-relaxed mb-5">
                    {stop.body}
                  </p>
                  <div className="space-y-5">
                    {stop.groups.map((group, i) => (
                      <div key={group}>
                        {i > 0 && (
                          <p className="font-mono text-xs text-muted mb-2.5">
                            {`// ${group.toLowerCase()}`}
                          </p>
                        )}
                        <SkillList category={group} />
                      </div>
                    ))}
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>

        {/* Platform: the layer everything above runs on */}
        <div className="panel mt-5 p-5 lg:flex lg:items-center lg:gap-8 border-dashed">
          <div className="lg:w-56 shrink-0 mb-4 lg:mb-0">
            <h3 className="text-base font-semibold text-white mb-1">
              Cloud & DevOps
            </h3>
            <p className="text-sm text-muted leading-relaxed">
              What all of it is built, shipped and run on.
            </p>
          </div>
          <ul className="flex flex-wrap gap-x-7 gap-y-3">
            {(SKILLS[PLATFORM_GROUP] ?? []).map((skill) => (
              <li key={skill.id} className="flex items-center gap-2.5">
                <SkillIcon skill={skill} />
                <span className="text-[0.925rem] text-fg">{skill.name}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Everything that isn't on the request path */}
        {AROUND.length > 0 && (
          <div className="mt-12">
            <h3 className="text-lg font-semibold text-white mb-5">
              Also in the toolbox
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 sm:[&>*:last-child:nth-child(odd)]:col-span-2 md:[&>*:last-child:nth-child(odd)]:col-span-1">
              {AROUND.map((category) => (
                <div key={category} className="panel p-5">
                  <p className="text-sm font-medium text-white mb-4">
                    {category}
                  </p>
                  <SkillList category={category} />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Skills;
