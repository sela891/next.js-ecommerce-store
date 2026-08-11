import Link from 'next/link';
import { getProductsInsecure } from '../database/products';
import { combineProductsWithQuantity } from '../util/combineProductsWithQuantity';
import { getCookie } from '../util/cookie';
import { parseJson } from '../util/parsejson';
import styles from './cart.module.scss';
import CartList from './CartList';

export const metadata = {
  title: 'Cart',
  description: 'Cart Overview',
};

export default async function CartPage() {
  // Get the cart data stored in the cookie (contains product IDs and quantities).
  const rawCookieValue = await getCookie('cartCookies');
  let cartItems = parseJson(rawCookieValue) || [];

  if (!Array.isArray(cartItems)) {
    cartItems = [];
  }

  // Fetch the complete product information from PostgreSQL.
  const products = await getProductsInsecure();

  // Combine database product details with quantities from the cookie.
  const cartProducts = combineProductsWithQuantity(products, cartItems);

  // Show an empty cart message if there are no products.
  if (cartProducts.length === 0) {
    return (
      <main className={styles.cartContainer}>
        <section className={styles.cartItems}>
          <h1>Your Shopping Cart</h1>
          <p>Your cart is empty. Pick out some custom toys!</p>
          <Link href="/products" className={styles.continueShopping}>
            ← Browse Products
          </Link>
        </section>
      </main>
    );
  }

  return <CartList initialItems={cartProducts} />;
}
