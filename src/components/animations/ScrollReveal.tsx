import type { ReactNode } from "react";
import useScrollReveal from "../../hooks/useScrollReveal";

type ScrollRevealProps = {
  children: ReactNode;
  animation?: "fadeUp" | "fadeIn" | "slideInLeft" | "slideInRight" | "scaleIn";
  delay?: number;
  duration?: number;
};

const ScrollReveal = ({
  children,
  animation = "fadeUp",
  delay = 0,
  duration = 700,
}: ScrollRevealProps) => {
  const [ref, isVisible] = useScrollReveal({
    threshold: 0.1,
  });

  const animationClass = {
    fadeUp: "opacity-0 translate-y-8",
    fadeIn: "opacity-0",
    slideInLeft: "opacity-0 -translate-x-12",
    slideInRight: "opacity-0 translate-x-12",
    scaleIn: "opacity-0 scale-90",
  };

  const visibleClasses =
    "opacity-100 translate-y-0 -translate-x-0 translate-x-0 scale-100";

  return (
    <div
      ref={ref}
      className={`transition-all ease-out ${
        isVisible ? visibleClasses : animationClass[animation]
      }`}
      style={{
        transitionDelay: `${delay}ms`,
        transitionDuration: `${duration}ms`,
      }}
    >
      {children}
    </div>
  );
};

export default ScrollReveal;
