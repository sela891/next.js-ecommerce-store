import Image from 'next/image';
import Link from 'next/link';
import AddtoCartButton from '../cart/AddtoCartButton';
import { getProductsInsecure } from '../database/products';
import styles from './products.module.scss';

export default async function ProductsGrid() {
  const products = await getProductsInsecure();

  return (
    <div className={styles.pageWrapper}>
      <main className={styles.storeContainer}>
        <div className={styles.productGrid}>
          {products.map((product) => (
            <div key={`product-${product.id}`} className={styles.productCard}>
              <Link
                data-test-id={`product-${product.id}`}
                href={`/products/${product.id}`}
                className={styles.productLink}
              >
                <div className={styles.imageWrapper}>
                  <Image
                    src={`/images/${product.name.toLowerCase().replace(/\s+/g, '-')}.png`}
                    alt={product.name}
                    className={styles.productImage}
                    width={500}
                    height={400}
                  />
                </div>
                <h3 className={styles.productTitle}>{product.name}</h3>
              </Link>
              <Link
                href={`/products/${product.id}`}
                className={styles.productLink}
              >
                <div className={styles.productInfo}>
                  <p className={styles.category}>{product.cat}</p>
                  <p className={styles.price}>€{product.price.toFixed(2)}</p>
                </div>
              </Link>

              <AddtoCartButton
                id={product.id}
                name={product.name}
                price={product.price}
              />
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
