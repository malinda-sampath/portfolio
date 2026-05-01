import { useEffect, useState, useRef } from "react";

type UseScrollRevealOptions = {
  threshold?: number | number[];
  rootMargin?: string;
};

const useScrollReveal = (
  options: UseScrollRevealOptions = {},
): readonly [React.RefObject<HTMLElement | null>, boolean] => {
  const { threshold = 0.1, rootMargin = "0px" } = options;
  const [isRevealed, setIsRevealed] = useState<boolean>(false);
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsRevealed(true);
          observer.unobserve(element);
        }
      },
      { threshold, rootMargin },
    );
    observer.observe(element);

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [threshold, rootMargin]);

  return [ref, isRevealed] as const;
};

export default useScrollReveal;
