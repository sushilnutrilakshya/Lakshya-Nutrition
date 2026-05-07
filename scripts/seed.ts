/**
 * Database Seed Script
 *
 * Populates the Neon Postgres database with Fusion Nutrition product catalog,
 * blog posts, and initial coupon codes.
 *
 * Usage:
 *   npx tsx scripts/seed.ts
 *
 * Requires DATABASE_URL to be set in .env.local
 */
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "../src/lib/db-schema";
import * as dotenv from "dotenv";

// Load .env.local
dotenv.config({ path: ".env.local" });

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  console.error("❌ DATABASE_URL is not set in .env.local");
  process.exit(1);
}

const sql = neon(connectionString);
const db = drizzle(sql, { schema });

// ── Product Catalog ──────────────────────────────────────────────
const PRODUCTS = [
  {
    title: "Advance Whey Protein",
    slug: "advance-whey-protein",
    description:
      "Fusion Nutrition's flagship whey protein — engineered for real, lean muscle building. Delivers 26g of high-quality protein per scoop with 7g BCAAs and 13.5g EAAs. Zero added sugar. Ultra-fast absorption with CaHMB for optimized recovery.",
    category: "protein",
    tags: ["protein", "whey", "advance", "bestseller", "muscle-building"],
    rating: "4.9",
    reviewCount: 1847,
    isFeatured: true,
    images: [
      { url: "/images/products/advance-whey-mawa-kulfi.jpg", alt: "Advance Whey Protein — Mawa Kulfi Flavour 2KG" },
      { url: "/images/products/advance-whey-coffee.jpg", alt: "Advance Whey Protein — Coffee Flavour 2KG" },
      { url: "/images/products/advance-whey-coffee-promo.jpg", alt: "Advance Whey — What You Get In Each Scoop" },
      { url: "/images/products/advance-whey-mawa-kulfi-lifestyle.jpg", alt: "Advance Whey Protein — Mawa Kulfi Lifestyle" },
      { url: "/images/products/advance-whey-both.jpg", alt: "Advance Whey Protein — Both Flavours" },
    ],
    variants: [
      { title: "2kg — Mawa Kulfi", sku: "FN-AWP-MK-2", price: 849900, compareAtPrice: 1099900, inventory: 48, weight: "2kg", flavor: "Mawa Kulfi", isDefault: true },
      { title: "2kg — Coffee", sku: "FN-AWP-CF-2", price: 849900, compareAtPrice: 1099900, inventory: 35, weight: "2kg", flavor: "Coffee", isDefault: false },
    ],
    highlights: [
      { icon: "💪", label: "26g Protein per Scoop" },
      { icon: "⚡", label: "7g BCAAs for Recovery" },
      { icon: "🧬", label: "13.5g EAAs per Serving" },
      { icon: "🚫", label: "Zero Added Sugar" },
      { icon: "🏋️", label: "CaHMB for Optimized Gains" },
    ],
  },
  {
    title: "Bull Power Pre-Workout",
    slug: "bull-power-pre-workout",
    description:
      "Unleash unparalleled energy with Bull Power — Fusion Nutrition's high-stimulation pre-workout. Formulated with 36 EAA, 36 BCAA, and 36 Glutamine per serving for shirt-splitting pumps, enhanced focus, and lean muscle strength.",
    category: "pre-workout",
    tags: ["pre-workout", "energy", "pump", "bull-power", "focus"],
    rating: "4.9",
    reviewCount: 1124,
    isFeatured: true,
    images: [
      { url: "/images/products/bull-power-single.jpg", alt: "Bull Power Pre-Workout — Single Tub Pinago Flavour" },
      { url: "/images/products/bull-power-range.jpg", alt: "Bull Power Pre-Workout — Full Range 3 Flavours" },
    ],
    variants: [
      { title: "250g — Pinago", sku: "FN-BP-PIN-250", price: 849900, compareAtPrice: 1099900, inventory: 62, weight: "250g", flavor: "Pinago", isDefault: true },
      { title: "250g — ColaFruity", sku: "FN-BP-COL-250", price: 849900, compareAtPrice: 1099900, inventory: 44, weight: "250g", flavor: "ColaFruity", isDefault: false },
      { title: "375g — Kimachee", sku: "FN-BP-KIM-375", price: 849900, compareAtPrice: 1099900, inventory: 28, weight: "375g", flavor: "Kimachee", isDefault: false },
    ],
    highlights: [
      { icon: "🔥", label: "36g EAA per Serving" },
      { icon: "💥", label: "36g BCAA per Serving" },
      { icon: "⚡", label: "36g Glutamine per Serving" },
      { icon: "🎯", label: "Enhanced Focus & Energy" },
    ],
  },
  {
    title: "Recovery EAA+BCAA+Glutamine",
    slug: "recovery-eaa-bcaa-glutamine",
    description:
      "The perfect intra-post workout formula. Fusion Nutrition's Recovery combines 36 EAAs, 36 BCAAs, and 36 Glutamine to support muscle preservation, eliminate fatigue, and accelerate repair.",
    category: "amino-acids",
    tags: ["eaa", "bcaa", "glutamine", "recovery", "intra-workout"],
    rating: "4.8",
    reviewCount: 892,
    isFeatured: true,
    images: [
      { url: "/images/products/recovery-colafruity.jpg", alt: "Recovery EAA+BCAA+Glutamine — ColaFruity Flavour 250g" },
      { url: "/images/products/recovery-pinago.jpg", alt: "Recovery EAA+BCAA+Glutamine — Pinago Flavour 250g" },
      { url: "/images/products/recovery-kimachee.jpg", alt: "Recovery EAA+BCAA+Glutamine — Kimachee Flavour 250g" },
    ],
    variants: [
      { title: "250g — ColaFruity", sku: "FN-REC-COL-250", price: 849900, compareAtPrice: 1099900, inventory: 55, weight: "250g", flavor: "ColaFruity", isDefault: true },
      { title: "250g — Pinago", sku: "FN-REC-PIN-250", price: 849900, compareAtPrice: 1099900, inventory: 40, weight: "250g", flavor: "Pinago", isDefault: false },
      { title: "250g — Kimachee", sku: "FN-REC-KIM-250", price: 849900, compareAtPrice: 1099900, inventory: 33, weight: "250g", flavor: "Kimachee", isDefault: false },
    ],
    highlights: [
      { icon: "🧬", label: "36g EAA per Serving" },
      { icon: "💪", label: "36g BCAA per Serving" },
      { icon: "🔄", label: "36g Glutamine per Serving" },
      { icon: "🏃", label: "Perfect Intra-Post Workout" },
    ],
  },
  {
    title: "Angry Fat Burn",
    slug: "angry-fat-burn",
    description:
      "Wake up. It's time to take action. Angry Fat Burn is Fusion Nutrition's most potent thermogenic formula — engineered to convert fat into energy and boost your metabolism.",
    category: "fat-burners",
    tags: ["fat-burner", "thermogenic", "energy", "weight-loss", "angry"],
    rating: "4.8",
    reviewCount: 764,
    isFeatured: false,
    images: [
      { url: "/images/products/angry-fat-burn-promo.jpg", alt: "Angry Fat Burn — Start Burn Today Promo" },
      { url: "/images/products/angry-fat-burn-lifestyle.jpg", alt: "Angry Fat Burn — Lifestyle with Male Athlete" },
      { url: "/images/products/angry-fat-burn-ingredients.jpg", alt: "Angry Fat Burn — Full Ingredient Breakdown" },
    ],
    variants: [
      { title: "450g — Watermelon", sku: "FN-AFB-WAT-450", price: 849900, compareAtPrice: 1099900, inventory: 71, weight: "450g", flavor: "Watermelon", isDefault: true },
    ],
    highlights: [
      { icon: "🔥", label: "L-Carnitine L-Tartrate 3000mg" },
      { icon: "⚡", label: "Beta-Alanine 3600mg" },
      { icon: "🍃", label: "Garcinia Cambogia 300mg" },
      { icon: "💧", label: "L-Taurine 960mg" },
    ],
  },
  {
    title: "High Whey Protein",
    slug: "high-whey-protein",
    description:
      "Build lean muscle, improve recovery, and enhance strength & performance with High Whey Protein. 24g of premium protein per serving with 6.5g BCAAs, zero added sugar, and no bloating.",
    category: "protein",
    tags: ["protein", "whey", "muscle", "recovery", "strength"],
    rating: "4.7",
    reviewCount: 1356,
    isFeatured: true,
    images: [
      { url: "/images/products/high-whey-chocolate.jpg", alt: "High Whey Protein — Chocolate Flavour 2KG" },
      { url: "/images/products/high-whey-blackcurrant.jpg", alt: "High Whey Protein — Black Currant Flavour 2KG" },
    ],
    variants: [
      { title: "2kg — Chocolate", sku: "FN-HWP-CHO-2", price: 849900, compareAtPrice: 1099900, inventory: 58, weight: "2kg", flavor: "Chocolate", isDefault: true },
      { title: "2kg — Black Currant", sku: "FN-HWP-BLK-2", price: 849900, compareAtPrice: 1099900, inventory: 42, weight: "2kg", flavor: "Black Currant", isDefault: false },
    ],
    highlights: [
      { icon: "💪", label: "24g Protein per Serving" },
      { icon: "⚡", label: "6.5g BCAAs" },
      { icon: "🚫", label: "Zero Added Sugar" },
      { icon: "✅", label: "No Bloating or Lumps" },
    ],
  },
  {
    title: "Silent Power Pre-Workout",
    slug: "silent-power-pre-workout",
    description:
      "Strike in silence. Surge in power. Silent Power is Fusion Nutrition's stealth pre-workout — precision-dosed for extreme focus, clean energy, and explosive output without the harsh stimulant crash.",
    category: "pre-workout",
    tags: ["pre-workout", "focus", "energy", "silent-power", "clean"],
    rating: "4.8",
    reviewCount: 548,
    isFeatured: false,
    images: [
      { url: "/images/products/silent-power-preworkout.jpg", alt: "Silent Power Pre-Workout — Ninja Edition Watermelon Flavour" },
    ],
    variants: [
      { title: "180g — Watermelon", sku: "FN-SP-WAT-180", price: 849900, compareAtPrice: 1099900, inventory: 37, weight: "180g", flavor: "Watermelon", isDefault: true },
    ],
    highlights: [
      { icon: "🎯", label: "Extreme Focus" },
      { icon: "⚡", label: "Clean Energy — No Crash" },
      { icon: "💥", label: "Explosive Output" },
      { icon: "🥷", label: "Stealth Precision Formula" },
    ],
  },
  {
    title: "Essential Multi Vitamin Pro",
    slug: "essential-multi-vitamin-pro",
    description:
      "Complete micronutrient coverage for peak athletic performance. Packs every critical vitamin and mineral into one powerful daily tablet. Boosts energy, builds immunity, maintains bone & joint strength.",
    category: "vitamins-minerals",
    tags: ["multivitamin", "immunity", "energy", "bone-health", "essential"],
    rating: "4.6",
    reviewCount: 412,
    isFeatured: false,
    images: [
      { url: "/images/products/multivitamin-pro-promo.jpg", alt: "Essential Multi Vitamin Pro — Full Benefits Promo" },
      { url: "/images/products/multivitamin-pro-lifestyle.jpg", alt: "Essential Multi Vitamin Pro — Lifestyle with Dumbbells" },
    ],
    variants: [
      { title: "60 Tablets", sku: "FN-MVP-TAB-60", price: 849900, compareAtPrice: 1099900, inventory: 110, weight: "60 tabs", isDefault: true },
    ],
    highlights: [
      { icon: "🛡️", label: "Complete A-K Vitamin Coverage" },
      { icon: "⚡", label: "Boosts Energy" },
      { icon: "🦴", label: "Bone & Joint Strength" },
      { icon: "🧠", label: "Manages Stress" },
    ],
  },
];

const BLOG_POSTS = [
  {
    slug: "whey-isolate-vs-concentrate",
    title: "The Science Behind Whey Protein Isolate vs Concentrate",
    excerpt:
      "Understand the key differences in protein content, digestion speed, and ideal use cases for both forms of whey.",
    content:
      "Whey protein comes in two primary forms: isolate and concentrate. This article breaks down the science behind each, helping you choose the right one for your goals...",
    coverImage: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=800&q=85&auto=format&fit=crop",
    category: "Nutrition Science",
    tags: ["protein", "whey", "science"],
    readingTime: "5 min",
    isPublished: true,
    publishedAt: new Date("2024-12-15"),
  },
  {
    slug: "pre-workout-timing-guide",
    title: "Optimizing Your Pre-Workout Timing for Maximum Performance",
    excerpt:
      "Timing your pre-workout correctly can mean the difference between a good session and a great one.",
    content:
      "The timing of your pre-workout supplement can significantly impact your training performance. Here's the science-backed guide...",
    coverImage: "https://images.unsplash.com/photo-1546483875-ad9014c88eba?w=800&q=85&auto=format&fit=crop",
    category: "Training",
    tags: ["pre-workout", "training", "timing"],
    readingTime: "4 min",
    isPublished: true,
    publishedAt: new Date("2024-12-08"),
  },
  {
    slug: "anabolic-window-explained",
    title: "Post-Workout Nutrition: The Anabolic Window",
    excerpt:
      "The post-workout 'anabolic window' is often misunderstood. Here's what the latest research actually says.",
    content:
      "For decades, the 'anabolic window' has been considered a critical period for nutrient intake. Recent research paints a more nuanced picture...",
    coverImage: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=85&auto=format&fit=crop",
    category: "Recovery",
    tags: ["recovery", "nutrition", "anabolic-window"],
    readingTime: "6 min",
    isPublished: true,
    publishedAt: new Date("2024-11-30"),
  },
];

const COUPONS = [
  {
    code: "LAKSHYA10",
    discountType: "percentage",
    discountValue: 10,
    minOrderValue: 100000, // ₹1000 in paise
    maxDiscount: 200000, // ₹2000 in paise
    usageLimit: 500,
    isActive: true,
    expiresAt: new Date("2026-12-31"),
  },
  {
    code: "WELCOME500",
    discountType: "flat",
    discountValue: 50000, // ₹500 in paise
    minOrderValue: 200000, // ₹2000 in paise
    usageLimit: 1000,
    isActive: true,
    expiresAt: new Date("2026-12-31"),
  },
];

// ── Main Seed Function ───────────────────────────────────────────
async function seed() {
  console.log("🌱 Starting database seed...\n");

  // Seed Products
  for (const productData of PRODUCTS) {
    console.log(`  📦 Seeding: ${productData.title}`);

    // Insert product
    const [product] = await db
      .insert(schema.products)
      .values({
        title: productData.title,
        slug: productData.slug,
        description: productData.description,
        category: productData.category,
        tags: productData.tags,
        rating: productData.rating,
        reviewCount: productData.reviewCount,
        isFeatured: productData.isFeatured,
        isActive: true,
      })
      .returning({ id: schema.products.id });

    const productId = product!.id;

    // Insert images
    for (let i = 0; i < productData.images.length; i++) {
      await db.insert(schema.productImages).values({
        productId,
        url: productData.images[i]!.url,
        alt: productData.images[i]!.alt,
        sortOrder: i,
      });
    }

    // Insert variants
    for (const variant of productData.variants) {
      await db.insert(schema.productVariants).values({
        productId,
        sku: variant.sku,
        title: variant.title,
        price: variant.price,
        compareAtPrice: variant.compareAtPrice,
        inventory: variant.inventory,
        weight: variant.weight,
        flavor: variant.flavor,
        isDefault: variant.isDefault,
      });
    }

    // Insert highlights
    for (let i = 0; i < productData.highlights.length; i++) {
      await db.insert(schema.productHighlights).values({
        productId,
        icon: productData.highlights[i]!.icon,
        label: productData.highlights[i]!.label,
        sortOrder: i,
      });
    }
  }

  console.log(`\n  ✅ Seeded ${PRODUCTS.length} products\n`);

  // Seed Blog Posts
  for (const post of BLOG_POSTS) {
    console.log(`  📝 Seeding blog: ${post.title}`);
    await db.insert(schema.blogPosts).values(post);
  }
  console.log(`\n  ✅ Seeded ${BLOG_POSTS.length} blog posts\n`);

  // Seed Coupons
  for (const coupon of COUPONS) {
    console.log(`  🎟️  Seeding coupon: ${coupon.code}`);
    await db.insert(schema.coupons).values(coupon);
  }
  console.log(`\n  ✅ Seeded ${COUPONS.length} coupons\n`);

  console.log("🎉 Database seed complete!");
}

seed().catch((err) => {
  console.error("❌ Seed failed:", err);
  process.exit(1);
});
