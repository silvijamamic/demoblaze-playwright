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
  }

  async goto() {
    await this.page.goto('https://www.demoblaze.com/index.html');
  }

  async contactModal(email: string, contactName: string, message: string) {
    await this.contactLink.click();
    this.page.once('dialog', async (dialog) => {
      expect(dialog.type()).toBe('alert');
      expect(dialog.message()).toContain('Thanks for the message!!');
      await dialog.accept();
    });
    await expect.soft(this.headingNewMessage).toBeVisible();
    await expect.soft(this.emailTextbox).toBeVisible();
    await expect
      .soft(this.page.getByRole('textbox', { name: 'Contact Email: Contact Name:' }))
      .toBeVisible();
    await expect.soft(this.page.getByRole('textbox', { name: 'Message' })).toBeVisible();
    await expect.soft(this.page.getByLabel('New message').getByText('Close')).toBeVisible();
    await expect.soft(this.page.getByRole('button', { name: 'Send message' })).toBeVisible();
    await this.emailTextbox.fill(email);
    await this.contactNameTextbox.fill(contactName);
    await this.messageTextbox.fill(message);
    await this.buttonSendMessage.click();
  }

  async closeModal() {
    await this.contactLink.click();
    await expect.soft(this.headingNewMessage).toBeVisible();
    await this.page.getByLabel('New message').getByText('Close').click();
  }

  async aboutModal() {
    await this.aboutUsLink.click();
    await expect
      .soft(this.page.locator('div').filter({ hasText: 'Video Player is loading.Play' }).nth(3))
      .toBeVisible();
  }
}
