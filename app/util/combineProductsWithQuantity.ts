import type { Products } from '../../migrations/00000-createTableProducts';

type CookieCartItem = {
  id: number;
  quantity: number;
};

/**
 * Combines product details retrieved from the database
 * with the quantities stored in the cart cookie.
 */
export function combineProductsWithQuantity(
  products: Products[],
  cartItems: CookieCartItem[],
) {
  return cartItems.flatMap((cartItem) => {
    const combinedProduct = products.find(
      (product) => product.id === cartItem.id,
    );

    if (!combinedProduct) return [];

    return [
      {
        ...combinedProduct,
        imageSlug: combinedProduct.name.toLowerCase().replace(/\s+/g, '-'),
        quantity: cartItem.quantity,
      },
    ];
  });
}
