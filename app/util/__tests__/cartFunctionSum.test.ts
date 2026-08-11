import { expect, test } from '@jest/globals';
import { calculateTotalAmount } from '../cartFunctionSum';

test('calculate total amount correctly', () => {
  const cartWithDetails = [
    { id: 1, name: 'item A', price: 25.5, quantity: 5 },
    { id: 2, name: 'item B', price: 45.5, quantity: 3 },
    { id: 3, name: 'item C', price: 10.9, quantity: 1 },
  ];
  expect(calculateTotalAmount(cartWithDetails)).toBeCloseTo(274.9); // sum of all cart items price * quantity

  expect(calculateTotalAmount([])).toBe(0); // empty cart should be a total of 0
});
