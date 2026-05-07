/**
 * Utility library for Lakshya Nutrition.
 *
 * Conventions:
 * - All functions are pure (no side effects).
 * - `generateId` uses `crypto.randomUUID()` when available (CSPRNG),
 *   falling back to a Math.random-based implementation for edge environments.
 */

import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// ── Class merging ─────────────────────────────────────────────────

/** Safely merge Tailwind class names, resolving conflicts intelligently. */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

// ── Formatting ────────────────────────────────────────────────────

/** Format a numeric amount as Indian Rupees (₹). */
export function formatPrice(amount: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

/** Return the integer discount percentage between a sale price and compare-at price. */
export function discountPercent(price: number, compareAt: number): number {
  if (compareAt <= 0) return 0;
  return Math.round(((compareAt - price) / compareAt) * 100);
}

/** Truncate a string to `length` characters, appending "…" if truncated. */
export function truncate(str: string, length: number): string {
  return str.length > length ? `${str.slice(0, length)}\u2026` : str;
}

/** Convert a human-readable string to a URL-safe slug. */
export function slugify(str: string): string {
  return str
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

// ── Environment ───────────────────────────────────────────────────

/** `true` when running in a browser context (client-side guard). */
export const isBrowser: boolean = typeof window !== "undefined";

// ── ID generation ─────────────────────────────────────────────────

/**
 * Generate a cryptographically random unique ID.
 *
 * Uses `crypto.randomUUID()` (CSPRNG) when available (all modern browsers
 * and Node ≥ 15.6). Falls back to a `Math.random`-based approach for
 * legacy environments (e.g., JSDOM in tests).
 */
export function generateId(): string {
  if (
    typeof globalThis !== "undefined" &&
    typeof globalThis.crypto?.randomUUID === "function"
  ) {
    return globalThis.crypto.randomUUID();
  }
  // Fallback: RFC 4122 v4-style UUID
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

// ── Cart helpers ──────────────────────────────────────────────────

/** Sum the total item quantity across all cart line-items. */
export function cartItemCount(items: ReadonlyArray<{ quantity: number }>): number {
  return items.reduce((acc, item) => acc + item.quantity, 0);
}
