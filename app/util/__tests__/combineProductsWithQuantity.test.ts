import { expect, test } from '@jest/globals';
import { combineProductsWithQuantity } from '../combineProductsWithQuantity';

test('combines database product data with cookie quantities', () => {
  const products = [
    {
      id: 1,
      name: 'Cotton Bear',
      price: 45.0,
      cat: 'Hand-Stitched',
      description:
        'A timeless companion crafted with love. This classic bear is made from premium, breathable cotton and features intricate hand-stitched details that give it a unique personality. Soft, durable, and perfect for lifelong snuggles.',
    },
  ];

  const cartItems = [
    {
      id: 1,
      quantity: 3,
    },
  ];

  expect(combineProductsWithQuantity(products, cartItems)).toStrictEqual([
    {
      id: 1,
      name: 'Cotton Bear',
      price: 45.0,
      cat: 'Hand-Stitched',
      quantity: 3,
      imageSlug: 'cotton-bear',
    },
  ]);
});
