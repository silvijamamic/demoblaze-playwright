import { test, expect } from '@playwright/test';

//16. Open product details
test('Open product details', async ({ page }) => {
  await page.goto('https://www.demoblaze.com/index.html');
  await expect(page.getByRole('heading', { name: 'Samsung galaxy s6' })).toBeVisible();
  await page.getByRole('link', { name: 'Samsung galaxy s6' }).click();
  await expect(page.getByRole('heading', { name: 'Samsung galaxy s6' })).toBeVisible();
});

//17. Add to cart - successfull
test('Add to cart', async ({ page }) => {
  await page.goto('https://www.demoblaze.com/index.html');
  await expect(page.getByRole('link', { name: 'Samsung galaxy s6' })).toBeVisible();
  await page.getByRole('link', { name: 'Samsung galaxy s6' }).click();
  await expect(page.getByRole('heading', { name: 'Samsung galaxy s6' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Add to cart' })).toBeVisible();
  page.once('dialog', async (dialog) => {
    expect(dialog.type()).toBe('alert');
    expect(dialog.message()).toContain('Product added');
    await dialog.accept();
  });
  await page.getByRole('link', { name: 'Add to cart' }).click();
});

//18. Add to cart - more products
test('Add to cart - more products', async ({ page }) => {
  await page.goto('https://www.demoblaze.com/index.html');
  await page.getByRole('link', { name: 'Samsung galaxy s6' }).click();
  await expect(page.getByRole('heading', { name: 'Samsung galaxy s6' })).toBeVisible();

  const [d1] = await Promise.all([
    page.waitForEvent('dialog'),
    page.getByRole('link', { name: 'Add to cart' }).click(),
  ]);
  expect(d1.type()).toBe('alert');
  expect(d1.message()).toContain('Product added');
  await d1.accept();

  await page.getByRole('link', { name: 'PRODUCT STORE' }).click();
  await page.getByRole('link', { name: 'Nokia lumia 1520' }).click();
  await expect(page.getByRole('heading', { name: 'Nokia lumia 1520' })).toBeVisible();

  const [d2] = await Promise.all([
    page.waitForEvent('dialog'),
    page.getByRole('link', { name: 'Add to cart' }).click(),
  ]);
  expect(d2.type()).toBe('alert');
  expect(d2.message()).toContain('Product added');
  await d2.accept();

  await page.getByRole('link', { name: 'Cart', exact: true }).click();
  await expect(page).toHaveURL(/cart\.html/);
  await expect(page.getByRole('cell', { name: 'Samsung galaxy s6' })).toBeVisible();
  await expect(page.getByRole('cell', { name: 'Nokia lumia 1520' })).toBeVisible();
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
