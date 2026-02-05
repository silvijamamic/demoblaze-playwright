import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login';
import { helpersPage } from '../pages/helpers';

//Open login modal
test('Verify login modal', async ({ page }) => {
  const login = new LoginPage(page);

  await login.goto();
  await login.topNavigationLogin();
  await expect.soft(login.usernameTextbox).toBeVisible();
  await expect.soft(page.locator('#loginpassword')).toBeVisible();
  await expect.soft(page.getByRole('button', { name: 'Log in' })).toBeVisible();
  await expect(page.getByLabel('Log in').getByText('Close')).toBeVisible();
});

//Valid Log in
test('Valid log in', async ({ page }) => {
  const login = new LoginPage(page);

  await login.goto();
  await login.topNavigationLogin();
  await login.loginModal('silvijamamic', 'password123');
  await login.loginButton.click();
  await expect(page.getByRole('link', { name: 'Welcome silvijamamic' })).toBeVisible();
});

//Wrong password
test('Wrong password', async ({ page }) => {
  const login = new LoginPage(page);
  const alert = new helpersPage(page);

  await login.goto();
  await login.topNavigationLogin();
  await login.loginModal('silvijamamic', '1234');
  await alert.alertDialog('Wrong password.', () => login.loginButton.click());
});

//Empty fields username and password
test('Empty un and pw', async ({ page }) => {
  const login = new LoginPage(page);
  const alert = new helpersPage(page);

  await login.goto();
  await login.topNavigationLogin();
  await login.loginModal('', '');
  await alert.alertDialog('Please fill out Username and Password.', () =>
    login.loginButton.click()
  );
});

//Empty username field
test('Empty username', async ({ page }) => {
  const login = new LoginPage(page);
  const alert = new helpersPage(page);

  await login.goto();
  await login.topNavigationLogin();
  await login.loginModal('', 'password123');
  await alert.alertDialog('Please fill out Username and Password.', () =>
    login.loginButton.click()
  );
});

//Empty password field
test('Empty password', async ({ page }) => {
  const login = new LoginPage(page);
  const alert = new helpersPage(page);

  await login.goto();
  await login.topNavigationLogin();
  await login.loginModal('silvijamamic', '');
  await alert.alertDialog('Please fill out Username and Password.', () =>
    login.loginButton.click()
  );
});

//Close login modal on x
test('Close login modal on button X', async ({ page }) => {
  const login = new LoginPage(page);

  await login.goto();
  await login.topNavigationLogin();
  await page.getByRole('dialog', { name: 'Log in' }).getByLabel('Close').click();
});

//Close login modal on button Close
test('Close login modal on Close', async ({ page }) => {
  const login = new LoginPage(page);

  await login.goto();
  await login.topNavigationLogin();
  await page.getByLabel('Log in').getByText('Close').click();
});

//Log out
test('Log out', async ({ page }) => {
  const login = new LoginPage(page);

  await login.goto();
  await login.topNavigationLogin();
  await login.loginModal('silvijamamic', 'password123');
  await page.getByRole('button', { name: 'Log in' }).click();
  await expect.soft(page.getByRole('link', { name: 'Welcome silvijamamic' })).toBeVisible();
  await login.logoutLink.click();
  await expect.soft(page.getByRole('link', { name: 'Log in' })).toBeVisible();
});

//Verify UI elements
test('Verify Log in modal UI elements', async ({ page }) => {
  await page.goto('https://www.demoblaze.com/index.html');
  await page.getByRole('link', { name: 'Log in' }).click();
  const locator = page.locator('#logInModal');
  await expect(locator).toHaveCSS('display', 'block');
  await expect(locator).toHaveCSS('font-weight', '400');
  await expect(locator).toHaveCSS('color', 'rgb(134, 134, 136)');
});
