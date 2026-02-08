import { Page, Locator, expect } from '@playwright/test';

export class SignUpPage {
  readonly page: Page;
  readonly linkSignUp: Locator;
  readonly titleSignUp: Locator;
  readonly usernameTextboxSignUp: Locator;
  readonly passwordTextboxSignUp: Locator;
  readonly buttonSignUp: Locator;
  readonly buttonXSignUp: Locator;
  readonly buttonClose: Locator;

  constructor(page: Page) {
    this.page = page;

    this.linkSignUp = page.getByRole('link', { name: 'Sign up' });
    this.titleSignUp = page.getByText('Sign up ×');
    this.usernameTextboxSignUp = page.getByRole('textbox', { name: 'Username' });
    this.passwordTextboxSignUp = page.getByRole('textbox', { name: 'Password' });
    this.buttonSignUp = page.getByRole('button', { name: 'Sign up' });
    this.buttonXSignUp = page.getByRole('dialog', { name: 'Sign up' }).getByLabel('Close');
    this.buttonClose = page.getByLabel('Sign up').getByText('Close');
  }

  async goto() {
    await this.page.goto('https://www.demoblaze.com/index.html');
  }

  async fillSignUpForm(username: string, password: string) {
    await this.usernameTextboxSignUp.fill(username);
    await this.passwordTextboxSignUp.fill(password);
  }
}
