import { cache } from 'react';
import type { Products } from '../../migrations/00000-createTableProducts';
import { sql } from './connect';

// Hardcoded database
// const products = [
//   {
//     id: 1,
//     name: 'Cotton Bear',
//     price: 45.0,
//     cat: 'Hand-Stitched',
//     description:
//       'A timeless companion crafted with love. This classic bear is made from premium, breathable cotton and features intricate hand-stitched details that give it a unique personality. Soft, durable, and perfect for lifelong snuggles.',
//   },
//   {
//     id: 2,
//     name: 'Wooden Pull-Toy',
//     price: 35.0,
//     cat: 'Eco-Friendly',
//     description:
//       'Bring back the joy of traditional play with this charming pull-toy. Carved from sustainably sourced timber and finished with child-safe, non-toxic oils, its smooth rolling wheels and sturdy design make it a perfect companion for a toddler’s first steps.',
//   },
//   {
//     id: 3,
//     name: 'Custom Name Blocks',
//     price: 25.0,
//     cat: 'Personalized',
//     description:
//       'Create a keepsake that lasts a lifetime. These solid wood blocks are custom-engraved to spell out a child’s name or a special message. They serve as both a foundational learning toy and a beautiful decorative piece for any nursery shelf.',
//   },
//   {
//     id: 4,
//     name: 'Soft Linen Bunny',
//     price: 42.0,
//     cat: 'Hand-Stitched',
//     description:
//       'Elegant and incredibly soft, this bunny is made from high-quality natural linen. Its long, floppy ears and delicate stitching make it a favorite for tactile play and quiet moments. A sophisticated take on the traditional plush toy.',
//   },
// ];

export const getProductsInsecure = cache(async () => {
  const products = await sql<Products[]>`
    SELECT
      id,
      name,
      price::float AS price,
      cat,
      description
    FROM
      products
  `;

  return products;
});

export async function getProductId(id: number) {
  const [product] = await sql<Products[]>`
    SELECT
      id,
      name,
      price::float AS price,
      cat,
      description
    FROM
      products
    WHERE
      id = ${id}
  `;
  return product;
}
