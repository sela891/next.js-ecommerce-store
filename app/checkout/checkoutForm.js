'use client';

import { useState } from 'react';
import { clearCartCookies } from '../cart/actions';
import styles from './checkout.module.scss';

export default function CheckoutForm() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await clearCartCookies();
      setIsSubmitted(true);
    } catch (error) {
      console.error('Failed to clear cart storage:', error);
    }
  };

  if (isSubmitted) {
    return (
      <main className={styles.checkoutContainer}>
        <div className={styles.successCard}>
          <h1>Thank You for your Order</h1>
          <p>Your custom toys are being prepared for workshop production.</p>
          <button
            className={styles.confirmOrderBtn}
            onClick={() => (window.location.href = '/products')}
          >
            Continue Shopping
          </button>
        </div>
      </main>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={styles.checkoutForm}>
      <section className={styles.formSection}>
        <h2>Shipping Address</h2>

        <div className={styles.formRow}>
          <div className={styles.formGroup}>
            <label htmlFor="firstName">First Name</label>
            <input id="firstName" data-test-id="checkout-first-name" required />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="lastName">Last Name</label>
            <input id="lastName" data-test-id="checkout-last-name" required />
          </div>
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="email">Email Address</label>
          <input
            id="email"
            type="email"
            data-test-id="checkout-email"
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="address">Street Address</label>
          <input id="address" data-test-id="checkout-address" required />
        </div>

        <div className={styles.formRow}>
          <div className={styles.formGroup}>
            <label htmlFor="city">City</label>
            <input id="city" data-test-id="checkout-city" required />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="postalCode">Postal Code</label>
            <input
              id="postalCode"
              data-test-id="checkout-postal-code"
              required
            />
          </div>
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="country">Country</label>
          <input id="country" data-test-id="checkout-country" required />
        </div>
      </section>

      <section className={styles.formSection}>
        <h2>Payment Details</h2>

        <div className={styles.formGroup}>
          <label htmlFor="creditCardHolder">Credit Card Holder</label>
          <input
            id="creditCardHolder"
            data-test-id="checkout-credit-card-holder"
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="creditCard">Credit Card Number</label>
          <input
            id="creditCard"
            inputMode="numeric"
            pattern="[0-9\s]{13,19}"
            data-test-id="checkout-credit-card"
            required
          />
        </div>

        <div className={styles.formRow}>
          <div className={styles.formGroup}>
            <label htmlFor="expirationDate">Expiration Date</label>
            <input
              id="expirationDate"
              pattern="(0[1-9]|1[0-2])\/[0-9]{2}"
              data-test-id="checkout-expiration-date"
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="securityCode">Security Code (CVV)</label>
            <input
              id="securityCode"
              inputMode="numeric"
              pattern="[0-9]{3,4}"
              data-test-id="checkout-security-code"
              required
            />
          </div>
        </div>
      </section>

      <div className={styles.submitWrapper}>
        <button
          className={styles.confirmOrderBtn}
          data-test-id="checkout-confirm-order"
        >
          Confirm Order
        </button>
      </div>
    </form>
  );
}
