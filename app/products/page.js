import ProductsGrid from './products-grid';
import styles from './products.module.scss';

export const metadata = {
  title: 'Products',
  description: 'Products Overview',
};

export default function Products() {
  return (
    <div className={styles.pageWrapper}>
      <h1 style={{ padding: '30px' }}>Products</h1>
      <main>
        <ProductsGrid />
      </main>
    </div>
  );
}
