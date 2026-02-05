import { test, expect } from '@playwright/test';
import { NavigationPage } from '../pages/navigation';

//Open home page
test('Open Home page', async ({ page }) => {
  const navigation = new NavigationPage(page);

  await navigation.goto();
  await expect.soft(navigation.productStore).toBeVisible();
  await expect.soft(navigation.homeLink).toBeVisible();
  await expect.soft(navigation.contactLink).toBeVisible();
  await expect.soft(navigation.aboutUsLink).toBeVisible();
  await expect.soft(navigation.cartLink).toBeVisible();
  await expect.soft(navigation.loginLink).toBeVisible();
  await expect(navigation.signUpLink).toBeVisible();
});

//Categories-show list of Phones
test('Phones list is displayed', async ({ page }) => {
  const navigation = new NavigationPage(page);

  await navigation.goto();
  await navigation.phonesCategory.click();
  await navigation.itemsList.locator('.card-title').first().waitFor({ timeout: 5000 });
  const titles = await navigation.getTitlesFromList();
  expect(titles.length).toBeGreaterThan(0);
  //console.log(titles);
});
//Categories-show list of Laptops
test('Laptops list is displayed', async ({ page }) => {
  const navigation = new NavigationPage(page);

  await navigation.goto();
  await navigation.laptopsCategory.click();
  await navigation.itemsList.first().waitFor();
  const titles = await navigation.getTitlesFromList();
  expect(titles.length).toBeGreaterThan(0);
});

//Categories-show list of Monitors
test('Monitors list is displayed', async ({ page }) => {
  const navigation = new NavigationPage(page);

  await navigation.goto();
  await navigation.monitorsCategory.click();
  await navigation.itemsList.first().waitFor({ timeout: 5000 });
  const titles = await navigation.getTitlesFromList();
  expect(titles.length).toBeGreaterThan(0);
});

//Pagination
test('Verify next and previous button in pagination', async ({ page }) => {
  const navigation = new NavigationPage(page);

  await navigation.goto();
  await expect.soft(navigation.samsungGalaxy).toBeVisible();
  await navigation.buttonNext.click();
  await expect.soft(navigation.macBookAir).toBeVisible();
  await navigation.buttonPrevious.click();
  await expect(navigation.nokiaLumia).toBeVisible();
});

//7. Carousel
test('Verify next and previous button in carousel', async ({ page }) => {
  const navigation = new NavigationPage(page);

  await navigation.goto();
  await navigation.carousel();
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
