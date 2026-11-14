import { useEffect, useRef, useState } from "react";
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa6";
import { Check, Copy, Download, Mail, MapPin } from "lucide-react";
import { PERSONAL_INFO, NAV_LINKS } from "../../utills/constants";
import { scrollToSection } from "../../hooks/useScrollSpy";
import { SYSTEM_INFO } from "../../utills/system";
import SectionHeader from "../ui/SectionHeader";

const EMAIL = PERSONAL_INFO.email;

const LINKS = [
  { label: "GitHub", icon: FaGithub, href: PERSONAL_INFO.github },
  { label: "LinkedIn", icon: FaLinkedin, href: PERSONAL_INFO.linkedin },
  {
    label: "Download CV",
    icon: Download,
    href: `${import.meta.env.BASE_URL}${PERSONAL_INFO.resume}`,
  },
];

const Footer = () => {
  const [copied, setCopied] = useState(false);
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      window.clearTimeout(timer.current);
      timer.current = window.setTimeout(() => setCopied(false), 2500);
    } catch {
      // Clipboard blocked: fall back to opening the mail client
      window.location.href = `mailto:${EMAIL}`;
    }
  };

  return (
    <footer id="contact" className="pt-16 lg:pt-20 pb-24 xl:pb-8">
      {/* Extra bottom padding below xl keeps the fixed back-to-top button
          from covering the footer links */}
      <div className="max-w-6xl mx-auto px-5 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-10 gap-y-10 pb-14 lg:pb-20">
          <div className="lg:col-span-7">
            <SectionHeader
              command="./contact.sh"
              title="Let's build something worth shipping."
              description="Open to backend engineering, cloud-native development, and opportunities to build scalable software systems."
            />

            <p className="flex items-center gap-2 text-sm text-green mb-6">
              <span className="w-2 h-2 rounded-full bg-green" />
              Available for work
            </p>

            {/* Email shown like a request field: label, value, action */}
            <div className="flex items-stretch max-w-xl rounded-lg border border-line bg-bg-deep overflow-hidden mb-4">
              <span className="hidden sm:flex items-center px-3.5 font-mono text-xs font-medium text-link border-r border-line bg-panel">
                MAILTO
              </span>
              <a
                href={`mailto:${EMAIL}`}
                className="flex-1 min-w-0 px-3.5 py-3 font-mono text-[0.8rem] sm:text-[0.95rem] text-white break-all sm:break-normal sm:truncate hover:text-link transition-colors duration-150"
              >
                {EMAIL}
              </a>
              <button
                onClick={copyEmail}
                className="flex shrink-0 items-center gap-2 px-3.5 text-sm font-medium text-fg border-l border-line bg-panel hover:bg-white/10 transition-colors duration-150"
              >
                {copied ? (
                  <Check className="w-4 h-4 text-green" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
                {/* Icon-only on phones so the address has room */}
                <span aria-live="polite" className="sr-only sm:not-sr-only">
                  {copied ? "Copied" : "Copy"}
                </span>
              </button>
            </div>

            <a href={`mailto:${EMAIL}`} className="btn btn-primary">
              <Mail className="w-4 h-4" />
              Send an email
            </a>
          </div>

          <div className="lg:col-span-4 lg:col-start-9">
            <ul className="panel divide-y divide-line overflow-hidden">
              {LINKS.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 px-5 py-3.5 text-[0.95rem] text-fg hover:bg-white/5 hover:text-white transition-colors duration-150"
                  >
                    <link.icon className="w-[1.125rem] h-[1.125rem] text-muted" />
                    {link.label}
                  </a>
                </li>
              ))}
              <li className="flex items-center gap-3 px-5 py-3.5 text-[0.95rem] text-muted">
                <MapPin className="w-[1.125rem] h-[1.125rem]" />
                {PERSONAL_INFO.location}
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pt-6 border-t border-line text-sm text-muted">
          <p>
            © {new Date().getFullYear()} {PERSONAL_INFO.name}
            <span className="block sm:inline mt-1 sm:mt-0 sm:ml-3 font-mono text-xs">
              build {SYSTEM_INFO.buildVersion}, updated {SYSTEM_INFO.deployDate}
            </span>
          </p>
          <nav aria-label="Footer" className="flex flex-wrap gap-x-6 gap-y-2">
            {NAV_LINKS.filter((link) => link.id !== "contact").map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id, 64)}
                className="hover:text-white transition-colors duration-150"
              >
                {link.label}
              </button>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
