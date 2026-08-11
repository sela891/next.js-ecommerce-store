import { expect, test } from '@jest/globals';
import { updateCookie } from '../updateCookie';

test('add or update cookie value correctly', () => {
  const cartItems = [
    { id: 1, name: 'item A', quantity: 5 },
    { id: 2, name: 'item B', quantity: 3 },
    { id: 3, name: 'item C', quantity: 1 },
  ];

  const existingCookieValue = {
    id: 2,
    name: 'item B',
    quantity: 3,
  };

  const newCookieValue = {
    id: 4,
    name: 'item D',
    quantity: 2,
  };

  expect(updateCookie(cartItems, existingCookieValue)).toStrictEqual([
    { id: 1, name: 'item A', quantity: 5 },
    { id: 2, name: 'item B', quantity: 6 },
    { id: 3, name: 'item C', quantity: 1 },
  ]);

  expect(updateCookie(cartItems, newCookieValue)).toStrictEqual([
    { id: 1, name: 'item A', quantity: 5 },
    { id: 2, name: 'item B', quantity: 3 },
    { id: 3, name: 'item C', quantity: 1 },
    { id: 4, name: 'item D', quantity: 2 },
  ]);
});
