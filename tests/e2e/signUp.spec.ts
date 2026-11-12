//import { test, expect } from '@playwright/test';
import { test, expect } from '../fixtures/basePage';

test.use({
  storageState: {
    cookies: [],
    origins: [],
  },
});

//Open Sign Up modal
test('Open Sign up modal', async ({ signUpPage }) => {
  await signUpPage.goto();
  await signUpPage.linkSignUp.click();
  await expect.soft(signUpPage.titleSignUp).toBeVisible();
  await expect.soft(signUpPage.usernameTextboxSignUp).toBeVisible();
  await expect.soft(signUpPage.passwordTextboxSignUp).toBeVisible();
  await expect.soft(signUpPage.buttonXSignUp).toBeVisible();
  await expect.soft(signUpPage.buttonSignUp).toBeVisible();
  await expect(signUpPage.buttonClose).toBeVisible();
});

//Valid Sign up
test('Valid Sign up', async ({ signUpPage, helpersPage }) => {
  const username = `silvija_${Date.now()}`;

  await signUpPage.goto();
  await signUpPage.linkSignUp.click();
  await signUpPage.fillSignUpForm(username, 'password123');
  await helpersPage.verfiyAlertMessage('Sign up successful.');
  await signUpPage.buttonSignUp.click();
});

//Invalid Sign up
test('Invalid Sign up', async ({ signUpPage, helpersPage }) => {
  await signUpPage.goto();
  await signUpPage.linkSignUp.click();
  await signUpPage.fillSignUpForm('', 'password123');
  await helpersPage.verfiyAlertMessage('Please fill out Username and Password.');
  await signUpPage.buttonSignUp.click();
});

//User already exist
test('User already exist', async ({ signUpPage, helpersPage }) => {
  await signUpPage.goto();
  await signUpPage.linkSignUp.click();
  await signUpPage.fillSignUpForm('silvijamamic', 'password');
  await helpersPage.verfiyAlertMessage('This user already exist');
  await signUpPage.buttonSignUp.click();
});

//Close SignUp modal on X
test('Close Sign Up modal on X button', async ({ signUpPage }) => {
  await signUpPage.goto();
  await signUpPage.linkSignUp.click();
  await signUpPage.buttonXSignUp.click();
});

//Close Sign Up modal on Close button
test('Close Sign Up modal on Close button', async ({ signUpPage }) => {
  await signUpPage.goto();
  await signUpPage.linkSignUp.click();
  await signUpPage.buttonClose.click();
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
