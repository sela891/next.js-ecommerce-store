import { expect, test } from '@playwright/test';

test('checkout test', async ({ page }) => {
  await page.goto('/');

  await expect(page.getByTestId('product-add-to-cart').nth(2)).toBeVisible();

  await page.getByTestId('product-add-to-cart').nth(2).click();

  await expect(page.getByTestId('cart-link')).toBeVisible();

  await page.getByTestId('cart-link').click();

  await page.goto('/cart');


  await page.getByTestId('checkout-button').click();

  await page.goto('/checkout');

  await page.getByTestId('checkout-first-name').fill ('Max');

  await page.getByTestId('checkout-last-name').fill('Mustermann');

  await page.getByTestId('checkout-email').fill('max.muster@gmail.com');

  await page.getByTestId('checkout-address').fill('Musterstraße 1');

  await page.getByTestId('checkout-city').fill('Munster');

  await page.getByTestId('checkout-postal-code').fill('12345');

  await page.getByTestId('checkout-country').fill('Musterland');

    await page.getByTestId('checkout-credit-card-holder').fill ('Max Mustermann')

  await page.getByTestId('checkout-credit-card').fill ('1234 5678 9101 1200')

  await page.getByTestId('checkout-expiration-date').fill ('03/28')

 await page.getByTestId('checkout-security-code').fill ('432')

 await page.getByTestId('checkout-confirm-order').click();

await expect(
  page.getByRole('heading', { name: 'Thank You for your Order' }),
).toBeVisible();

});
