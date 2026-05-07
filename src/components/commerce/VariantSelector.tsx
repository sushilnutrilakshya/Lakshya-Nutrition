"use client";

import { type ProductVariant } from "@/types/product";
import { formatPrice, discountPercent, cn } from "@/lib/utils";

interface VariantSelectorProps {
  variants: ProductVariant[];
  selectedId: string;
  onChange: (variant: ProductVariant) => void;
}

export function VariantSelector({ variants, selectedId, onChange }: VariantSelectorProps) {
  const hasFlavors = variants.some((v) => v.flavor != null);
  const hasWeights = variants.some((v) => v.weight != null);

  // Group by weight, then by flavor within each weight
  const weights = [...new Set(variants.map((v) => v.weight).filter(Boolean))] as string[];
  const flavors = [...new Set(variants.map((v) => v.flavor).filter(Boolean))] as string[];

  const selected = variants.find((v) => v.id === selectedId);

  return (
    <div className="flex flex-col gap-5">
      {/* Weight options */}
      {hasWeights && (
        <div>
          <div className="text-sm font-semibold mb-3" style={{ color: "var(--text-primary)" }}>
            Size
          </div>
          <div className="flex flex-wrap gap-2">
            {weights.map((weight) => {
              const matchingVariant = variants.find(
                (v) => v.weight === weight && (!hasFlavors || v.flavor === (selected?.flavor ?? flavors[0]))
              );
              if (!matchingVariant) return null;
              const isSelected = matchingVariant.id === selectedId;
              const inStock = matchingVariant.inventory > 0;

              return (
                <button
                  key={weight}
                  type="button"
                  onClick={() => inStock && onChange(matchingVariant)}
                  disabled={!inStock}
                  aria-pressed={isSelected}
                  className={cn(
                    "px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 relative",
                    !inStock && "opacity-40 cursor-not-allowed"
                  )}
                  style={{
                    background: isSelected ? "var(--accent)" : "var(--surface)",
                    color: isSelected ? "#000" : "var(--text-secondary)",
                    border: `1.5px solid ${isSelected ? "var(--accent)" : "var(--border-strong)"}`,
                  }}
                >
                  {weight}
                  {!inStock && (
                    <span className="absolute inset-x-0 top-1/2 -translate-y-1/2 text-center text-[8px] uppercase tracking-widest opacity-60">
                      Sold out
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Flavor options */}
      {hasFlavors && (
        <div>
          <div className="text-sm font-semibold mb-3" style={{ color: "var(--text-primary)" }}>
            Flavor: <span style={{ color: "var(--accent)", fontWeight: 400 }}>{selected?.flavor}</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {flavors.map((flavor) => {
              const matchingVariant = variants.find(
                (v) => v.flavor === flavor && (!hasWeights || v.weight === selected?.weight)
              );
              if (!matchingVariant) return null;
              const isSelected = matchingVariant.id === selectedId;
              const inStock = matchingVariant.inventory > 0;

              return (
                <button
                  key={flavor}
                  type="button"
                  onClick={() => inStock && onChange(matchingVariant)}
                  disabled={!inStock}
                  aria-pressed={isSelected}
                  className={cn(
                    "px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200",
                    !inStock && "opacity-40 cursor-not-allowed"
                  )}
                  style={{
                    background: isSelected ? `rgba(0,230,118,0.15)` : "var(--surface)",
                    color: isSelected ? "var(--accent)" : "var(--text-secondary)",
                    border: `1.5px solid ${isSelected ? "var(--accent)" : "var(--border-strong)"}`,
                  }}
                >
                  {flavor}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Selected variant price */}
      {selected && (
        <div className="flex items-baseline gap-3">
          <span className="text-3xl font-bold" style={{ color: "var(--text-primary)" }}>
            {formatPrice(selected.price)}
          </span>
          {selected.compareAtPrice != null && (
            <>
              <span className="text-lg line-through" style={{ color: "var(--text-muted)" }}>
                {formatPrice(selected.compareAtPrice)}
              </span>
              <span
                className="px-2 py-0.5 rounded-full text-xs font-bold"
                style={{ background: "#ef4444", color: "#fff" }}
              >
                -{discountPercent(selected.price, selected.compareAtPrice)}% OFF
              </span>
            </>
          )}
        </div>
      )}
    </div>
  );
}
