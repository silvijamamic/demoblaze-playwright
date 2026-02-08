import { Page, Locator, expect } from '@playwright/test';

export class AboutUsPage {
  readonly page: Page;
  readonly contactLink: Locator;
  readonly aboutUsLink: Locator;
  readonly video: Locator;
  readonly closeAbout: Locator;
  readonly closeXButtonAbout: Locator;
  readonly playVideo: Locator;
  readonly headingAboutUs: Locator;

  constructor(page: Page) {
    this.page = page;

    this.contactLink = page.getByRole('link', { name: 'Contact' });
    this.aboutUsLink = page.getByRole('link', { name: 'About us' });
    this.video = page.locator('div').filter({ hasText: 'Video Player is loading.Play' }).nth(3);
    this.closeAbout = page.locator('#videoModal').getByText('Close', { exact: true });
    this.closeXButtonAbout = page.locator('#videoModal').getByLabel('Close');
    this.playVideo = page.getByRole('button', { name: 'Play Video' });
    this.headingAboutUs = page.getByRole('heading', { name: 'About us', exact: true });
  }

  async goto() {
    await this.page.goto('https://www.demoblaze.com/index.html');
  }
}
