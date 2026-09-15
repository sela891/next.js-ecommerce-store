'use client';

import { useState } from 'react';
import { createCookie } from './actions';
import styles from './cart.module.scss';

type ProductData = {
  id: number;
  name: string;
  showQuantity?: boolean;
};

export default function AddToCartButton({
  id,
  name,
  showQuantity = false,
}: ProductData) {
  const [quantity, setQuantity] = useState(1);
  const [isPending, setIsPending] = useState(false);

  const decreaseQuantity = () => {
    setQuantity((current) => {
      if (current > 1) {
        return current - 1;
      }

      return 1;
    });
  };

  const increaseQuantity = () => {
    setQuantity((current) => current + 1);
  };

  const handleCartClick = async () => {
    try {
      setIsPending(true);

      await createCookie({
        id,
        name,
        quantity,
      });
    } catch (error) {
      console.error('Failed to add item to cart:', error);
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div className={showQuantity ? styles.productAddToCart : undefined}>
      {showQuantity && (
        <div className={styles.itemQuantity}>
          <button
            type="button"
            className={styles.quantityBtn}
            onClick={decreaseQuantity}
            disabled={quantity <= 1}
            aria-label="Decrease quantity"
          >
            -
          </button>

          <input
            data-test-id="product-quantity"
            required
            value={quantity}
            onChange={(event) => {
              if (Number(event.currentTarget.value) > 0) {
                setQuantity(Number(event.currentTarget.value));
              } else {
                setQuantity(0);
              }
            }}
          />

          <button
            type="button"
            className={styles.quantityBtn}
            onClick={increaseQuantity}
            aria-label="Increase quantity"
          >
            +
          </button>
        </div>
      )}

      <button
        type="button"
        data-test-id="product-add-to-cart"
        onClick={handleCartClick}
        className={styles.addToCartBtn}
        disabled={isPending}
      >
        {isPending ? 'Adding...' : 'Add to Cart'}
      </button>
    </div>
  );
}
