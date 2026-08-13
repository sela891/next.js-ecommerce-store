import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';
import Link from 'next/link';
import { getCart } from './cart/getCart';
import styles from './header.module.scss';

export default async function Header() {
  const cartProducts = await getCart();

  const cartCount = cartProducts.reduce(
    (total, product) => total + product.quantity,
    0,
  );

  return (
    <header>
      <div className={styles.headerContainer}>
        <div>
          <Link href="/">
            <Image src="/images/logo.png" width={100} height={60} alt="^Logo" />
          </Link>
        </div>
        <nav>
          <ul className={styles.list}>
            <li>
              <Link data-test-id="products-link" href="/products">
                Products
              </Link>
            </li>

            <li>
              <Link
                data-test-id="cart-link"
                href="/cart"
                className={styles.cartIcon}
              >
                <FontAwesomeIcon icon={faCartShopping} />
                <span className={styles.cartCount}>{cartCount}</span>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
