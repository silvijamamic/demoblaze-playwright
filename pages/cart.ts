import { Page, Locator, expect } from '@playwright/test';

export class cartPage {
  readonly page: Page;
  readonly cartLink: Locator;
  readonly headingProducts: Locator;
  readonly buttonPlaceOrder: Locator;
  readonly samsungGalaxy: Locator;
  readonly deleteLink: Locator;

  constructor(page: Page) {
    this.page = page;

    this.cartLink = page.getByRole('link', { name: 'Cart' });
    this.headingProducts = page.getByRole('heading', { name: 'Products' });
    this.buttonPlaceOrder = page.getByRole('button', { name: 'Place Order' });
    this.samsungGalaxy = page.getByRole('link', { name: 'Samsung galaxy s6' });
    this.deleteLink = page.getByRole('link', { name: 'Delete' });
  }

  async goto() {
    await this.page.goto('https://www.demoblaze.com/index.html');
  }

  async cartView() {
    await this.cartLink.click();
    await expect.soft(this.headingProducts).toBeVisible();
    await expect.soft(this.buttonPlaceOrder).toBeVisible();
  }

  async deleteProduct() {
    await this.samsungGalaxy.click();
    const [dialog] = await Promise.all([
      this.page.waitForEvent('dialog'),
      this.page.getByRole('link', { name: 'Add to cart' }).click(),
    ]);
    await dialog.accept();

    await Promise.all([
      this.page.waitForURL('**/cart.html'),
      this.page.getByRole('link', { name: 'Cart', exact: true }).click(),
    ]);

    const rows = this.page.locator('#tbodyid tr');
    await expect(rows).toHaveCount(1);
    await this.page.getByRole('link', { name: 'Delete' }).first().click();
  }

  async emptyCart() {
    await this.cartLink.click();
    await expect.soft(this.deleteLink).not.toBeVisible();
  }
}
