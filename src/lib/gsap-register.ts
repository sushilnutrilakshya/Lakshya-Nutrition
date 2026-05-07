/**
 * GSAP Registration Module
 * Call this once at the app root (client side only).
 * All GSAP plugins are registered here to avoid duplicate registration.
 */
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TextPlugin } from "gsap/TextPlugin";

export function registerGSAP(): void {
  gsap.registerPlugin(ScrollTrigger, TextPlugin);

  // Default ease for smooth brand motion
  gsap.defaults({
    ease: "power3.out",
    duration: 0.8,
  });

  // ScrollTrigger global defaults
  ScrollTrigger.defaults({
    toggleActions: "play none none reverse",
  });
}

export { gsap, ScrollTrigger };
