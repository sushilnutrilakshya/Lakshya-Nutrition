"use client";

import { useRef, useEffect, useState } from "react";
import { X, ShoppingBag, Minus, Plus, Trash2, ArrowRight, Sparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCartStore, cartItemCount } from "@/lib/cart-store";
import { formatPrice } from "@/lib/utils";
import { SHIPPING_THRESHOLD } from "@/lib/constants";

export function CartDrawer() {
  const store = useCartStore();
  const [mounted, setMounted] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);

  useEffect(() => { setMounted(true); }, []);

  const { cart, isOpen, closeCart, removeItem, updateQuantity, clearCart } = store;
  const itemCount = mounted ? cartItemCount(cart.items) : 0;

  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => { if (e.key === "Escape") closeCart(); };
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [isOpen, closeCart]);

  const shippingRemaining = mounted ? Math.max(0, SHIPPING_THRESHOLD - cart.subtotal) : 0;
  const shippingProgress = mounted ? Math.min(100, (cart.subtotal / SHIPPING_THRESHOLD) * 100) : 0;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-[200] transition-opacity duration-300"
        style={{
          background: "var(--overlay)",
          opacity: isOpen ? 1 : 0,
          pointerEvents: isOpen ? "auto" : "none",
        }}
        onClick={closeCart}
        aria-hidden="true"
      />

      {/* Cart Modal */}
      <div
        ref={drawerRef}
        id="cart-drawer"
        role="dialog"
        aria-modal="true"
        aria-label="Shopping cart"
        className="fixed top-1/2 left-1/2 z-[201] w-[90vw] max-w-[480px] max-h-[85vh] flex flex-col rounded-3xl overflow-hidden backdrop-blur-3xl bg-white/95 dark:bg-[#080b12]/90 shadow-2xl"
        style={{
          border: "1px solid var(--border)",
          transform: isOpen ? "translate(-50%, -50%) scale(1)" : "translate(-50%, -50%) scale(0.95)",
          opacity: isOpen ? 1 : 0,
          pointerEvents: isOpen ? "auto" : "none",
          transition: "all 0.4s cubic-bezier(0.19, 1, 0.22, 1)",
        }}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-6 py-5"
          style={{ borderBottom: "1px solid var(--border)" }}
        >
          <div className="flex items-center gap-3">
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center"
              style={{ background: "rgba(127,232,90,0.1)", border: "1px solid rgba(127,232,90,0.2)" }}
            >
              <ShoppingBag size={18} style={{ color: "var(--accent)" }} />
            </div>
            <div>
              <h2 className="font-bold text-base tracking-tight" style={{ color: "var(--text-primary)" }}>
                Your Cart
              </h2>
              <p className="text-[10px] font-semibold uppercase tracking-widest" style={{ color: "var(--accent)" }}>
                {itemCount} {itemCount === 1 ? "item" : "items"}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={closeCart}
            aria-label="Close cart"
            className="w-8 h-8 rounded-full flex items-center justify-center transition-all hover:rotate-90"
            style={{ border: "1px solid var(--border-strong)", color: "var(--text-muted)" }}
          >
            <X size={15} />
          </button>
        </div>

        {/* Free shipping progress */}
        {mounted && shippingRemaining > 0 && (
          <div
            className="px-6 py-3"
            style={{ background: "rgba(127,232,90,0.05)", borderBottom: "1px solid var(--border)" }}
          >
            <div className="flex justify-between text-[11px] mb-2 font-medium" style={{ color: "var(--text-muted)" }}>
              <span>
                <span style={{ color: "var(--accent)" }}>{formatPrice(shippingRemaining)}</span> away from free shipping
              </span>
              <span>Free at {formatPrice(SHIPPING_THRESHOLD)}</span>
            </div>
            <div className="h-1 rounded-full overflow-hidden" style={{ background: "var(--bg-tertiary)" }}>
              <div
                className="h-full rounded-full transition-all duration-700"
                style={{ width: `${shippingProgress}%`, background: "var(--accent)" }}
              />
            </div>
          </div>
        )}

        {/* Items */}
        <div className="flex-1 overflow-y-auto custom-scrollbar">
          {cart.items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-5 text-center px-8 py-16">
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center"
                style={{ background: "var(--bg-secondary)", border: "1px solid var(--border)" }}
              >
                <ShoppingBag size={28} style={{ color: "var(--border-strong)" }} />
              </div>
              <div>
                <p className="font-bold text-base mb-1" style={{ color: "var(--text-primary)" }}>
                  Your cart is empty
                </p>
                <p className="text-sm" style={{ color: "var(--text-muted)" }}>
                  Add some supplements to get started
                </p>
              </div>
              <button
                type="button"
                onClick={closeCart}
                className="btn btn-primary px-6 py-2.5 text-sm"
              >
                Browse Products
              </button>
            </div>
          ) : (
            <div className="flex flex-col divide-y" style={{ borderColor: "var(--border)" }}>
              {cart.items.map((item) => (
                <div key={item.id} className="flex gap-4 p-5 group">
                  {/* Product image */}
                  <Link
                    href={`/products/${item.slug}`}
                    onClick={closeCart}
                    className="relative w-20 h-20 rounded-xl overflow-hidden flex-shrink-0"
                    style={{ background: "var(--bg-secondary)", border: "1px solid var(--border)" }}
                  >
                    <Image
                      src={item.imageUrl}
                      alt={item.title}
                      fill
                      className="object-contain p-2.5"
                      sizes="80px"
                    />
                  </Link>

                  {/* Info */}
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <Link
                        href={`/products/${item.slug}`}
                        onClick={closeCart}
                        className="font-semibold text-sm leading-snug hover:text-[var(--accent)] transition-colors block"
                        style={{ color: "var(--text-primary)" }}
                      >
                        {item.title}
                      </Link>
                      <div className="text-[10px] font-medium mt-0.5 uppercase tracking-wide" style={{ color: "var(--text-muted)" }}>
                        {item.variantTitle}
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-3">
                      {/* Quantity controls */}
                      <div
                        className="flex items-center rounded-lg overflow-hidden"
                        style={{ border: "1px solid var(--border-strong)" }}
                      >
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          aria-label="Decrease quantity"
                          disabled={item.quantity <= 1}
                          className="w-7 h-7 flex items-center justify-center disabled:opacity-30 transition-colors hover:bg-[var(--bg-secondary)]"
                          style={{ color: "var(--text-secondary)" }}
                        >
                          <Minus size={10} />
                        </button>
                        <span
                          className="w-8 text-center text-xs font-bold"
                          style={{ color: "var(--text-primary)" }}
                        >
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          aria-label="Increase quantity"
                          className="w-7 h-7 flex items-center justify-center transition-colors hover:bg-[var(--bg-secondary)]"
                          style={{ color: "var(--text-secondary)" }}
                        >
                          <Plus size={10} />
                        </button>
                      </div>

                      {/* Price + remove */}
                      <div className="flex items-center gap-2.5">
                        <span className="font-bold text-sm" style={{ color: "var(--text-primary)" }}>
                          {formatPrice(item.price * item.quantity)}
                        </span>
                        <button
                          type="button"
                          onClick={() => removeItem(item.id)}
                          aria-label={`Remove ${item.title} from cart`}
                          className="w-6 h-6 rounded-md flex items-center justify-center transition-all hover:bg-red-500/10"
                          style={{ color: "var(--text-muted)" }}
                        >
                          <Trash2 size={11} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {cart.items.length > 0 && (
          <div
            className="px-6 py-5"
            style={{ borderTop: "1px solid var(--border)", background: "var(--surface)" }}
          >
            {/* Totals */}
            <div className="flex flex-col gap-2 mb-5">
              <div className="flex justify-between text-xs" style={{ color: "var(--text-muted)" }}>
                <span>Subtotal</span>
                <span>{formatPrice(cart.subtotal)}</span>
              </div>
              <div className="flex justify-between text-xs" style={{ color: "var(--text-muted)" }}>
                <span>Shipping</span>
                <span style={{ color: cart.shippingFee === 0 ? "var(--accent)" : "inherit", fontWeight: cart.shippingFee === 0 ? 600 : 400 }}>
                  {cart.shippingFee === 0 ? "Free" : formatPrice(cart.shippingFee)}
                </span>
              </div>
              <div
                className="flex justify-between items-baseline pt-3 mt-1"
                style={{ borderTop: "1px solid var(--border)" }}
              >
                <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>Total</span>
                <span className="text-xl font-bold tracking-tight" style={{ color: "var(--text-primary)" }}>
                  {formatPrice(cart.total)}
                </span>
              </div>
            </div>

            {/* CTA */}
            <Link
              href="/checkout"
              onClick={closeCart}
              className="btn btn-primary w-full justify-center py-3.5 text-sm font-bold tracking-wide rounded-xl"
            >
              Checkout <ArrowRight size={15} />
            </Link>

            <div className="flex items-center justify-between mt-4">
              <p className="text-[10px] flex items-center gap-1" style={{ color: "var(--text-muted)" }}>
                <Sparkles size={10} style={{ color: "var(--accent)" }} />
                Secure checkout · UPI · Cards · COD
              </p>
              <button
                type="button"
                onClick={clearCart}
                className="text-[10px] font-medium transition-colors hover:text-red-400"
                style={{ color: "var(--text-muted)" }}
              >
                Clear all
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
