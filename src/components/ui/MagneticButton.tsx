import type { ButtonHTMLAttributes, ReactNode } from "react";
import useMagnetic from "../../hooks/userMagnetic";

type MagneticButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  strength?: number;
};

const MagneticButton = ({
  children,
  strength = 0.25,
  className = "",
  ...rest
}: MagneticButtonProps) => {
  const ref = useMagnetic({ strength, radius: 90 });

  return (
    <button
      ref={ref as React.RefObject<HTMLButtonElement>}
      className={`transition-transform duration-200 ease-out will-change-transform ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
};

export default MagneticButton;
