import { defineConfig } from "drizzle-kit";
import * as dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

/**
 * Drizzle Kit Configuration
 *
 * Used for:
 *   npx drizzle-kit generate  — Generate SQL migration files
 *   npx drizzle-kit migrate   — Run migrations against the database
 *   npx drizzle-kit studio    — Open Drizzle Studio (visual DB explorer)
 *   npx drizzle-kit push      — Push schema changes directly (dev only)
 */
export default defineConfig({
  schema: "./src/lib/db-schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});
