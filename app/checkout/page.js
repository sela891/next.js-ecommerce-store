import styles from './checkout.module.scss';
import CheckoutForm from './checkoutForm';

export default function CheckoutPage() {
  return (
    <main className={styles.checkoutContainer}>
      <h1 className={styles.mainTitle}>Checkout</h1>
      <CheckoutForm />
    </main>
  );
}
