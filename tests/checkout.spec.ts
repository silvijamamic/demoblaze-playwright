import { test, expect } from '@playwright/test';
import { checkoutPage } from '../pages/checkout';

//22. Open Place order modal
test('Place order modal', async ({ page }) => {
  const checkout = new checkoutPage(page);

  await checkout.goto();
  await checkout.placeOrderModal();
});

//23. Purchase successful
test('Purchase successful', async ({ page }) => {
  const checkout = new checkoutPage(page);

  await checkout.goto();
  await checkout.purchaseSuccessful(
    'Silvija Mamic',
    'Croatia',
    'Zagreb',
    'HR0000',
    'January',
    '2026'
  );
});

//24. Purchase - mandatory fields
test('Purchase - mandatory fields', async ({ page }) => {
  const checkout = new checkoutPage(page);

  await checkout.goto();
  await checkout.mandatoryFields();
});

test('Verify Place order bottom sheet', async ({ page }) => {
  await page.goto('https://www.demoblaze.com/index.html');
  await page.getByRole('link', { name: 'Cart' }).click();
  await page.getByRole('button', { name: 'Place order' }).click();
  const locator = page.getByText('Place order × Total: Name:');
  await expect(locator).toHaveCSS('background-clip', 'padding-box');
  await expect(locator).toHaveCSS('color', 'rgb(41, 43, 44)');
  await expect(locator).toHaveCSS('display', 'flex');
  await expect(locator).toHaveCSS('position', 'relative');
});

test('Verify Close and Purchase buttons', async ({ page }) => {
  await page.goto('https://www.demoblaze.com/index.html');
  await page.getByRole('link', { name: 'Cart' }).click();
  await page.getByRole('button', { name: 'Place order' }).click();
  const locator = page.getByText('Close Purchase');
  await expect(locator).toHaveCSS('align-items', 'center');
  await expect(locator).toHaveCSS('display', 'flex');
  await expect(locator).toHaveCSS('font-size', '14.6667px');
});
