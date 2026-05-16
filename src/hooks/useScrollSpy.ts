import { useEffect, useState } from "react";

const useScrollSpy = (sectionIds: string[], offset = 100): string => {
  const [activeSection, setActiveSection] = useState<string>("");

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + offset;

      // Find the currently active section based on scroll position
      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const id = sectionIds[i];
        const section = document.getElementById(id);
        if (section) {
          const sectionTop = section.offsetTop;
          const sectionHeight = section.offsetHeight;

          if (
            scrollPosition >= sectionTop &&
            scrollPosition < sectionTop + sectionHeight
          ) {
            setActiveSection(id);
            return;
          }
        }
      }

      setActiveSection("");
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [sectionIds, offset]);

  return activeSection;
};

// Smooth scroll to a section
export const scrollToSection = (sectionId: string, offset = 100): void => {
  const section = document.getElementById(sectionId);
  if (section) {
    const top = section.offsetTop - offset;
    window.scrollTo({
      top,
      behavior: "smooth",
    });
  }
};

export default useScrollSpy;
