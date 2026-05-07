import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

const connectionString = process.env.DATABASE_URL || "postgres://postgres:postgres@localhost:5432/lakshya";

// Initialize the Postgres client
const client = postgres(connectionString, { prepare: false });

// Initialize Drizzle ORM
export const db = drizzle(client);
