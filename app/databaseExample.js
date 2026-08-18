import { setEnvironmentVariables } from 'dotenv-safe';
import postgres from 'postgres';

setEnvironmentVariables();

// This is connecting to postgres from Node.js, but connecting from Next.js check out connect.ts file
const sql = postgres();

console.log(
  'Products',
  await sql`
    SELECT
      *
    FROM
      products
  `,
);

// Only in local environment
await sql.end();
