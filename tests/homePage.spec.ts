import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/homePage';

//Open home page
test('Open Home page', async ({ page }) => {
  const homePage = new HomePage(page);

  await homePage.goto();
  await expect.soft(homePage.productStore).toBeVisible();
  await expect.soft(homePage.homeLink).toBeVisible();
  await expect.soft(homePage.contactLink).toBeVisible();
  await expect.soft(homePage.aboutUsLink).toBeVisible();
  await expect.soft(homePage.cartLink).toBeVisible();
  await expect.soft(homePage.loginLink).toBeVisible();
  await expect(homePage.signUpLink).toBeVisible();
});

//Categories-show list of Phones
test('Phones list is displayed', async ({ page }) => {
  const homePage = new HomePage(page);

  await homePage.goto();
  await homePage.phonesCategory.click();
  await expect.soft(homePage.samsungGalaxy).toBeVisible();
  await expect(homePage.sonyVaio).not.toBeVisible();
});
//Categories-show list of Laptops
test('Laptops list is displayed', async ({ page }) => {
  const homePage = new HomePage(page);

  await homePage.goto();
  await homePage.laptopsCategory.click();
  await expect.soft(homePage.sonyVaio).toBeVisible();
  await expect(homePage.samsungGalaxy).not.toBeVisible();
});

//Categories-show list of Monitors
test('Monitors list is displayed', async ({ page }) => {
  const homePage = new HomePage(page);

  await homePage.goto();
  await homePage.monitorsCategory.click();
  await expect.soft(homePage.appleMonitor).toBeVisible();
  await expect(homePage.samsungGalaxy).not.toBeVisible();
});

//Pagination
test('Verify next and previous button in pagination', async ({ page }) => {
  const homePage = new HomePage(page);

  await homePage.goto();
  await expect.soft(homePage.samsungGalaxy).toBeVisible();
  await homePage.buttonNext.click();
  await expect.soft(homePage.macBookAir).toBeVisible();
  await homePage.buttonPrevious.click();
  await expect(homePage.nokiaLumia).toBeVisible();
});

//Carousel
test('Verify next and previous button in carousel', async ({ page }) => {
  const homePage = new HomePage(page);

  await homePage.goto();
  await homePage.navigateCarousel();
});

test('UI navbar-brand', async ({ page }) => {
  await page.goto('https://www.demoblaze.com/index.html');
  const locator = page.getByRole('link', { name: 'PRODUCT STORE' });
  await expect(locator).toHaveCSS('background-color', 'rgba(0, 0, 0, 0)');
  await expect(locator).toHaveCSS('display', 'block');
});

test('UI navbar', async ({ page }) => {
  await page.goto('https://www.demoblaze.com/index.html');
  const locator = page.getByText('PRODUCT STORE Home (current)');
  await expect(locator).toHaveCSS('display', 'flex');
  await expect(locator).toHaveCSS('font-weight', '400');
  await expect(locator).toHaveCSS('position', 'relative');
  await expect(locator).toHaveCSS('font-style', 'normal');
});
