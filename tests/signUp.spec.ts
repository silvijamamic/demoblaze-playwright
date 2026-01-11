import { test, expect } from '@playwright/test';

//8. Open Sign Up modal
test('open Sign up modal', async ({ page }) => {
  await page.goto('https://www.demoblaze.com/index.html');
  await page.getByRole('link', { name: 'Sign up' }).click();
  await expect(page.getByText('Sign up ×')).toBeVisible();
});

//9. Valid Sign up
test('Valid Sign up', async ({ page }) => {
  await page.goto('https://www.demoblaze.com/index.html');
  await page.getByRole('link', { name: 'Sign up' }).click();
  const username = `silvija_${Date.now()}`;
  await page.getByRole('textbox', { name: 'Username' }).fill(username);
  await page.getByRole('textbox', { name: 'Password' }).fill('password123');
  page.once('dialog', async (dialog) => {
    expect(dialog.type()).toBe('alert');
    expect(dialog.message()).toContain('Sign up successful.');
    await dialog.accept();
  });
  await page.getByRole('button', { name: 'Sign up' }).click();
});

//10. Invalid Sign up
test('Invalid Sign up', async ({ page }) => {
  await page.goto('https://www.demoblaze.com/index.html');
  await page.getByRole('link', { name: 'Sign up' }).click();
  await page.getByRole('textbox', { name: 'Username' }).fill('');
  await page.getByRole('textbox', { name: 'Password' }).fill('password123');
  page.once('dialog', async (dialog) => {
    expect(dialog.type()).toBe('alert');
    expect(dialog.message()).toContain('Please fill out Username and Password.');
    await dialog.accept();
  });
  await page.getByRole('button', { name: 'Sign up' }).click();
});

//11. User already exist
test('User already exist', async ({ page }) => {
  await page.goto('https://www.demoblaze.com/index.html');
  await page.getByRole('link', { name: 'Sign up' }).click();
  await page.getByRole('textbox', { name: 'Username' }).fill('admin');
  await page.getByRole('textbox', { name: 'Password' }).fill('password123');
  page.once('dialog', async (dialog) => {
    expect(dialog.type()).toBe('alert');
    expect(dialog.message()).toContain('This user already exist.');
    await dialog.accept();
  });
  await page.getByRole('button', { name: 'Sign up' }).click();
});
