"use client";

import { type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface MarqueeProps {
  children: ReactNode;
  direction?: "left" | "right" | undefined;
  speed?: "slow" | "normal" | "fast" | undefined;
  className?: string | undefined;
  gap?: number | undefined;
}

const SPEED_MAP = {
  slow: "40s",
  normal: "25s",
  fast: "15s",
} as const;

function MarqueeTrack({
  children,
  direction,
  speed,
}: {
  children: ReactNode;
  direction: "left" | "right";
  speed: string;
}) {
  return (
    <div
      className={direction === "left" ? "marquee-track" : "marquee-track-reverse"}
      style={{ animationDuration: speed }}
    >
      {/* Duplicate content for seamless loop */}
      {children}
      {children}
    </div>
  );
}

export function Marquee({
  children,
  direction = "left",
  speed = "normal",
  className,
  gap = 32,
}: MarqueeProps) {
  const resolvedSpeed = SPEED_MAP[speed];

  return (
    <div
      className={cn("marquee-container overflow-hidden", className)}
      data-marquee
    >
      <MarqueeTrack direction={direction} speed={resolvedSpeed}>
        <div className="flex items-center" style={{ gap: `${gap}px`, paddingRight: `${gap}px` }}>
          {children}
        </div>
      </MarqueeTrack>
    </div>
  );
}

// ── Trust Marquee ──────────────────────────────────────────────

const TRUST_ITEMS = [
  "⚡ 50,000+ Athletes",
  "🔬 Lab Tested Quality",
  "🏆 Award Winning Brand",
  "🌿 No Proprietary Blends",
  "🚚 Free Shipping ₹999+",
  "💯 FSSAI Certified",
  "📦 COD Available",
  "⭐ 4.8/5 Average Rating",
  "🇮🇳 Made for Indians, by Indians",
  "🧪 100% Authentic",
];

export function TrustMarquee() {
  return (
    <div
      className="py-5 overflow-hidden"
      style={{
        background: "var(--accent)",
        borderTop: "1px solid rgba(0,0,0,0.1)",
        borderBottom: "1px solid rgba(0,0,0,0.1)",
      }}
    >
      <Marquee speed="normal" gap={48}>
        {TRUST_ITEMS.map((item) => (
          <span key={item} className="text-sm font-bold whitespace-nowrap" style={{ color: "#000" }}>
            {item}
          </span>
        ))}
      </Marquee>
    </div>
  );
}

// ── Brand Marquee (dark background) ─────────────────────────────

const BRAND_WORDS = [
  "PERFORMANCE",
  "QUALITY",
  "STRENGTH",
  "ENDURANCE",
  "RECOVERY",
  "GAINS",
  "SCIENCE",
  "RESULTS",
  "POWER",
  "FOCUS",
];

export function BrandMarquee() {
  return (
    <div
      className="py-5 overflow-hidden"
      style={{ borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }}
    >
      <Marquee speed="slow" gap={56}>
        {BRAND_WORDS.map((word) => (
          <span
            key={word}
            className="text-5xl md:text-6xl font-bold whitespace-nowrap tracking-tighter select-none"
            style={{
              color: "transparent",
              WebkitTextStroke: "1px var(--border-strong)",
            }}
          >
            {word}
            <span
              className="inline-block mx-8 text-2xl align-middle"
              style={{ color: "var(--accent)", WebkitTextStroke: "0" }}
            >
              ✦
            </span>
          </span>
        ))}
      </Marquee>
    </div>
  );
}
