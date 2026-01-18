import { test, expect } from '@playwright/test';

//19. Cart - view
test('Cart - view', async ({ page }) => {
  await page.goto('https://www.demoblaze.com/index.html');
  await page.getByRole('link', { name: 'Cart' }).click();
  await expect(page.getByRole('heading', { name: 'Products' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Place Order' })).toBeVisible();
});
//20. Delete product from cart
test('Delete products from cart', async ({ page }) => {
  await page.goto('https://www.demoblaze.com/index.html');
  await page.getByRole('link', { name: 'Samsung galaxy s6' }).click();
  //alert
  const [dialog] = await Promise.all([
    page.waitForEvent('dialog'),
    page.getByRole('link', { name: 'Add to cart' }).click(),
  ]);
  await dialog.accept();
  //idem u Cart
  await Promise.all([
    page.waitForURL('**/cart.html'),
    page.getByRole('link', { name: 'Cart', exact: true }).click(),
  ]);
  //delete product
  const rows = page.locator('#tbodyid tr');
  await expect(rows).toHaveCount(1);
  await page.getByRole('link', { name: 'Delete' }).first().click();
  //await expect(page.getByRole('cell', { name: 'Samsung galaxy s6' })).not.toBeVisible();
});

//21. Empty cart
test('Empty cart', async ({ page }) => {
  await page.goto('https://www.demoblaze.com/index.html');
  await page.getByRole('link', { name: 'Cart' }).click();
  await expect(page.getByRole('link', { name: 'Delete' })).not.toBeVisible();
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
  await expect(locator).toHaveCSS('background-color', 'rgb(52, 168, 83)');
  await expect(locator).toHaveCSS('display', 'inline-block');
  await expect(locator).toHaveCSS('font-family', 'sans-serif');
  await expect(locator).toHaveCSS('font-size', '16px');
});
