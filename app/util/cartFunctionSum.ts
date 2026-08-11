type ProductCartItem = {
  name: string;
  price: number;
  id: number;
  quantity: number;
};

/**
 * Calculates the total cost of all products in the shopping cart.
 *
 * Each product's subtotal is calculated by multiplying its price
 * by its quantity. The subtotals are then added together to produce
 * the final cart total.
 *
 * If the provided value is not an array, the function returns 0.
 */
export function calculateTotalAmount(items: ProductCartItem[]): number {
  /**
   * Prevents runtime errors by ensuring the function only processes
   * arrays. If the input is invalid, there are no items to calculate,
   * so a total of 0 is returned.
   */
  if (!Array.isArray(items)) return 0;

  /**
   * Iterates through every product in the cart and accumulates the
   * total order amount. The accumulator (`acc`) stores the running
   * total, while each product contributes its price multiplied by
   * its quantity.
   */
  return items.reduce((acc, product) => {
    /**
     * Converts the product price to a number. If the price is missing
     * or cannot be converted, it defaults to 0 to avoid producing
     * an invalid total.
     */
    const price = Number(product?.price) || 0;

    /**
     * Converts the quantity to a number. If the quantity is missing
     * or invalid, it defaults to 1, assuming a single item was added
     * to the cart.
     */
    const quantity = Number(product?.quantity) || 1;

    /**
     * Calculates the subtotal for the current product and adds it
     * to the running total. The final value returned by reduce is
     * the total cost of all products in the cart.
     */
    return acc + price * quantity;
  }, 0);
}
