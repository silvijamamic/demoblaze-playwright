//import { test as setup } from '@playwright/test';
import { test as setup } from '../fixtures/basePage';
import { STORAGE_STATE } from '../../playwright.config';

setup('authenticate', async ({ page, loginPage }) => {
  await loginPage.goto();
  await loginPage.loginLink.click();
  await loginPage.loginClick('silvijamamic', 'password123');
  await page.waitForSelector('#nameofuser');
  await page.context().storageState({ path: STORAGE_STATE });
});
