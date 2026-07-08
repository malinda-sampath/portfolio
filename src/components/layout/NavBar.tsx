import { useEffect, useState } from "react";
import { Code, Menu, X } from "lucide-react";
import { NAV_LINKS, PERSONAL_INFO } from "../../utills/constants";
import useScrollSpy, { scrollToSection } from "../../hooks/useScrollSpy";

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const activeSection = useScrollSpy(NAV_LINKS.map((link) => link.id));

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(docHeight > 0 ? (window.scrollY / docHeight) * 100 : 0);
    };

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

  const handleNavClick = (sectionId: string) => {
    scrollToSection(sectionId);
    setIsMenuOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-1000 w-full py-4 transition-all duration-300 ${
        isScrolled
          ? "bg-black/60 backdrop-blur-xl shadow-[0_1px_0_0_rgba(255,255,255,0.06)]"
          : "bg-black/10 backdrop-blur-lg"
      }`}
      style={{ transform: "translate3d(0, 0, 0)" }}
    >
      {/* Scroll progress hairline */}
      <div
        className="absolute bottom-0 left-0 h-[2px] bg-primary transition-[width] duration-150 ease-out"
        style={{ width: `${scrollProgress}%` }}
        aria-hidden="true"
      />

      <div className="max-w-330 mx-auto px-5">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <Code className="w-6 h-6 text-primary shrink-0" />
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="text-2xl font-bold bg-linear-to-r from-primary via-primary/60 to-primary/30 bg-clip-text text-transparent hover:opacity-80 transition-opacity focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary/60 focus-visible:outline-offset-4 rounded-[17px] px-2 py-1"
              aria-label="Scroll to top"
            >
              {PERSONAL_INFO.name}
            </button>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1 relative bg-white/5 border border-white/10 rounded-[17px] px-1.5 py-1.5">
            {NAV_LINKS.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`relative z-10 px-4 py-2 text-sm font-medium rounded-[17px] transition-colors duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary/60 ${
                  activeSection === link.id
                    ? "text-black"
                    : "text-white/70 hover:text-white"
                }`}
              >
                {activeSection === link.id && (
                  <span
                    className="absolute inset-0 -z-10 bg-primary rounded-[17px] transition-all duration-300"
                    aria-hidden="true"
                  />
                )}
                {link.label}
              </button>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden md:flex items-center gap-2">
            <button
              onClick={() => handleNavClick("contact")}
              className="group relative px-7 py-3 bg-primary text-[#212121] font-bold text-base rounded-[17px] border border-primary overflow-hidden transition-transform duration-300 hover:scale-[1.03] active:scale-[0.98]"
            >
              <span className="relative z-10">Hire Me</span>
              <span className="absolute inset-0 bg-white/25 -translate-x-full group-hover:translate-x-full transition-transform duration-500 skew-x-12" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen((prev) => !prev)}
            className="md:hidden p-3 text-white hover:text-white/80 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary/60 rounded-lg"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuOpen}
          >
            <span className="relative block w-6 h-6">
              <Menu
                className={`absolute inset-0 w-6 h-6 transition-all duration-200 ${
                  isMenuOpen
                    ? "opacity-0 rotate-90 scale-50"
                    : "opacity-100 rotate-0 scale-100"
                }`}
              />
              <X
                className={`absolute inset-0 w-6 h-6 transition-all duration-200 ${
                  isMenuOpen
                    ? "opacity-100 rotate-0 scale-100"
                    : "opacity-0 -rotate-90 scale-50"
                }`}
              />
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden transition-all duration-300 overflow-hidden ${
          isMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="bg-black/90 backdrop-blur-lg border-t border-white/10 px-5 py-6 space-y-2">
          {NAV_LINKS.map((link, i) => (
            <button
              key={link.id}
              onClick={() => handleNavClick(link.id)}
              style={{ transitionDelay: isMenuOpen ? `${i * 40}ms` : "0ms" }}
              className={`block w-full text-left px-4 py-3 rounded-lg font-medium transition-all duration-300 ${
                isMenuOpen
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 -translate-x-3"
              } ${
                activeSection === link.id
                  ? "text-black bg-primary"
                  : "text-white/70 hover:text-white hover:bg-white/10"
              }`}
            >
              {link.label}
            </button>
          ))}
          <button
            onClick={() => handleNavClick("contact")}
            className="w-full px-7 py-3 mt-2 bg-primary text-[#212121] font-bold text-base rounded-[17px] border border-primary hover:bg-primary/90 transition-all duration-300"
          >
            Hire Me
          </button>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
