import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./db-schema";

/**
 * Neon Serverless PostgreSQL Connection
 *
 * Uses the @neondatabase/serverless driver for edge-compatible,
 * connection-pooled access to Neon's managed Postgres.
 *
 * Set DATABASE_URL in .env.local to your Neon connection string:
 *   DATABASE_URL=postgresql://user:pass@ep-xxx.region.aws.neon.tech/dbname?sslmode=require
 */
const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  console.warn(
    "[db] DATABASE_URL is not set. Database operations will fail at runtime. " +
      "Create a free Neon database at https://neon.tech and set DATABASE_URL in .env.local"
  );
}

// Create the Neon HTTP query function (edge-compatible, no persistent connections)
const sql = neon(connectionString ?? "");

// Initialize Drizzle ORM with the Neon driver and our schema
export const db = drizzle(sql, { schema });
