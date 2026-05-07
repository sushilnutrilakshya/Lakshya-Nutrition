import {
  pgTable,
  text,
  varchar,
  integer,
  boolean,
  timestamp,
  numeric,
  jsonb,
  serial,
  index,
  uniqueIndex,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

// ── Products ────────────────────────────────────────────────────
export const products = pgTable(
  "lakshya_products",
  {
    id: serial("id").primaryKey(),
    title: varchar("title", { length: 255 }).notNull(),
    slug: varchar("slug", { length: 255 }).notNull(),
    description: text("description").notNull().default(""),
    category: varchar("category", { length: 100 }).notNull(),
    tags: jsonb("tags").$type<string[]>().default([]),
    rating: numeric("rating", { precision: 2, scale: 1 }).default("4.5"),
    reviewCount: integer("review_count").default(0),
    isFeatured: boolean("is_featured").default(false),
    isActive: boolean("is_active").default(true),
    metadata: jsonb("metadata").$type<Record<string, unknown>>().default({}),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (table) => [
    uniqueIndex("lakshya_products_slug_idx").on(table.slug),
    index("lakshya_products_category_idx").on(table.category),
    index("lakshya_products_featured_idx").on(table.isFeatured),
  ]
);

// ── Product Images ──────────────────────────────────────────────
export const productImages = pgTable(
  "lakshya_product_images",
  {
    id: serial("id").primaryKey(),
    productId: integer("product_id")
      .notNull()
      .references(() => products.id, { onDelete: "cascade" }),
    url: text("url").notNull(),
    alt: varchar("alt", { length: 255 }).default(""),
    sortOrder: integer("sort_order").default(0),
  },
  (table) => [index("lakshya_product_images_product_idx").on(table.productId)]
);

// ── Product Variants ────────────────────────────────────────────
export const productVariants = pgTable(
  "lakshya_product_variants",
  {
    id: serial("id").primaryKey(),
    productId: integer("product_id")
      .notNull()
      .references(() => products.id, { onDelete: "cascade" }),
    sku: varchar("sku", { length: 100 }).notNull(),
    title: varchar("title", { length: 255 }).notNull(),
    price: integer("price").notNull(), // stored in paise (INR × 100)
    compareAtPrice: integer("compare_at_price"),
    inventory: integer("inventory").default(100),
    weight: varchar("weight", { length: 50 }),
    flavor: varchar("flavor", { length: 100 }),
    isDefault: boolean("is_default").default(false),
  },
  (table) => [
    uniqueIndex("lakshya_product_variants_sku_idx").on(table.sku),
    index("lakshya_product_variants_product_idx").on(table.productId),
  ]
);

// ── Product Highlights ──────────────────────────────────────────
export const productHighlights = pgTable("lakshya_product_highlights", {
  id: serial("id").primaryKey(),
  productId: integer("product_id")
    .notNull()
    .references(() => products.id, { onDelete: "cascade" }),
  icon: varchar("icon", { length: 10 }).default("✓"),
  label: varchar("label", { length: 255 }).notNull(),
  sortOrder: integer("sort_order").default(0),
});

// ── Orders ──────────────────────────────────────────────────────
export const orders = pgTable(
  "lakshya_orders",
  {
    id: serial("id").primaryKey(),
    orderId: varchar("order_id", { length: 50 }).notNull(), // LN-XXXXXXXX
    status: varchar("status", { length: 30 })
      .notNull()
      .default("pending"), // pending | confirmed | shipped | delivered | cancelled
    paymentMethod: varchar("payment_method", { length: 20 }).notNull(), // razorpay | cod
    paymentStatus: varchar("payment_status", { length: 20 })
      .notNull()
      .default("pending"), // pending | paid | failed | refunded
    razorpayOrderId: varchar("razorpay_order_id", { length: 100 }),
    razorpayPaymentId: varchar("razorpay_payment_id", { length: 100 }),

    // Customer info
    firstName: varchar("first_name", { length: 100 }).notNull(),
    lastName: varchar("last_name", { length: 100 }).notNull(),
    email: varchar("email", { length: 255 }).notNull(),
    phone: varchar("phone", { length: 15 }).notNull(),

    // Shipping address
    address: text("address").notNull(),
    city: varchar("city", { length: 100 }).notNull(),
    state: varchar("state", { length: 100 }).notNull(),
    pincode: varchar("pincode", { length: 10 }).notNull(),

    // Financials (stored in paise)
    subtotal: integer("subtotal").notNull(),
    shipping: integer("shipping").notNull().default(0),
    tax: integer("tax").notNull().default(0),
    discount: integer("discount").notNull().default(0),
    total: integer("total").notNull(),

    notes: text("notes"),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (table) => [
    uniqueIndex("lakshya_orders_order_id_idx").on(table.orderId),
    index("lakshya_orders_email_idx").on(table.email),
    index("lakshya_orders_status_idx").on(table.status),
    index("lakshya_orders_created_at_idx").on(table.createdAt),
  ]
);

// ── Order Line Items ────────────────────────────────────────────
export const orderItems = pgTable(
  "lakshya_order_items",
  {
    id: serial("id").primaryKey(),
    orderId: integer("order_id")
      .notNull()
      .references(() => orders.id, { onDelete: "cascade" }),
    productId: integer("product_id").references(() => products.id, {
      onDelete: "set null",
    }),
    variantId: integer("variant_id").references(() => productVariants.id, {
      onDelete: "set null",
    }),
    title: varchar("title", { length: 255 }).notNull(),
    variantTitle: varchar("variant_title", { length: 255 }),
    sku: varchar("sku", { length: 100 }),
    quantity: integer("quantity").notNull().default(1),
    unitPrice: integer("unit_price").notNull(), // paise
    totalPrice: integer("total_price").notNull(), // paise
    imageUrl: text("image_url"),
  },
  (table) => [index("lakshya_order_items_order_idx").on(table.orderId)]
);

// ── Contact Form Submissions ────────────────────────────────────
export const contactSubmissions = pgTable("lakshya_contact_submissions", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  phone: varchar("phone", { length: 15 }),
  subject: varchar("subject", { length: 255 }),
  message: text("message").notNull(),
  isRead: boolean("is_read").default(false),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

// ── Blog Posts ──────────────────────────────────────────────────
export const blogPosts = pgTable(
  "lakshya_blog_posts",
  {
    id: serial("id").primaryKey(),
    slug: varchar("slug", { length: 255 }).notNull(),
    title: varchar("title", { length: 255 }).notNull(),
    excerpt: text("excerpt").notNull().default(""),
    content: text("content").notNull(),
    coverImage: text("cover_image"),
    author: varchar("author", { length: 100 }).default("Lakshya Nutrition"),
    category: varchar("category", { length: 100 }),
    tags: jsonb("tags").$type<string[]>().default([]),
    readingTime: varchar("reading_time", { length: 20 }),
    isPublished: boolean("is_published").default(false),
    publishedAt: timestamp("published_at", { withTimezone: true }),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (table) => [
    uniqueIndex("lakshya_blog_posts_slug_idx").on(table.slug),
    index("lakshya_blog_posts_published_idx").on(table.isPublished),
  ]
);

// ── Coupons ─────────────────────────────────────────────────────
export const coupons = pgTable(
  "lakshya_coupons",
  {
    id: serial("id").primaryKey(),
    code: varchar("code", { length: 50 }).notNull(),
    discountType: varchar("discount_type", { length: 20 }).notNull(), // percentage | flat
    discountValue: integer("discount_value").notNull(), // percentage (0-100) or flat in paise
    minOrderValue: integer("min_order_value").default(0), // paise
    maxDiscount: integer("max_discount"), // paise (cap for percentage)
    usageLimit: integer("usage_limit"),
    usageCount: integer("usage_count").default(0),
    isActive: boolean("is_active").default(true),
    expiresAt: timestamp("expires_at", { withTimezone: true }),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (table) => [uniqueIndex("lakshya_coupons_code_idx").on(table.code)]
);

// ════════════════════════════════════════════════════════════════
// Relations (for Drizzle relational queries)
// ════════════════════════════════════════════════════════════════

export const productsRelations = relations(products, ({ many }) => ({
  images: many(productImages),
  variants: many(productVariants),
  highlights: many(productHighlights),
}));

export const productImagesRelations = relations(productImages, ({ one }) => ({
  product: one(products, {
    fields: [productImages.productId],
    references: [products.id],
  }),
}));

export const productVariantsRelations = relations(productVariants, ({ one }) => ({
  product: one(products, {
    fields: [productVariants.productId],
    references: [products.id],
  }),
}));

export const productHighlightsRelations = relations(productHighlights, ({ one }) => ({
  product: one(products, {
    fields: [productHighlights.productId],
    references: [products.id],
  }),
}));

export const ordersRelations = relations(orders, ({ many }) => ({
  items: many(orderItems),
}));

export const orderItemsRelations = relations(orderItems, ({ one }) => ({
  order: one(orders, {
    fields: [orderItems.orderId],
    references: [orders.id],
  }),
  product: one(products, {
    fields: [orderItems.productId],
    references: [products.id],
  }),
  variant: one(productVariants, {
    fields: [orderItems.variantId],
    references: [productVariants.id],
  }),
 e x p o r t   c o n s t   p r o d u c t V a r i a n t s R e l a t i o n s   =   r e l a t i o n s ( p r o d u c t V a r i a n t s ,   ( {   o n e   } )   = >   ( { 
     p r o d u c t :   o n e ( p r o d u c t s ,   { 
         f i e l d s :   [ p r o d u c t V a r i a n t s . p r o d u c t I d ] , 
         r e f e r e n c e s :   [ p r o d u c t s . i d ] , 
     } ) , 
 } ) ) ; 
 
 e x p o r t   c o n s t   p r o d u c t H i g h l i g h t s R e l a t i o n s   =   r e l a t i o n s ( p r o d u c t H i g h l i g h t s ,   ( {   o n e   } )   = >   ( { 
     p r o d u c t :   o n e ( p r o d u c t s ,   { 
         f i e l d s :   [ p r o d u c t H i g h l i g h t s . p r o d u c t I d ] , 
         r e f e r e n c e s :   [ p r o d u c t s . i d ] , 
     } ) , 
 } ) ) ; 
  
 