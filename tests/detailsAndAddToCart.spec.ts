import { test, expect } from '@playwright/test';
import { detailsAddToCart } from '../pages/detailsAddToCart';

//16. Open product details
test('Open product details', async ({ page }) => {
  const addToCart = new detailsAddToCart(page);

  await addToCart.goto();
  await addToCart.openProductDetail();
});

//17. Add to cart - successfull
test('Add to cart', async ({ page }) => {
  const addToCart = new detailsAddToCart(page);

  await addToCart.goto();
  await addToCart.openProductDetail();
  await addToCart.addToCart();
});

//18. Add to cart - more products
test('Add to cart - more products', async ({ page }) => {
  const addToCart = new detailsAddToCart(page);

  await addToCart.goto();
  //await addToCart.clearCart();
  await addToCart.goto();
  await addToCart.openProductDetail();
  await addToCart.addToCart();
  await addToCart.moreProducts();
});

test('Verify product details UI elements', async ({ page }) => {
  await page.goto('https://www.demoblaze.com/index.html');
  await page.getByRole('link', { name: 'Samsung galaxy s6' }).click();
  const locator = page.locator('div').filter({ hasText: 'Samsung galaxy s6$360 *' }).first();
  await expect(locator).toHaveCSS('display', 'block');
  await expect(locator).toHaveCSS('border-image-repeat', 'stretch');
  await expect(locator).toHaveCSS('color', 'rgb(41, 43, 44)');
});

test('Verify Add to card button', async ({ page }) => {
  await page.goto('https://www.demoblaze.com/index.html');
  await page.getByRole('link', { name: 'Samsung galaxy s6' }).click();
  const locator = page.getByRole('link', { name: 'Add to cart' });
  await expect(locator).toHaveCSS('background-color', 'rgb(52, 168, 83)');
  await expect(locator).toHaveCSS('color', 'rgb(255, 255, 255)');
  await expect(locator).toHaveCSS('padding-bottom', '12px');
  await expect(locator).toHaveCSS('padding-left', '24px');
});
