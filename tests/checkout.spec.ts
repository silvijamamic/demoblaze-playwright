import { test, expect } from '@playwright/test';

//22. Open Place order modal
test('Place order modal', async ({ page }) => {
  await page.goto('https://www.demoblaze.com/index.html');
  await page.getByRole('link', { name: 'Cart' }).click();
  await expect(page.getByRole('button', { name: 'Place order' })).toBeVisible();
  await page.getByRole('button', { name: 'Place order' }).click();

  //open place order
  await expect(page.getByRole('heading', { name: 'Place Order' })).toBeVisible();

  await expect(page.getByRole('textbox', { name: 'Name' })).toBeVisible();
  await expect(page.getByRole('textbox', { name: 'Country' })).toBeVisible();
  await expect(page.getByRole('textbox', { name: 'City' })).toBeVisible();
  await expect(page.getByRole('textbox', { name: 'Credit card' })).toBeVisible();
  await expect(page.getByRole('textbox', { name: 'Month' })).toBeVisible();
  await expect(page.getByRole('textbox', { name: 'Year' })).toBeVisible();
  await expect(page.getByLabel('Place order').getByText('Close')).toBeVisible();
  await expect(page.getByRole('button', { name: 'Purchase' })).toBeVisible();
});

//23. Purchase successful
test('Purchase successful', async ({ page }) => {
  await page.goto('https://www.demoblaze.com/index.html');
  //Add to cart
  await page.getByRole('link', { name: 'Samsung galaxy s6' }).click();
  await page.getByRole('link', { name: 'Add to cart' }).click();
  //Cart
  await page.getByRole('link', { name: 'Cart', exact: true }).click();
  await page.getByRole('button', { name: 'Place Order' }).click();
  //Place order
  await page.getByRole('textbox', { name: 'Name' }).fill('Silvija Mamic');
  await page.getByRole('textbox', { name: 'Country' }).fill('Croatia');
  await page.getByRole('textbox', { name: 'City' }).fill('Zagreb');
  await page.getByRole('textbox', { name: 'Credit Card' }).fill('HR000000');
  await page.getByRole('textbox', { name: 'Month' }).fill('December');
  await page.getByRole('textbox', { name: 'Year' }).fill('2025');
  await page.getByRole('button', { name: 'Purchase' }).click();
  //Confirmation
  await expect(page.getByText('Thank you for your purchase!')).toBeVisible();
  await expect(page.getByRole('button', { name: 'OK' })).toBeVisible();
  await page.getByRole('button', { name: 'OK' }).click();
});

//24. Purchase - mandatory fields
test('Purchase - mandatory fields', async ({ page }) => {
  await page.goto('https://www.demoblaze.com/index.html');
  await page.getByRole('link', { name: 'Cart' }).click();
  await page.getByRole('button', { name: 'Place Order' }).click();
  await expect(page.getByLabel('Place order').getByText('Close')).toBeVisible();
  page.once('dialog', async (dialog) => {
    expect(dialog.type()).toBe('alert');
    expect(dialog.message()).toContain('Please fill out Name and Creditcard.');
    await dialog.accept();
  });
  await page.getByRole('button', { name: 'Purchase' }).click();
});
