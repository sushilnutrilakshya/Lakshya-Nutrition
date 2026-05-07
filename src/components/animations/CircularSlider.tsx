"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { type Product } from "@/types/product";
import { MOCK_PRODUCTS } from "@/lib/mock-data";

type SlidePosition = "active" | "previous" | "next" | "prev-far" | "next-far" | "inactive";

const SLIDE_COLORS = [
  "radial-gradient(ellipse at center, rgba(127,232,90,0.12) 0%, transparent 70%)",
  "radial-gradient(ellipse at center, rgba(255,107,53,0.12) 0%, transparent 70%)",
  "radial-gradient(ellipse at center, rgba(123,97,255,0.12) 0%, transparent 70%)",
  "radial-gradient(ellipse at center, rgba(0,188,212,0.12) 0%, transparent 70%)",
  "radial-gradient(ellipse at center, rgba(255,215,0,0.12) 0%, transparent 70%)",
  "radial-gradient(ellipse at center, rgba(255,64,129,0.12) 0%, transparent 70%)",
];

const PRODUCT_IMAGES: Record<string, string> = {
  "advance-whey-protein":       "/images/products/advance-whey-mawa-kulfi.jpg",
  "bull-power-pre-workout":     "/images/products/bull-power-single.jpg",
  "recovery-eaa-bcaa-glutamine":"/images/products/recovery-colafruity.jpg",
  "angry-fat-burn":             "/images/products/angry-fat-burn-promo.jpg",
  "high-whey-protein":          "/images/products/high-whey-blackcurrant.jpg",
  "silent-power-pre-workout":   "/images/products/silent-power-preworkout.jpg",
  "essential-multi-vitamin-pro":"/images/products/multivitamin-pro-promo.jpg",
};

function getPosition(index: number, active: number, total: number): SlidePosition {
  const diff = ((index - active) % total + total) % total;
  if (diff === 0) return "active";
  if (diff === 1) return "next";
  if (diff === total - 1) return "previous";
  if (diff === 2) return "next-far";
  if (diff === total - 2) return "prev-far";
  return "inactive";
}

function SlideCard({ product, position, onActivate }: { product: Product; position: SlidePosition; onActivate: () => void }) {
  const imageUrl = PRODUCT_IMAGES[product.slug] ?? product.images[0]?.url ?? "/images/products/advance-whey-mawa-kulfi.jpg";
  return (
    <div
      className={`slider-item ${position} cursor-pointer`}
      style={{ width: "clamp(200px, 26vw, 300px)" }}
      onClick={position !== "active" ? onActivate : undefined}
      role={position !== "active" ? "button" : undefined}
      tabIndex={position !== "active" ? 0 : undefined}
      aria-label={position !== "active" ? `View ${product.title}` : undefined}
      onKeyDown={position !== "active" ? (e) => { if (e.key === "Enter") onActivate(); } : undefined}
    >
      <div className="relative w-full rounded-2xl overflow-hidden shadow-2xl" style={{ aspectRatio: "3/4" }}>
        <Image src={imageUrl} alt={product.title} fill className="object-cover" sizes="(max-width: 768px) 200px, 300px" />
        {product.isBestseller === true && (
          <div className="absolute top-3 left-3">
            <span className="px-2 py-1 rounded-full text-[10px] font-bold" style={{ background: "var(--accent)", color: "#000" }}>
              BESTSELLER
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

export function CircularSlider() {
  const [activeIndex, setActiveIndex] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const products = MOCK_PRODUCTS.slice(0, 7);
  const total = products.length;

  const next = useCallback(() => setActiveIndex((prev) => (prev + 1) % total), [total]);
  const prev = useCallback(() => setActiveIndex((prev) => (prev - 1 + total) % total), [total]);

  useEffect(() => {
    intervalRef.current = setInterval(next, 3500);
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [next]);

  const pauseAutoplay = () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  const resumeAutoplay = () => { intervalRef.current = setInterval(next, 3500); };

  return (
    <section id="products-slider" className="w-full py-24 overflow-hidden" style={{ background: "var(--bg-primary)" }}>
      <div className="w-full px-6 md:px-12" style={{ maxWidth: "1152px", marginLeft: "auto", marginRight: "auto" }}>

        {/* Centered header */}
        <div
          className="flex flex-col items-center text-center gap-4 mb-14"
          style={{ maxWidth: "600px", marginLeft: "auto", marginRight: "auto" }}
        >
          <span
            className="inline-flex items-center px-4 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-[0.18em]"
            style={{ background: "rgba(127,232,90,0.1)", border: "1px solid rgba(127,232,90,0.2)", color: "var(--accent)" }}
          >
            Premium Products
          </span>
          <h2 className="font-bold tracking-tight text-center" style={{ color: "var(--text-primary)" }}>
            Our Best Sellers
          </h2>
          <p className="text-base leading-relaxed text-center" style={{ color: "var(--text-secondary)", maxWidth: "480px" }}>
            Engineered for peak performance. Trusted by thousands of Indian athletes and fitness enthusiasts.
          </p>
        </div>

        {/* Slider */}
        <div
          className="relative rounded-3xl overflow-hidden"
          onMouseEnter={pauseAutoplay}
          onMouseLeave={resumeAutoplay}
          style={{
            background: SLIDE_COLORS[activeIndex % SLIDE_COLORS.length],
            padding: "3rem 0 2rem",
            transition: "background 0.7s ease",
          }}
        >
          <div
            className="slider-track relative w-full flex items-center justify-center overflow-hidden"
            style={{ height: "460px" }}
            role="region"
            aria-label="Product carousel"
            aria-live="polite"
          >
            {products.map((product, i) => (
              <SlideCard
                key={product.id}
                product={product}
                position={getPosition(i, activeIndex, total)}
                onActivate={() => setActiveIndex(i)}
              />
            ))}
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-4 mt-6">
            <button
              type="button"
              onClick={prev}
              aria-label="Previous product"
              className="w-11 h-11 rounded-full flex items-center justify-center"
              style={{ border: "1.5px solid var(--border-strong)", background: "var(--surface)", color: "var(--text-secondary)" }}
            >
              <ChevronLeft size={18} />
            </button>
            <div className="flex gap-2">
              {products.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setActiveIndex(i)}
                  aria-label={`Go to product ${i + 1}`}
                  className="rounded-full transition-all duration-300"
                  style={{
                    width: i === activeIndex ? "22px" : "7px",
                    height: "7px",
                    background: i === activeIndex ? "var(--accent)" : "var(--border-strong)",
                  }}
                />
              ))}
            </div>
            <button
              type="button"
              onClick={next}
              aria-label="Next product"
              className="w-11 h-11 rounded-full flex items-center justify-center"
              style={{ border: "1.5px solid var(--border-strong)", background: "var(--surface)", color: "var(--text-secondary)" }}
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        {/* View all */}
        <div className="flex justify-center mt-10">
          <Link href="/products" className="btn btn-outline px-8 py-3 text-sm">
            View All Products →
          </Link>
        </div>
      </div>
    </section>
  );
}
