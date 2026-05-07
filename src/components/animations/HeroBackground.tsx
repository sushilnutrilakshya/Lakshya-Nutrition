"use client";

import React from "react";

export function HeroBackground() {
  return (
    <>
      {/* Primary radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 55% at 50% 45%, rgba(127,232,90,0.08) 0%, transparent 65%)",
        }}
      />

      {/* Grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          opacity: 0.5,
        }}
      />

      {/* Ambient blobs — subtle, not distracting */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: "18%",
          left: "22%",
          width: "280px",
          height: "280px",
          background: "radial-gradient(circle, rgba(127,232,90,0.12) 0%, transparent 70%)",
          filter: "blur(40px)",
          transform: "translateZ(0)",
        }}
      />
      <div
        className="absolute pointer-events-none"
        style={{
          top: "45%",
          right: "20%",
          width: "360px",
          height: "360px",
          background: "radial-gradient(circle, rgba(245,184,0,0.07) 0%, transparent 70%)",
          filter: "blur(60px)",
          transform: "translateZ(0)",
        }}
      />
      <div
        className="absolute pointer-events-none"
        style={{
          top: "12%",
          right: "30%",
          width: "200px",
          height: "200px",
          background: "radial-gradient(circle, rgba(255,107,53,0.06) 0%, transparent 70%)",
          filter: "blur(32px)",
          transform: "translateZ(0)",
        }}
      />
    </>
  );
}
