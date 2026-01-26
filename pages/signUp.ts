import { Page, Locator, expect } from '@playwright/test';

export class SignUpPage {
  readonly page: Page;
  readonly linkSignUp: Locator;
  readonly titleSignUp: Locator;
  readonly usernameTextboxSignUp: Locator;
  readonly passwordTextboxSignUp: Locator;
  readonly buttonSignUp: Locator;

  constructor(page: Page) {
    this.page = page;

    this.linkSignUp = page.getByRole('link', { name: 'Sign up' });
    this.titleSignUp = page.getByText('Sign up ×');
    this.usernameTextboxSignUp = page.getByRole('textbox', { name: 'Username' });
    this.passwordTextboxSignUp = page.getByRole('textbox', { name: 'Password' });
    this.buttonSignUp = page.getByRole('button', { name: 'Sign up' });
  }

  async goto() {
    await this.page.goto('https://www.demoblaze.com/index.html');
  }

  async openSignUpModal() {
    await this.linkSignUp.click();
    await expect.soft(this.titleSignUp).toBeVisible();
  }

  async validSignUp(password: string) {
    const username = `silvija_${Date.now()}`;
    await this.usernameTextboxSignUp.fill(username);
    await this.passwordTextboxSignUp.fill(password);
    await this.buttonSignUp.click();
  }

  async invalidSignUp(username: string, password: string) {
    await this.usernameTextboxSignUp.fill(username);
    await this.passwordTextboxSignUp.fill(password);
    await this.buttonSignUp.click();
  }

  async userAlreadyExist(username: string, password: string) {
    await this.usernameTextboxSignUp.fill(username);
    await this.passwordTextboxSignUp.fill(password);
    await this.buttonSignUp.click();
  }
}
