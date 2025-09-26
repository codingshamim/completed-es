"use client";
import { useEffect, useRef } from "react";

export default function AnimationContainer({ children }) {
  const animRef = useRef(null);

  useEffect(() => {
    const el = animRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.opacity = "1";
          el.style.transform = "translateY(-8px)";
          el.style.filter = "blur(0px)";
        } else {
          el.style.opacity = "0.5";
          el.style.transform = "translateY(20px)";
          el.style.filter = "blur(2px)";
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(el);

    return () => {
      observer.unobserve(el);
    };
  }, []);

  return (
    <div
      ref={animRef}
      style={{
        opacity: 0.5,
        transform: "translateY(20px)",
        filter: "blur(2px)",
        transition: "opacity 0.5s, transform 0.5s, filter 0.5s",
        willChange: "opacity, transform, filter", // improves GPU performance
      }}
    >
      {children}
    </div>
  );
}
