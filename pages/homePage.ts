import { Page, Locator, expect } from '@playwright/test';

export class HomePage {
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
  readonly footer: Locator;
  readonly navbar: Locator;
  readonly fullPage: Locator;

  constructor(page: Page) {
    this.page = page;

    this.productStore = page.getByRole('link', { name: 'PRODUCT STORE' });
    this.loginLink = page.getByRole('link', { name: 'Log in' });
    this.homeLink = page.getByRole('link', { name: 'Home' });
    this.contactLink = page.getByRole('link', { name: 'Contact' });
    this.aboutUsLink = page.getByRole('link', { name: 'About Us' });
    this.cartLink = page.getByRole('link', { name: 'Cart' });
    this.signUpLink = page.getByRole('link', { name: 'Sign up' });
    this.headingProducts = page.getByRole('heading', { name: 'Products' });
    this.phonesCategory = page.getByRole('link', { name: 'Phones' });
    this.samsungGalaxy = page.getByRole('link', { name: 'Samsung galaxy s6' });
    this.laptopsCategory = page.getByRole('link', { name: 'Laptops' });
    this.sonyVaio = page.getByRole('link', { name: 'Sony vaio i5' });
    this.monitorsCategory = page.getByRole('link', { name: 'Monitors' });
    this.appleMonitor = page.getByRole('link', { name: 'Apple monitor 24' });
    this.buttonNext = page.locator('#next2');
    this.buttonPrevious = page.locator('#prev2');
    this.macBookAir = page.getByRole('link', { name: 'MacBook air' });
    this.nokiaLumia = page.getByRole('link', { name: 'Nokia lumia 1520' });
    this.buttonNextCarousel = page
      .locator('#carouselExampleIndicators')
      .getByRole('button', { name: 'Next' });
    this.buttonPrevoiusCarousel = page
      .locator('#carouselExampleIndicators')
      .getByRole('button', { name: 'Previous' });
    this.footer = page.locator('#footc');
    this.navbar = page.locator('#navbarExample');
    this.fullPage = page.getByText(
      'New message × Contact Email: Contact Name: Message: Close Send message Sign up'
    );
  }

  async goto() {
    await this.page.goto('https://www.demoblaze.com/index.html');
  }

  // async navigateToCart() {
  //   await this.cartLink.click();
  //   await this.headingProducts.waitFor();
  // }

  async navigateCarousel() {
    await this.buttonNextCarousel.click();
    await this.buttonPrevoiusCarousel.click();
  }
}
