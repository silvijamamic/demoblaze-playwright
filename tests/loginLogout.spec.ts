import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login';

//12. Open login modal
test('open login modal', async ({ page }) => {
  const login = new LoginPage(page);

  await login.goto();
  await login.openLoginModal();
});

//13. Valid Log in
test('Valid log in', async ({ page }) => {
  const login = new LoginPage(page);

  await login.goto();
  await login.openLoginModal();
  await login.validLogin('silvijamamic', 'password123');
});

//14. Wrong password
test('Wrong password', async ({ page }) => {
  const login = new LoginPage(page);

  await login.goto();
  await login.openLoginModal();
  await login.wrongPassword('silvijamamic', '1234');
});
//15. Log out
test('Log out', async ({ page }) => {
  const login = new LoginPage(page);

  await login.goto();
  await login.openLoginModal();
  await login.validLogin('silvijamamic', 'password123');
});

test('Verify Log in modal elements', async ({ page }) => {
  await page.goto('https://www.demoblaze.com/index.html');
  await page.getByRole('link', { name: 'Log in' }).click();
  const locator = page.locator('#logInModal');
  await expect(locator).toHaveCSS('display', 'block');
  await expect(locator).toHaveCSS('font-weight', '400');
  await expect(locator).toHaveCSS('color', 'rgb(134, 134, 136)');
});
