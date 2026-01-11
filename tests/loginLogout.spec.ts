import { test, expect } from '@playwright/test';

//12. Open login modal
test('open login modal', async ({ page }) => {
  await page.goto('https://www.demoblaze.com/index.html');
  await page.getByRole('link', { name: 'Log in' }).click();
  await expect.soft(page.locator('#loginusername')).toBeVisible();
  await expect.soft(page.locator('#loginpassword')).toBeVisible();
  await expect.soft(page.getByRole('button', { name: 'Log in' })).toBeVisible();
  await expect(page.getByLabel('Log in').getByText('Close')).toBeVisible();
});
//13. Valid Log in
test('Valid log in', async ({ page }) => {
  await page.goto('https://www.demoblaze.com/index.html');
  await page.getByRole('link', { name: 'Log in' }).click();
  await page.locator('#loginusername').fill('silvijamamic');
  await page.locator('#loginpassword').fill('password123');
  await page.getByRole('button', { name: 'Log in' }).click();
  await expect(page.getByRole('link', { name: 'Welcome silvijamamic' })).toBeVisible();
});

//14. Wrong password
test('Wrong password', async ({ page }) => {
  await page.goto('https://www.demoblaze.com/index.html');
  await page.getByRole('link', { name: 'Log in' }).click();
  await page.locator('#loginusername').fill('silvijamamic');
  await page.locator('#loginpassword').fill('1234');
  page.once('dialog', async (dialog) => {
    expect(dialog.type()).toBe('alert');
    expect(dialog.message()).toContain('Wrong password');
    await dialog.accept();
  });
  await page.getByRole('button', { name: 'Log in' }).click();
});
//15. Log out
test('Log out', async ({ page }) => {
  await page.goto('https://www.demoblaze.com/index.html');

  await page.getByRole('link', { name: 'Log in' }).click();
  await page.locator('#loginusername').fill('silvijamamic');
  await page.locator('#loginpassword').fill('password123');
  await page.getByRole('button', { name: 'Log in' }).click();
  await expect(page.getByRole('link', { name: 'Welcome silvijamamic' })).toBeVisible();
  await page.getByRole('link', { name: 'Log out' }).click();
  await expect(page.getByRole('link', { name: 'Log in' })).toBeVisible();
});
