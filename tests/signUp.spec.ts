import { test, expect } from '@playwright/test';
import { SignUpPage } from '../pages/signUp';

//8. Open Sign Up modal
test('open Sign up modal', async ({ page }) => {
  const signUp = new SignUpPage(page);

  await signUp.goto();
  await signUp.openSignUpModal();
});

//9. Valid Sign up
test('Valid Sign up', async ({ page }) => {
  const signUp = new SignUpPage(page);

  await signUp.goto();
  await signUp.openSignUpModal();
  await signUp.validSignUp('password123');

  page.once('dialog', async (dialog) => {
    expect(dialog.type()).toBe('alert');
    expect(dialog.message()).toContain('Sign up successful.');
    await dialog.accept();
  });
});

//10. Invalid Sign up
test('Invalid Sign up', async ({ page }) => {
  const signUp = new SignUpPage(page);

  await signUp.goto();
  await signUp.openSignUpModal();
  await signUp.invalidSignUp('', 'password123');

  page.once('dialog', async (dialog) => {
    expect(dialog.type()).toBe('alert');
    expect(dialog.message()).toContain('Please fill out Username and Password.');
    await dialog.accept();
  });
});

//11. User already exist
test('User already exist', async ({ page }) => {
  const signUp = new SignUpPage(page);

  await signUp.goto();
  await signUp.openSignUpModal();
  await signUp.userAlreadyExist('admin', 'password123');

  page.once('dialog', async (dialog) => {
    expect(dialog.type()).toBe('alert');
    expect(dialog.message()).toContain('This user already exist.');
    await dialog.accept();
  });
});

test('Verify Sign Up modal elements', async ({ page }) => {
  await page.goto('https://www.demoblaze.com/index.html');
  await page.getByRole('link', { name: 'Sign up' }).click();
  const locator = page.getByText('Sign up × Username: Password');
  await expect(locator).toHaveCSS('display', 'flex');
  await expect(locator).toHaveCSS('font-weight', '400');
  await expect(locator).toHaveCSS('color', 'rgb(134, 134, 136)');
});
