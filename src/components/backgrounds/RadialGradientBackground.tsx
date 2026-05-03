type GradientLayer = {
  position: string;
  size: string;
  color: string;
  blur: string;
  opacity: number;
  delay?: string;
};

type RadialGradientVariant = "hero" | "about" | "custom";

type RadialGradientBackgroundProps = {
  variant?: RadialGradientVariant;
  gradients?: GradientLayer[];
};

const RadialGradientBackground = ({
  variant = "hero",
  gradients = [],
}: RadialGradientBackgroundProps) => {
  const variants: Record<
    Exclude<RadialGradientVariant, "custom">,
    GradientLayer[]
  > = {
    hero: [
      {
        position: "-top-40 -left-32",
        size: "h-[36rem] w-[36rem]",
        color: "rgba(123, 255, 92, 0.75)",
        blur: "110px",
        opacity: 0.5,
      },
      {
        position: "top-[12%] right-[8%]",
        size: "h-[28rem] w-[28rem]",
        color: "rgba(92, 232, 255, 0.55)",
        blur: "95px",
        opacity: 0.42,
        delay: "1.2s",
      },
      {
        position: "bottom-[-20%] left-[24%]",
        size: "h-[30rem] w-[30rem]",
        color: "rgba(255, 210, 111, 0.45)",
        blur: "105px",
        opacity: 0.35,
        delay: "2s",
      },
    ],
    about: [
      {
        position: "bottom-[-8rem] right-[-4rem]",
        size: "h-[24rem] w-[24rem]",
        color: "rgba(123, 255, 92, 0.62)",
        blur: "90px",
        opacity: 0.42,
      },
      {
        position: "top-[10%] left-[-4rem]",
        size: "h-[20rem] w-[20rem]",
        color: "rgba(92, 232, 255, 0.48)",
        blur: "85px",
        opacity: 0.32,
        delay: "1s",
      },
    ],
  };

  const activeGradients: GradientLayer[] =
    variant === "custom" ? gradients : variants[variant];

  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden="true"
    >
      <div className="absolute inset-0 bg-[linear-gradient(160deg,rgba(6,12,10,0.95)_0%,rgba(7,20,14,0.9)_35%,rgba(8,10,16,0.96)_100%)]" />

      {activeGradients.map((gradient, index) => (
        <div
          key={`${gradient.position}-${index}`}
          className={`absolute ${gradient.position} ${gradient.size} rounded-full animate-pulse`}
          style={{
            background: `radial-gradient(circle at center, ${gradient.color} 0%, rgba(0,0,0,0) 68%)`,
            filter: `blur(${gradient.blur})`,
            opacity: gradient.opacity,
            animationDuration: "9s",
            animationDelay: gradient.delay,
          }}
        />
      ))}

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_15%,rgba(255,255,255,0.12)_0%,rgba(255,255,255,0)_40%),radial-gradient(circle_at_85%_80%,rgba(255,255,255,0.1)_0%,rgba(255,255,255,0)_45%)]" />
      <div className="absolute inset-0 opacity-[0.07] bg-[radial-gradient(rgba(255,255,255,0.55)_1px,transparent_1px)] bg-size-[18px_18px]" />
    </div>
  );
};

export default RadialGradientBackground;
