import Link from 'next/link';
import styles from './thankyou.module.scss';

export const metadata = {
  title: 'Thank you for your order',
  description: 'Thank You Page',
};

export default function ThankYouPage() {
  return (
    <main className={styles.checkoutContainer}>
      <div className={styles.successCard}>
        <h1>Thank you for your order</h1>
        <p>Your custom toys are being prepared for workshop production.</p>

        <Link href="/products" className={styles.continueShoppingButton}>
          Continue Shopping
        </Link>
      </div>
    </main>
  );
}
