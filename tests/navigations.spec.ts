import { test, expect } from '@playwright/test';
import { NavigationPage } from '../pages/navigation';

//1. Open home page
test('Open Home page', async ({ page }) => {
  const navigation = new NavigationPage(page);

  await navigation.goto();
  await navigation.openHomePage();
});

//2. Navigate to Cart
test('Navigate to Cart', async ({ page }) => {
  const navigation = new NavigationPage(page);

  await navigation.goto();
  await navigation.navigateToCart();
});

//3. Categories-Show phones
test('Show Phones', async ({ page }) => {
  const navigation = new NavigationPage(page);

  await navigation.goto();
  await navigation.showPhones();
});

//4. Categories-Show laptops
test('Show Laptops', async ({ page }) => {
  const navigation = new NavigationPage(page);

  await navigation.goto();
  await navigation.showLaptops();
});

//5. Categories-Show Monitors
test('Show Monitors', async ({ page }) => {
  const navigation = new NavigationPage(page);

  await navigation.goto();
  await navigation.showMonitors();
});

//6. Pagination
test('Pagination', async ({ page }) => {
  const navigation = new NavigationPage(page);

  await navigation.goto();
  await navigation.pagination();
});

//7. Carousel
test('Carousel', async ({ page }) => {
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
