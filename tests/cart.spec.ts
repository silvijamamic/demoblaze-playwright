import { test, expect } from '@playwright/test';
import { cartPage } from '../pages/cart';
import { helpersPage } from '../pages/helpers';
import { detailsAddToCart } from '../pages/detailsAddToCart';

//Delete product from cart
test('Delete products from cart', async ({ page }) => {
  const cart = new cartPage(page);
  const addToCart = new detailsAddToCart(page);

  await cart.goto();
  await addToCart.addProductToCart(addToCart.samsungGalaxy, addToCart.headingSamsungGalaxy);
  await cart.productStorePage();
  await addToCart.addProductToCart(addToCart.nokiaLumia, addToCart.headingNokia);
  await cart.topNavigationCart();
  await expect(cart.deleteLink.first()).toBeVisible();
  await expect(cart.deleteLink.nth(1)).toBeVisible();
  await cart.deleteProductByName('Samsung galaxy s6');
  await cart.deleteProductByName('Nokia lumia 1520');
  await cart.expectCartToBeEmpty();
});

//Verify total amount - provjeriti
test('Verify total amount of added products to Cart', async ({ page }) => {
  const cart = new cartPage(page);
  const addToCart = new detailsAddToCart(page);

  await cart.goto();
  await addToCart.addProductToCart(addToCart.samsungGalaxy, addToCart.headingSamsungGalaxy);
  await cart.topNavigationCart();
  await addToCart.productStore.click();
  await addToCart.addProductToCart(addToCart.nokiaLumia, addToCart.headingNokia);
  await cart.topNavigationCart();
  const price1 = await cart.getProductPriceByName('Samsung galaxy s6');
  const price2 = await cart.getProductPriceByName('Nokia lumia 1520');
  const expectedTotal = price1 + price2;
  const total = await cart.getTotalPrice();
  expect(total).toBe(expectedTotal);
});

//View empty cart screen
test('View empty cart screen', async ({ page }) => {
  const cart = new cartPage(page);

  await cart.goto();
  await expect(cart.deleteLink).not.toBeVisible();
});

test('Verify Cart screen UI elements', async ({ page }) => {
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
