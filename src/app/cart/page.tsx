"use client";

import { useState, useEffect } from "react";

export const dynamic = "force-dynamic";

import { useCartStore, cartItemCount } from "@/lib/cart-store";
import { formatPrice } from "@/lib/utils";
import { SHIPPING_THRESHOLD } from "@/lib/constants";
import { ShoppingBag, Minus, Plus, Trash2, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function CartPage() {
  const store = useCartStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div style={{ background: "var(--bg-primary)", minHeight: "100dvh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <ShoppingBag className="animate-pulse" style={{ color: "var(--accent)" }} size={32} />
      </div>
    );
  }

  const { cart, removeItem, updateQuantity, clearCart } = store;
  const itemCount = cartItemCount(cart.items);

  if (cart.items.length === 0) {
    return (
      <div
        style={{ background: "var(--bg-primary)", minHeight: "100dvh" }}
        className="flex flex-col items-center justify-center text-center gap-8 px-6 section-pad"
      >
        <div className="relative w-24 h-24 rounded-full flex items-center justify-center mb-4" style={{ background: "rgba(0,230,118,0.05)", border: "1px solid var(--border)" }}>
           <ShoppingBag size={48} style={{ color: "var(--accent)", opacity: 0.8 }} />
           <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-[var(--accent)] animate-ping opacity-20" />
        </div>
        <div className="max-w-md mx-auto">
          <h1 className="font-bold tracking-tight mb-4 text-center" style={{ color: "var(--text-primary)" }}>
            Your cart is empty
          </h1>
          <p className="text-lg leading-relaxed mb-10" style={{ color: "var(--text-secondary)" }}>
            Looks like you haven&apos;t added any premium supplements yet. Ready to start your journey?
          </p>
          <Link href="/products" className="btn btn-primary px-10 py-4 text-base font-bold rounded-full transition-all">
            Browse Our Catalog
          </Link>
        </div>
      </div>
    );
  }

  const shippingRemaining = Math.max(0, SHIPPING_THRESHOLD - cart.subtotal);

  return (
    <div className="w-full flex flex-col items-center" style={{ background: "var(--bg-primary)", minHeight: "100dvh", paddingTop: "80px" }}>
      <div
        className="w-full px-6 md:px-12 py-16"
        style={{ maxWidth: "1152px", marginLeft: "auto", marginRight: "auto" }}
      >
        {/* Centered header */}
        <div className="flex flex-col items-center text-center mx-auto max-w-lg mb-12">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-[0.18em] mb-5" style={{ background: "rgba(127,232,90,0.1)", border: "1px solid rgba(127,232,90,0.2)", color: "var(--accent)" }}>Review Items</span>
          <h1 className="font-bold tracking-tight mb-3" style={{ color: "var(--text-primary)" }}>
            Shopping Cart
          </h1>
          <div className="flex items-center justify-center gap-4 text-sm" style={{ color: "var(--text-muted)" }}>
            <span>{itemCount} item{itemCount !== 1 ? "s" : ""}</span>
            <span className="w-1 h-1 rounded-full" style={{ background: "var(--border-strong)" }} />
            <Link href="/products" className="flex items-center gap-1.5 hover:text-[var(--accent)] transition-colors">
              Continue Shopping <ArrowRight size={13} />
            </Link>
          </div>
        </div>

        {/* Free shipping progress */}
        {shippingRemaining > 0 && (
          <div
            className="rounded-xl px-5 py-4 mb-8 mx-auto max-w-3xl"
            style={{ background: "rgba(var(--accent-rgb),0.07)", border: "1px solid rgba(var(--accent-rgb),0.2)" }}
          >
            <div className="flex justify-between text-sm mb-2" style={{ color: "var(--text-secondary)" }}>
              <span>🚚 Add <strong style={{ color: "var(--accent)" }}>{formatPrice(shippingRemaining)}</strong> more for free shipping!</span>
              <span style={{ color: "var(--text-muted)" }}>Free at {formatPrice(SHIPPING_THRESHOLD)}</span>
            </div>
            <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "var(--bg-tertiary)" }}>
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{ width: `${Math.min(100, (cart.subtotal / SHIPPING_THRESHOLD) * 100)}%`, background: "var(--accent)" }}
              />
            </div>
          </div>
        )}

        {/* Two-column layout — centered as a group */}
        <div className="grid lg:grid-cols-[1fr,360px] gap-6 mx-auto max-w-5xl">
          {/* Cart items */}
          <div
            className="rounded-2xl overflow-hidden"
            style={{ border: "1px solid var(--border)", background: "var(--surface)" }}
          >
            {cart.items.map((item, index) => (
              <div
                key={item.id}
                className="flex gap-4 p-5"
                style={{ borderBottom: index < cart.items.length - 1 ? "1px solid var(--border)" : "none" }}
              >
                <Link
                  href={`/products/${item.slug}`}
                  className="relative w-20 h-20 rounded-xl overflow-hidden flex-shrink-0"
                  style={{ background: "var(--bg-secondary)", border: "1px solid var(--border)" }}
                >
                  <Image src={item.imageUrl} alt={item.title} fill className="object-contain p-2" sizes="80px" />
                </Link>

                <div className="flex-1 min-w-0">
                  <Link
                    href={`/products/${item.slug}`}
                    className="font-semibold text-sm hover:text-[var(--accent)] transition-colors"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {item.title}
                  </Link>
                  <div className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>
                    {item.variantTitle}
                  </div>

                  <div className="flex items-center justify-between mt-3">
                    <div
                      className="flex items-center rounded-lg overflow-hidden"
                      style={{ border: "1px solid var(--border-strong)" }}
                    >
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                        aria-label="Decrease"
                        className="w-8 h-8 flex items-center justify-center disabled:opacity-40"
                        style={{ background: "var(--bg-secondary)", color: "var(--text-secondary)" }}
                      >
                        <Minus size={12} />
                      </button>
                      <span
                        className="w-10 text-center font-bold text-sm"
                        style={{ color: "var(--text-primary)" }}
                      >
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        aria-label="Increase"
                        className="w-8 h-8 flex items-center justify-center"
                        style={{ background: "var(--bg-secondary)", color: "var(--text-secondary)" }}
                      >
                        <Plus size={12} />
                      </button>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="font-bold text-sm" style={{ color: "var(--text-primary)" }}>
                        {formatPrice(item.price * item.quantity)}
                      </span>
                      <button
                        type="button"
                        onClick={() => removeItem(item.id)}
                        aria-label={`Remove ${item.title}`}
                        className="w-7 h-7 rounded-lg flex items-center justify-center transition-colors hover:bg-red-500/10"
                        style={{ color: "#ef4444" }}
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            <div className="p-4 flex justify-end" style={{ borderTop: "1px solid var(--border)" }}>
              <button
                type="button"
                onClick={clearCart}
                className="text-xs py-1.5 px-3 rounded-lg transition-colors hover:text-red-400"
                style={{ color: "var(--text-muted)", border: "1px solid var(--border)" }}
              >
                Clear Cart
              </button>
            </div>
          </div>

          {/* Order summary */}
          <div>
            <div
              className="rounded-2xl p-6 sticky top-24"
              style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
            >
              <h2 className="font-bold text-base mb-5" style={{ color: "var(--text-primary)" }}>
                Order Summary
              </h2>

              <div className="flex flex-col gap-3 text-sm mb-5">
                <div className="flex justify-between" style={{ color: "var(--text-secondary)" }}>
                  <span>Subtotal ({itemCount} items)</span>
                  <span>{formatPrice(cart.subtotal)}</span>
                </div>
                <div className="flex justify-between" style={{ color: "var(--text-secondary)" }}>
                  <span>Shipping</span>
                  <span style={{ color: cart.shippingFee === 0 ? "var(--accent)" : "inherit", fontWeight: cart.shippingFee === 0 ? 600 : 400 }}>
                    {cart.shippingFee === 0 ? "FREE 🎉" : formatPrice(cart.shippingFee)}
                  </span>
                </div>
                <div className="flex justify-between text-xs" style={{ color: "var(--text-muted)" }}>
                  <span>GST (18% incl.)</span>
                  <span>{formatPrice(cart.gst)}</span>
                </div>
                <div
                  className="flex justify-between font-bold text-base pt-3"
                  style={{ borderTop: "1px solid var(--border)", color: "var(--text-primary)" }}
                >
                  <span>Total</span>
                  <span>{formatPrice(cart.total)}</span>
                </div>
              </div>

              <Link
                href="/checkout"
                className="btn btn-primary w-full justify-center py-3.5 text-sm"
              >
                Proceed to Checkout <ArrowRight size={15} />
              </Link>
              <p className="text-center text-xs mt-3" style={{ color: "var(--text-muted)" }}>
                🔒 Secure checkout · UPI · Cards · COD
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
