import { test, expect } from '@playwright/test';

//1. Open home page
test('Open Home page', async ({ page }) => {
  await page.goto('https://www.demoblaze.com/index.html');
  await expect(page).toHaveTitle(/STORE/);

  await expect(page.getByRole('link', { name: 'Home' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Contact' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'About us' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Log in' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Sign up' })).toBeVisible();
});

//2. Navigate to Cart
test('Navigate to Cart', async ({ page }) => {
  await page.goto('https://www.demoblaze.com/cart.html');

  await expect(page.getByRole('heading', { name: 'Products' })).toBeVisible();
});

//3. Categories-Show phones
test('Show Phones', async ({ page }) => {
  await page.goto('https://www.demoblaze.com/index.html');

  await page.getByRole('link', { name: 'Phones' }).click();
  await expect(page.getByRole('link', { name: 'Samsung galaxy s6' })).toBeVisible();
});

//4. Categories-Show laptops
test('Show Laptops', async ({ page }) => {
  await page.goto('https://www.demoblaze.com/index.html');

  await page.getByRole('link', { name: 'Laptops' }).click();
  await expect(page.getByRole('link', { name: 'Sony vaio i5' })).toBeVisible(); //trebam li provjeravati za sve proizvode?
});

//5. Categories-Show Monitors
test('Show Monitors', async ({ page }) => {
  await page.goto('https://www.demoblaze.com/index.html');
  await page.getByRole('link', { name: 'Monitors' }).click();
  await expect(page.getByRole('link', { name: 'Apple monitor 24' })).toBeVisible();
});

//6. Pagination
test('Pagination', async ({ page }) => {
  await page.goto('https://www.demoblaze.com/index.html#');
  await expect(page.getByRole('link', { name: 'Samsung galaxy s6' })).toBeVisible();
  await page.click('#next2');
  await expect(page.getByRole('link', { name: 'MacBook air' })).toBeVisible();
  await page.click('#prev2');
  await expect(page.getByRole('link', { name: 'Nokia lumia 1520' })).toBeVisible();
});

// //7. Carousel
test('Carousel', async ({ page }) => {
  await page.goto('https://www.demoblaze.com/index.html');
  await page.locator('#carouselExampleIndicators').getByRole('button', { name: 'Next' }).click();
  await page
    .locator('#carouselExampleIndicators')
    .getByRole('button', { name: 'Previous' })
    .click();
});
