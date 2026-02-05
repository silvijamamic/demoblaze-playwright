import { Page, Locator, expect } from '@playwright/test';

export class NavigationPage {
  readonly page: Page;
  readonly loginLink: Locator;
  readonly homeLink: Locator;
  readonly contactLink: Locator;
  readonly aboutUsLink: Locator;
  readonly cartLink: Locator;
  readonly signUpLink: Locator;
  readonly productStore: Locator;
  readonly headingProducts: Locator;
  readonly phonesCategory: Locator;
  readonly samsungGalaxy: Locator;
  readonly laptopsCategory: Locator;
  readonly monitorsCategory: Locator;
  readonly appleMonitor: Locator;
  readonly sonyVaio: Locator;
  readonly buttonNext: Locator;
  readonly buttonPrevious: Locator;
  readonly macBookAir: Locator;
  readonly nokiaLumia: Locator;
  readonly buttonNextCarousel: Locator;
  readonly buttonPrevoiusCarousel: Locator;
  readonly itemsList: Locator;

  constructor(page: Page) {
    this.page = page;

    this.productStore = page.getByRole('link', { name: 'PRODUCT STORE' });
    this.loginLink = page.getByRole('link', { name: 'Log in' });
    this.homeLink = this.page.getByRole('link', { name: 'Home' });
    this.contactLink = this.page.getByRole('link', { name: 'Contact' });
    this.aboutUsLink = this.page.getByRole('link', { name: 'About Us' });
    this.cartLink = this.page.getByRole('link', { name: 'Cart' });
    this.signUpLink = this.page.getByRole('link', { name: 'Sign up' });
    this.headingProducts = this.page.getByRole('heading', { name: 'Products' });
    this.phonesCategory = this.page.getByRole('link', { name: 'Phones' });
    this.samsungGalaxy = this.page.getByRole('link', { name: 'Samsung galaxy s6' });
    this.laptopsCategory = this.page.getByRole('link', { name: 'Laptops' });
    this.sonyVaio = this.page.getByRole('link', { name: 'Sony vaio i5' });
    this.monitorsCategory = this.page.getByRole('link', { name: 'Monitors' });
    this.appleMonitor = this.page.getByRole('link', { name: 'Apple monitor 24' });
    this.buttonNext = this.page.locator('#next2');
    this.buttonPrevious = this.page.locator('#prev2');
    this.macBookAir = this.page.getByRole('link', { name: 'MacBook air' });
    this.nokiaLumia = this.page.getByRole('link', { name: 'Nokia lumia 1520' });
    this.buttonNextCarousel = this.page
      .locator('#carouselExampleIndicators')
      .getByRole('button', { name: 'Next' });
    this.buttonPrevoiusCarousel = this.page
      .locator('#carouselExampleIndicators')
      .getByRole('button', { name: 'Previous' });
    this.itemsList = page.locator('#tbodyid .card:visible');
  }

  async goto() {
    await this.page.goto('https://www.demoblaze.com/index.html');
  }

  async navigateToCart() {
    await this.cartLink.click();
    await this.headingProducts.waitFor();
  }
  async getTitlesFromList(): Promise<string[]> {
    return this.itemsList.locator('.card-title').allTextContents();
  }

  async carousel() {
    await this.buttonNextCarousel.click();
    await this.buttonPrevoiusCarousel.click();
  }
}
