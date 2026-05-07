CREATE TABLE "lakshya_blog_posts" (
	"id" serial PRIMARY KEY NOT NULL,
	"slug" varchar(255) NOT NULL,
	"title" varchar(255) NOT NULL,
	"excerpt" text DEFAULT '' NOT NULL,
	"content" text NOT NULL,
	"cover_image" text,
	"author" varchar(100) DEFAULT 'Lakshya Nutrition',
	"category" varchar(100),
	"tags" jsonb DEFAULT '[]'::jsonb,
	"reading_time" varchar(20),
	"is_published" boolean DEFAULT false,
	"published_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "lakshya_contact_submissions" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL,
	"phone" varchar(15),
	"subject" varchar(255),
	"message" text NOT NULL,
	"is_read" boolean DEFAULT false,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "lakshya_coupons" (
	"id" serial PRIMARY KEY NOT NULL,
	"code" varchar(50) NOT NULL,
	"discount_type" varchar(20) NOT NULL,
	"discount_value" integer NOT NULL,
	"min_order_value" integer DEFAULT 0,
	"max_discount" integer,
	"usage_limit" integer,
	"usage_count" integer DEFAULT 0,
	"is_active" boolean DEFAULT true,
	"expires_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "lakshya_order_items" (
	"id" serial PRIMARY KEY NOT NULL,
	"order_id" integer NOT NULL,
	"product_id" integer,
	"variant_id" integer,
	"title" varchar(255) NOT NULL,
	"variant_title" varchar(255),
	"sku" varchar(100),
	"quantity" integer DEFAULT 1 NOT NULL,
	"unit_price" integer NOT NULL,
	"total_price" integer NOT NULL,
	"image_url" text
);
--> statement-breakpoint
CREATE TABLE "lakshya_orders" (
	"id" serial PRIMARY KEY NOT NULL,
	"order_id" varchar(50) NOT NULL,
	"status" varchar(30) DEFAULT 'pending' NOT NULL,
	"payment_method" varchar(20) NOT NULL,
	"payment_status" varchar(20) DEFAULT 'pending' NOT NULL,
	"razorpay_order_id" varchar(100),
	"razorpay_payment_id" varchar(100),
	"first_name" varchar(100) NOT NULL,
	"last_name" varchar(100) NOT NULL,
	"email" varchar(255) NOT NULL,
	"phone" varchar(15) NOT NULL,
	"address" text NOT NULL,
	"city" varchar(100) NOT NULL,
	"state" varchar(100) NOT NULL,
	"pincode" varchar(10) NOT NULL,
	"subtotal" integer NOT NULL,
	"shipping" integer DEFAULT 0 NOT NULL,
	"tax" integer DEFAULT 0 NOT NULL,
	"discount" integer DEFAULT 0 NOT NULL,
	"total" integer NOT NULL,
	"notes" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "lakshya_product_highlights" (
	"id" serial PRIMARY KEY NOT NULL,
	"product_id" integer NOT NULL,
	"icon" varchar(10) DEFAULT '✓',
	"label" varchar(255) NOT NULL,
	"sort_order" integer DEFAULT 0
);
--> statement-breakpoint
CREATE TABLE "lakshya_product_images" (
	"id" serial PRIMARY KEY NOT NULL,
	"product_id" integer NOT NULL,
	"url" text NOT NULL,
	"alt" varchar(255) DEFAULT '',
	"sort_order" integer DEFAULT 0
);
--> statement-breakpoint
CREATE TABLE "lakshya_product_variants" (
	"id" serial PRIMARY KEY NOT NULL,
	"product_id" integer NOT NULL,
	"sku" varchar(100) NOT NULL,
	"title" varchar(255) NOT NULL,
	"price" integer NOT NULL,
	"compare_at_price" integer,
	"inventory" integer DEFAULT 100,
	"weight" varchar(50),
	"flavor" varchar(100),
	"is_default" boolean DEFAULT false
);
--> statement-breakpoint
CREATE TABLE "lakshya_products" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar(255) NOT NULL,
	"slug" varchar(255) NOT NULL,
	"description" text DEFAULT '' NOT NULL,
	"category" varchar(100) NOT NULL,
	"tags" jsonb DEFAULT '[]'::jsonb,
	"rating" numeric(2, 1) DEFAULT '4.5',
	"review_count" integer DEFAULT 0,
	"is_featured" boolean DEFAULT false,
	"is_active" boolean DEFAULT true,
	"metadata" jsonb DEFAULT '{}'::jsonb,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "lakshya_order_items" ADD CONSTRAINT "lakshya_order_items_order_id_lakshya_orders_id_fk" FOREIGN KEY ("order_id") REFERENCES "public"."lakshya_orders"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "lakshya_order_items" ADD CONSTRAINT "lakshya_order_items_product_id_lakshya_products_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."lakshya_products"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "lakshya_order_items" ADD CONSTRAINT "lakshya_order_items_variant_id_lakshya_product_variants_id_fk" FOREIGN KEY ("variant_id") REFERENCES "public"."lakshya_product_variants"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "lakshya_product_highlights" ADD CONSTRAINT "lakshya_product_highlights_product_id_lakshya_products_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."lakshya_products"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "lakshya_product_images" ADD CONSTRAINT "lakshya_product_images_product_id_lakshya_products_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."lakshya_products"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "lakshya_product_variants" ADD CONSTRAINT "lakshya_product_variants_product_id_lakshya_products_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."lakshya_products"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX "lakshya_blog_posts_slug_idx" ON "lakshya_blog_posts" USING btree ("slug");--> statement-breakpoint
CREATE INDEX "lakshya_blog_posts_published_idx" ON "lakshya_blog_posts" USING btree ("is_published");--> statement-breakpoint
CREATE UNIQUE INDEX "lakshya_coupons_code_idx" ON "lakshya_coupons" USING btree ("code");--> statement-breakpoint
CREATE INDEX "lakshya_order_items_order_idx" ON "lakshya_order_items" USING btree ("order_id");--> statement-breakpoint
CREATE UNIQUE INDEX "lakshya_orders_order_id_idx" ON "lakshya_orders" USING btree ("order_id");--> statement-breakpoint
CREATE INDEX "lakshya_orders_email_idx" ON "lakshya_orders" USING btree ("email");--> statement-breakpoint
CREATE INDEX "lakshya_orders_status_idx" ON "lakshya_orders" USING btree ("status");--> statement-breakpoint
CREATE INDEX "lakshya_orders_created_at_idx" ON "lakshya_orders" USING btree ("created_at");--> statement-breakpoint
CREATE INDEX "lakshya_product_images_product_idx" ON "lakshya_product_images" USING btree ("product_id");--> statement-breakpoint
CREATE UNIQUE INDEX "lakshya_product_variants_sku_idx" ON "lakshya_product_variants" USING btree ("sku");--> statement-breakpoint
CREATE INDEX "lakshya_product_variants_product_idx" ON "lakshya_product_variants" USING btree ("product_id");--> statement-breakpoint
CREATE UNIQUE INDEX "lakshya_products_slug_idx" ON "lakshya_products" USING btree ("slug");--> statement-breakpoint
CREATE INDEX "lakshya_products_category_idx" ON "lakshya_products" USING btree ("category");--> statement-breakpoint
CREATE INDEX "lakshya_products_featured_idx" ON "lakshya_products" USING btree ("is_featured");