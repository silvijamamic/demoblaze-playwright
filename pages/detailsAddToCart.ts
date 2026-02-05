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
  readonly productDescriptionSamsung: Locator;
  readonly priceSamsung: Locator;

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
    this.productDescriptionSamsung = page.getByText('The Samsung Galaxy S6 is');
    this.priceSamsung = page.getByRole('heading', { name: '$360 *includes tax' });
  }

  async goto() {
    await this.page.goto('https://www.demoblaze.com/index.html');
  }

  async topNavigationCart() {
    await this.cartLink.click();
  }

  async openProductDetails(product: Locator, productHeading: Locator) {
    await product.click();
    await productHeading.waitFor();
  }

  async addProductToCart(product: Locator, productHeading: Locator) {
    await product.click();
    await productHeading.waitFor();
    await this.linkAddToCart.click();
    await new Promise((resolve) => setTimeout(resolve, 1000));
  }

  // async clearCart() {
  //   await this.cartLink.click();
  //   const deleteLinks = this.page.getByRole('link', { name: 'Delete' });
  //   while ((await deleteLinks.count()) > 0) {
  //     await deleteLinks.first().click();
  //     await expect(deleteLinks).toHaveCount((await deleteLinks.count()) - 1);
  //   }
  // }
}
