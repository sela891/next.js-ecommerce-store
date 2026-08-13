import type { Sql } from 'postgres';

// pnpm migrate new insertProducts.ts --esm
// if you want to make some changes to the file, eg. rename it, then you first have to migrate down and then migrate up again

const products = [
  {
    id: 1,
    name: 'Cotton Bear',
    price: 45,
    cat: 'Hand-Stitched',
    description:
      'A timeless companion crafted with love. This classic bear is made from premium, breathable cotton and features intricate hand-stitched details that give it a unique personality. Soft, durable, and perfect for lifelong snuggles.',
  },
  {
    id: 2,
    name: 'Wooden Pull-Toy',
    price: 35,
    cat: 'Eco-Friendly',
    description:
      'Bring back the joy of traditional play with this charming pull-toy. Carved from sustainably sourced timber and finished with child-safe, non-toxic oils, its smooth rolling wheels and sturdy design make it a perfect companion for a toddler’s first steps.',
  },
  {
    id: 3,
    name: 'Custom Name Blocks',
    price: 25,
    cat: 'Personalized',
    description:
      'Create a keepsake that lasts a lifetime. These solid wood blocks are custom-engraved to spell out a child’s name or a special message. They serve as both a foundational learning toy and a beautiful decorative piece for any nursery shelf.',
  },
  {
    id: 4,
    name: 'Soft Linen Bunny',
    price: 42,
    cat: 'Hand-Stitched',
    description:
      'Elegant and incredibly soft, this bunny is made from high-quality natural linen. Its long, floppy ears and delicate stitching make it a favorite for tactile play and quiet moments. A sophisticated take on the traditional plush toy.',
  },
];

export async function up(sql: Sql) {
  for (const product of products) {
    await sql`
      INSERT INTO
        products (name, price, cat, description)
      VALUES
        (
          ${product.name},
          ${product.price},
          ${product.cat},
          ${product.description}
        )
    `;
  }
}

export async function down(sql: Sql) {
  for (const product of products) {
    await sql`
      DELETE FROM products
      WHERE
        id = ${product.id}
    `;
  }
}
