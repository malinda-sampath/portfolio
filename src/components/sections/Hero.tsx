import { ChevronDown, ArrowRight } from "lucide-react";
import { FaJava } from "react-icons/fa";
import { VscAzure } from "react-icons/vsc";
import { SiSpringboot, SiDocker, SiKubernetes } from "react-icons/si";
import { PERSONAL_INFO, STATS } from "../../utills/constants";
import { scrollToSection } from "../../hooks/useScrollSpy";
import FadeIn from "../animations/Fadein";
import MagneticButton from "../ui/MagneticButton";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
        <div className="grid grid-cols-1 mt-8 sm:mt-8 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <div className="text-center md:text-left">
            <FadeIn delay={0}>
              <div className="inline-flex items-center gap-5 px-4.5 py-2.75 mb-8 bg-linear-to-r from-primary/10 via-primary/15 to-primary/20 border border-primary/20 rounded-[17px]">
                <span className="relative flex h-5 w-5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-[17px] bg-primary opacity-75" />
                </span>
                <span className="text-xs text-left md:text-sm text-white tracking-[1.2px]">
                  {PERSONAL_INFO.title}
                </span>
              </div>
            </FadeIn>

            <FadeIn delay={100}>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-normal text-white mb-6 leading-tight">
                Hi, I'm{" "}
                <span className="bg-linear-to-r from-primary via-primary to-primary/60 bg-clip-text text-transparent">
                  {PERSONAL_INFO.name} Piyadarshana
                </span>
              </h1>
            </FadeIn>

            <FadeIn delay={200}>
              <p className="text-lg text-white/70 lg:max-w-137.5 mb-8">
                Designing and building scalable backend systems, cloud-native
                applications, and modern software solutions using Java, Azure
                Cloud, and DevOps practices. Passionate about clean
                architecture, automation, and delivering reliable, maintainable
                software.
              </p>
            </FadeIn>

            <FadeIn delay={300}>
              <div className="flex flex-wrap justify-center md:justify-start items-center gap-4 mb-12">
                <MagneticButton
                  onClick={() => scrollToSection("contact")}
                  className="group relative inline-flex items-center gap-2 bg-primary-dark hover:bg-primary/90 text-[#212121] rounded-[17px] px-[26px] py-[13px] text-base font-medium border border-primary transition-transform duration-300 hover:scale-[1.03] active:scale-[0.98]"
                >
                  Get In Touch
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </MagneticButton>

                <button
                  onClick={() => scrollToSection("projects")}
                  className="inline-flex items-center gap-2 px-[26px] py-[13px] text-base font-medium text-white rounded-[17px] border border-white/20 hover:border-white/40 hover:bg-white/5 transition-all duration-300"
                >
                  View Work
                </button>
              </div>
            </FadeIn>

            <FadeIn delay={400}>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-10 max-w-full">
                {STATS.map((stat, index) => (
                  <div
                    key={index}
                    className="text-center lg:text-left border-r border-white/10 pr-0 lg:pr-10 last:border-r-0"
                  >
                    <span className="block text-2xl font-normal text-primary mb-2 font-mono">
                      {stat.value}
                    </span>
                    <p className="text-sm text-white/70 leading-snug">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>

          {/* Right Column - Image */}
          <FadeIn delay={200}>
            <div className="relative">
              <div className="relative overflow-hidden rounded-[17px] aspect-[4/5] max-w-sm mx-auto lg:max-w-[31rem] lg:ml-auto group">
                <div className="relative rounded-[17px] overflow-hidden border border-white/10 shadow-lg transform transition-transform duration-500 group-hover:scale-[1.02]">
                  <img
                    width="800"
                    height="800"
                    src={`${import.meta.env.BASE_URL}images/portrait-hd.png`}
                    srcSet={`
                      ${import.meta.env.BASE_URL}images/portrait-mobile.png 400w,
                      ${import.meta.env.BASE_URL}images/portrait-hd.png 800w,
                      ${import.meta.env.BASE_URL}images/portrait-4k.png 1200w
                    `}
                    sizes="(max-width: 768px) 100vw, 50vw"
                    alt={`${PERSONAL_INFO.name}, ${PERSONAL_INFO.title}`}
                    className="w-full h-full object-cover"
                    fetchPriority="high"
                    decoding="async"
                  />
                  {/* Bottom gradient for logo legibility */}
                  <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/70 to-transparent" />
                </div>

                {/* Technology Logos */}
                <div className="absolute bottom-6 left-6 right-6 z-20">
                  <FadeIn delay={500}>
                    <div className="flex items-center justify-between gap-3 bg-black/40 backdrop-blur-sm border border-white/10 rounded-[17px] px-10 py-3">
                      {[
                        FaJava,
                        SiSpringboot,
                        SiDocker,
                        SiKubernetes,
                        VscAzure,
                      ].map((Icon, i) => (
                        <div
                          key={i}
                          className="w-6 h-6 hover:scale-125 hover:-translate-y-0.5 transition-transform duration-300"
                        >
                          <Icon className="w-full h-full text-primary" />
                        </div>
                      ))}
                    </div>
                  </FadeIn>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>

      <button
        onClick={() => scrollToSection("about")}
        className="absolute bottom-2 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-white/50 hover:text-primary transition-colors duration-300 motion-safe:animate-bounce"
        aria-label="Scroll to about section"
      >
        <span className="text-[11px] tracking-[2px] uppercase">Scroll</span>
        <ChevronDown className="w-6 h-6" />
      </button>
    </section>
  );
};

export default Hero;
