'use client';

import { useState } from 'react';
import { createCookie } from './actions';
import styles from './cart.module.scss';

type ProductData = {
  id: number;
  name: string;
  price?: string | number;
  quantity?: number;
};

export default function AddToCartButton({
  id,
  name,
  quantity = 1,
}: ProductData) {
  const [isPending, setIsPending] = useState(false);

  const handleCartClick = async () => {
    try {
      setIsPending (true);
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
    <button
      data-test-id="product-add-to-cart"
      onClick={handleCartClick}
      className={styles.addToCartBtn}
      disabled={isPending}
    >
      {isPending ? 'Adding...' : 'Add to Cart'}
    </button>
  );
}
