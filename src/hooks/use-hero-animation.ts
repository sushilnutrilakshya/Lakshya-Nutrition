import { RefObject } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";

interface HeroAnimationProps {
  containerRef: RefObject<HTMLDivElement | null>;
  titleRef: RefObject<HTMLHeadingElement | null>;
  subtitleRef: RefObject<HTMLParagraphElement | null>;
  productRef: RefObject<HTMLDivElement | null>;
  floatingRefs: RefObject<(HTMLDivElement | null)[]>;
  ctaRef: RefObject<HTMLDivElement | null>;
  statsRef: RefObject<HTMLDivElement | null>;
}

export function useHeroAnimation({
  containerRef,
  titleRef,
  subtitleRef,
  productRef,
  floatingRefs,
  ctaRef,
  statsRef,
}: HeroAnimationProps) {
  useGSAP(
    () => {
      if (!containerRef.current) return;

      // ── 1. Scroll-pinned parallax timeline ──────────────────
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 0%",
          end: "+=120%",
          pin: true,
          scrub: 1.8,
          anticipatePin: 1,
        },
      });

      if (productRef.current) {
        scrollTl.fromTo(
          productRef.current,
          { y: 0, scale: 1, rotateY: 0 },
          { y: -100, scale: 1.15, rotateY: 10, ease: "none" },
          0
        );
      }

      if (titleRef.current) {
        scrollTl.fromTo(
          titleRef.current,
          { y: 0, opacity: 0.12, scale: 1 },
          { y: -80, opacity: 0.04, scale: 1.08, ease: "none" },
          0
        );
      }

      if (floatingRefs.current) {
        floatingRefs.current.forEach((el, i) => {
          if (!el) return;
          const dir = i % 2 === 0 ? 1 : -1;
          scrollTl.fromTo(
            el,
            { x: 0, y: 0, opacity: 1, rotation: 0 },
            { x: dir * (50 + i * 12), y: -40 - i * 8, opacity: 0, rotation: dir * 25, ease: "none" },
            0
          );
        });
      }

      // ── 2. Premium entrance animation (expo.out easing) ─────
      const entranceTl = gsap.timeline({ delay: 0.15 });

      // Letters stagger — each letter clips up from below
      const letters = titleRef.current?.querySelectorAll(".hero-letter") ?? [];
      if (letters.length > 0) {
        entranceTl.fromTo(
          letters,
          { yPercent: 110, opacity: 0 },
          {
            yPercent: 0,
            opacity: 1,
            duration: 1.2,
            stagger: 0.055,
            ease: "expo.out",
          }
        );
      }

      // Subtitle fades up
      if (subtitleRef.current) {
        entranceTl.fromTo(
          subtitleRef.current,
          { y: 24, opacity: 0 },
          { y: 0, opacity: 1, duration: 1.0, ease: "expo.out" },
          "-=0.7"
        );
      }

      // Product image springs in
      if (productRef.current) {
        entranceTl.fromTo(
          productRef.current,
          { scale: 0.75, opacity: 0, y: 48 },
          { scale: 1, opacity: 1, y: 0, duration: 1.4, ease: "expo.out" },
          "-=0.8"
        );
      }

      // Floating emojis pop in with back.out
      if (floatingRefs.current) {
        const valid = floatingRefs.current.filter((r): r is HTMLDivElement => r !== null);
        if (valid.length > 0) {
          entranceTl.fromTo(
            valid,
            { scale: 0, opacity: 0 },
            { scale: 1, opacity: 1, duration: 0.7, stagger: 0.07, ease: "back.out(1.5)" },
            "-=1.0"
          );
        }
      }

      // CTAs and stats slide up
      const ctaAndStats = [ctaRef.current, statsRef.current].filter((r): r is HTMLDivElement => r !== null);
      if (ctaAndStats.length > 0) {
        entranceTl.fromTo(
          ctaAndStats,
          { y: 28, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.9, stagger: 0.12, ease: "expo.out" },
          "-=0.6"
        );
      }
    },
    { scope: containerRef }
  );
}
