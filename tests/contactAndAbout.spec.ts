import { test, expect } from '@playwright/test';
import { contactAboutPage } from '../pages/contactAbout';

//25. Contact - open and send message
test('Contact - open and send message', async ({ page }) => {
  const contactAbout = new contactAboutPage(page);

  await contactAbout.goto();
  await contactAbout.contactModal('smamic.qa@gmail.com', 'Silvija Mamic', 'Hello World!');
});

//26. Contact - close modal
test('Contact - close modal', async ({ page }) => {
  const contactAbout = new contactAboutPage(page);

  await contactAbout.goto();
  await contactAbout.closeModal();
});
//27. About us - open and close modal
test('About us', async ({ page }) => {
  const contactAbout = new contactAboutPage(page);

  await contactAbout.goto();
  await contactAbout.aboutModal();
});

test('Verify Contact modal', async ({ page }) => {
  await page.goto('https://www.demoblaze.com/index.html');
  await page.getByRole('link', { name: 'Contact' }).click();
  const locator = page.getByText('New message × Contact Email:');
  await expect(locator).toHaveCSS('display', 'flex');
  await expect(locator).toHaveCSS('position', 'relative');
  await expect(locator).toHaveCSS('font-family', 'LatoWeb');
  await expect(locator).toHaveCSS('font-size', '14.6667px');
});

test('Verify About us modal', async ({ page }) => {
  await page.goto('https://www.demoblaze.com/index.html');
  await page.getByRole('link', { name: 'About us' }).click();
  const locator = page.getByText('About us × Video Player is');
  await expect(locator).toHaveCSS('display', 'flex');
  await expect(locator).toHaveCSS('position', 'relative');
  await expect(locator).toHaveCSS('font-family', 'LatoWeb');
  await expect(locator).toHaveCSS('font-size', '14.6667px');
  await expect(locator).toHaveCSS('box-sizing', 'border-box');
});
