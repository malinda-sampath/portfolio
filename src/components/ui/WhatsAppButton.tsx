import { useEffect, useRef, useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { ArrowUp } from "lucide-react";
import useMagnetic from "../../hooks/userMagnetic";
import { useWhatsAppChat } from "../../context/WhatsAppChatContext";
import ChatPanel from "./ChatPanel";

const WhatsAppButton = () => {
  const {
    isChatOpen: open,
    setIsChatOpen: setOpen,
    isFooterInView,
    setIsFooterInView,
  } = useWhatsAppChat();

  const [showTooltip, setShowTooltip] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);

  const boxRef = useRef<HTMLDivElement>(null);
  const whatsappRef = useMagnetic({ strength: 0.25, radius: 90 });
  const topRef = useMagnetic({ strength: 0.15, radius: 70 });

  // Close on click outside.
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (boxRef.current && !boxRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [setOpen]);

  // Close on Escape.
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [setOpen]);

  // Watch when the footer/contact section scrolls into view — the footer's
  // own inline chat card takes over as the entry point there.
  useEffect(() => {
    const footer = document.getElementById("contact");
    if (!footer) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsFooterInView(entry.isIntersecting),
      { threshold: 0.15 },
    );
    observer.observe(footer);
    return () => observer.disconnect();
  }, [setIsFooterInView]);

  // One-time tooltip nudge, auto-dismissing.
  useEffect(() => {
    const seen = sessionStorage?.getItem?.("whatsapp-tooltip-seen");
    if (!seen) {
      const showId = setTimeout(() => setShowTooltip(true), 2000);
      const hideId = setTimeout(() => {
        setShowTooltip(false);
        sessionStorage?.setItem?.("whatsapp-tooltip-seen", "1");
      }, 7000);
      return () => {
        clearTimeout(showId);
        clearTimeout(hideId);
      };
    }
  }, []);

  // Only show "back to top" once the user has scrolled a bit.
  useEffect(() => {
    const handleScroll = () => setShowBackToTop(window.scrollY > 400);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleToggle = () => {
    setOpen(!open);
    setShowTooltip(false);
  };

  // Once the footer's own inline chat card is on screen, fully unmount the
  // floating FAB + panel + back-to-top so there's only one chat instance
  // driving `isChatOpen` at a time.
  if (isFooterInView) {
    return null;
  }

  return (
    <div
      ref={boxRef}
      className="fixed bottom-6 right-6 z-50 flex flex-col items-center gap-4"
    >
      {/* WhatsApp + Popup container */}
      <div className="relative flex justify-center">
        {/* First-visit tooltip nudge */}
        <div
          className={`
            absolute bottom-full right-0 mb-2 whitespace-nowrap rounded-full
            bg-white px-3 py-1.5 text-xs font-medium text-gray-800 shadow-lg
            transition-all duration-300
            ${
              showTooltip && !open
                ? "translate-y-0 opacity-100"
                : "pointer-events-none translate-y-1 opacity-0"
            }
          `}
        >
          Chat with me 👋
        </div>

        {/* Chat Window */}
        <div
          role="dialog"
          aria-modal="true"
          aria-label="WhatsApp chat"
          className={`
            absolute bottom-full mb-4 right-0 w-[calc(100vw-48px)] max-w-[360px]
            origin-bottom-right transition-all duration-300
            ${
              open
                ? "scale-100 opacity-100"
                : "pointer-events-none scale-90 opacity-0"
            }
          `}
        >
          <ChatPanel variant="floating" />
        </div>
      </div>

      {/* Floating Button */}
      <div className="relative">
        <button
          ref={whatsappRef as React.RefObject<HTMLButtonElement>}
          onClick={handleToggle}
          aria-label={open ? "Close WhatsApp chat" : "Open WhatsApp chat"}
          aria-expanded={open}
          className="relative flex h-14 w-14 items-center justify-center rounded-full bg-primary text-[#212121] shadow-[0_0_30px_rgba(124,255,91,0.45)] transition hover:scale-110"
        >
          {!open && (
            <span className="absolute inset-0 rounded-full bg-primary/40 animate-ping" />
          )}
          <FaWhatsapp className="relative h-7 w-7" />
        </button>
      </div>

      {/* Back to top button */}
      <button
        ref={topRef as React.RefObject<HTMLButtonElement>}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Back to top"
        className={`
          flex h-12 w-12 items-center justify-center rounded-full border border-white/10
          bg-white/5 text-white/70 backdrop-blur-xl shadow-lg transition-all duration-300
          hover:scale-110 hover:border-primary/40 hover:text-primary
          ${
            showBackToTop
              ? "opacity-100 translate-y-0"
              : "pointer-events-none opacity-0 translate-y-2"
          }
        `}
      >
        <ArrowUp className="h-5 w-5" />
      </button>
    </div>
  );
};

export default WhatsAppButton;
