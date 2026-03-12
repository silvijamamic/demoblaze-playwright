import { Page, Locator, expect } from '@playwright/test';

export class CartPage {
  readonly page: Page;
  readonly cartLink: Locator;
  readonly headingProducts: Locator;
  readonly buttonPlaceOrder: Locator;
  readonly samsungGalaxy: Locator;
  readonly deleteLink: Locator;
  readonly totalPrice: Locator;
  readonly productStore: Locator;
  readonly headingSamsungGalaxy: Locator;
  readonly linkAddToCart: Locator;
  readonly nokiaLumia: Locator;
  readonly samsungCart: Locator;
  readonly nokiaCart: Locator;
  readonly headingNokia: Locator;
  readonly productDescriptionSamsung: Locator;
  readonly priceSamsung: Locator;
  readonly emptyCart: Locator;
  readonly samsungGalaxyCart: Locator;
  readonly samsungGalaxyDetails: Locator;
  readonly placeOrderModal: Locator;

  constructor(page: Page) {
    this.page = page;

    this.cartLink = page.getByRole('navigation').getByRole('link', { name: 'Cart' });
    this.headingProducts = page.getByRole('heading', { name: 'Products' });
    this.buttonPlaceOrder = page.getByRole('button', { name: 'Place Order' });
    this.samsungGalaxy = page.getByRole('link', { name: 'Samsung galaxy s6' });
    this.deleteLink = page.getByRole('link', { name: 'Delete' });
    this.totalPrice = page.locator('#totalp');
    this.productStore = page.getByRole('link', { name: 'PRODUCT STORE' });
    this.linkAddToCart = page.getByRole('link', { name: 'Add to cart' });
    this.productStore = page.getByRole('link', { name: 'PRODUCT STORE' });
    this.nokiaLumia = page.getByRole('link', { name: 'Nokia lumia 1520' });
    this.samsungCart = page.getByRole('cell', { name: 'Samsung galaxy s6' });
    this.nokiaCart = page.getByRole('cell', { name: 'Nokia lumia' });
    this.headingSamsungGalaxy = page.getByRole('heading', { name: 'Samsung galaxy s6' });
    this.headingNokia = page.getByRole('heading', { name: 'Nokia lumia' });
    this.productDescriptionSamsung = page.getByText('The Samsung Galaxy S6 is');
    this.priceSamsung = page.getByRole('heading', { name: '$360 *includes tax' });
    this.emptyCart = page.locator('#page-wrapper');
    this.samsungGalaxyCart = page.getByText('Products Pic Title Price x');
    this.samsungGalaxyDetails = page
      .locator('div')
      .filter({ hasText: 'Samsung galaxy s6$360 *' })
      .first();
    this.placeOrderModal = page.getByRole('dialog', { name: 'Place order' });
  }

  async goto() {
    await this.page.goto('https://www.demoblaze.com/index.html');
  }

  async productStorePage() {
    await this.productStore.click();
  }

  async addProductToCart(product: Locator, productHeading: Locator) {
    await product.click();
    await productHeading.waitFor();
    //await this.linkAddToCart.click();
  }
  async getProductPriceByName(productName: string): Promise<number> {
    const row = this.page.locator('#tbodyid tr', { hasText: productName });
    await expect(row).toBeVisible();
    const priceText = await row.locator('td').nth(2).innerText(); //treća kolona
    return Number(priceText);
  }

  async getTotalPrice(): Promise<number> {
    const totalPriceText = await this.totalPrice.innerText();
    return Number(totalPriceText);
  }

  // async deleteProductByName(productName: string) {
  //   const row = this.page.locator('#tbodyid tr', { hasText: productName });
  //   await row.getByRole('link', { name: 'Delete' }).click();
  //   await expect(row).toHaveCount(0);
  // }

  async deleteProductsFromCart() {
    while ((await this.deleteLink.count()) > 0) {
      const currentCount = await this.deleteLink.count();
      await this.deleteLink.first().click();
      await expect(this.deleteLink).toHaveCount(currentCount - 1);
    }
  }
}
