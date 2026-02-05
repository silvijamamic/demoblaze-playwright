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
  readonly buttonXPlaceOrder: Locator;

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
    this.buttonXPlaceOrder = page.getByRole('dialog', { name: 'Place order' }).getByLabel('Close');
  }

  async goto() {
    await this.page.goto('https://www.demoblaze.com/index.html');
  }

  async topNavigationCart() {
    await this.cartLink.click();
  }

  async placeOrderModal(
    name: string,
    country: string,
    city: string,
    creditCard: string,
    month: string,
    year: string
  ) {
    await this.textboxName.fill(name);
    await this.textboxCountry.fill(country);
    await this.textboxCity.fill(city);
    await this.textboxCreditCard.fill(creditCard);
    await this.textboxMonth.fill(month);
    await this.textboxYear.fill(year);
  }
}
