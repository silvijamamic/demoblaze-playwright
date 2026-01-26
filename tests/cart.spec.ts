import { test, expect } from '@playwright/test';
import { cartPage } from '../pages/cart';

//19. Cart - view
test('Cart - view', async ({ page }) => {
  const cart = new cartPage(page);

  await cart.goto();
  await cart.cartView();
});
//20. Delete product from cart
test('Delete products from cart', async ({ page }) => {
  const cart = new cartPage(page);

  await cart.goto();
  await cart.deleteProduct();
});

//21. Empty cart
test('Empty cart', async ({ page }) => {
  const cart = new cartPage(page);

  await cart.goto();
  await cart.emptyCart();
});

test('Verify Cart screen', async ({ page }) => {
  await page.goto('https://www.demoblaze.com/index.html');
  await page.getByRole('link', { name: 'Samsung galaxy s6' }).click();
  await page.getByRole('link', { name: 'Add to cart' }).click();
  await page.getByRole('link', { name: 'Cart', exact: true }).click();
  const locator = page.getByText('Products Pic Title Price x');
  await expect(locator).toHaveCSS('color', 'rgb(41, 43, 44)');
  await expect(locator).toHaveCSS('font-family', 'LatoWeb');
  await expect(locator).toHaveCSS('position', 'relative');
});

test('Verify Place Order button', async ({ page }) => {
  await page.goto('https://www.demoblaze.com/index.html');
  await page.getByRole('link', { name: 'Cart', exact: true }).click();
  const locator = page.getByRole('button', { name: 'Place Order' });
  await expect.soft(locator).toHaveCSS('background-color', 'rgb(52, 168, 83)');
  await expect.soft(locator).toHaveCSS('display', 'inline-block');
  await expect(locator).toHaveCSS('font-family', 'sans-serif');
  await expect(locator).toHaveCSS('font-size', '16px');
});
