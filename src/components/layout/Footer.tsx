import { useEffect, useState } from "react";
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa6";
import { Mail, MapPin, Phone, Bot } from "lucide-react";
import { PERSONAL_INFO, NAV_LINKS } from "../../utills/constants";
import { scrollToSection } from "../../hooks/useScrollSpy";
import MagneticButton from "../ui/MagneticButton";
import FadeIn from "../animations/Fadein";
import { SYSTEM_INFO } from "../../utills/system";
import { useWhatsAppChat } from "../../context/WhatsAppChatContext";
import ChatPanel from "../ui/ChatPanel";

const BUILD_VERSION = SYSTEM_INFO.buildVersion;
const DEPLOY_DATE = SYSTEM_INFO.deployDate;

// Single source of truth for fallback contact info
const CONTACT = {
  email: PERSONAL_INFO.email ?? "hello@example.com",
  mobile: PERSONAL_INFO.mobile ?? "+94 77 123 4567",
  location: PERSONAL_INFO.location ?? "Remote",
};

const SOCIALS = [
  {
    id: "github",
    label: "GitHub",
    icon: FaGithub,
    href: `${PERSONAL_INFO.github}`,
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    icon: FaLinkedin,
    href: `${PERSONAL_INFO.linkedin}`,
  },
  {
    id: "email",
    label: "Email",
    icon: Mail,
    href: `mailto:${CONTACT.email}`,
  },
  {
    id: "mobile",
    label: "Mobile",
    icon: Phone,
    href: `tel:${CONTACT.mobile}`,
  },
];

// ids that should never open in a new tab
const SAME_TAB_IDS = ["email", "mobile"];

const Footer = () => {
  const [uptime, setUptime] = useState("00:00:00");
  const { isChatOpen, setIsChatOpen } = useWhatsAppChat();

  useEffect(() => {
    const start = Date.now();
    const tick = () => {
      const diff = Date.now() - start;
      const h = String(Math.floor(diff / 3_600_000)).padStart(2, "0");
      const m = String(Math.floor((diff % 3_600_000) / 60_000)).padStart(
        2,
        "0",
      );
      const s = String(Math.floor((diff % 60_000) / 1000)).padStart(2, "0");
      setUptime(`${h}:${m}:${s}`);
    };
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <footer id="contact" className="relative pt-28 pb-8 overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* CTA Block */}
        <FadeIn delay={0}>
          <div className="glass-edge rounded-3xl px-8 py-14 md:py-16 text-center mb-20 relative overflow-hidden">
            <div
              className="absolute -top-24 left-1/2 -translate-x-1/2 w-[36rem] h-[20rem] rounded-full opacity-40 pointer-events-none"
              style={{
                background:
                  "radial-gradient(circle, rgba(255,193,7,0.35) 0%, transparent 70%)",
                filter: "blur(60px)",
              }}
              aria-hidden="true"
            />
            <span className="relative inline-flex items-center gap-2 px-4 py-1.5 mb-6 text-xs font-mono tracking-[2px] uppercase text-primary bg-primary/10 border border-primary/20 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-primary motion-safe:animate-pulse" />
              Available for work
            </span>
            <h2 className="relative text-3xl md:text-4xl lg:text-5xl font-normal text-white leading-tight mb-4">
              Let's build something worth shipping.
            </h2>
            <p className="relative text-white/60 max-w-md mx-auto mb-8">
              Open to backend engineering, cloud-native development, and
              opportunities to build scalable software systems.
            </p>

            {!isChatOpen && (
              <MagneticButton
                onClick={() => setIsChatOpen(true)}
                strength={0.3}
                className="relative inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-[#212121] rounded-[17px] px-8 py-4 text-base font-medium border border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-black"
              >
                <span className="relative inline-flex">
                  <Bot className="w-5 h-5 animate-bounce" />
                  <span className="absolute -top-0.5 -right-0.5 h-2 w-2 rounded-full bg-green-500 border border-[#212121] animate-pulse" />
                </span>
                Say Hello
              </MagneticButton>
            )}

            {/* Inline chat panel — replaces the button once opened */}
            {isChatOpen && (
              <div className="relative mx-auto max-w-[640px] text-left">
                <ChatPanel variant="inline" />
              </div>
            )}
          </div>
        </FadeIn>

        {/* Link Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <FadeIn delay={80}>
            <div>
              <h3 className="text-xl font-bold text-white mb-3">
                {PERSONAL_INFO.name}
              </h3>
              <p className="text-sm text-white/50 leading-relaxed mb-6">
                {PERSONAL_INFO.title} building reliable, cloud-native software.
              </p>
              <div className="flex items-center gap-3">
                {SOCIALS.map((social) => {
                  const isSameTab = SAME_TAB_IDS.includes(social.id);
                  return (
                    <a
                      key={social.id}
                      href={social.href}
                      target={isSameTab ? undefined : "_blank"}
                      rel={isSameTab ? undefined : "noopener noreferrer"}
                      aria-label={social.label}
                      className="scan-hover w-10 h-10 flex items-center justify-center rounded-full bg-white/5 border border-white/10 text-white/60 hover:text-primary hover:border-primary/40 transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                    >
                      <social.icon className="w-4 h-4" />
                    </a>
                  );
                })}
              </div>
            </div>
          </FadeIn>

          {/* Navigate */}
          <FadeIn delay={140}>
            <div>
              <h4 className="text-xs font-mono tracking-[2px] uppercase text-white/40 mb-5">
                Navigate
              </h4>
              <ul className="space-y-3">
                {NAV_LINKS.map((link) => (
                  <li key={link.id}>
                    <button
                      onClick={() => scrollToSection(link.id)}
                      className="text-sm text-white/60 hover:text-primary transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded"
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </FadeIn>

          {/* Connect */}
          <FadeIn delay={200}>
            <div>
              <h4 className="text-xs font-mono tracking-[2px] uppercase text-white/40 mb-5">
                Connect
              </h4>
              <ul className="space-y-3 text-sm text-white/60">
                <li className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-primary shrink-0" />
                  <a
                    href={`tel:${CONTACT.mobile}`}
                    className="hover:text-primary transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded"
                  >
                    {CONTACT.mobile}
                  </a>
                </li>

                <li className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-primary shrink-0" />
                  <a
                    href={`mailto:${CONTACT.email}`}
                    className="hover:text-primary transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded"
                  >
                    {CONTACT.email}
                  </a>
                </li>
                <li className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-primary shrink-0" />
                  {CONTACT.location}
                </li>
              </ul>
            </div>
          </FadeIn>

          {/* System status */}
          <FadeIn delay={260}>
            <div>
              <h4 className="text-xs font-mono tracking-[2px] uppercase text-white/40 mb-5">
                System
              </h4>
              <ul className="space-y-3 text-xs font-mono text-white/50">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary motion-safe:animate-pulse" />
                  STATUS: ONLINE
                </li>
                <li>SESSION {uptime}</li>
                <li>BUILD {BUILD_VERSION}</li>
                <li>UPDATED {DEPLOY_DATE}</li>
              </ul>
            </div>
          </FadeIn>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-white/10">
          <p className="text-xs text-white/40 font-mono">
            © {new Date().getFullYear()} {PERSONAL_INFO.name}. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
