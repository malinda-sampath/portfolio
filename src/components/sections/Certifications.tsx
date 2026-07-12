// components/sections/Certifications.tsx
import { BadgeCheck, Loader2, ExternalLink, Award } from "lucide-react";
import { certifications, type Certification } from "../../data/certification";
import FadeIn from "../animations/Fadein";
import { useState } from "react";

const CertIcon = ({ cert }: { cert: Certification }) => {
  const [errored, setErrored] = useState(!cert.icon);
  if (errored) {
    return (
      <div className="w-10 h-10 rounded-full bg-black border-2 border-primary/40 flex items-center justify-center">
        <Award className="w-4 h-4 text-primary" />
      </div>
    );
  }
  return (
    <div className="w-10 h-10 rounded-full bg-black border-2 border-primary/40 flex items-center justify-center">
      <img
        src={cert.icon}
        alt=""
        loading="lazy"
        onError={() => setErrored(true)}
        className="w-5 h-5 object-contain"
      />
    </div>
  );
};

const Certifications = () => {
  const completedCount = certifications.filter(
    (c) => c.status === "completed",
  ).length;

  return (
    <section id="certifications" className="relative py-20 overflow-hidden">
      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn delay={0}>
          <div className="text-center mb-4">
            <div className="inline-flex items-center gap-2.5 px-5 py-2.5 border border-primary/30 bg-primary/10 rounded-full w-fit mx-auto mb-6">
              <BadgeCheck className="w-4 h-4 text-primary" />
              <span className="text-sm text-primary font-medium font-mono">
                {completedCount} verified
              </span>
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={60}>
          <h2 className="text-4xl lg:text-5xl font-normal text-white leading-tight text-center mb-16">
            Certifications
          </h2>
        </FadeIn>

        {/* Ledger */}
        <div className="relative">
          {/* Connecting spine */}
          <div
            className="absolute left-5 top-2 bottom-2 w-px bg-linear-to-b from-primary/60 via-white/10 to-transparent"
            aria-hidden="true"
          />

          <div className="space-y-3">
            {certifications.map((cert, index) => (
              <FadeIn key={cert.id} delay={index * 100}>
                <div className="relative flex gap-5 group">
                  {/* Node */}
                  <div className="relative z-10 shrink-0">
                    <CertIcon cert={cert} />
                    {cert.status === "ongoing" && (
                      <span className="absolute -top-0.5 -right-0.5 w-3 h-3 rounded-full bg-black flex items-center justify-center">
                        <Loader2 className="w-2.5 h-2.5 text-primary motion-safe:animate-spin" />
                      </span>
                    )}
                  </div>

                  {/* Entry */}
                  <div className="flex-1 pb-8 border-b border-white/5 group-last:border-0">
                    <div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-1">
                      <h3 className="text-base font-semibold text-white leading-snug">
                        {cert.title}
                      </h3>
                      <span
                        className={`shrink-0 text-[11px] font-mono uppercase tracking-[1px] ${
                          cert.status === "completed"
                            ? "text-primary"
                            : "text-white/40"
                        }`}
                      >
                        {cert.date}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 mt-1.5">
                      <span className="text-sm text-white/50">
                        {cert.issuer}
                      </span>
                      {cert.credentialUrl && cert.status === "completed" && (
                        <a
                          href={cert.credentialUrl}
                          target="_blank"
                          rel="noreferrer"
                          aria-label={`Verify ${cert.title}`}
                          className="text-white/30 hover:text-primary transition-colors duration-200"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Certifications;
