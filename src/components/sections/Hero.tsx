import { useState } from "react";
import { ChevronDown, Star } from "lucide-react";
import { SiReact, SiNextdotjs, SiTailwindcss, SiMongodb } from "react-icons/si";
import { PERSONAL_INFO, STATS } from "../../utills/constants";
import { scrollToSection } from "../../hooks/useScrollSpy";
import FadeIn from "../animations/Fadein";
import RadialGradientBackgroud from "../backgrounds/RadialGradientBackground";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-black">
      {/* <RadialGradientBackgroud variant="hero" /> */}

      {/* Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <div className="text-left">
            <FadeIn delay={0}>
              <div className="inline-flex items-center gap-2.5 px-4.5 py-2.75 mb-8 bg-linear-to-r from-primary/10 via-primary/15 to-primary/20 border  border-primary/20 rounded-full">
                <Star className="w-4 h-4 text-white fill-white" />
                <span className="text-xs md:text-sm text-white traccking-[1.2px]">
                  {PERSONAL_INFO.title} | Based in {PERSONAL_INFO.location}
                </span>
              </div>
            </FadeIn>

            <FadeIn delay={100}>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-normal text-white md-6 leading-tight">
                React.js Developer Portfolio
              </h1>
            </FadeIn>

            <FadeIn delay={200}>
              <p className="text-lg text-white/70 max-w-137.5 mb-8">
                Hi, I'm {PERSONAL_INFO.name}, a passionate React.js developer
                with experience in building dynamic and responsive web
                applications. I specialize in creating seamless user experiences
                and writing clean, efficient code.
              </p>
            </FadeIn>

            <FadeIn delay={300}>
              <button
                onClick={() => scrollToSection("contact")}
                className="inline-flex items-center gap-0 mb-12 group"
              >
                <div className="relative z-10 bg-primary hover:bg-primary/80 text-[ #212121] rounded-[17px] px-[26px] py-[13px] text-base font-medium border border-primary">
                  Get In Touch
                </div>
              </button>
            </FadeIn>

            <FadeIn delay={400}>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-10 max-x-full">
                {STATS.map((stat, index) => (
                  <div
                    key={index}
                    className="text-left border-r border-white/50 pr-10 last:border-r-0"
                  >
                    <span className="text-2xl font-normal text-primary mb-2 font-mono">
                      {stat.value}
                    </span>
                    <p className="text-sm text-white leading-snug">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
