const postgres = require('postgres');
require('dotenv').config({ path: '.env.local' });

const sql = postgres(process.env.DATABASE_URL);

async function drop() {
  try {
    await sql`DROP SCHEMA IF EXISTS drizzle CASCADE;`;
    console.log("Successfully dropped drizzle schema.");
  } catch (err) {
    console.error(err);
  } finally {
    process.exit(0);
  }
}

drop();
