"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { SITE_TAGLINE } from "@/lib/constants";
import { HeroBackground } from "./HeroBackground";
import { HeroTitle } from "./HeroTitle";
import { useHeroAnimation } from "@/hooks/use-hero-animation";

interface FloatingElement {
  id: string;
  emoji: string;
  x: string;
  y: string;
  size: number;
  delay: number;
  animClass: string;
}

const FLOATING_ELEMENTS: FloatingElement[] = [
  { id: "leaf1",   emoji: "🌿", x: "6%",  y: "22%", size: 44, delay: 0,   animClass: "float-anim" },
  { id: "leaf2",   emoji: "🍃", x: "87%", y: "18%", size: 36, delay: 0.5, animClass: "float-anim-reverse" },
  { id: "drop1",   emoji: "💧", x: "10%", y: "62%", size: 32, delay: 1,   animClass: "float-anim-slow" },
  { id: "drop2",   emoji: "💧", x: "82%", y: "58%", size: 28, delay: 0.3, animClass: "float-anim" },
  { id: "spark1",  emoji: "✨", x: "18%", y: "82%", size: 26, delay: 0.8, animClass: "float-anim-reverse" },
  { id: "bolt1",   emoji: "⚡", x: "76%", y: "78%", size: 30, delay: 1.2, animClass: "float-anim" },
  { id: "fire1",   emoji: "🔥", x: "4%",  y: "42%", size: 32, delay: 0.2, animClass: "float-anim-slow" },
  { id: "muscle1", emoji: "💪", x: "89%", y: "40%", size: 36, delay: 0.7, animClass: "float-anim-reverse" },
];

export function HeroScrollTrigger() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef     = useRef<HTMLHeadingElement>(null);
  const subtitleRef  = useRef<HTMLParagraphElement>(null);
  const productRef   = useRef<HTMLDivElement>(null);
  const floatingRefs = useRef<(HTMLDivElement | null)[]>([]);
  const ctaRef       = useRef<HTMLDivElement>(null);
  const statsRef     = useRef<HTMLDivElement>(null);

  useHeroAnimation({ containerRef, titleRef, subtitleRef, productRef, floatingRefs, ctaRef, statsRef });

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative w-full min-h-[100dvh] flex flex-col items-center justify-center overflow-hidden noise"
      style={{ background: "var(--bg-primary)" }}
    >
      {/* Full-bleed background — does NOT constrain content */}
      <HeroBackground />

      {/* Floating decorative elements — absolutely positioned, full-bleed */}
      {FLOATING_ELEMENTS.map((el, i) => (
        <div
          key={el.id}
          ref={(node) => { floatingRefs.current[i] = node; }}
          className={`absolute pointer-events-none select-none ${el.animClass}`}
          style={{
            left: el.x,
            top: el.y,
            fontSize: `${el.size}px`,
            animationDelay: `${el.delay}s`,
            filter: "drop-shadow(0 4px 12px rgba(127,232,90,0.2))",
          }}
        >
          {el.emoji}
        </div>
      ))}

      {/* Giant background title — full-bleed, decorative only */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-[1] overflow-hidden">
        <HeroTitle ref={titleRef} label="LAKSHYA" />
      </div>

      {/* ── Centered content island ── */}
      <div className="relative z-10 w-full mx-auto px-4 md:px-6 max-w-7xl flex flex-col items-center justify-center text-center gap-12 pt-32 pb-32">

        {/* Eyebrow pill */}
        <div className="flex w-full justify-center mt-8">
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium"
            style={{
              background: "rgba(var(--accent-rgb),0.1)",
              border: "1px solid rgba(var(--accent-rgb),0.3)",
              color: "var(--accent)",
            }}
          >
            <span className="w-2 h-2 rounded-full bg-[var(--accent)] animate-pulse" />
            Premium Sports Nutrition — India&apos;s Most Trusted
          </div>
        </div>

        {/* Tagline */}
        <p
          ref={subtitleRef}
          className="text-lg md:text-2xl font-medium max-w-xl mx-auto text-center"
          style={{ color: "var(--text-secondary)" }}
        >
          {SITE_TAGLINE}
        </p>

        {/* Product image — centered */}
        <div
          ref={productRef}
          className="relative flex flex-col items-center justify-center mx-auto mt-6 gap-6"
          style={{ filter: "drop-shadow(0 24px 64px rgba(127,232,90,0.3))" }}
        >
          <div
            className="relative w-56 h-56 md:w-72 md:h-72 rounded-full mx-auto"
            style={{
              background: "radial-gradient(circle, rgba(var(--accent-rgb),0.12) 0%, transparent 70%)",
              animation: "pulse-glow 3s ease-in-out infinite",
            }}
          >
            <Image
              src="/images/products/advance-whey-mawa-kulfi-lifestyle.jpg"
              alt="Fusion Nutrition Advance Whey Protein — Premium Sports Supplement"
              fill
              className="object-cover rounded-full"
              priority
              sizes="(max-width: 768px) 224px, 288px"
            />
          </div>

          {/* Floating badges refactored to inline flex */}
          <div className="flex gap-4 items-center">
            <div
              className="px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap"
              style={{
                background: "var(--accent)",
                color: "#000",
                boxShadow: "0 4px 20px rgba(var(--accent-rgb),0.5)",
              }}
            >
              #1 RATED
            </div>
            <div
              className="px-4 py-2 flex items-center justify-center rounded-2xl text-[10px] font-bold uppercase tracking-widest glass shadow-xl whitespace-nowrap"
              style={{ color: "var(--text-primary)", border: "1px solid rgba(var(--accent-rgb),0.2)" }}
            >
              26g Protein / Serving
            </div>
          </div>
        </div>

        {/* CTA buttons — centered */}
        <div ref={ctaRef} className="flex flex-wrap gap-4 justify-center">
          <Link href="/products" className="btn btn-primary text-sm px-8 py-3.5">
            Shop Now
            <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
          <Link href="#stacks" className="btn btn-outline text-sm px-8 py-3.5">
            Find Your Stack
          </Link>
        </div>

        {/* Stats row — centered */}
        <div
          ref={statsRef}
          className="grid grid-cols-3 gap-8 md:gap-16 mt-2 pt-8 mx-auto"
          style={{ borderTop: "1px solid var(--border)" }}
        >
          {[
            { value: "50K+", label: "Athletes Trust Us" },
            { value: "28g",  label: "Protein per Serving" },
            { value: "100%", label: "Lab Tested" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-2xl md:text-3xl font-bold" style={{ color: "var(--accent)" }}>
                {stat.value}
              </div>
              <div className="text-xs mt-1" style={{ color: "var(--text-muted)" }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="relative mt-12 flex flex-col items-center gap-2 animate-bounce">
        <span className="text-xs" style={{ color: "var(--text-muted)" }}>Scroll to explore</span>
        <svg width="18" height="18" viewBox="0 0 20 20" fill="none" style={{ color: "var(--text-muted)" }}>
          <path d="M10 4v12M4 10l6 6 6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </section>
  );
}
