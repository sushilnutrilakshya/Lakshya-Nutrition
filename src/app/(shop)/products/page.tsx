"use client";

import { useState, useMemo, Suspense } from "react";
import { ProductCard } from "@/components/commerce/ProductCard";
import { PRODUCT_CATEGORIES } from "@/lib/constants";
import { MOCK_PRODUCTS } from "@/lib/mock-data";
import { Search, ChevronDown } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";

type SortOption = "featured" | "price-asc" | "price-desc" | "rating" | "newest";

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: "featured", label: "Featured" },
  { value: "rating", label: "Best Rated" },
  { value: "price-asc", label: "Price: Low → High" },
  { value: "price-desc", label: "Price: High → Low" },
  { value: "newest", label: "Newest First" },
];

const PRICE_RANGE: [number, number] = [0, 10000];

function ProductsContent() {
  const searchParams = useSearchParams();
  const categoryFromUrl = searchParams.get("category") ?? "all";

  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState(categoryFromUrl);
  const [sortBy, setSortBy] = useState<SortOption>("featured");

  const filteredProducts = useMemo(() => {
    let results = [...MOCK_PRODUCTS];

    // Category filter
    if (activeCategory !== "all") {
      results = results.filter((p) => p.category.slug === activeCategory);
    }

    // Search filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      results = results.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q))
      );
    }

    // Price filter
    results = results.filter((p) => {
      const price = p.variants[0]?.price ?? 0;
      return price >= PRICE_RANGE[0] && price <= PRICE_RANGE[1];
    });

    // Sort
    switch (sortBy) {
      case "price-asc":
        results.sort((a, b) => (a.variants[0]?.price ?? 0) - (b.variants[0]?.price ?? 0));
        break;
      case "price-desc":
        results.sort((a, b) => (b.variants[0]?.price ?? 0) - (a.variants[0]?.price ?? 0));
        break;
      case "rating":
        results.sort((a, b) => b.rating - a.rating);
        break;
      case "newest":
        results.sort((a, b) => (b.isNew === true ? 1 : 0) - (a.isNew === true ? 1 : 0));
        break;
      default:
        results.sort((a, b) => (b.isBestseller === true ? 1 : 0) - (a.isBestseller === true ? 1 : 0));
    }

    return results;
  }, [activeCategory, searchQuery, sortBy]);

  return (
    <div className="w-full flex flex-col items-center" style={{ background: "var(--bg-primary)", minHeight: "100dvh", paddingTop: "80px" }}>
      {/* Hero banner — full-bleed background, centered content */}
      <div
        className="relative w-full overflow-hidden"
        style={{
          background: "linear-gradient(180deg, var(--bg-secondary) 0%, var(--bg-primary) 100%)",
          borderBottom: "1px solid var(--border)",
          paddingTop: "clamp(3rem, 8vw, 6rem)",
          paddingBottom: "clamp(3rem, 8vw, 6rem)",
        }}
      >
        {/* Full-bleed grid pattern */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
            opacity: 0.5,
          }}
        />
        {/* Centered content */}
        <div className="w-full px-6 md:px-12 text-center relative z-10" style={{ maxWidth: "1152px", marginLeft: "auto", marginRight: "auto" }}>
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-[0.18em] mb-5" style={{ background: "rgba(127,232,90,0.1)", border: "1px solid rgba(127,232,90,0.2)", color: "var(--accent)" }}>Premium Performance</span>
          <h1 className="font-bold tracking-tight mb-5 text-center" style={{ color: "var(--text-primary)" }}>
            Our Catalog
          </h1>
          <p
            className="mx-auto text-base leading-relaxed text-center"
            style={{ color: "var(--text-secondary)", maxWidth: "520px" }}
          >
            Scientifically formulated, lab-tested supplements engineered to help you shatter your limits.
            No junk, no fillers, just results.
          </p>
        </div>
      </div>

      <div className="w-full flex flex-col items-center" style={{ paddingBottom: "120px" }}>
        <div className="w-full px-6 md:px-12 flex flex-col items-center py-16" style={{ maxWidth: "1152px", marginLeft: "auto", marginRight: "auto" }}>
        {/* Toolbar */}
        <div className="flex flex-col md:flex-row items-stretch justify-center gap-4 mb-12 mx-auto max-w-4xl">
          {/* Search */}
          <div className="relative flex-1">
            <Search
              size={17}
              className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none"
              style={{ color: "var(--accent)" }}
            />
            <input
              type="search"
              placeholder="Search by goal or ingredient..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-5 py-3.5 rounded-xl text-sm font-medium transition-all"
              style={{
                background: "var(--surface)",
                border: "1.5px solid var(--border-strong)",
                color: "var(--text-primary)",
                outline: "none",
              }}
              onFocus={(e) => { e.currentTarget.style.borderColor = "var(--accent)"; e.currentTarget.style.boxShadow = "var(--shadow-glow)"; }}
              onBlur={(e) => { e.currentTarget.style.borderColor = "var(--border-strong)"; e.currentTarget.style.boxShadow = "none"; }}
              aria-label="Search catalog"
            />
          </div>

          {/* Sort */}
          <div className="relative md:w-56">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="appearance-none w-full pl-5 pr-10 py-3.5 rounded-xl text-sm font-semibold cursor-pointer"
              style={{
                background: "var(--surface)",
                border: "1.5px solid var(--border-strong)",
                color: "var(--text-primary)",
                outline: "none",
              }}
              aria-label="Sort products"
            >
              {SORT_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
            <ChevronDown
              size={16}
              className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none"
              style={{ color: "var(--accent)" }}
            />
          </div>
        </div>

        {/* Category tabs — centered */}
        <div className="flex gap-2.5 flex-wrap justify-center mb-12">
          {[{ id: "cat_all", name: "All Products", slug: "all" }, ...PRODUCT_CATEGORIES].map((cat) => {
            const isActive = activeCategory === cat.slug;
            return (
              <button
                key={cat.id ?? cat.slug}
                type="button"
                onClick={() => setActiveCategory(cat.slug)}
                className={cn("px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200")}
                style={{
                  background: isActive ? "var(--accent)" : "var(--surface)",
                  color: isActive ? "#000" : "var(--text-secondary)",
                  border: `1.5px solid ${isActive ? "var(--accent)" : "var(--border)"}`,
                  boxShadow: isActive ? "var(--shadow-glow)" : "none",
                }}
                aria-pressed={isActive}
              >
                {cat.name}
              </button>
            );
          })}
        </div>

        {/* Results count */}
        <p className="mb-6 text-sm text-center" style={{ color: "var(--text-muted)" }}>
          {filteredProducts.length} product{filteredProducts.length !== 1 ? "s" : ""} found
        </p>

        {/* Products grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8 mx-auto max-w-7xl">
            {filteredProducts.map((product, i) => (
              <ProductCard key={product.id} product={product} priority={i < 4} />
            ))}
          </div>
        ) : (
          <div className="text-center py-24 mx-auto max-w-md">
            <div className="text-5xl mb-5 mx-auto flex justify-center">🔍</div>
            <h3 className="font-bold text-xl mb-2" style={{ color: "var(--text-primary)" }}>
              No products found
            </h3>
            <p className="mb-6 text-sm" style={{ color: "var(--text-muted)" }}>
              Try adjusting your search or browse all categories.
            </p>
            <button
              type="button"
              onClick={() => { setActiveCategory("all"); setSearchQuery(""); }}
              className="btn btn-primary px-6 py-2.5 text-sm"
            >
              Clear Filters
            </button>
          </div>
        )}
        </div>
      </div>
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={<div style={{ background: "var(--bg-primary)", minHeight: "100dvh", paddingTop: "80px" }}></div>}>
      <ProductsContent />
    </Suspense>
  );
}
