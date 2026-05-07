"use client";

import React, { forwardRef } from "react";

interface HeroTitleProps {
  label: string;
}

export const HeroTitle = forwardRef<HTMLHeadingElement, HeroTitleProps>(
  ({ label }, ref) => {
    return (
      <h1
        ref={ref}
        className="font-bold tracking-[-0.05em] leading-[0.8] whitespace-nowrap select-none will-change-transform"
        style={{
          fontSize: "clamp(8rem, 24vw, 30rem)",
          opacity: 0.15,
          background: "linear-gradient(180deg, var(--text-primary) 0%, rgba(var(--text-primary), 0) 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
        }}
        aria-label={label}
      >
        {label.split("").map((char, i) => (
          <span
            key={i}
            className="hero-letter inline-block will-change-transform"
            style={{ animationDelay: `${i * 0.06}s` }}
          >
            {char}
          </span>
        ))}
      </h1>
    );
  }
);

HeroTitle.displayName = "HeroTitle";
