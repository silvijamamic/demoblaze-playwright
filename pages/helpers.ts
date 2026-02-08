import { Page, Locator, expect } from '@playwright/test';

export class helpersPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async verfiyAlertMessage(messageDialog: string) {
    this.page.once('dialog', async (dialog) => {
      expect(dialog.type()).toBe('alert');
      expect(dialog.message()).toContain(messageDialog);
      await dialog.accept();
    });
  }
}
