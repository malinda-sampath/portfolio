type SectionHeaderProps = {
  /** Shell command shown above the title, e.g. "cat about.md" */
  command: string;
  title: string;
  description?: string;
};

/* Each section opens with a one-line terminal prompt. */
const SectionHeader = ({ command, title, description }: SectionHeaderProps) => (
  <div className="mb-10">
    <p className="font-mono text-sm mb-3" aria-hidden="true">
      <span className="text-green font-medium">$</span>{" "}
      <span className="text-muted">{command}</span>
    </p>
    <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-white">
      {title}
    </h2>
    {description && (
      <p className="mt-3 text-base text-muted leading-relaxed max-w-2xl">
        {description}
      </p>
    )}
  </div>
);

export default SectionHeader;
