//import { test as setup, expect } from '@playwright/test';
import { test as setup, expect } from './tests/fixtures/basePage';
import { STORAGE_STATE } from './playwright.config';

const username = process.env.USERNAME;
const password = process.env.PASSWORD;

setup('Log in', async ({ page, loginPage }) => {
  await loginPage.goto();
  await loginPage.loginLink.click();
  //await loginPage.login('silvijamamic', 'password123');

  await loginPage.usernameTextbox.fill(username as string);
  await loginPage.passwordTextbox.fill(password as string);

  await loginPage.loginButton.click();
  await expect(loginPage.welcome).toBeVisible({ timeout: 20000 });

  await page.context().storageState({ path: STORAGE_STATE });
});
