import { Download, Code2, Sparkle, Zap } from "lucide-react";
import { PERSONAL_INFO } from "../../utills/constants";
import FadeIn from "../animations/Fadein";
import TiltCard from "../ui/TiltCard";

const About = () => {
  const highlights = [
    {
      icon: Code2,
      title: "Backend Engineering",
      body: "Building scalable REST APIs, microservices, and enterprise applications using Java, Spring Boot, and modern software architecture.",
      span: true,
    },
    {
      icon: Sparkle,
      title: "Cloud & DevOps",
      body: "Deploying and managing applications with Azure, Docker, Kubernetes, GitHub Actions, and CI/CD automation.",
    },
    {
      icon: Zap,
      title: "Problem Solving",
      body: "Focused on designing reliable solutions, improving system performance, and continuously learning modern engineering practices.",
    },
  ];

  return (
    <section id="about" className="relative py-20 overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 sm:text-center md:text-left items-center mb-20">
          {/* Left Column - Content */}
          <div className="flex flex-col gap-12 items-center md:items-start text-center md:text-left">
            <div className="flex flex-col gap-8 items-center md:items-start">
              <FadeIn delay={60}>
                <div className="inline-flex items-center gap-2.5 px-5 py-2.5 border border-primary/30 bg-primary/10 rounded-[17px] w-fit">
                  <Code2 className="w-4 h-4 text-primary" />
                  <span className="text-sm text-primary font-medium">
                    Backend Developer
                  </span>
                  <Sparkle className="w-4 h-4 text-primary" />
                </div>
              </FadeIn>

              <FadeIn delay={100}>
                <h2 className="text-4xl lg:text-5xl font-normal text-white leading-tight">
                  Crafting Digital Experiences That Matter
                </h2>
              </FadeIn>

              <FadeIn delay={200}>
                <div className="flex flex-col gap-4">
                  {PERSONAL_INFO.bio.map((paragraph, index) => (
                    <p
                      key={index}
                      className="text-base text-white/70 leading-relaxed md:before:content-['•'] md:before:text-primary md:before:mr-3 md:before:font-bold"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              </FadeIn>

              <FadeIn delay={400}>
                <button
                  onClick={() =>
                    window.open(
                      `${import.meta.env.BASE_URL}${PERSONAL_INFO.resume}`,
                      "_blank",
                    )
                  }
                  className="inline-flex items-center gap-3 bg-white hover:bg-white/90 text-black rounded-[17px] px-8 py-4 text-base font-medium transition-all duration-300 w-fit group"
                >
                  <Download className="w-5 h-5 group-hover:translate-y-0.5 transition-transform duration-300" />
                  Download Resume
                </button>
              </FadeIn>
            </div>
          </div>

          {/* Right Column - Info Grid */}
          <FadeIn delay={200}>
            <div className="grid grid-cols-2 gap-4">
              {highlights.map((item) => (
                <div
                  key={item.title}
                  className={`relative group ${item.span ? "col-span-2" : ""}`}
                >
                  <div className="absolute inset-0 bg-linear-to-br from-primary/10 to-primary/5 rounded-[17px] blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-300" />

                  <div className="relative bg-white/5 border border-white/10 rounded-[17px] p-6 hover:border-primary/30 hover:-translate-y-1 transition-all duration-300 h-full">
                    <div className="flex flex-col md:flex-row md:items-start items-center gap-4 text-center md:text-left">
                      <div className="p-3 bg-primary/10 rounded-[17px] shrink-0">
                        <item.icon className="w-5 h-5 text-primary" />
                      </div>

                      <div className="flex-1">
                        <h3 className="text-base font-semibold text-white mb-2">
                          {item.title}
                        </h3>

                        <p className="text-sm text-white/70 leading-relaxed">
                          {item.body}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              <div className="col-span-2 relative group">
                <div className="absolute inset-0 bg-linear-to-br from-primary/10 to-primary/5 rounded-[17px] blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-300" />
                <TiltCard className="relative bg-white/5 border border-white/10 rounded-[17px] p-6 hover:border-primary/30 transition-all duration-300 h-full">
                  <div className="grid grid-cols-3 gap-6 text-center">
                    {[
                      { value: "2.5k+", label: "Code Commits" },
                      { value: "30+", label: "GitHub Repositories" },
                      { value: "1000+", label: "Development Hours" },
                    ].map((s) => (
                      <div key={s.label}>
                        <div className="text-2xl font-bold text-primary mb-1">
                          {s.value}
                        </div>
                        <div className="text-xs text-white/60">{s.label}</div>
                      </div>
                    ))}
                  </div>
                </TiltCard>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
};

export default About;
