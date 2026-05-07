import Medusa from "@medusajs/js-sdk";

const publishableKey = process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY;

// Initialize the Medusa SDK client
// Set NEXT_PUBLIC_MEDUSA_BACKEND_URL to point to your Medusa v2 backend
export const sdk = new Medusa(
  publishableKey != null
    ? {
        baseUrl: process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL ?? "http://localhost:9000",
        debug: process.env.NODE_ENV === "development",
        publishableKey,
      }
    : {
        baseUrl: process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL ?? "http://localhost:9000",
        debug: process.env.NODE_ENV === "development",
      }
);
