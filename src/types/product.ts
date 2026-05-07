// ── Product Types ──────────────────────────────────────────────

export interface ProductVariant {
  id: string;
  title: string;
  sku: string;
  price: number;
  compareAtPrice?: number | undefined;
  inventory: number;
  weight?: string | undefined;
  flavor?: string | undefined;
}

export interface ProductImage {
  id: string;
  url: string;
  alt: string;
  width: number;
  height: number;
}

export interface ProductCategory {
  id: string;
  name: string;
  slug: string;
  description?: string | undefined;
}

export interface Product {
  id: string;
  title: string;
  slug: string;
  description: string;
  shortDescription: string;
  images: ProductImage[];
  variants: ProductVariant[];
  category: ProductCategory;
  tags: string[];
  rating: number;
  reviewCount: number;
  isNew?: boolean | undefined;
  isBestseller?: boolean | undefined;
  ingredients?: string[] | undefined;
  nutritionFacts?: Record<string, string> | undefined;
  servingSize?: string | undefined;
  servingsPerContainer?: number | undefined;
}

export interface ProductListResponse {
  products: Product[];
  total: number;
  hasMore: boolean;
}
