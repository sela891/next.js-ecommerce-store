import { getProductsInsecure } from '../database/products';
import { combineProductsWithQuantity } from '../util/combineProductsWithQuantity';
import { getCookie } from '../util/cookie';
import { parseJson } from '../util/parsejson';
import CartList from './CartList';

export const metadata = {
  title: 'Cart',
  description: 'Cart Overview',
};

export default async function CartPage() {
  // Get the cart data stored in the cookie (contains product IDs and quantities).
  const rawCookieValue = await getCookie('cart');
  let cartItems = parseJson(rawCookieValue) || [];

  if (!Array.isArray(cartItems)) {
    cartItems = [];
  }

  // Fetch the complete product information from PostgreSQL.
  const products = await getProductsInsecure();

  // Combine database product details with quantities from the cookie.
  const cartProducts = combineProductsWithQuantity(products, cartItems);

  return <CartList initialItems={cartProducts} />;
}
