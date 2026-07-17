//import { test, expect } from '@playwright/test';
import { test, expect } from '../fixtures/basePage';
//import { ContactPage } from '../pages/contact';

//Contact - open contact modal
test('Contact - open and send message', async ({ contactPage }) => {
  //const contactPage = new ContactPage(page);

  await contactPage.goto();
  await contactPage.contactLink.click();
  await expect.soft(contactPage.headingNewMessage).toBeVisible();
  await expect.soft(contactPage.emailTextbox).toBeVisible();
  await expect.soft(contactPage.contactNameTextbox).toBeVisible();
  await expect.soft(contactPage.messageTextbox).toBeVisible();
  await expect.soft(contactPage.closeNewMessage).toBeVisible();
  await expect.soft(contactPage.buttonSendMessage).toBeVisible();
});

//Contact - send message
test('Contact - send message', async ({ contactPage, helpersPage }) => {
  await contactPage.goto();
  await contactPage.contactLink.click();
  await contactPage.fillContactForm('smamic.qa@gmail.com', 'Silvija Mamic', 'Hello World!');
  await helpersPage.verfiyAlertMessage('Thanks for the message!!');
  await contactPage.buttonSendMessage.click();
});

//Contact - close modal on Close button
test('Contact - close modal on Close button', async ({ contactPage }) => {
  await contactPage.goto();
  await contactPage.contactLink.click();
  await contactPage.closeNewMessage.click();
});

//Close modal on X button
test('Contact - close modal on X button', async ({ contactPage }) => {
  await contactPage.goto();
  await contactPage.contactLink.click();
  await contactPage.closeXButtonContact.click();
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
