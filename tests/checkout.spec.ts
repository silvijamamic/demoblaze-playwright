//import { test, expect } from '@playwright/test';
import { test, expect } from './fixtures/basePage';

//Open Place order modal
test('Place order modal', async ({ checkoutPage }) => {
  await checkoutPage.goto();
  await checkoutPage.cartLink.click();
  await checkoutPage.buttonPlaceOrder.click();
  await expect.soft(checkoutPage.headingPlaceOrder).toBeVisible();
  await expect.soft(checkoutPage.textboxName).toBeVisible();
  await expect.soft(checkoutPage.textboxCountry).toBeVisible();
  await expect.soft(checkoutPage.textboxCity).toBeVisible();
  await expect.soft(checkoutPage.textboxCreditCard).toBeVisible();
  await expect.soft(checkoutPage.textboxMonth).toBeVisible();
  await expect.soft(checkoutPage.textboxYear).toBeVisible();
  await expect.soft(checkoutPage.buttonPlaceOrderClose).toBeVisible();
  await expect.soft(checkoutPage.buttonPurchase).toBeVisible();
});

//Purchase successful
test('Purchase successful', async ({ checkoutPage }) => {
  await checkoutPage.goto();
  await checkoutPage.cartLink.click();
  await checkoutPage.buttonPlaceOrder.click();
  await checkoutPage.fillPlaceOrderForm(
    'Silvija Mamic',
    'Croatia',
    'Zagreb',
    'HR0000',
    'January',
    '2026'
  );
  await checkoutPage.buttonPurchase.click();
  await expect.soft(checkoutPage.thankYou).toBeVisible();
  await expect.soft(checkoutPage.buttonOk).toBeVisible();
  await checkoutPage.buttonOk.click();
});

//Purchase - mandatory fields
test('Purchase - mandatory fields', async ({ checkoutPage, helpersPage }) => {
  await checkoutPage.goto();
  await checkoutPage.cartLink.click();
  await checkoutPage.buttonPlaceOrder.click();
  await checkoutPage.fillPlaceOrderForm('', '', '', '', '', '');
  await helpersPage.verfiyAlertMessage('Please fill out Name and Creditcard.');
  await checkoutPage.buttonPurchase.click();
});

//Close Place order modal on X button
test('Close Place order modal on X button', async ({ checkoutPage }) => {
  await checkoutPage.goto();
  await checkoutPage.cartLink.click();
  await checkoutPage.buttonPlaceOrder.click();
  await checkoutPage.buttonXPlaceOrder.click();
});

//Close Place order modal on Close button
test('Close Place order modal on Close button', async ({ checkoutPage }) => {
  await checkoutPage.goto();
  await checkoutPage.cartLink.click();
  await checkoutPage.buttonPlaceOrder.click();
  await checkoutPage.buttonPlaceOrderClose.click();
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
