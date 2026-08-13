'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import type { Products } from '../../migrations/00000-createTableProducts';
import { calculateTotalAmount } from '../util/cartFunctionSum';
import { removeCartItem, updateCartQuantity } from './actions';
import styles from './cart.module.scss';

type CartItem = Products & {
  imageSlug: string;
  quantity: number;
};

export default function CartList({
  initialItems,
}: {
  initialItems: CartItem[];
}) {
  const [cartProducts, setCartProducts] = useState(initialItems);

  const handleQuantityChange = async (
    id: number,
    newQuantity: number | string,
  ) => {
    const parsed =
      typeof newQuantity === 'number' ? newQuantity : parseInt(newQuantity, 10);
    const qty = Math.max(1, isNaN(parsed) ? 1 : parsed);

    setCartProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === id ? { ...product, quantity: qty } : product,
      ),
    );

    await updateCartQuantity(id, qty);
  };

  const handleRemove = async (id: number) => {
    setCartProducts((prevProducts) =>
      prevProducts.filter((product) => product.id !== id),
    );
    await removeCartItem(id);
  };

  const totalAmount = calculateTotalAmount(cartProducts);
  const subtotal = totalAmount.toFixed(2);

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

  return (
    <main className={styles.cartContainer}>
      <section className={styles.cartItems}>
        <h1>Your Shopping Cart</h1>

        {cartProducts.map((product) => {
          const productPrice = Number(product.price) || 0;
          const currentQuantity = Number(product.quantity) || 1;
          const combinedPrice = (productPrice * currentQuantity).toFixed(2);

          return (
            <article
              key={`cart-product-${product.id}`}
              className={styles.cartItem}
              data-test-id={`cart-product-${product.id}`}
            >
              <div className={styles.itemImage}>
                <Link href={`/products/${product.id}`}>
                  <Image
                    src={`/images/${product.imageSlug}.png`}
                    alt={product.name}
                    width={100}
                    height={100}
                    className={styles.cartProductImage}
                  />
                </Link>
              </div>

              <div className={styles.itemDetails}>
                <h2 className={styles.itemTitle}>
                  <Link
                    href={`/products/${product.id}`}
                    className={styles.productPageLink}
                  >
                    {product.name}
                  </Link>
                </h2>
                <p className={styles.itemMeta}>ID: {product.id}</p>
                <span
                  data-test-id={`cart-product-quantity-${product.id}`}
                  style={{ display: 'none' }}
                >
                  {currentQuantity}
                </span>

                <button
                  data-test-id={`cart-product-remove-${product.id}`}
                  className={styles.removeBtn}
                  onClick={() => handleRemove(product.id)}
                >
                  Remove
                </button>
              </div>

              <div className={styles.itemQuantity}>
                <button
                  type="button"
                  className={styles.quantityBtn}
                  onClick={() =>
                    handleQuantityChange(product.id, currentQuantity - 1)
                  }
                  disabled={currentQuantity <= 1}
                  aria-label="Decrease quantity"
                >
                  -
                </button>
                <input
                  data-test-id="product-quantity"
                  type="number"
                  value={currentQuantity}
                  min="1"
                  onChange={(e) =>
                    handleQuantityChange(product.id, e.target.value)
                  }
                  aria-label="Quantity"
                />
                <button
                  type="button"
                  className={styles.quantityBtn}
                  onClick={() =>
                    handleQuantityChange(product.id, currentQuantity + 1)
                  }
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>

              <div className={styles.itemPrice}>€{combinedPrice}</div>
            </article>
          );
        })}
      </section>

      <aside className={styles.cartSummary}>
        <h2>Order Summary</h2>
        <div className={styles.summaryRow}>
          <span>Subtotal</span>
          <span>€{subtotal}</span>
        </div>
        <div className={styles.summaryRow}>
          <span>Shipping</span>
          <span>Calculated at checkout</span>
        </div>
        <hr />
        <div className={`${styles.summaryRow} €{styles.total}`}>
          <span>Total</span>
          <span data-test-id="cart-total">€{subtotal}</span>
        </div>
        <Link
          href="/checkout"
          className={styles.checkoutBtn}
          data-test-id="checkout-button"
        >
          Proceed to Checkout
        </Link>
      </aside>
    </main>
  );
}
