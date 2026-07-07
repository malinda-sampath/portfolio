import { useEffect, useRef, useState } from "react";

type GradientLayer = {
  position: string;
  size: string;
  color: string;
  blur: string;
  opacity: number;
  delay?: string;
};

type RadialGradientVariant = "hero" | "about" | "full-page" | "custom";

type RadialGradientBackgroundProps = {
  variant?: RadialGradientVariant;
  gradients?: GradientLayer[];
};

type Particle = {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
  color: string;
};

const PARTICLE_COLORS = [
  "rgba(123, 255, 92",
  "rgba(92, 232, 255",
  "rgba(255, 210, 111",
];

const RadialGradientBackground = ({
  variant = "hero",
  gradients = [],
}: RadialGradientBackgroundProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -999, y: -999 });
  const animFrameRef = useRef<number>(0);
  const particlesRef = useRef<Particle[]>([]);
  const [mouseGlow, setMouseGlow] = useState({ x: -999, y: -999 });
  const [reducedMotion, setReducedMotion] = useState<boolean>(() =>
    typeof window !== "undefined"
      ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
      : false,
  );

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  // --- Particle system ---
  useEffect(() => {
    if (reducedMotion) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let isVisible = true;
    const isMobile = window.innerWidth < 768;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const handleVisibility = () => {
      isVisible = document.visibilityState === "visible";
      if (isVisible) draw();
    };
    document.addEventListener("visibilitychange", handleVisibility);

    // Fewer particles on mobile — same ambient feel, lighter cost
    const count = isMobile ? 18 : 38;
    particlesRef.current = Array.from({ length: count }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      size: Math.random() * 1.5 + 0.4,
      speedX: (Math.random() - 0.5) * 0.35,
      speedY: (Math.random() - 0.5) * 0.35,
      opacity: Math.random() * 0.5 + 0.15,
      color:
        PARTICLE_COLORS[Math.floor(Math.random() * PARTICLE_COLORS.length)],
    }));

    const draw = () => {
      if (!isVisible) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particlesRef.current.forEach((p) => {
        const dx = mouseRef.current.x - p.x;
        const dy = mouseRef.current.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 180 && dist > 0) {
          p.x += (dx / dist) * 0.3;
          p.y += (dy / dist) * 0.3;
        }

        p.x += p.speedX;
        p.y += p.speedY;

        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color}, ${p.opacity})`;
        ctx.fill();
      });

      animFrameRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, [reducedMotion]);

  // --- Mouse tracking ---
  useEffect(() => {
    if (variant !== "full-page" || reducedMotion) return;
    let raf = 0;
    const handleMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() =>
        setMouseGlow({ x: e.clientX, y: e.clientY }),
      );
    };
    window.addEventListener("mousemove", handleMove);
    return () => {
      window.removeEventListener("mousemove", handleMove);
      cancelAnimationFrame(raf);
    };
  }, [variant, reducedMotion]);

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
    "full-page": [
      {
        position: "-top-40 -left-32",
        size: "h-[42rem] w-[42rem]",
        color: "rgba(123, 255, 92, 0.75)",
        blur: "120px",
        opacity: 0.45,
      },
      {
        position: "top-[8%] right-[6%]",
        size: "h-[32rem] w-[32rem]",
        color: "rgba(92, 232, 255, 0.55)",
        blur: "100px",
        opacity: 0.38,
        delay: "1.2s",
      },
      {
        position: "top-[40%] -left-16",
        size: "h-[28rem] w-[28rem]",
        color: "rgba(255, 210, 111, 0.45)",
        blur: "110px",
        opacity: 0.3,
        delay: "2s",
      },
      {
        position: "top-[55%] right-[10%]",
        size: "h-[26rem] w-[26rem]",
        color: "rgba(123, 255, 92, 0.62)",
        blur: "95px",
        opacity: 0.32,
        delay: "0.8s",
      },
      {
        position: "bottom-[5%] left-[28%]",
        size: "h-[34rem] w-[34rem]",
        color: "rgba(92, 232, 255, 0.48)",
        blur: "115px",
        opacity: 0.35,
        delay: "1.6s",
      },
    ],
  };

  const activeGradients: GradientLayer[] =
    variant === "custom" ? gradients : variants[variant];

  const positionClass = variant === "full-page" ? "fixed" : "absolute";

  return (
    <div
      className={`pointer-events-none ${positionClass} inset-0 overflow-hidden`}
      style={{ zIndex: 0 }}
      aria-hidden="true"
    >
      <div className="absolute inset-0 bg-[linear-gradient(160deg,rgba(6,12,10,0.95)_0%,rgba(7,20,14,0.9)_35%,rgba(8,10,16,0.96)_100%)]" />

      {activeGradients.map((gradient, index) => (
        <div
          key={`${gradient.position}-${index}`}
          className={`absolute ${gradient.position} ${gradient.size} rounded-full ${
            reducedMotion ? "" : "animate-pulse"
          }`}
          style={{
            background: `radial-gradient(circle at center, ${gradient.color} 0%, rgba(0,0,0,0) 68%)`,
            filter: `blur(${gradient.blur})`,
            opacity: gradient.opacity,
            animationDuration: "9s",
            animationDelay: gradient.delay,
          }}
        />
      ))}

      {variant === "full-page" && !reducedMotion && mouseGlow.x > 0 && (
        <div
          className="absolute rounded-full pointer-events-none"
          style={{
            width: 340,
            height: 340,
            left: mouseGlow.x - 170,
            top: mouseGlow.y - 170,
            background:
              "radial-gradient(circle at center, rgba(123,255,92,0.07) 0%, transparent 70%)",
            filter: "blur(40px)",
            transition: "left 0.12s ease-out, top 0.12s ease-out",
          }}
        />
      )}

      {!reducedMotion && (
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full"
          style={{ opacity: 0.6 }}
        />
      )}

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_15%,rgba(255,255,255,0.12)_0%,rgba(255,255,255,0)_40%),radial-gradient(circle_at_85%_80%,rgba(255,255,255,0.1)_0%,rgba(255,255,255,0)_45%)]" />
      <div className="absolute inset-0 opacity-[0.07] bg-[radial-gradient(rgba(255,255,255,0.55)_1px,transparent_1px)] bg-size-[18px_18px]" />
    </div>
  );
};

export default RadialGradientBackground;
