import type { Sql } from 'postgres';

export type Products = {
  id: number;
  name: string;
  price: number;
  cat: string;
  description: string | null;
};

// pnpm migrate new createTableProducts.ts --esm
// if you want to make some changes to the file, eg. rename it, then you first have to migrate down and then migrate up again
export async function up(sql: Sql) {
  await sql`
    CREATE TABLE products (
      id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
      name varchar(100) NOT NULL,
      price numeric(10, 2) NOT NULL,
      cat varchar(100) NOT NULL,
      description varchar(1000)
    )
  `;
}

export async function down(sql: Sql) {
  await sql` DROP TABLE products `;
}
