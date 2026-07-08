import { useRef, useEffect } from "react";

type UseMagneticOptions = {
  strength?: number; // 0–1, how far it travels toward the cursor
  radius?: number; // px, activation distance from center
};

const useMagnetic = ({
  strength = 0.3,
  radius = 80,
}: UseMagneticOptions = {}) => {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    el.style.transition = "transform 0.2s ease-out";

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReduced) return;

    let raf = 0;

    const handleMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const dx = e.clientX - centerX;
      const dy = e.clientY - centerY;
      const dist = Math.sqrt(dx * dx + dy * dy);

      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        if (dist < radius) {
          el.style.transform = `translate(${dx * strength}px, ${dy * strength}px)`;
        } else {
          el.style.transform = "translate(0, 0)";
        }
      });
    };

    const reset = () => {
      el.style.transform = "translate(0, 0)";
    };

    window.addEventListener("mousemove", handleMove);
    el.addEventListener("mouseleave", reset);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      el.removeEventListener("mouseleave", reset);
      cancelAnimationFrame(raf);
    };
  }, [strength, radius]);

  return ref;
};

export default useMagnetic;
