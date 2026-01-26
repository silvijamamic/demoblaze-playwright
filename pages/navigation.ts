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
  readonly phonesLink: Locator;
  readonly samsungGalaxy: Locator;
  readonly laptopsLink: Locator;
  readonly monitorsLink: Locator;
  readonly appleMonitor: Locator;
  readonly sonyVaio: Locator;
  readonly buttonNext: Locator;
  readonly buttonPrevious: Locator;
  readonly macBookAir: Locator;
  readonly nokiaLumia: Locator;
  readonly buttonNextCarousel: Locator;
  readonly buttonPrevoiusCarousel: Locator;

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
    this.phonesLink = this.page.getByRole('link', { name: 'Phones' });
    this.samsungGalaxy = this.page.getByRole('link', { name: 'Samsung galaxy s6' });
    this.laptopsLink = this.page.getByRole('link', { name: 'Laptops' });
    this.sonyVaio = this.page.getByRole('link', { name: 'Sony vaio i5' });
    this.monitorsLink = this.page.getByRole('link', { name: 'Monitors' });
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
  }

  async goto() {
    await this.page.goto('https://www.demoblaze.com/index.html');
  }

  async openHomePage() {
    await expect.soft(this.productStore).toBeVisible();
    await expect.soft(this.homeLink).toBeVisible();
    await expect.soft(this.contactLink).toBeVisible();
    await expect.soft(this.aboutUsLink).toBeVisible();
    await expect.soft(this.cartLink).toBeVisible();
    await expect.soft(this.loginLink).toBeVisible();
    await expect.soft(this.signUpLink).toBeVisible();
  }

  async navigateToCart() {
    await this.cartLink.click();
    await expect.soft(this.headingProducts).toBeVisible();
  }

  async showPhones() {
    await this.phonesLink.click();
    await expect.soft(this.samsungGalaxy).toBeVisible();
  }

  async showLaptops() {
    await this.laptopsLink.click();
    await expect.soft(this.sonyVaio).toBeVisible();
    await expect.soft(this.samsungGalaxy).not.toBeVisible();
  }

  async showMonitors() {
    await this.monitorsLink.click();
    await expect.soft(this.appleMonitor).toBeVisible();
  }

  async pagination() {
    await expect.soft(this.samsungGalaxy).toBeVisible();
    await this.buttonNext.click();
    await expect.soft(this.macBookAir).toBeVisible();
    await this.buttonPrevious.click();
    await expect.soft(this.nokiaLumia).toBeVisible();
  }

  async carousel() {
    await this.buttonNextCarousel.click();
    await this.buttonPrevoiusCarousel.click();
  }
}
