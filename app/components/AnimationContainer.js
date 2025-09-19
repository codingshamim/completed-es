"use client";
import { useEffect, useRef, useState } from "react";

export default function AnimationContainer({ children }) {
  const [isInView, setIsInView] = useState(false);
  const animRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting); // Update state based on visibility
      },
      { threshold: 0.1 }
    );

    const currentRef = animRef.current;

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  return (
    <div
      ref={animRef}
      style={{
        opacity: isInView ? 1 : 0.5,
        filter: isInView ? "blur(0px)" : "blur(2px)",
        transform: `translateY(${isInView ? -8 : 20}px)`,
        transition: "opacity 0.5s, filter 0.5s, transform 0.5s",
      }}
    >
      {children}
    </div>
  );
}
