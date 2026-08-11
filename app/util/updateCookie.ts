export type CartProduct = {
  id: number;
  name: string;
  quantity: number;
  [key: string]: unknown;
};

/**
 * Represents a product being added to the cart.
 * The quantity is optional so that a product can be added
 * without explicitly specifying an amount. In that case,
 * the function will assume a quantity of 1.
 */
export type NewProduct = Omit<CartProduct, 'quantity'> & {
  quantity?: number;
};

/**
 * Updates the cart stored in the cookie.
 *
 * If the product is already present, its quantity is increased.
 * If it is not present, the product is added to the cart.
 *
 * A new array is returned instead of modifying the original one.
 */
export function updateCookie(
  productList: CartProduct[],
  newProduct: Omit<CartProduct, 'quantity'> & { quantity?: number },
): CartProduct[] {
  /**
   * Searches the current cart for a product with the same ID
   * as the product being added. Product IDs are unique, so they
   * are used to determine whether the product already exists.
   */
  const existingProduct = productList.find(
    (product) => product.id === newProduct.id,
  );

  /**
   * If a matching product is found, create a new cart array by
   * mapping over the existing products. Only the matching product
   * is updated; all other products are returned unchanged.
   */
  if (existingProduct) {
    return productList.map((product) =>
      product.id === newProduct.id
        ? {
            // Copy the existing product properties and update only
            // the quantity by adding the incoming quantity. If no
            // quantity is provided, increase it by 1.
            ...product,
            quantity: product.quantity + (newProduct.quantity ?? 1),
          }
        : product,
    );
  }

  /**
   * If no matching product is found, return a new array containing
   * all existing products plus the new product. If the new product
   * does not specify a quantity, it is added with a quantity of 1.
   */
  return [
    ...productList,
    {
      ...newProduct,
      quantity: newProduct.quantity ?? 1,
    } as CartProduct,
  ];
}
