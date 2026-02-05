import { Page, Locator, expect } from '@playwright/test';

export class cartPage {
  readonly page: Page;
  readonly cartLink: Locator;
  readonly headingProducts: Locator;
  readonly buttonPlaceOrder: Locator;
  readonly samsungGalaxy: Locator;
  readonly deleteLink: Locator;
  readonly totalPrice: Locator;
  readonly productStore: Locator;

  constructor(page: Page) {
    this.page = page;

    this.cartLink = page.getByRole('navigation').getByRole('link', { name: 'Cart' });
    this.headingProducts = page.getByRole('heading', { name: 'Products' });
    this.buttonPlaceOrder = page.getByRole('button', { name: 'Place Order' });
    this.samsungGalaxy = page.getByRole('link', { name: 'Samsung galaxy s6' });
    this.deleteLink = page.getByRole('link', { name: 'Delete' });
    this.totalPrice = page.locator('#totalp');
    this.productStore = page.getByRole('link', { name: 'PRODUCT STORE' });
  }

  async goto() {
    await this.page.goto('https://www.demoblaze.com/index.html');
  }

  async productStorePage() {
    await this.productStore.click();
  }
  async topNavigationCart() {
    await this.cartLink.click();
  }

  async getProductPriceByName(productName: string): Promise<number> {
    const row = this.page.locator('#tbodyid tr', { hasText: productName });
    await expect(row).toBeVisible();
    const priceText = await row.locator('td').nth(2).innerText(); //treća kolona
    return Number(priceText.trim());
  }

  async getTotalPrice(): Promise<number> {
    const totalText = await this.totalPrice.innerText();
    return Number(totalText.trim());
  }

  async deleteProductByName(productName: string) {
    const row = this.page.locator('#tbodyid tr', { hasText: productName });
    await row.getByRole('link', { name: 'Delete' }).click();
    await expect(row).toHaveCount(0);
  }

  async expectCartToBeEmpty() {
    const row = this.page.locator('#tbodyid tr');
    await expect(row).toHaveCount(0);
  }
}
