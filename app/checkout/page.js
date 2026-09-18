import styles from './checkout.module.scss';
import CheckoutForm from './checkoutForm';

export const metadata = {
  title: 'Checkout',
  description: 'Checkout Page',
};

export default function CheckoutPage() {
  return (
    <main className={styles.checkoutContainer}>
      <h1 className={styles.mainTitle}>Checkout</h1>
      <CheckoutForm />
    </main>
  );
}
