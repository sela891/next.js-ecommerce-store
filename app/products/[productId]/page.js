import Image from 'next/image';
import Link from 'next/link';
import AddtoCartButton from '../../cart/AddtoCartButton';
import { getProductId } from '../../database/products';
import styles from '../products.module.scss';

export async function generateMetadata(props) {
  const singleProduct = await getProductId(
    Number((await props.params).productId),
  );

  if (!singleProduct) {
    return {
      title: 'Product Not Found',
      description: 'The requested custom toy could not be found.',
    };
  }

  return {
    title: singleProduct.name,
    description: singleProduct.description,
  };
}

export default async function ProductPage(props) {
  const singleProduct = await getProductId(
    Number((await props.params).productId),
  );

  if (!singleProduct) {
    return (
      <div className={styles.pageWrapper}>
        <h1>Toy Not Found</h1>
        <p>
          We couldn't find the product you're looking for.{' '}
          <Link href="/products">Return to shop</Link>
        </p>
      </div>
    );
  }

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.singleProductHero}>
        <Image
          src={`/images/${singleProduct.name.toLowerCase().replace(/\s+/g, '-')}.png`}
          alt={singleProduct.name}
          data-test-id="product-image"
          className={styles.productImage}
          width={500}
          height={400}
        />

        <div className={styles.productInfo}>
          <p className={styles.category}>{singleProduct.cat}</p>
          <h1 className={styles.productTitle}>{singleProduct.name}</h1>
          <p data-test-id="product-price" className={styles.price}>
            €{singleProduct.price.toFixed(2)}
          </p>
          <h3>Product Details</h3>
          <p className={styles.description}>{singleProduct.description}</p>
        </div>
      </div>

      <div className={styles.addToCartBtn2}>
        <AddtoCartButton
          id={singleProduct.id}
          name={singleProduct.name}
          price={singleProduct.price}
        />
      </div>
    </div>
  );
}
