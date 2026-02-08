import { Page, Locator, expect } from '@playwright/test';

export class ContactPage {
  readonly page: Page;
  readonly contactLink: Locator;
  readonly headingNewMessage: Locator;
  readonly emailTextbox: Locator;
  readonly contactNameTextbox: Locator;
  readonly messageTextbox: Locator;
  readonly closeNewMessage: Locator;
  readonly buttonSendMessage: Locator;
  readonly closeXButtonContact: Locator;

  constructor(page: Page) {
    this.page = page;

    this.contactLink = page.getByRole('link', { name: 'Contact' });
    this.headingNewMessage = page.getByRole('heading', { name: 'New message' });
    this.emailTextbox = page.locator('#recipient-email');
    this.contactNameTextbox = page.getByRole('textbox', { name: 'Contact Email: Contact Name:' });
    this.messageTextbox = page.getByRole('textbox', { name: 'Message' });
    this.closeNewMessage = page.getByLabel('New message').getByText('Close');
    this.buttonSendMessage = page.getByRole('button', { name: 'Send message' });
    this.closeXButtonContact = page
      .getByRole('dialog', { name: 'New message' })
      .getByLabel('Close');
  }

  async goto() {
    await this.page.goto('https://www.demoblaze.com/index.html');
  }

  async fillContactForm(email: string, contactName: string, message: string) {
    await this.emailTextbox.fill(email);
    await this.contactNameTextbox.fill(contactName);
    await this.messageTextbox.fill(message);
  }
}
