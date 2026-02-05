import { Page, Locator, expect } from '@playwright/test';

export class contactAboutPage {
  readonly page: Page;
  readonly contactLink: Locator;
  readonly headingNewMessage: Locator;
  readonly emailTextbox: Locator;
  readonly contactNameTextbox: Locator;
  readonly messageTextbox: Locator;
  readonly closeNewMessage: Locator;
  readonly buttonSendMessage: Locator;
  readonly aboutUsLink: Locator;
  readonly video: Locator;
  readonly closeAbout: Locator;
  readonly closeXButtonContact: Locator;
  readonly closeXButtonAbout: Locator;
  readonly playVideo: Locator;
  readonly headingAboutUs: Locator;

  constructor(page: Page) {
    this.page = page;

    this.contactLink = page.getByRole('link', { name: 'Contact' });
    this.headingNewMessage = page.getByRole('heading', { name: 'New message' });
    this.emailTextbox = page.locator('#recipient-email');
    this.contactNameTextbox = page.getByRole('textbox', { name: 'Contact Email: Contact Name:' });
    this.messageTextbox = page.getByRole('textbox', { name: 'Message' });
    this.closeNewMessage = page.getByLabel('New message').getByText('Close');
    this.buttonSendMessage = page.getByRole('button', { name: 'Send message' });
    this.aboutUsLink = page.getByRole('link', { name: 'About us' });
    this.video = page.locator('div').filter({ hasText: 'Video Player is loading.Play' }).nth(3);
    this.closeAbout = page.locator('#videoModal').getByText('Close', { exact: true });
    this.closeXButtonContact = page
      .getByRole('dialog', { name: 'New message' })
      .getByLabel('Close');
    this.closeXButtonAbout = page.locator('#videoModal').getByLabel('Close');
    this.playVideo = page.getByRole('button', { name: 'Play Video' });
    this.headingAboutUs = page.getByRole('heading', { name: 'About us', exact: true });
  }

  async goto() {
    await this.page.goto('https://www.demoblaze.com/index.html');
  }

  async topNavigationContact() {
    await this.contactLink.click();
  }

  async topNavigationAbout() {
    await this.aboutUsLink.click();
  }

  async contactModal(email: string, contactName: string, message: string) {
    await this.emailTextbox.fill(email);
    await this.contactNameTextbox.fill(contactName);
    await this.messageTextbox.fill(message);
  }
}
