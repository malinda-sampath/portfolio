import { ExternalLink } from "lucide-react";
import { certifications } from "../../data/certification";
import SectionHeader from "../ui/SectionHeader";

const Certifications = () => {
  const completedCount = certifications.filter(
    (c) => c.status === "completed",
  ).length;
  const ongoingCount = certifications.length - completedCount;

  return (
    <section
      id="certifications"
      className="py-16 lg:py-20"
    >
      <div className="max-w-6xl mx-auto px-5 sm:px-6 lg:px-8">
        <SectionHeader
          command="cat certifications.log"
          title="Certifications"
          description={`${completedCount} completed${
            ongoingCount > 0 ? `, ${ongoingCount} in progress` : ""
          }. Completed ones link to the issuer's record.`}
        />

        <ul className="panel divide-y divide-line overflow-hidden">
          {certifications.map((cert) => {
            const isDone = cert.status === "completed";
            return (
              <li
                key={cert.id}
                className="grid grid-cols-[1fr_auto] sm:grid-cols-[7.5rem_1fr_auto] items-center gap-x-5 gap-y-2 px-5 py-4 hover:bg-white/5 transition-colors duration-150"
              >
                <p className="order-2 sm:order-none justify-self-end sm:justify-self-start">
                  <span
                    className={`inline-block font-mono text-xs rounded px-2 py-1 ${
                      isDone
                        ? "bg-green/15 text-green"
                        : "bg-yellow/15 text-yellow"
                    }`}
                  >
                    {isDone ? cert.date : "In progress"}
                  </span>
                </p>

                <div className="order-1 sm:order-none min-w-0">
                  <h3 className="text-base font-medium text-white leading-snug">
                    {cert.title}
                  </h3>
                  <p className="text-sm text-muted mt-0.5">{cert.issuer}</p>
                </div>

                {cert.credentialUrl && (
                  <a
                    href={cert.credentialUrl}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`${isDone ? "Verify" : "View course for"} ${cert.title}`}
                    className="order-3 sm:order-none col-span-2 sm:col-span-1 link inline-flex items-center gap-1.5 text-sm w-fit"
                  >
                    {isDone ? "Verify" : "View course"}
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};

export default Certifications;
