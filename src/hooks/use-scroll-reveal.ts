"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

interface ScrollRevealOptions {
  /** Stagger delay between children in seconds. Default: 0.1 */
  stagger?: number;
  /** Y offset to animate from. Default: 40 */
  y?: number;
  /** Animation duration. Default: 1.0 */
  duration?: number;
  /** ScrollTrigger start position. Default: "top 85%" */
  start?: string;
  /** Selector for child elements to animate. If omitted, animates the container itself. */
  selector?: string;
}

/**
 * Attaches a GSAP ScrollTrigger reveal animation to a container ref.
 * Elements with class `.gsap-reveal` inside the container are animated.
 * Uses expo.out easing per the master architecture directive.
 */
export function useScrollReveal<T extends HTMLElement>(
  options: ScrollRevealOptions = {}
) {
  const ref = useRef<T>(null);
  const {
    stagger = 0.1,
    y = 40,
    duration = 1.0,
    start = "top 85%",
    selector = ".gsap-reveal",
  } = options;

  useEffect(() => {
    if (!ref.current) return;

    const targets = selector
      ? ref.current.querySelectorAll<HTMLElement>(selector)
      : [ref.current];

    if (targets.length === 0) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        targets,
        { y, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration,
          stagger,
          ease: "expo.out",
          scrollTrigger: {
            trigger: ref.current,
            start,
            toggleActions: "play none none none",
          },
        }
      );
    }, ref);

    return () => ctx.revert();
  }, [stagger, y, duration, start, selector]);

  return ref;
}
