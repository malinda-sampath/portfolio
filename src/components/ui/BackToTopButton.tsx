import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

const BackToTopButton = () => {
  const [visible, setVisible] = useState(false);

  // Only show once the user has scrolled a bit.
  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 600);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Back to top"
      tabIndex={visible ? 0 : -1}
      style={{ "--focus-ring": "var(--color-link)" } as React.CSSProperties}
      className={`fixed bottom-5 right-5 z-50 flex h-11 w-11 items-center justify-center rounded-lg bg-bg-deep text-fg border border-line shadow-[0_6px_20px_-6px_rgba(0,0,0,0.5)] transition-all duration-200 hover:bg-accent hover:text-black hover:border-accent ${
        visible
          ? "opacity-100 translate-y-0"
          : "pointer-events-none opacity-0 translate-y-2"
      }`}
    >
      <ArrowUp className="h-5 w-5" />
    </button>
  );
};

export default BackToTopButton;
