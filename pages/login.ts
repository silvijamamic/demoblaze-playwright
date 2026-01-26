import { Page, Locator, expect } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly loginLink: Locator;
  readonly usernameTextbox: Locator;
  readonly passwordTextbox: Locator;
  readonly loginButton: Locator;
  readonly closeButton: Locator;
  readonly logoutLink: Locator;

  constructor(page: Page) {
    this.page = page;

    this.loginLink = page.getByRole('link', { name: 'Log in' });
    this.usernameTextbox = page.locator('#loginusername');
    this.passwordTextbox = page.locator('#loginpassword');
    this.loginButton = page.getByRole('button', { name: 'Log in' });
    this.closeButton = page.getByLabel('Log in').getByText('Close');
    this.logoutLink = page.getByRole('link', { name: 'Log out' });
  }

  async goto() {
    await this.page.goto('https://www.demoblaze.com/index.html');
  }

  async openLoginModal() {
    await this.loginLink.click();
    await expect.soft(this.usernameTextbox).toBeVisible();
    await expect.soft(this.passwordTextbox).toBeVisible();
    await expect.soft(this.loginButton).toBeVisible();
    await expect.soft(this.closeButton).toBeVisible();
  }

  async validLogin(username: string, password: string) {
    //await this.loginLink.click();
    await this.usernameTextbox.fill(username);
    await this.passwordTextbox.fill(password);
    await this.loginButton.click();
    await expect.soft(this.page.getByRole('link', { name: 'Welcome silvijamamic' })).toBeVisible(); //questin: zar ne mora ovo isto biti constructor
  }

  async wrongPassword(username: string, password: string) {
    //await this.loginLink.click();
    this.page.once('dialog', async (dialog) => {
      expect(dialog.type()).toBe('alert');
      expect(dialog.message()).toContain('Wrong password');
      await dialog.accept();
    });
    await this.usernameTextbox.fill(username);
    await this.passwordTextbox.fill(password);
    await this.loginButton.click();
  }

  async logout(username: string, password: string) {
    await this.usernameTextbox.fill(username);
    await this.passwordTextbox.fill(password);
    await this.loginButton.click();
    await expect.soft(this.page.getByRole('link', { name: 'Welcome silvijamamic' })).toBeVisible();
    await this.logoutLink.click();
    await expect.soft(this.loginButton).toBeVisible();
  }
}
