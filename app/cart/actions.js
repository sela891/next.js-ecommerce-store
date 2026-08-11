'use server';

import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import { getCookie } from '../util/cookie';
import { parseJson } from '../util/parsejson';
import { updateCookie } from '../util/updateCookie';

/**
 * Creates a new cart cookie or updates an existing one by
 * adding a product to the shopping cart.
 */
export async function createCookie(newProduct) {
  const cookieStore = await cookies();

  // Retrieve the current cart from the cookie and convert it into an array.
  const rawCookieValue = await getCookie('cartCookies');
  let productList = parseJson(rawCookieValue) || [];

  // Ensure the parsed cookie value is a valid array.
  if (!Array.isArray(productList)) {
    productList = [];
  }

  // Add the new product or update its quantity if it already exists.
  const updatedProducts = updateCookie(productList, newProduct);

  // Save the updated cart back to the cookie with site-wide scope.
  cookieStore.set('cartCookies', JSON.stringify(updatedProducts), {
    path: '/',
  });

  revalidatePath('/', 'layout');
}

/**
 * Updates the quantity of a specific product in the cart cookie.
 */
export async function updateCartQuantity(productId, quantity) {
  const cookieStore = await cookies();

  // Retrieve the current cart from the cookie.
  const rawCookieValue = await getCookie('cartCookies');
  let productList = parseJson(rawCookieValue) || [];

  if (!Array.isArray(productList)) {
    productList = [];
  }

  // Replace the quantity of the matching product.
  const updatedProducts = productList.map((product) =>
    product.id === productId ? { ...product, quantity } : product,
  );

  // Save the updated cart to the cookie.
  cookieStore.set('cartCookies', JSON.stringify(updatedProducts), {
    path: '/',
  });

  revalidatePath('/cart');
}

/**
 * Removes a product from the cart cookie using its product ID.
 */
export async function removeCartItem(productId) {
  const cookieStore = await cookies();

  // Retrieve the current cart from the cookie.
  const rawCookieValue = await getCookie('cartCookies');
  if (!rawCookieValue) return;

  const productList = parseJson(rawCookieValue);
  if (!Array.isArray(productList)) return;

  // Create a new cart without the selected product.
  const updatedProductList = productList.filter(
    (product) => product.id !== productId,
  );

  // Save the updated cart to the cookie.
  cookieStore.set('cartCookies', JSON.stringify(updatedProductList), {
    path: '/',
  });

  revalidatePath('/cart');
}

/**
 * Removes the shopping cart cookie, clearing all items from the cart.
 */
export async function clearCartCookies() {
  const cookieStore = await cookies();

  // Delete the cart cookie from the browser.
  cookieStore.delete('cartCookies');
  revalidatePath('/', 'layout');
}
