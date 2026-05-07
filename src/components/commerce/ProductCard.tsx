"use client";

import Image from "next/image";
import Link from "next/link";
import { Star, ShoppingCart, Heart } from "lucide-react";
import { useState } from "react";
import { type Product } from "@/types/product";
import { formatPrice, discountPercent } from "@/lib/utils";
import { useCartStore } from "@/lib/cart-store";

interface ProductCardProps {
  product: Product;
  priority?: boolean | undefined;
}

export function ProductCard({ product, priority = false }: ProductCardProps) {
  const [wishlisted, setWishlisted] = useState(false);
  const [adding, setAdding] = useState(false);
  const { addItem } = useCartStore();

  const firstVariant = product.variants[0];
  if (!firstVariant) return null;

  const price = firstVariant.price;
  const compareAt = firstVariant.compareAtPrice;
  const discount = compareAt != null ? discountPercent(price, compareAt) : null;
  const imageUrl = product.images[0]?.url ?? "/images/products/placeholder.jpg";
  const imageAlt = product.images[0]?.alt ?? product.title;

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setAdding(true);
    addItem({
      productId: product.id,
      variantId: firstVariant.id,
      title: product.title,
      variantTitle: firstVariant.title,
      price: firstVariant.price,
      compareAtPrice: firstVariant.compareAtPrice,
      quantity: 1,
      imageUrl,
      slug: product.slug,
    });
    await new Promise((r) => setTimeout(r, 700));
    setAdding(false);
  };

  return (
    <article
      className="luxury-card group rounded-2xl overflow-hidden relative flex flex-col gsap-reveal"
      style={{
        background: "var(--surface)",
        border: "1px solid var(--border)",
      }}
    >
      {/* ── Image area ── */}
      <Link
        href={`/products/${product.slug}`}
        className="block relative overflow-hidden"
        style={{ aspectRatio: "1 / 1", background: "var(--bg-secondary)" }}
      >
        <Image
          src={imageUrl}
          alt={imageAlt}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-[1.06]"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          priority={priority}
        />

        {/* Gradient overlay — slides up on hover */}
        <div
          className="absolute inset-0 flex items-end p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-400"
          style={{ background: "linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.1) 55%, transparent 100%)" }}
        >
          <button
            type="button"
            onClick={handleAddToCart}
            disabled={adding}
            className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold tracking-wide transition-all"
            style={{
              background: "var(--accent)",
              color: "#000",
            }}
            aria-label={`Add ${product.title} to cart`}
          >
            {adding ? (
              <>
                <span className="w-3.5 h-3.5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                Added!
              </>
            ) : (
              <>
                <ShoppingCart size={13} strokeWidth={2} />
                Add to Cart
              </>
            )}
          </button>
        </div>

        {/* Badges */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1.5">
          {product.isBestseller === true && (
            <span
              className="px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider"
              style={{ background: "var(--accent)", color: "#000" }}
            >
              Bestseller
            </span>
          )}
          {product.isNew === true && (
            <span
              className="px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider"
              style={{ background: "var(--accent-gold)", color: "#000" }}
            >
              New
            </span>
          )}
          {discount != null && discount > 0 && (
            <span
              className="px-2 py-0.5 rounded-full text-[9px] font-bold"
              style={{ background: "#ef4444", color: "#fff" }}
            >
              -{discount}%
            </span>
          )}
        </div>

        {/* Wishlist — appears on hover */}
        <button
          type="button"
          onClick={(e) => { e.preventDefault(); setWishlisted((w) => !w); }}
          aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
          aria-pressed={wishlisted}
          className="absolute top-2.5 right-2.5 w-7 h-7 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 glass"
        >
          <Heart
            size={13}
            strokeWidth={2}
            fill={wishlisted ? "#ef4444" : "none"}
            stroke={wishlisted ? "#ef4444" : "var(--text-secondary)"}
          />
        </button>
      </Link>

      {/* ── Info ── */}
      <div className="p-4 flex flex-col gap-2 flex-1">
        {/* Category */}
        <div
          className="text-[9px] font-bold uppercase tracking-[0.2em]"
          style={{ color: "var(--accent)" }}
        >
          {product.category.name}
        </div>

        {/* Title */}
        <Link href={`/products/${product.slug}`}>
          <h3
            className="font-bold text-sm leading-snug hover:text-[var(--accent)] transition-colors tracking-tight line-clamp-2"
            style={{ color: "var(--text-primary)" }}
          >
            {product.title}
          </h3>
        </Link>

        {/* Rating */}
        <div className="flex items-center gap-1.5">
          <div className="flex gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                size={10}
                strokeWidth={1.5}
                fill={i < Math.floor(product.rating) ? "var(--accent-gold)" : "none"}
                stroke="var(--accent-gold)"
              />
            ))}
          </div>
          <span className="text-[10px]" style={{ color: "var(--text-muted)" }}>
            {product.rating} ({product.reviewCount.toLocaleString("en-IN")})
          </span>
        </div>

        {/* Price row */}
        <div className="flex items-center justify-between mt-auto pt-2">
          <div className="flex items-baseline gap-1.5">
            <span className="font-bold text-base" style={{ color: "var(--text-primary)" }}>
              {formatPrice(price)}
            </span>
            {compareAt != null && (
              <span className="text-xs line-through" style={{ color: "var(--text-muted)" }}>
                {formatPrice(compareAt)}
              </span>
            )}
          </div>

          {/* Stock indicator */}
          <div className="flex items-center gap-1">
            <div
              className="stock-dot"
              style={{
                background:
                  firstVariant.inventory > 10
                    ? "var(--accent)"
                    : firstVariant.inventory > 0
                    ? "var(--accent-gold)"
                    : "#ef4444",
              }}
            />
            <span className="text-[10px]" style={{ color: "var(--text-muted)" }}>
              {firstVariant.inventory > 10
                ? "In Stock"
                : firstVariant.inventory > 0
                ? "Low Stock"
                : "Out of Stock"}
            </span>
          </div>
        </div>
      </div>
    </article>
  );
}

// ── Skeleton ─────────────────────────────────────────────────────

export function ProductCardSkeleton() {
  return (
    <div
      className="rounded-2xl overflow-hidden"
      style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
    >
      <div className="skeleton" style={{ aspectRatio: "1 / 1" }} />
      <div className="p-4 flex flex-col gap-3">
        <div className="skeleton h-2.5 w-1/3 rounded-full" />
        <div className="skeleton h-4 w-3/4 rounded-lg" />
        <div className="skeleton h-2.5 w-1/2 rounded-full" />
        <div className="flex justify-between items-center">
          <div className="skeleton h-5 w-20 rounded-lg" />
          <div className="skeleton h-2.5 w-14 rounded-full" />
        </div>
      </div>
    </div>
  );
}
