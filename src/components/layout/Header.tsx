"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingBag, Menu, X } from "lucide-react";
import { ToggleTheme } from "@/components/ui/ToggleTheme";
import { useCartStore } from "@/lib/cart-store";
import { cartItemCount, cn } from "@/lib/utils";
import { NAV_LINKS, SITE_NAME } from "@/lib/constants";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const store = useCartStore();
  const navRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => { setMounted(true); }, []);

  const itemCount = mounted ? cartItemCount(store.cart.items) : 0;
  const openCart = store.openCart;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!mobileOpen) return;
    const handleClick = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setMobileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [mobileOpen]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  // Close mobile nav on route change
  useEffect(() => { setMobileOpen(false); }, [pathname]);

  return (
    <>
      <header
        id="main-header"
        className={cn(
          "fixed top-0 left-0 right-0 z-50 flex justify-center",
          "transition-all duration-500"
        )}
        style={{
          background: scrolled ? "var(--header-bg)" : "transparent",
          backdropFilter: scrolled ? "blur(32px) saturate(180%)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(32px) saturate(180%)" : "none",
          borderBottom: scrolled ? "1px solid var(--border)" : "1px solid transparent",
          boxShadow: scrolled ? "var(--shadow-md)" : "none",
          paddingBlock: scrolled ? "0.625rem" : "1.125rem",
        }}
      >
        <div className="w-full px-6 md:px-12 flex items-center justify-between" style={{ maxWidth: "1152px", marginLeft: "auto", marginRight: "auto" }}>
          {/* Logo Zone */}
          <div className="flex-1 flex justify-start">
          <Link
            href="/"
            className="flex items-center gap-3 group"
            aria-label="Lakshya Nutrition — Home"
          >
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center font-black text-xs tracking-wider flex-shrink-0"
              style={{
                background: "var(--accent)",
                color: "#000",
                boxShadow: "0 2px 12px rgba(127,232,90,0.4)",
                transition: "box-shadow 0.2s ease, transform 0.2s ease",
              }}
            >
              LN
            </div>
            <span
              className="font-bold text-base hidden sm:block tracking-tight"
              style={{ color: "var(--text-primary)" }}
            >
              {SITE_NAME}
            </span>
          </Link>
          </div>

          {/* Centered Desktop Nav Zone */}
          <nav aria-label="Primary navigation" className="hidden md:flex flex-1 justify-center items-center gap-10">
            {NAV_LINKS.map((link) => {
              const hrefStr = link.href as string;
              const hrefBase = hrefStr.split("?")[0] || hrefStr;
              const isActive = pathname === hrefStr || (hrefBase !== "/" && pathname.startsWith(hrefBase));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "relative px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200",
                    isActive
                      ? "text-[var(--accent)]"
                      : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[rgba(0,0,0,0.04)] dark:hover:bg-[rgba(255,255,255,0.05)]"
                  )}
                >
                  {link.label}
                  {isActive && (
                    <span
                      className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-0.5 rounded-full"
                      style={{ background: "var(--accent)" }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Actions Zone */}
          <div className="flex-1 flex items-center justify-end gap-3">
            <ToggleTheme />

            {/* Cart button */}
            <button
              type="button"
              onClick={openCart}
              aria-label={`Open cart — ${itemCount} item${itemCount !== 1 ? "s" : ""}`}
              className="relative flex items-center justify-center w-9 h-9 rounded-full"
              style={{
                border: "1px solid var(--border-strong)",
                color: "var(--text-secondary)",
                transition: "all 0.2s ease",
              }}
            >
              <ShoppingBag size={17} />
              {itemCount > 0 && (
                <span
                  className="absolute -top-1 -right-1 w-4.5 h-4.5 rounded-full text-[9px] font-bold flex items-center justify-center min-w-[18px] min-h-[18px]"
                  style={{
                    background: "var(--accent)",
                    color: "#000",
                    boxShadow: "0 2px 8px rgba(127,232,90,0.5)",
                  }}
                >
                  {itemCount > 9 ? "9+" : itemCount}
                </span>
              )}
            </button>

            {/* Mobile hamburger */}
            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              aria-label="Open mobile navigation"
              aria-expanded={mobileOpen}
              className="md:hidden flex items-center justify-center w-9 h-9 rounded-full"
              style={{ border: "1px solid var(--border-strong)", color: "var(--text-secondary)" }}
            >
              <Menu size={17} />
            </button>

            {/* Desktop CTA */}
            <Link href="/products" className="hidden md:flex btn btn-primary px-5 py-2 text-sm">
              Shop Now
            </Link>
          </div>
        </div>
      </header>

      {/* Mobile Nav Overlay */}
      <div
        className={cn(
          "fixed inset-0 z-[100] md:hidden transition-opacity duration-300",
          mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
        style={{ background: "var(--overlay)" }}
        aria-hidden
        onClick={() => setMobileOpen(false)}
      />

      {/* Mobile Nav Modal */}
      <div
        ref={navRef}
        id="mobile-nav"
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
        className="fixed top-1/2 left-1/2 z-[101] w-[90vw] max-w-sm md:hidden flex flex-col rounded-3xl overflow-hidden backdrop-blur-3xl bg-white/95 dark:bg-[#080b12]/90 shadow-2xl"
        style={{
          border: "1px solid var(--border)",
          transform: mobileOpen ? "translate(-50%, -50%) scale(1)" : "translate(-50%, -50%) scale(0.95)",
          opacity: mobileOpen ? 1 : 0,
          transition: "all 0.35s cubic-bezier(0.19, 1, 0.22, 1)",
          pointerEvents: mobileOpen ? "auto" : "none",
        }}
      >
        {/* Drawer header */}
        <div
          className="flex items-center justify-between px-5 py-4"
          style={{ borderBottom: "1px solid var(--border)" }}
        >
          <div className="flex items-center gap-2.5">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center font-black text-xs"
              style={{ background: "var(--accent)", color: "#000" }}
            >
              LN
            </div>
            <span className="font-bold text-sm" style={{ color: "var(--text-primary)" }}>
              {SITE_NAME}
            </span>
          </div>
          <button
            type="button"
            onClick={() => setMobileOpen(false)}
            aria-label="Close mobile navigation"
            className="w-8 h-8 rounded-full flex items-center justify-center"
            style={{ border: "1px solid var(--border-strong)", color: "var(--text-secondary)" }}
          >
            <X size={15} />
          </button>
        </div>

        {/* Nav links */}
        <nav className="flex flex-col items-center justify-center p-8 gap-6 flex-1 overflow-y-auto">
          {NAV_LINKS.map((link) => {
            const hrefStr = link.href as string;
            const hrefBase = hrefStr.split("?")[0] || hrefStr;
            const isActive = pathname === hrefStr || (hrefBase !== "/" && pathname.startsWith(hrefBase));
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  "w-full text-center px-4 py-4 rounded-xl font-semibold text-lg transition-all duration-200",
                  isActive
                    ? "bg-[rgba(127,232,90,0.1)] text-[var(--accent)]"
                    : "text-[var(--text-primary)] hover:bg-[var(--bg-secondary)]"
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Drawer footer */}
        <div className="p-4 flex flex-col gap-3" style={{ borderTop: "1px solid var(--border)" }}>
          <Link
            href="/products"
            className="btn btn-primary w-full justify-center py-3 text-sm"
            onClick={() => setMobileOpen(false)}
          >
            Shop Now
          </Link>
          <div className="flex justify-center">
            <ToggleTheme />
          </div>
        </div>
      </div>
    </>
  );
}
