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
  page.once('dialog', async (dialog) => {
    expect(dialog.type()).toBe('alert');
    expect(dialog.message()).toContain('Product added');
    await dialog.accept();
  });
  await page.getByRole('link', { name: 'Add to cart' }).click();
  //idem u Cart
  await page.getByRole('link', { name: 'Cart', exact: true }).click();
  //delete prvi product
  await page.getByRole('link', { name: 'Delete' }).first().click();
});

//21. Empty cart - možda maknut?
test('Empty cart', async ({ page }) => {
  await page.goto('https://www.demoblaze.com/index.html');
  await page.getByRole('link', { name: 'Cart' }).click();
  await expect(page.getByRole('link', { name: 'Delete' })).not.toBeVisible();
});
