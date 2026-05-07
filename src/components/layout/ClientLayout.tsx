"use client";

import dynamic from "next/dynamic";
import { useEffect, type ReactNode } from "react";
import { registerGSAP } from "@/lib/gsap-register";

// Dynamically import components that use browser-only APIs or cause hydration mismatches
// Setting ssr: false ensures they are never called during the static build/SSR phase.
const Header = dynamic(() => import("./Header").then((mod) => mod.Header), {
  ssr: false,
  loading: () => <div className="h-20 w-full bg-transparent" />, // Placeholder height to prevent major layout shift
});

const CartDrawer = dynamic(() => import("../commerce/CartDrawer").then((mod) => mod.CartDrawer), {
  ssr: false,
});

interface ClientLayoutProps {
  children: ReactNode;
}

/**
 * ClientLayout acts as a bridge for components that are strictly browser-only.
 * This resolves Next.js 15 build errors where dynamic components with ssr: false
 * cannot be directly imported into Server Components (like the Root RootLayout).
 */
export function ClientLayout({ children }: ClientLayoutProps) {
  // Register all GSAP plugins exactly once, at the root client boundary.
  // This prevents the scattered per-module registration anti-pattern.
  useEffect(() => {
    registerGSAP();
  }, []);

  return (
    <>
      <Header />
      {children}
      <CartDrawer />
    </>
  );
}
