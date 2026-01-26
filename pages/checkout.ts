import { Page, Locator, expect } from '@playwright/test';

export class checkoutPage {
  readonly page: Page;
  readonly cartLink: Locator;
  readonly buttonPlaceOrder: Locator;
  readonly headingPlaceOrder: Locator;
  readonly textboxName: Locator;
  readonly textboxCountry: Locator;
  readonly textboxCity: Locator;
  readonly textboxCreditCard: Locator;
  readonly textboxMonth: Locator;
  readonly textboxYear: Locator;
  readonly buttonPlaceOrderClose: Locator;
  readonly buttonPurchase: Locator;
  readonly samsungGalaxy: Locator;
  readonly buttonAddToCart: Locator;
  readonly thankYou: Locator;
  readonly buttonOk: Locator;
  readonly cartPage: Locator;

  constructor(page: Page) {
    this.page = page;

    this.cartLink = page.getByRole('link', { name: 'Cart' });
    this.buttonPlaceOrder = page.getByRole('button', { name: 'Place order' });
    this.headingPlaceOrder = page.getByRole('heading', { name: 'Place Order' });
    this.textboxName = page.getByRole('textbox', { name: 'Name' });
    this.textboxCountry = page.getByRole('textbox', { name: 'Country' });
    this.textboxCity = page.getByRole('textbox', { name: 'City' });
    this.textboxCreditCard = page.getByRole('textbox', { name: 'Credit card' });
    this.textboxMonth = page.getByRole('textbox', { name: 'Month' });
    this.textboxYear = page.getByRole('textbox', { name: 'Year' });
    this.buttonPlaceOrderClose = page.getByLabel('Place order').getByText('Close');
    this.buttonPurchase = page.getByRole('button', { name: 'Purchase' });
    this.samsungGalaxy = page.getByRole('link', { name: 'Samsung galaxy s6' });
    this.buttonAddToCart = page.getByRole('link', { name: 'Add to cart' });
    this.thankYou = page.getByText('Thank you for your purchase!');
    this.buttonOk = page.getByRole('button', { name: 'OK' });
    this.cartPage = page.getByRole('link', { name: 'Cart', exact: true });
  }

  async goto() {
    await this.page.goto('https://www.demoblaze.com/index.html');
  }

  async placeOrderModal() {
    await this.cartLink.click();
    await expect.soft(this.buttonPlaceOrder).toBeVisible();
    await this.buttonPlaceOrder.click();
    await expect.soft(this.headingPlaceOrder).toBeVisible();
    await expect.soft(this.textboxName).toBeVisible();
    await expect.soft(this.textboxCountry).toBeVisible();
    await expect.soft(this.textboxCity).toBeVisible();
    await expect.soft(this.textboxCreditCard).toBeVisible();
    await expect.soft(this.textboxMonth).toBeVisible();
    await expect.soft(this.textboxYear).toBeVisible();
    await expect.soft(this.buttonPlaceOrderClose).toBeVisible();
    await expect.soft(this.buttonPurchase).toBeVisible();
  }

  async purchaseSuccessful(
    name: string,
    country: string,
    city: string,
    creditCard: string,
    month: string,
    year: string
  ) {
    await this.samsungGalaxy.click();
    await this.buttonAddToCart.click();
    await this.cartPage.click();
    await this.buttonPlaceOrder.click();
    await this.textboxName.fill(name);
    await this.textboxCountry.fill(country);
    await this.textboxCity.fill(city);
    await this.textboxCreditCard.fill(creditCard);
    await this.textboxMonth.fill(month);
    await this.textboxYear.fill(year);
    await this.buttonPurchase.click();
    await expect.soft(this.thankYou).toBeVisible();
    await expect.soft(this.buttonOk).toBeVisible();
    await this.buttonOk.click();
  }

  async mandatoryFields() {
    this.page.once('dialog', async (dialog) => {
      expect(dialog.type()).toBe('alert');
      expect(dialog.message()).toContain('Please fill out Name and Creditcard.');
      await dialog.accept();
    });
    await this.cartLink.click();
    await this.buttonPlaceOrder.click();
    await this.buttonPurchase.click();
  }
}
