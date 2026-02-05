import { Page, Locator, expect } from '@playwright/test';

export class helpersPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async alertDialog(messageDialog: string, action: () => Promise<void>) {
    const handled = new Promise<void>((resolve) => {
      this.page.once('dialog', async (dialog) => {
        expect(dialog.type()).toBe('alert');
        expect(dialog.message()).toContain(messageDialog);
        await dialog.accept();
        resolve();
      });
    });

    await action();
    await handled;
  }

  //   async alertDialog(messageDialog: string, action: () => Promise<void>) {
  //     const [dialog] = await Promise.all([this.page.waitForEvent('dialog'), action()]);

  //     expect(dialog.type()).toBe('alert');
  //     expect(dialog.message()).toContain(messageDialog);
  //     await dialog.accept();
  //   }

  //   async alertDialog(message: string, action: () => Promise<void>) {
  //     const handled = new Promise<void>((resolve) => {
  //       this.page.once('dialog', async (d) => {
  //         expect(d.type()).toBe('alert');
  //         expect(d.message()).toContain(message);
  //         await d.accept();
  //         resolve();
  //       });
  //     });

  //     await action();
  //     await handled;
  //   }
}
