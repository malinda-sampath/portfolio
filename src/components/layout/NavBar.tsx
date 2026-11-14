import { useEffect, useState } from "react";
import { Download, Menu, SquareTerminal, X } from "lucide-react";
import { NAV_LINKS, PERSONAL_INFO } from "../../utills/constants";
import useScrollSpy, { scrollToSection } from "../../hooks/useScrollSpy";

const SECTION_IDS = NAV_LINKS.map((link) => link.id);
const RESUME_URL = `${import.meta.env.BASE_URL}${PERSONAL_INFO.resume}`;

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const activeSection = useScrollSpy(SECTION_IDS, 120);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 24);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll while the mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  // Close the mobile menu on Escape
  useEffect(() => {
    if (!isMenuOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsMenuOpen(false);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isMenuOpen]);

  // Close the mobile menu if the screen grows to the desktop layout
  // (rotating a tablet), so the body scroll lock doesn't stay on
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const handleChange = (e: MediaQueryListEvent) => {
      if (e.matches) setIsMenuOpen(false);
    };
    mq.addEventListener("change", handleChange);
    return () => mq.removeEventListener("change", handleChange);
  }, []);

  const handleNavClick = (sectionId: string) => {
    scrollToSection(sectionId, 64);
    setIsMenuOpen(false);
  };

  return (
    <header
      className={`bg-bg/75 backdrop-blur-md fixed top-0 inset-x-0 z-[900] transition-shadow duration-300 ${
        isScrolled || isMenuOpen
          ? "shadow-[0_1px_0_0_var(--color-line),0_10px_30px_-18px_rgba(0,0,0,0.7)]"
          : ""
      }`}
    >
      <div className="max-w-6xl mx-auto px-5 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-6">
        <button
          onClick={() => {
            window.scrollTo({ top: 0, behavior: "smooth" });
            setIsMenuOpen(false);
          }}
          className="flex items-center gap-2.5 text-base font-semibold text-white hover:text-link transition-colors duration-150"
          aria-label={`${PERSONAL_INFO.name}, back to top`}
        >
          <SquareTerminal className="w-5 h-5 text-green" aria-hidden="true" />
          {PERSONAL_INFO.name}
        </button>

        <nav
          aria-label="Sections"
          className="hidden lg:flex items-center gap-1 h-full"
        >
          {NAV_LINKS.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                aria-current={isActive ? "true" : undefined}
                className={`relative h-full px-3.5 text-[0.95rem] font-medium transition-colors duration-150 ${
                  isActive ? "text-fg" : "text-fg/65 hover:text-fg"
                }`}
              >
                {link.label}
                <span
                  aria-hidden="true"
                  className={`absolute inset-x-3.5 bottom-0 h-[3px] bg-accent origin-left transition-transform duration-200 ${
                    isActive ? "scale-x-100" : "scale-x-0"
                  }`}
                />
              </button>
            );
          })}
        </nav>

        <a
          href={RESUME_URL}
          target="_blank"
          rel="noreferrer"
          className="btn btn-line hidden lg:inline-flex !py-2 !px-4 !text-sm"
        >
          <Download className="w-4 h-4" />
          Download CV
        </a>

        <button
          onClick={() => setIsMenuOpen((prev) => !prev)}
          className="lg:hidden -mr-2 p-2 text-fg"
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-menu"
        >
          {isMenuOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>
      </div>

      {isMenuOpen && (
        <nav
          id="mobile-menu"
          aria-label="Sections"
          className="lg:hidden border-t border-line px-5 pt-2 pb-6 h-[calc(100dvh-4rem)] overflow-y-auto animate-fadeIn"
        >
          <ul>
            {NAV_LINKS.map((link) => (
              <li key={link.id} className="border-b border-line">
                <button
                  onClick={() => handleNavClick(link.id)}
                  className={`w-full text-left py-4 text-lg font-medium ${
                    activeSection === link.id ? "text-link" : "text-fg"
                  }`}
                >
                  {link.label}
                </button>
              </li>
            ))}
          </ul>
          <a
            href={RESUME_URL}
            target="_blank"
            rel="noreferrer"
            className="btn btn-primary w-full mt-6"
          >
            <Download className="w-4 h-4" />
            Download CV
          </a>
        </nav>
      )}
    </header>
  );
};

export default NavBar;
