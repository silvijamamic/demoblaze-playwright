import { test, expect } from '@playwright/test';
import { contactAboutPage } from '../pages/contactAbout';
import { helpersPage } from '../pages/helpers';

//Contact - open contact modal
test('Contact - open and send message', async ({ page }) => {
  const contactAbout = new contactAboutPage(page);

  await contactAbout.goto();
  await contactAbout.topNavigationContact();
  await expect.soft(contactAbout.headingNewMessage).toBeVisible();
  await expect.soft(contactAbout.emailTextbox).toBeVisible();
  await expect.soft(contactAbout.contactNameTextbox).toBeVisible();
  await expect.soft(contactAbout.messageTextbox).toBeVisible();
  await expect.soft(contactAbout.closeNewMessage).toBeVisible();
  await expect.soft(contactAbout.buttonSendMessage).toBeVisible();
});

//Contact - send message
test('Contact - send message', async ({ page }) => {
  const contactAbout = new contactAboutPage(page);
  const alert = new helpersPage(page);

  await contactAbout.goto();
  await contactAbout.topNavigationContact();
  await contactAbout.contactModal('smamic.qa@gmail.com', 'Silvija Mamic', 'Hello World!');
  await alert.alertDialog('Thanks for the message!!', async () => {
    await contactAbout.buttonSendMessage.click();
  });
});

//Contact - close modal on Close button
test('Contact - close modal on Close button', async ({ page }) => {
  const contactAbout = new contactAboutPage(page);

  await contactAbout.goto();
  await contactAbout.topNavigationContact();
  await contactAbout.closeNewMessage.click();
});

//Close modal on X button
test('Contact - close modal on X button', async ({ page }) => {
  const contactAbout = new contactAboutPage(page);

  await contactAbout.goto();
  await contactAbout.topNavigationContact();
  await contactAbout.closeXButtonContact.click();
});

//About us - open modal
test('About us - open modal', async ({ page }) => {
  const contactAbout = new contactAboutPage(page);

  await contactAbout.goto();
  await contactAbout.topNavigationAbout();
  await expect.soft(contactAbout.headingAboutUs).toBeVisible();
  await expect.soft(contactAbout.video).toBeVisible();
  await expect(contactAbout.closeAbout).toBeVisible();
});

//About us - play video
test('About us - play video', async ({ page }) => {
  const contactAbout = new contactAboutPage(page);

  await contactAbout.goto();
  await contactAbout.topNavigationAbout();
  await expect.soft(contactAbout.headingAboutUs).toBeVisible();
  await contactAbout.playVideo.click();
  await contactAbout.closeAbout.click();
});

//About us - close on Close button
test('About us - close on Close button', async ({ page }) => {
  const contactAbout = new contactAboutPage(page);

  await contactAbout.goto();
  await contactAbout.topNavigationAbout();
  await expect.soft(contactAbout.headingAboutUs).toBeVisible();
  await contactAbout.closeAbout.click();
});

//About us - close on X button
test('About us - close on X button', async ({ page }) => {
  const contactAbout = new contactAboutPage(page);

  await contactAbout.goto();
  await contactAbout.topNavigationAbout();
  await expect.soft(contactAbout.headingAboutUs).toBeVisible();
  await contactAbout.closeXButtonAbout.click();
});

test('Verify Contact modal UI elements', async ({ page }) => {
  await page.goto('https://www.demoblaze.com/index.html');
  await page.getByRole('link', { name: 'Contact' }).click();
  const locator = page.getByText('New message × Contact Email:');
  await expect(locator).toHaveCSS('display', 'flex');
  await expect(locator).toHaveCSS('position', 'relative');
  await expect(locator).toHaveCSS('font-family', 'LatoWeb');
  await expect(locator).toHaveCSS('font-size', '14.6667px');
});

test('Verify About us modal UI elements', async ({ page }) => {
  await page.goto('https://www.demoblaze.com/index.html');
  await page.getByRole('link', { name: 'About us' }).click();
  const locator = page.getByText('About us × Video Player is');
  await expect(locator).toHaveCSS('display', 'flex');
  await expect(locator).toHaveCSS('position', 'relative');
  await expect(locator).toHaveCSS('font-family', 'LatoWeb');
  await expect(locator).toHaveCSS('font-size', '14.6667px');
  await expect(locator).toHaveCSS('box-sizing', 'border-box');
});
