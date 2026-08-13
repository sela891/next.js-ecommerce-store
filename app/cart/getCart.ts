import type { Products } from '../../migrations/00000-createTableProducts';
import { getCookie } from '../util/cookie';
import { parseJson } from '../util/parsejson';

type CartItem = Products & {
  quantity: number;
  imageSlug: string;
};

export async function getCart(): Promise<CartItem[]> {
  const rawCookieValue = await getCookie('cartCookies');

  const productList: unknown = parseJson(rawCookieValue);

  if (!Array.isArray(productList)) {
    return [];
  }

  return productList as CartItem[];
}
