import { useEffect, useRef, useState } from "react";

// Utility function to check if an element is in viewport
export function useIntersectionObserver(
  options: IntersectionObserverInit = { threshold: 0.1 }
) {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.disconnect();
      }
    }, options);

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }, [options]);

  return { elementRef, isVisible };
}

// Hook to play animation when element scrolls into view
export function useScrollAnimation(
  animationClass: string,
  options: IntersectionObserverInit = { threshold: 0.1 }
) {
  const { elementRef, isVisible } = useIntersectionObserver(options);
  const className = isVisible ? animationClass : "opacity-0";

  return { elementRef, className };
}

// Hook for staggered animations
export function useStaggeredAnimation(
  baseClass: string,
  staggerCount: number,
  staggerDelay: number = 200,
  options: IntersectionObserverInit = { threshold: 0.1 }
) {
  const { elementRef, isVisible } = useIntersectionObserver(options);
  
  const getAnimationClass = (index: number) => {
    if (!isVisible) return "opacity-0";
    return `${baseClass} ${index > 0 ? `delay-${index * staggerDelay}` : ""}`;
  };

  return { elementRef, getAnimationClass };
}
