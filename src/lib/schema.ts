import { SITE_NAME, SITE_URL } from "@/lib/constants";
import type { Product } from "@/types/product";

// ── Organization Schema ─────────────────────────────────────────
export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: SITE_NAME,
    url: SITE_URL,
    logo: {
      "@type": "ImageObject",
      url: `${SITE_URL}/logo.png`,
      width: 200,
      height: 60,
    },
    sameAs: [
      "https://instagram.com/lakshyanutrition",
      "https://youtube.com/@lakshyanutrition",
      "https://twitter.com/lakshyanutrition",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+91-98765-43210",
      contactType: "customer service",
      areaServed: "IN",
      availableLanguage: ["English", "Hindi"],
    },
    address: {
      "@type": "PostalAddress",
      addressCountry: "IN",
      addressRegion: "Maharashtra",
      addressLocality: "Mumbai",
    },
  };
}

// ── Product Schema (for PDP) ────────────────────────────────────
export function productSchema(product: Product) {
  const primaryVariant = product.variants[0];
  if (!primaryVariant) return null;

  return {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": `${SITE_URL}/products/${product.slug}`,
    name: product.title,
    description: product.description,
    url: `${SITE_URL}/products/${product.slug}`,
    image: product.images.map((img) => img.url),
    brand: {
      "@type": "Brand",
      name: SITE_NAME,
    },
    sku: primaryVariant.sku,
    offers: product.variants.map((variant) => ({
      "@type": "Offer",
      sku: variant.sku,
      price: variant.price,
      priceCurrency: "INR",
      availability:
        variant.inventory > 0
          ? "https://schema.org/InStock"
          : "https://schema.org/OutOfStock",
      seller: { "@type": "Organization", name: SITE_NAME },
      url: `${SITE_URL}/products/${product.slug}`,
      priceValidUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
        .toISOString()
        .split("T")[0],
    })),
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: product.rating,
      reviewCount: product.reviewCount,
      bestRating: 5,
      worstRating: 1,
    },
  };
}

// ── BreadcrumbList Schema ───────────────────────────────────────
interface BreadcrumbItem {
  name: string;
  url: string;
}

export function breadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

// ── FAQPage Schema ──────────────────────────────────────────────
interface FAQItem {
  question: string;
  answer: string;
}

export function faqSchema(faqs: FAQItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

// ── WebSite Schema ──────────────────────────────────────────────
export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: SITE_URL,
    name: SITE_NAME,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_URL}/products?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

// ── Helper: inject JSON-LD into a <script> tag ──────────────────
export function jsonLdScript(data: Record<string, unknown> | Record<string, unknown>[] | null) {
  if (!data) return null;
  return JSON.stringify(data);
}
