import { test, expect } from '@playwright/test';
import { SignUpPage } from '../pages/signUp';
import { helpersPage } from '../pages/helpers';

//Open Sign Up modal
test('Open Sign up modal', async ({ page }) => {
  const signUp = new SignUpPage(page);

  await signUp.goto();
  await signUp.topNavigationSignUp();
  await expect.soft(signUp.titleSignUp).toBeVisible();
  await expect.soft(signUp.usernameTextboxSignUp).toBeVisible();
  await expect.soft(signUp.passwordTextboxSignUp).toBeVisible();
  await expect.soft(signUp.buttonXSignUp).toBeVisible();
  await expect.soft(signUp.buttonSignUp).toBeVisible();
  await expect.soft(signUp.buttonClose).toBeVisible();
});

//Valid Sign up
test('Valid Sign up', async ({ page }) => {
  const signUp = new SignUpPage(page);
  const username = `silvija_${Date.now()}`;
  const alert = new helpersPage(page);

  await signUp.goto();
  await signUp.topNavigationSignUp();
  await signUp.modalSignUp(username, 'password123');
  await alert.alertDialog('Sign up successful.', async () => {
    await signUp.buttonSignUp.click();
  });
});

//Invalid Sign up
test('Invalid Sign up', async ({ page }) => {
  const signUp = new SignUpPage(page);
  const alert = new helpersPage(page);

  await signUp.goto();
  await signUp.topNavigationSignUp();
  await signUp.modalSignUp('', 'password123');
  await alert.alertDialog('Please fill out Username and Password.', async () => {
    await signUp.buttonSignUp.click();
  });
});

//User already exist
test('User already exist', async ({ page }) => {
  const signUp = new SignUpPage(page);
  const alert = new helpersPage(page);

  await signUp.goto();
  await signUp.topNavigationSignUp();
  await signUp.modalSignUp('silvijamamic', 'password');
  await alert.alertDialog('This user already exist.', async () => {
    await signUp.buttonSignUp.click();
  });
});

//Close SignUp modal on X
test('Close Sign Up modal on X button', async ({ page }) => {
  const signUp = new SignUpPage(page);

  await signUp.goto();
  await signUp.topNavigationSignUp();
  await signUp.buttonXSignUp.click();
});

//Close Sign Up modal on Close button
test('Close Sign Up modal on Close button', async ({ page }) => {
  const signUp = new SignUpPage(page);

  await signUp.goto();
  await signUp.topNavigationSignUp();
  await signUp.buttonClose.click();
});

//Verify Sign Up UI modal
test('Verify Sign Up modal elements', async ({ page }) => {
  await page.goto('https://www.demoblaze.com/index.html');
  await page.getByRole('link', { name: 'Sign up' }).click();
  const locator = page.getByText('Sign up × Username: Password');
  await expect(locator).toHaveCSS('display', 'flex');
  await expect(locator).toHaveCSS('font-weight', '400');
  await expect(locator).toHaveCSS('color', 'rgb(134, 134, 136)');
});
