import { Download, Mail, MapPin } from "lucide-react";
import { FaGithub, FaJava } from "react-icons/fa";
import { SiDocker, SiKubernetes, SiSpringboot } from "react-icons/si";
import { VscAzure } from "react-icons/vsc";
import { FaLinkedin } from "react-icons/fa6";
import { PERSONAL_INFO, STATS } from "../../utills/constants";

const rise = (i: number) => ({ "--i": i }) as React.CSSProperties;

const CORE_STACK = [
  { icon: FaJava, label: "Java" },
  { icon: SiSpringboot, label: "Spring Boot" },
  { icon: SiDocker, label: "Docker" },
  { icon: SiKubernetes, label: "Kubernetes" },
  { icon: VscAzure, label: "Azure" },
];

const ROLES = PERSONAL_INFO.title.split("|").map((part) => part.trim());

/* Stats printed as the output of a terminal command. Sits below the hero
   so nothing covers the portrait. */
const StatsTerminal = () => (
  <div className="panel overflow-hidden">
    <div className="flex items-center gap-1.5 px-4 py-2.5 border-b border-line bg-bg-deep">
      <span className="w-2.5 h-2.5 rounded-full bg-red/80" />
      <span className="w-2.5 h-2.5 rounded-full bg-yellow/80" />
      <span className="w-2.5 h-2.5 rounded-full bg-green/80" />
      <span className="ml-3 font-mono text-xs text-muted">
        malinda@backend: ~
      </span>
    </div>
    <div className="px-5 py-4 font-mono">
      <p className="text-sm mb-4">
        <span className="text-green">$</span>{" "}
        <span className="text-fg">./stats --summary</span>
      </p>
      <dl className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-5 mb-4">
        {STATS.map((stat) => (
          <div key={stat.label} className="flex flex-col-reverse">
            <dt className="font-sans text-sm text-muted mt-1">{stat.label}</dt>
            <dd className="text-2xl sm:text-3xl font-medium text-green">
              {stat.value}
            </dd>
          </div>
        ))}
      </dl>
      <p className="text-sm text-muted">
        <span className="text-yellow">status:</span> open to work
        <span className="caret text-green ml-1" aria-hidden="true">
          ▍
        </span>
      </p>
    </div>
  </div>
);

const Hero = () => {
  const base = import.meta.env.BASE_URL;

  return (
    <section className="relative overflow-hidden pt-16">
      <div className="max-w-6xl mx-auto px-5 sm:px-6 lg:px-8 pb-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-x-8 items-center">
          {/* Words */}
          <div className="md:col-span-7 py-12 sm:py-16">
            <p
              className="rise font-mono text-sm text-muted mb-4"
              style={rise(0)}
            >
              <span className="text-green">$</span> whoami
            </p>

            <h1
              className="rise text-4xl sm:text-5xl font-semibold tracking-tight text-white mb-5"
              style={rise(1)}
            >
              Hi, I'm{" "}
              <span className="text-green">{PERSONAL_INFO.name}</span>
            </h1>

            <ul
              className="rise flex flex-wrap gap-2 mb-6"
              style={rise(2)}
              aria-label="Roles"
            >
              {ROLES.map((role) => (
                <li key={role} className="chip !text-[0.8rem] !bg-panel">
                  {role}
                </li>
              ))}
            </ul>

            <p
              className="rise text-base sm:text-[1.0625rem] text-muted leading-relaxed max-w-[35rem] mb-8"
              style={rise(3)}
            >
              Designing and building scalable backend systems, cloud-native
              applications, and modern software solutions using Java, Azure
              Cloud, and DevOps practices. Passionate about clean architecture,
              automation, and delivering reliable, maintainable software.
            </p>

            <div
              className="rise flex flex-wrap items-center gap-3"
              style={rise(4)}
            >
              {/* Buttons share the row on phones, or stack full-width
                  when it's too narrow for both */}
              <a
                href={`mailto:${PERSONAL_INFO.email}`}
                className="btn btn-primary grow sm:grow-0"
              >
                <Mail className="w-4 h-4" />
                Get in touch
              </a>
              <a
                href={`${base}${PERSONAL_INFO.resume}`}
                target="_blank"
                rel="noreferrer"
                className="btn btn-line grow sm:grow-0"
              >
                <Download className="w-4 h-4" />
                Download CV
              </a>
              <div className="flex items-center">
                <a
                  href={PERSONAL_INFO.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub profile"
                  className="p-2.5 text-muted hover:text-green transition-colors duration-150"
                >
                  <FaGithub className="w-5 h-5" />
                </a>
                <a
                  href={PERSONAL_INFO.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn profile"
                  className="p-2.5 text-muted hover:text-green transition-colors duration-150"
                >
                  <FaLinkedin className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>

          {/* Portrait: a still, editorial frame. The photo is cropped to the
              upper body, an offset outline sits behind it, and the core stack
              goes in a caption strip below so nothing covers the photo. */}
          <div className="md:col-span-5 flex justify-center md:justify-end md:py-10">
            <figure
              className="rise relative w-full max-w-[16rem] sm:max-w-[18rem] lg:max-w-[21rem]"
              style={rise(2)}
            >
              <div
                aria-hidden="true"
                className="absolute -inset-10 rounded-full blur-3xl bg-[radial-gradient(circle_at_50%_35%,rgba(124,255,91,0.12),transparent_65%)]"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 translate-x-2 translate-y-2 sm:translate-x-3 sm:translate-y-3 rounded-2xl border border-green/25"
              />

              <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-bg-deep shadow-[0_24px_60px_-28px_rgba(0,0,0,0.85)]">
                <div className="relative aspect-[4/5] overflow-hidden bg-black">
                  <img
                    width="800"
                    height="1104"
                    src={`${base}images/portrait-hd.png`}
                    srcSet={`${base}images/portrait-mobile.png 400w, ${base}images/portrait-hd.png 800w, ${base}images/portrait-4k.png 1200w`}
                    sizes="(max-width: 1024px) 70vw, 30vw"
                    alt={`Portrait of ${PERSONAL_INFO.name}`}
                    className="absolute inset-0 h-full w-full object-cover object-[50%_12%] select-none"
                    fetchPriority="high"
                    decoding="async"
                  />
                  <div
                    aria-hidden="true"
                    className="absolute inset-x-0 bottom-0 h-20 bg-linear-to-t from-black/70 to-transparent"
                  />
                  <p className="absolute left-3 bottom-3 flex items-center gap-1.5 rounded-md bg-black/50 backdrop-blur-sm px-2 py-1 font-mono text-[0.7rem] text-fg/90">
                    <MapPin className="w-3 h-3 text-green" />
                    {PERSONAL_INFO.location}
                  </p>
                </div>

                <figcaption className="flex items-center justify-between gap-3 border-t border-white/10 px-4 py-3">
                  <span className="font-mono text-[0.7rem] uppercase tracking-wider text-muted">
                    Core stack
                  </span>
                  <ul aria-label="Core stack" className="flex items-center gap-3">
                    {CORE_STACK.map(({ icon: Icon, label }) => (
                      <li key={label} title={label}>
                        <Icon
                          aria-label={label}
                          className="w-4 h-4 text-muted transition-colors duration-150 hover:text-green"
                        />
                      </li>
                    ))}
                  </ul>
                </figcaption>
              </div>
            </figure>
          </div>
        </div>

        <div className="rise mt-4 lg:mt-2" style={rise(5)}>
          <StatsTerminal />
        </div>
      </div>
    </section>
  );
};

export default Hero;
