import { test, expect } from '@playwright/test';
import { checkoutPage } from '../pages/checkout';
import { helpersPage } from '../pages/helpers';

//22. Open Place order modal
test('Place order modal', async ({ page }) => {
  const checkout = new checkoutPage(page);

  await checkout.goto();
  await checkout.topNavigationCart();
  await checkout.buttonPlaceOrder.click();
  await expect.soft(checkout.headingPlaceOrder).toBeVisible();
  await expect.soft(checkout.textboxName).toBeVisible();
  await expect.soft(checkout.textboxCountry).toBeVisible();
  await expect.soft(checkout.textboxCity).toBeVisible();
  await expect.soft(checkout.textboxCreditCard).toBeVisible();
  await expect.soft(checkout.textboxMonth).toBeVisible();
  await expect.soft(checkout.textboxYear).toBeVisible();
  await expect.soft(checkout.buttonPlaceOrderClose).toBeVisible();
  await expect.soft(checkout.buttonPurchase).toBeVisible();
});

//Purchase successful
test('Purchase successful', async ({ page }) => {
  const checkout = new checkoutPage(page);

  await checkout.goto();
  await checkout.topNavigationCart();
  await checkout.buttonPlaceOrder.click();
  await checkout.placeOrderModal('Silvija Mamic', 'Croatia', 'Zagreb', 'HR0000', 'January', '2026');
  await checkout.buttonPurchase.click();
  await expect.soft(checkout.thankYou).toBeVisible();
  await expect.soft(checkout.buttonOk).toBeVisible();
  await checkout.buttonOk.click();
});

//Purchase - mandatory fields
test('Purchase - mandatory fields', async ({ page }) => {
  const checkout = new checkoutPage(page);
  const alert = new helpersPage(page);

  await checkout.goto();
  await checkout.topNavigationCart();
  await checkout.buttonPlaceOrder.click();
  await checkout.placeOrderModal('', '', '', '', '', '');

  // await Promise.all([
  //   alert.alertDialog('Please fill out Name and Creditcard.'),
  //   checkout.buttonPurchase.click(),
  // ]);
  await alert.alertDialog('Please fill out Name and Creditcard.', async () => {
    await checkout.buttonPurchase.click();
  });
});

//Close Place order modal on X button
test('Close Place order modal on X button', async ({ page }) => {
  const checkout = new checkoutPage(page);

  await checkout.goto();
  await checkout.topNavigationCart();
  await checkout.buttonPlaceOrder.click();
  await checkout.buttonXPlaceOrder.click();
});

//Close Place order modal on Close button
test('Close Place order modal on Close button', async ({ page }) => {
  const checkout = new checkoutPage(page);

  await checkout.goto();
  await checkout.topNavigationCart();
  await checkout.buttonPlaceOrder.click();
  await checkout.buttonPlaceOrderClose.click();
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
