import { Page, Locator, expect } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly loginLink: Locator;
  readonly usernameTextbox: Locator;
  readonly passwordTextbox: Locator;
  readonly loginButton: Locator;
  readonly closeButton: Locator;
  readonly logoutLink: Locator;
  readonly xButton: Locator;

  constructor(page: Page) {
    this.page = page;

    this.loginLink = page.getByRole('link', { name: 'Log in' });
    this.usernameTextbox = page.locator('#loginusername');
    this.passwordTextbox = page.locator('#loginpassword');
    this.loginButton = page.getByRole('button', { name: 'Log in' });
    this.closeButton = page.getByLabel('Log in').getByText('Close');
    this.logoutLink = page.getByRole('link', { name: 'Log out' });
    this.xButton = page.getByRole('dialog', { name: 'Log in' }).getByLabel('Close');
  }

  async goto() {
    await this.page.goto('https://www.demoblaze.com/index.html');
  }

  async topNavigationLogin() {
    await this.loginLink.click();
  }

  async loginModal(username: string, password: string) {
    await this.usernameTextbox.fill(username);
    await this.passwordTextbox.fill(password);
  }

  //   async logout(username: string, password: string) {
  //     await this.usernameTextbox.fill(username);
  //     await this.passwordTextbox.fill(password);
  //     await this.loginButton.click();
  //     await expect.soft(this.page.getByRole('link', { name: 'Welcome silvijamamic' })).toBeVisible();
  //     await this.logoutLink.click();
  //     await expect.soft(this.loginButton).toBeVisible();
  //   }
}
