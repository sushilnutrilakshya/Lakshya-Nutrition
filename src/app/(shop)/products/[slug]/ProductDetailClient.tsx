"use client";

import { useState } from "react";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ShoppingCart, Zap, Shield, Truck, Star, ChevronDown } from "lucide-react";
import { WHATSAPP_URL, SITE_NAME, SITE_URL } from "@/lib/constants";
import { useCartStore } from "@/lib/cart-store";
import { VariantSelector } from "@/components/commerce/VariantSelector";
import { ProductCard } from "@/components/commerce/ProductCard";
import { formatPrice } from "@/lib/utils";
import { type Product, type ProductVariant } from "@/types/product";

interface ProductDetailClientProps {
  product: Product;
  relatedProducts: Product[];
}

type TabId = "description" | "ingredients" | "nutrition" | "reviews";

export default function ProductDetailClient({ product, relatedProducts }: ProductDetailClientProps) {
  // All hooks unconditionally before any early return
  const { addItem } = useCartStore();
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant>(
    product.variants[0] ?? ({ id: "", title: "", price: 0, inventory: 0, sku: "" } as ProductVariant)
  );
  const [activeImage, setActiveImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<TabId>("description");
  const [adding, setAdding] = useState(false);

  const firstVariant = product.variants[0];
  if (!firstVariant) return null;

  const handleAddToCart = async () => {
    setAdding(true);
    addItem({
      productId: product.id,
      variantId: selectedVariant.id,
      title: product.title,
      variantTitle: selectedVariant.title,
      price: selectedVariant.price,
      compareAtPrice: selectedVariant.compareAtPrice,
      quantity,
      imageUrl: product.images[0]?.url ?? "/images/products/placeholder.jpg",
      slug: product.slug,
    });
    await new Promise((r) => setTimeout(r, 600));
    setAdding(false);
  };

  const tabs: { id: TabId; label: string }[] = [
    { id: "description", label: "Description" },
    { id: "ingredients", label: "Ingredients" },
    { id: "nutrition", label: "Nutrition Facts" },
    { id: "reviews", label: `Reviews (${product.reviewCount.toLocaleString("en-IN")})` },
  ];

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    image: product.images.map((img) => img.url),
    description: product.description,
    brand: { "@type": "Brand", name: SITE_NAME },
    sku: product.id,
    offers: {
      "@type": "Offer",
      url: `${SITE_URL}/products/${product.slug}`,
      priceCurrency: "INR",
      price: selectedVariant.price,
      itemCondition: "https://schema.org/NewCondition",
      availability: "https://schema.org/InStock",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: product.rating,
      reviewCount: product.reviewCount,
    },
  };

  return (
    <div style={{ background: "var(--bg-primary)", paddingTop: "80px" }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }} />

      {/* ── PATTERN B: Left-aligned product layout ── */}
      <div
        className="w-full px-6 md:px-12 py-16"
        style={{ maxWidth: "1152px", marginLeft: "auto", marginRight: "auto" }}
      >
        <div className="grid lg:grid-cols-2 gap-12 xl:gap-20 items-start">

          {/* ── Gallery (left) ── */}
          <div className="flex flex-col gap-4 lg:sticky lg:top-24">
            {/* Main image */}
            <div
              className="relative rounded-2xl overflow-hidden"
              style={{
                aspectRatio: "1 / 1",
                background: "var(--bg-secondary)",
                border: "1px solid var(--border)",
              }}
            >
              <Image
                src={product.images[activeImage]?.url ?? "/images/products/placeholder.jpg"}
                alt={product.images[activeImage]?.alt ?? product.title}
                fill
                className="object-contain p-8 transition-opacity duration-300"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
              {/* Badges */}
              <div className="absolute top-4 left-4 flex gap-2">
                {product.isBestseller === true && (
                  <span className="px-3 py-1 rounded-full text-xs font-bold" style={{ background: "var(--accent)", color: "#000" }}>
                    BESTSELLER
                  </span>
                )}
                {product.isNew === true && (
                  <span className="px-3 py-1 rounded-full text-xs font-bold" style={{ background: "var(--accent-gold)", color: "#000" }}>
                    NEW
                  </span>
                )}
              </div>
            </div>

            {/* Thumbnails */}
            {product.images.length > 1 && (
              <div className="flex gap-3">
                {product.images.map((img, i) => (
                  <button
                    key={img.id}
                    type="button"
                    onClick={() => setActiveImage(i)}
                    aria-label={`View image ${i + 1}`}
                    className="relative w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 transition-all duration-200"
                    style={{
                      border: `2px solid ${i === activeImage ? "var(--accent)" : "var(--border)"}`,
                      background: "var(--bg-secondary)",
                    }}
                  >
                    <Image src={img.url} alt={img.alt} fill className="object-contain p-2" sizes="80px" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* ── Product info (right) — Pattern B: left-aligned ── */}
          <div className="flex flex-col gap-7">
            {/* Breadcrumb */}
            <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs" style={{ color: "var(--text-muted)" }}>
              <span>Products</span>
              <ChevronDown size={12} className="-rotate-90" />
              <span>{product.category.name}</span>
              <ChevronDown size={12} className="-rotate-90" />
              <span style={{ color: "var(--text-primary)" }}>{product.title}</span>
            </nav>

            {/* Category + Title */}
            <div>
              <div className="text-xs font-bold uppercase tracking-[0.2em] mb-3" style={{ color: "var(--accent)" }}>
                {product.category.name}
              </div>
              <h1
                className="font-bold leading-[1.05] tracking-tight"
                style={{ color: "var(--text-primary)", fontSize: "clamp(2rem, 4vw, 3.25rem)" }}
              >
                {product.title}
              </h1>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-3">
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={15}
                    strokeWidth={1.5}
                    fill={i < Math.floor(product.rating) ? "var(--accent-gold)" : "none"}
                    stroke="var(--accent-gold)"
                  />
                ))}
              </div>
              <span className="font-semibold text-sm" style={{ color: "var(--text-primary)" }}>
                {product.rating}
              </span>
              <span className="text-sm" style={{ color: "var(--text-muted)" }}>
                ({product.reviewCount.toLocaleString("en-IN")} reviews)
              </span>
            </div>

            {/* Short description */}
            <p className="text-base leading-relaxed" style={{ color: "var(--text-secondary)", maxWidth: "480px" }}>
              {product.shortDescription}
            </p>

            {/* Variant selector (includes price) */}
            <VariantSelector
              variants={product.variants}
              selectedId={selectedVariant.id}
              onChange={setSelectedVariant}
            />

            {/* Serving info */}
            {product.servingSize != null && (
              <div className="flex gap-8 py-4" style={{ borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }}>
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-wider mb-1" style={{ color: "var(--text-muted)" }}>
                    Serving Size
                  </div>
                  <div className="font-bold text-sm" style={{ color: "var(--text-primary)" }}>
                    {product.servingSize}
                  </div>
                </div>
                {product.servingsPerContainer != null && (
                  <div>
                    <div className="text-[10px] font-bold uppercase tracking-wider mb-1" style={{ color: "var(--text-muted)" }}>
                      Servings / Container
                    </div>
                    <div className="font-bold text-sm" style={{ color: "var(--text-primary)" }}>
                      {product.servingsPerContainer}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Quantity selector */}
            <div>
              <div className="text-sm font-semibold mb-3" style={{ color: "var(--text-primary)" }}>
                Quantity
              </div>
              <div className="flex items-center gap-4">
                <div
                  className="flex items-center rounded-xl overflow-hidden"
                  style={{ border: "1.5px solid var(--border-strong)" }}
                >
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    aria-label="Decrease quantity"
                    disabled={quantity <= 1}
                    className="w-11 h-11 flex items-center justify-center text-lg disabled:opacity-40 transition-colors hover:bg-[var(--bg-secondary)]"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    −
                  </button>
                  <span
                    className="w-12 text-center font-bold text-base"
                    style={{ color: "var(--text-primary)" }}
                    aria-live="polite"
                  >
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => q + 1)}
                    aria-label="Increase quantity"
                    className="w-11 h-11 flex items-center justify-center text-lg transition-colors hover:bg-[var(--bg-secondary)]"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    +
                  </button>
                </div>
                <span className="text-sm" style={{ color: selectedVariant.inventory <= 5 && selectedVariant.inventory > 0 ? "#f59e0b" : "var(--text-muted)" }}>
                  {selectedVariant.inventory > 0
                    ? selectedVariant.inventory > 10
                      ? "✓ In Stock"
                      : `Only ${selectedVariant.inventory} left!`
                    : "Out of Stock"}
                </span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                type="button"
                onClick={handleAddToCart}
                disabled={adding || selectedVariant.inventory === 0}
                className="btn btn-primary flex-1 py-4 text-sm gap-2"
              >
                {adding ? (
                  <>
                    <span className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                    Added to Cart!
                  </>
                ) : (
                  <>
                    <ShoppingCart size={17} strokeWidth={2} />
                    Add to Cart — {formatPrice(selectedVariant.price * quantity)}
                  </>
                )}
              </button>

              <a
                href={`${WHATSAPP_URL}?text=Hi! I'm interested in ordering ${product.title} (${selectedVariant.title}) x${quantity}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline flex-1 py-4 text-sm gap-2"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" width="17" height="17" style={{ color: "#25D366" }}>
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347M12 0C5.373 0 0 5.373 0 12c0 2.117.549 4.1 1.508 5.828L0 24l6.336-1.48A11.954 11.954 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0" />
                </svg>
                Order via WhatsApp
              </a>
            </div>

            {/* Trust row */}
            <div className="grid grid-cols-3 gap-3 pt-2">
              {[
                { icon: Shield, label: "100% Authentic" },
                { icon: Truck, label: "Free Shipping ₹999+" },
                { icon: Zap, label: "Fast Delivery" },
              ].map(({ icon: Icon, label }) => (
                <div
                  key={label}
                  className="flex flex-col items-center gap-2 text-center p-3 rounded-xl"
                  style={{ background: "var(--bg-secondary)", border: "1px solid var(--border)" }}
                >
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center"
                    style={{ background: "rgba(127,232,90,0.1)" }}
                  >
                    <Icon size={15} strokeWidth={1.5} style={{ color: "var(--accent)" }} />
                  </div>
                  <span className="text-[10px] font-semibold leading-tight" style={{ color: "var(--text-secondary)" }}>
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Tabs section ── */}
        <div className="mt-20">
          <div
            className="flex gap-0 overflow-x-auto mb-10"
            style={{ borderBottom: "1px solid var(--border)" }}
            role="tablist"
          >
            {tabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={activeTab === tab.id}
                onClick={() => setActiveTab(tab.id)}
                className="px-5 py-4 text-sm font-semibold whitespace-nowrap transition-all duration-200"
                style={{
                  color: activeTab === tab.id ? "var(--accent)" : "var(--text-muted)",
                  borderBottom: `2px solid ${activeTab === tab.id ? "var(--accent)" : "transparent"}`,
                  marginBottom: "-1px",
                  background: "transparent",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Description */}
          {activeTab === "description" && (
            <div style={{ maxWidth: "720px" }}>
              <p className="text-base leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                {product.description}
              </p>
            </div>
          )}

          {/* Ingredients */}
          {activeTab === "ingredients" && (
            <div>
              {product.ingredients != null ? (
                <div className="flex flex-wrap gap-3">
                  {product.ingredients.map((ing) => (
                    <span
                      key={ing}
                      className="px-4 py-2 rounded-xl text-sm font-medium"
                      style={{ background: "var(--surface)", border: "1px solid var(--border)", color: "var(--text-secondary)" }}
                    >
                      {ing}
                    </span>
                  ))}
                </div>
              ) : (
                <p style={{ color: "var(--text-muted)" }}>Ingredient list coming soon.</p>
              )}
            </div>
          )}

          {/* Nutrition Facts */}
          {activeTab === "nutrition" && (
            <div className="flex flex-col gap-8">
              <div style={{ maxWidth: "560px" }}>
                <h3 className="text-xl font-bold mb-2 tracking-tight" style={{ color: "var(--text-primary)" }}>
                  Bio-Chemical Index
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                  Laboratory analysis per serving. Verified through third-party liquid chromatography testing.
                </p>
              </div>
              {product.nutritionFacts != null ? (
                <div
                  className="rounded-2xl overflow-hidden"
                  style={{ border: "1px solid var(--border)" }}
                >
                  {Object.entries(product.nutritionFacts).map(([key, value], i, arr) => (
                    <div
                      key={key}
                      className="flex items-center justify-between px-6 py-4 transition-colors hover:bg-[var(--bg-secondary)]"
                      style={{
                        borderBottom: i < arr.length - 1 ? "1px solid var(--border)" : "none",
                        background: "var(--surface)",
                      }}
                    >
                      <span className="text-sm font-medium" style={{ color: "var(--text-secondary)" }}>{key}</span>
                      <span className="text-sm font-bold" style={{ color: "var(--accent)" }}>{value}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="italic text-sm" style={{ color: "var(--text-muted)" }}>
                  Detailed scientific disclosure pending next batch analysis.
                </p>
              )}
              <div
                className="inline-flex items-center gap-3 px-5 py-2.5 rounded-xl text-xs font-semibold"
                style={{ background: "rgba(127,232,90,0.06)", border: "1px solid rgba(127,232,90,0.12)", color: "var(--text-muted)" }}
              >
                <Shield size={13} strokeWidth={1.5} style={{ color: "var(--accent)" }} />
                100% Purity Certified · Batch #LN-2026-X
              </div>
            </div>
          )}

          {/* Reviews */}
          {activeTab === "reviews" && (
            <div style={{ maxWidth: "480px" }}>
              <div className="flex items-center gap-4 mb-6">
                <div
                  className="text-5xl font-bold tracking-tighter"
                  style={{ color: "var(--text-primary)" }}
                >
                  {product.rating}
                </div>
                <div>
                  <div className="flex gap-0.5 mb-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} size={16} strokeWidth={1.5} fill={i < Math.floor(product.rating) ? "var(--accent-gold)" : "none"} stroke="var(--accent-gold)" />
                    ))}
                  </div>
                  <p className="text-sm" style={{ color: "var(--text-muted)" }}>
                    {product.reviewCount.toLocaleString("en-IN")} verified reviews
                  </p>
                </div>
              </div>
              <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
                Our athletes are currently submitting their latest results. Reviews are being verified for publication.
              </p>
            </div>
          )}
        </div>

        {/* ── Related products ── */}
        {relatedProducts.length > 0 && (
          <div className="mt-24">
            <div className="mb-10">
              <h2 className="font-bold tracking-tight mb-1" style={{ color: "var(--text-primary)", fontSize: "clamp(1.5rem, 3vw, 2rem)" }}>
                You May Also Like
              </h2>
              <div className="w-12 h-0.5 rounded-full mt-3" style={{ background: "var(--accent)" }} />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
