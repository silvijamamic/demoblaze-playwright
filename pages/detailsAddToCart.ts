import { Page, Locator, expect } from '@playwright/test';

export class detailsAddToCart {
  readonly page: Page;
  readonly headingSamsungGalaxy: Locator;
  readonly samsungGalaxy: Locator;
  readonly linkAddToCart: Locator;
  readonly productStore: Locator;
  readonly nokiaLumia: Locator;
  readonly cartLink: Locator;
  readonly samsungCart: Locator;
  readonly nokiaCart: Locator;
  readonly headingNokia: Locator;

  constructor(page: Page) {
    this.page = page;

    this.cartLink = page.getByRole('link', { name: 'Cart', exact: true });
    this.linkAddToCart = page.getByRole('link', { name: 'Add to cart' });
    this.productStore = page.getByRole('link', { name: 'PRODUCT STORE' });
    this.samsungGalaxy = page.getByRole('link', { name: 'Samsung galaxy s6' });
    this.nokiaLumia = page.getByRole('link', { name: 'Nokia lumia 1520' });
    this.samsungCart = page.getByRole('cell', { name: 'Samsung galaxy s6' });
    this.nokiaCart = page.getByRole('cell', { name: 'Nokia lumia' });
    this.headingSamsungGalaxy = page.getByRole('heading', { name: 'Samsung galaxy s6' });
    this.headingNokia = page.getByRole('heading', { name: 'Nokia lumia' });
  }

  async goto() {
    await this.page.goto('https://www.demoblaze.com/index.html');
  }

  async openProductDetail() {
    await expect.soft(this.samsungGalaxy).toBeVisible();
    await this.samsungGalaxy.click();
    await expect.soft(this.headingSamsungGalaxy).toBeVisible();
  }

  async addToCart() {
    await expect.soft(this.linkAddToCart).toBeVisible();
    const dialogPromise = this.page.waitForEvent('dialog');
    await this.linkAddToCart.click();

    const dialog = await dialogPromise;
    expect(dialog.type()).toBe('alert');
    expect(dialog.message()).toContain('Product added');
    await dialog.accept();
  }

  async moreProducts() {
    await this.productStore.click();
    await expect.soft(this.nokiaLumia).toBeVisible();
    await this.nokiaLumia.click();
    await expect.soft(this.headingNokia).toBeVisible();
    await this.addToCart();

    await this.cartLink.click();
    await expect.soft(this.samsungCart).toBeVisible();
    await expect.soft(this.nokiaCart).toBeVisible();
  }

  async clearCart() {
    await this.cartLink.click();
    const deleteLinks = this.page.getByRole('link', { name: 'Delete' });
    while ((await deleteLinks.count()) > 0) {
      await deleteLinks.first().click();
      await expect(deleteLinks).toHaveCount((await deleteLinks.count()) - 1);
    }
  }
}
