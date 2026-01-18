import { test, expect } from '@playwright/test';

//25. Contact - open and send message
test('Contact - open and send message', async ({ page }) => {
  await page.goto('https://www.demoblaze.com/index.html');
  await page.getByRole('link', { name: 'Contact' }).click();
  //New message
  await expect(page.getByText('New message')).toBeVisible();
  //verify modal
  await expect(page.locator('#recipient-email')).toBeVisible();
  await expect(page.getByRole('textbox', { name: 'Contact Email: Contact Name:' })).toBeVisible();
  await expect(page.getByRole('textbox', { name: 'Message' })).toBeVisible();
  await expect(page.getByText('Close Send message')).toBeVisible();
  //fill form
  await page.locator('#recipient-email').fill('smamic.qa@gmail.com');
  await page.getByRole('textbox', { name: 'Contact Name' }).fill('Silvija Mamic');
  await page.getByRole('textbox', { name: 'Message' }).fill('Hello World!');
  page.once('dialog', async (dialog) => {
    expect(dialog.type()).toBe('alert');
    expect(dialog.message()).toContain('Thanks for the message!!');
    await dialog.accept();
  });
  await page.getByRole('button', { name: 'Send message' }).click();
});

//26. Contact - close modal
test('Contact - close modal', async ({ page }) => {
  await page.goto('https://www.demoblaze.com/index.html');
  await page.getByRole('link', { name: 'Contact' }).click();
  //New message
  await expect(page.getByText('New message')).toBeVisible();
  //klik Close
  await page.getByLabel('New message').getByText('Close').click();
  //provjera da je na home page-u
  await expect(page.getByRole('link', { name: 'Contact' })).toBeVisible();
});
//27. About us - open and close modal
test('About us', async ({ page }) => {
  await page.goto('https://www.demoblaze.com/index.html');
  await page.getByRole('link', { name: 'About us' }).click();
  //About us
  await expect(page.getByText('About us ×')).toBeVisible();
  await expect(page.locator('#videoModal').getByText('Close', { exact: true })).toBeVisible();
  //klik Close
  await page.locator('#videoModal').getByText('Close', { exact: true }).click();
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
