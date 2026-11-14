import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import useMagnetic from "../../hooks/userMagnetic";

const BackToTopButton = () => {
  const [visible, setVisible] = useState(false);
  const ref = useMagnetic({ strength: 0.15, radius: 70 });

  // Only show once the user has scrolled a bit.
  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 400);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <button
      ref={ref as React.RefObject<HTMLButtonElement>}
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Back to top"
      className={`
        fixed bottom-6 right-6 z-50
        flex h-12 w-12 items-center justify-center rounded-full border border-white/10
        bg-white/5 text-white/70 backdrop-blur-xl shadow-lg transition-all duration-300
        hover:scale-110 hover:border-primary/40 hover:text-primary
        ${
          visible
            ? "opacity-100 translate-y-0"
            : "pointer-events-none opacity-0 translate-y-2"
        }
      `}
    >
      <ArrowUp className="h-5 w-5" />
    </button>
  );
};

export default BackToTopButton;
