"use client";

import { useState } from "react";
import { SUPPLEMENT_STACKS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import Image from "next/image";

// ── Stack-specific images — real Fusion Nutrition brand assets ───
const STACK_IMAGES: Record<string, string> = {
  "pre-workout": "/images/products/bull-power-range.jpg",
  "workout":     "/images/products/recovery-colafruity.jpg",
  "recovery":    "/images/products/advance-whey-both.jpg",
};

type StackId = (typeof SUPPLEMENT_STACKS)[number]["id"];

export function TabbedServices() {
  const [activeId, setActiveId] = useState<StackId>("pre-workout");

  return (
    <section id="stacks" className="w-full py-24" style={{ background: "var(--bg-secondary)" }}>
      <div className="w-full px-6 md:px-12" style={{ maxWidth: "1152px", marginLeft: "auto", marginRight: "auto" }}>

        {/* ── Centered section header ── */}
        <div
          className="flex flex-col items-center text-center gap-4 mb-14"
          style={{ maxWidth: "600px", marginLeft: "auto", marginRight: "auto" }}
        >
          <span
            className="inline-flex items-center px-4 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-[0.18em]"
            style={{ background: "rgba(127,232,90,0.1)", border: "1px solid rgba(127,232,90,0.2)", color: "var(--accent)" }}
          >
            Supplement Stacks
          </span>
          <h2 className="font-bold tracking-tight text-center" style={{ color: "var(--text-primary)" }}>
            Build Your Perfect Stack
          </h2>
          <p className="text-base leading-relaxed text-center" style={{ color: "var(--text-secondary)", maxWidth: "480px" }}>
            Whether you&apos;re optimising performance, endurance, or recovery — we have a scientifically curated stack for every goal.
          </p>
        </div>

        {/* ── Tab layout ── */}
        <div className="grid lg:grid-cols-[280px,1fr] gap-8 items-start">

          {/* Tab buttons */}
          <div
            className="rounded-2xl p-3 flex flex-col gap-2"
            style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
          >
            {SUPPLEMENT_STACKS.map((stack) => {
              const isActive = stack.id === activeId;
              return (
                <button
                  key={stack.id}
                  type="button"
                  id={`tab-${stack.id}`}
                  aria-selected={isActive}
                  aria-controls={`panel-${stack.id}`}
                  role="tab"
                  onClick={() => setActiveId(stack.id as StackId)}
                  className={cn(
                    "flex items-center gap-4 px-5 py-4 rounded-xl text-left w-full transition-all duration-300",
                    isActive ? "opacity-100" : "opacity-50 hover:opacity-75"
                  )}
                  style={{
                    background: isActive ? `${stack.color}15` : "transparent",
                    border: `1.5px solid ${isActive ? stack.color : "transparent"}`,
                  }}
                >
                  <span className="text-2xl flex-shrink-0">{stack.emoji}</span>
                  <div className="text-left">
                    <div className="font-bold text-sm" style={{ color: isActive ? stack.color : "var(--text-primary)" }}>
                      {stack.label}
                    </div>
                    <div className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>
                      {stack.tagline}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Tab panels */}
          <div className="relative">
            {SUPPLEMENT_STACKS.map((stack) => {
              const isActive = stack.id === activeId;
              return (
                <div
                  key={stack.id}
                  id={`panel-${stack.id}`}
                  role="tabpanel"
                  aria-labelledby={`tab-${stack.id}`}
                  className={cn("tab-content", isActive ? "active-tab" : "hidden-tab")}
                >
                  <div
                    className="rounded-2xl p-7 md:p-9"
                    style={{
                      background: `linear-gradient(135deg, ${stack.color}0a 0%, var(--surface) 100%)`,
                      border: `1px solid ${stack.color}30`,
                    }}
                  >
                    {/* Stack header */}
                    <div className="flex items-start gap-5 mb-6">
                      <div
                        className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0"
                        style={{ background: `${stack.color}20`, border: `1px solid ${stack.color}40` }}
                      >
                        {stack.emoji}
                      </div>
                      <div>
                        <h3 className="font-bold text-xl tracking-tight mb-2" style={{ color: "var(--text-primary)" }}>
                          {stack.label} Stack
                        </h3>
                        <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                          {stack.description}
                        </p>
                      </div>
                    </div>

                    {/* Stack image — unique per stack, dark studio aesthetic */}
                    <div
                      className="relative w-full rounded-xl overflow-hidden mb-6"
                      style={{ aspectRatio: "21/9", border: `1px solid ${stack.color}20` }}
                    >
                      <Image
                        priority
                        src={STACK_IMAGES[stack.id] ?? "https://images.unsplash.com/photo-1593095948071-474c5cc2989d?w=800&q=85&auto=format&fit=crop"}
                        alt={`${stack.label} supplement stack — dark studio editorial`}
                        fill
                        className="object-cover object-center"
                        sizes="(max-width: 1024px) 100vw, 60vw"
                      />
                      <div
                        className="absolute inset-0"
                        style={{ background: `linear-gradient(to right, ${stack.color}20 0%, transparent 60%)` }}
                      />
                    </div>

                    {/* Features */}
                    <div className="grid sm:grid-cols-2 gap-3 mb-7">
                      {stack.features.map((feature) => (
                        <div
                          key={feature}
                          className="flex items-center gap-3 px-4 py-3 rounded-xl"
                          style={{ background: "var(--bg-secondary)", border: "1px solid var(--border)" }}
                        >
                          <div
                            className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                            style={{ background: stack.color }}
                          >
                            <svg width="9" height="7" viewBox="0 0 10 8" fill="none">
                              <path d="M1 4l3 3 5-6" stroke="#000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          </div>
                          <span className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>
                            {feature}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* CTA */}
                    <a
                      href={`/products?stack=${stack.id}`}
                      className="btn inline-flex px-7 py-3 text-sm font-bold rounded-full"
                      style={{ background: stack.color, color: "#000", boxShadow: `0 8px 32px ${stack.color}40` }}
                    >
                      Explore {stack.label} Stack →
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
