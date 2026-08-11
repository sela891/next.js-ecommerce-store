import { expect, test } from '@playwright/test';

test('navigation test', async ({ page }) => {
  await page.goto('/');

  await expect(page.getByTestId('product-add-to-cart').nth(2)).toBeVisible();

  await page.getByTestId('product-add-to-cart').nth(2).click();

  await expect(page.getByTestId('cart-link')).toBeVisible();

  await page.getByTestId('cart-link').click();

  await page.goto('/cart');

  await expect(page.getByTestId('product-quantity')).toBeVisible();
});
