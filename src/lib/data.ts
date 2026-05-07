import { db } from "./db";
import { eq } from "drizzle-orm";
import * as schema from "./db-schema";
import type { Product, ProductVariant, ProductImage } from "@/types/product";

/**
 * Maps the database product record (with joined relations) to the 
 * `Product` type expected by the frontend UI components.
 */
function mapProductToFrontend(
  dbProduct: typeof schema.products.$inferSelect & {
    images?: (typeof schema.productImages.$inferSelect)[];
    variants?: (typeof schema.productVariants.$inferSelect)[];
    highlights?: (typeof schema.productHighlights.$inferSelect)[];
  }
): Product {
  // Process images
  const images: ProductImage[] = (dbProduct.images || [])
    .sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0))
    .map((img) => ({
      id: img.id.toString(),
      url: img.url,
      alt: img.alt || dbProduct.title,
      width: 1080,
      height: 1080,
    }));

  // Process variants
  const variants: ProductVariant[] = (dbProduct.variants || []).map((v) => ({
    id: v.id.toString(),
    sku: v.sku,
    title: v.title,
    price: v.price,
    compareAtPrice: v.compareAtPrice ?? undefined,
    inventory: v.inventory ?? 0,
    weight: v.weight ?? undefined,
    flavor: v.flavor ?? undefined,
  }));

  // Process ingredients / nutrition facts from metadata if they exist
  const metadata = (dbProduct.metadata as Record<string, unknown>) || {};

  return {
    id: dbProduct.id.toString(),
    title: dbProduct.title,
    slug: dbProduct.slug,
    description: dbProduct.description,
    shortDescription: dbProduct.description.substring(0, 150) + "...",
    images,
    variants,
    category: {
      id: "cat_1",
      name: dbProduct.category,
      slug: dbProduct.category.toLowerCase().replace(/\s+/g, "-"),
    },
    tags: dbProduct.tags || [],
    rating: Number(dbProduct.rating || 4.5),
    reviewCount: dbProduct.reviewCount || 0,
    isNew: false, // Could be derived from createdAt
    isBestseller: dbProduct.isFeatured || false,
    ingredients: metadata.ingredients || undefined,
    nutritionFacts: metadata.nutritionFacts || undefined,
    servingSize: metadata.servingSize || undefined,
    servingsPerContainer: metadata.servingsPerContainer || undefined,
  };
}

/**
 * Fetches all active products from the Neon database.
 */
export async function getProducts(limit?: number): Promise<Product[]> {
  try {
    const records = await db.query.products.findMany({
      where: eq(schema.products.isActive, true),
      with: {
        images: true,
        variants: true,
        highlights: true,
      },
      limit,
      orderBy: (products, { desc }) => [desc(products.createdAt)],
    });

    return records.map(mapProductToFrontend);
  } catch (error) {
    console.error("Failed to fetch products:", error);
    return [];
  }
}

/**
 * Fetches featured products for the homepage.
 */
export async function getFeaturedProducts(): Promise<Product[]> {
  try {
    const records = await db.query.products.findMany({
      where: eq(schema.products.isFeatured, true),
      with: {
        images: true,
        variants: true,
        highlights: true,
      },
      limit: 4,
    });

    return records.map(mapProductToFrontend);
  } catch (error) {
    console.error("Failed to fetch featured products:", error);
    return [];
  }
}

/**
 * Fetches a single product by its slug.
 */
export async function getProductBySlug(slug: string): Promise<Product | null> {
  try {
    const record = await db.query.products.findFirst({
      where: eq(schema.products.slug, slug),
      with: {
        images: true,
        variants: true,
        highlights: true,
      },
    });

    if (!record) return null;
    return mapProductToFrontend(record);
  } catch (error) {
    console.error(`Failed to fetch product with slug ${slug}:`, error);
    return null;
  }
}

/**
 * Fetches all published blog posts.
 */
export async function getBlogPosts() {
  try {
    const records = await db.query.blogPosts.findMany({
      where: eq(schema.blogPosts.isPublished, true),
      orderBy: (posts, { desc }) => [desc(posts.publishedAt)],
    });

    return records.map((post) => ({
      id: post.id.toString(),
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt,
      content: post.content,
      category: post.category || "General",
      readTime: post.readingTime || "5 min",
      date: post.publishedAt?.toISOString().split("T")[0] || post.createdAt.toISOString().split("T")[0],
      imageUrl: post.coverImage || "",
    }));
  } catch (error) {
    console.error("Failed to fetch blog posts:", error);
    return [];
  }
}

/**
 * Fetches a single blog post by slug.
 */
export async function getBlogPostBySlug(slug: string) {
  try {
    const post = await db.query.blogPosts.findFirst({
      where: eq(schema.blogPosts.slug, slug),
    });

    if (!post) return null;

    return {
      id: post.id.toString(),
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt,
      content: post.content,
      category: post.category || "General",
      readTime: post.readingTime || "5 min",
      date: post.publishedAt?.toISOString().split("T")[0] || post.createdAt.toISOString().split("T")[0],
      imageUrl: post.coverImage || "",
    };
  } catch (error) {
    console.error(`Failed to fetch blog post ${slug}:`, error);
    return null;
  }
}
