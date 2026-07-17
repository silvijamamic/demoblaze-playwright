import { test, expect } from '../fixtures/basePage';

//Open login modal
test('Verify login modal', async ({ loginPage }) => {
  //const loginPage = new LoginPage(page);

  await loginPage.goto();
  await loginPage.loginLink.click();
  await expect.soft(loginPage.usernameTextbox).toBeVisible();
  await expect.soft(loginPage.passwordTextbox).toBeVisible();
  await expect.soft(loginPage.loginButton).toBeVisible();
  await expect(loginPage.closeButton).toBeVisible();
});

//Valid Log in
test('Valid log in', async ({ loginPage }) => {
  await loginPage.goto();
  await loginPage.loginLink.click();
  await loginPage.login('silvijamamic', 'password123');
  await loginPage.loginButton.click();
  await expect(loginPage.welcome).toBeVisible();
});

//Wrong password
test('Wrong password', async ({ loginPage, helpersPage }) => {
  await loginPage.goto();
  await loginPage.loginLink.click();
  await loginPage.login('silvijamamic', '1234');
  await helpersPage.verfiyAlertMessage('Wrong password.');
  await loginPage.loginButton.click();
});

//Empty fields username and password
test('Empty un and pw', async ({ loginPage, helpersPage }) => {
  await loginPage.goto();
  await loginPage.loginLink.click();
  await loginPage.login('', '');
  await helpersPage.verfiyAlertMessage('Please fill out Username and Password.');
  await loginPage.loginButton.click();
});

//Empty username field
test('Empty username', async ({ loginPage, helpersPage }) => {
  await loginPage.goto();
  await loginPage.loginLink.click();
  await loginPage.login('', 'password123');
  await helpersPage.verfiyAlertMessage('Please fill out Username and Password.');
  await loginPage.loginButton.click();
});

//Empty password field
test('Empty password', async ({ loginPage, helpersPage }) => {
  await loginPage.goto();
  await loginPage.loginLink.click();
  await loginPage.login('silvijamamic', '');
  await helpersPage.verfiyAlertMessage('Please fill out Username and Password.');
  await loginPage.loginButton.click();
});

//Close login modal on x
test('Close login modal on button X', async ({ loginPage }) => {
  await loginPage.goto();
  await loginPage.loginLink.click();
  await loginPage.xButton.click();
});

//Close login modal on button Close
test('Close login modal on Close', async ({ loginPage }) => {
  await loginPage.goto();
  await loginPage.loginLink.click();
  await loginPage.closeButton.click();
});

//Log out
test('Log out', async ({ loginPage }) => {
  await loginPage.goto();
  await loginPage.loginLink.click();
  await loginPage.login('silvijamamic', 'password123');
  await loginPage.loginButton.click();
  await expect.soft(loginPage.welcome).toBeVisible();
  await loginPage.logoutLink.click();
  await expect(loginPage.loginLink).toBeVisible();
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
