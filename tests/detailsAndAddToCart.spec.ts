import { test, expect } from '@playwright/test';
import { detailsAddToCart } from '../pages/detailsAddToCart';
import { helpersPage } from '../pages/helpers';

//Open product details
test('Open product details for Samsung galaxy s6', async ({ page }) => {
  const addToCart = new detailsAddToCart(page);

  await addToCart.goto();
  await addToCart.samsungGalaxy.click();
  await expect.soft(addToCart.headingSamsungGalaxy).toBeVisible();
  await expect.soft(addToCart.productDescriptionSamsung).toBeVisible();
  await expect.soft(addToCart.priceSamsung).toBeVisible();
  await expect(addToCart.linkAddToCart).toBeVisible();
});

//Add to cart - successfull
test('Add one product to cart', async ({ page }) => {
  const addToCart = new detailsAddToCart(page);
  const alert = new helpersPage(page);

  await addToCart.goto();
  await addToCart.openProductDetails(addToCart.samsungGalaxy, addToCart.headingSamsungGalaxy);
  await alert.alertDialog('Product added', async () => {
    await addToCart.linkAddToCart.click();
  });
});

//Add to cart - more products
test('Add to cart - more products', async ({ page }) => {
  const addToCart = new detailsAddToCart(page);
  const alert = new helpersPage(page);

  await addToCart.goto();
  //await addToCart.clearCart();
  await addToCart.addProductToCart(addToCart.samsungGalaxy, addToCart.headingSamsungGalaxy);
  //await alert.alertDialog('Product added');
  await addToCart.productStore.click();
  await addToCart.addProductToCart(addToCart.nokiaLumia, addToCart.headingNokia);
  // await alert.alertDialog('Product added');
  await addToCart.cartLink.click();
});

test('Verify product details UI elements', async ({ page }) => {
  await page.goto('https://www.demoblaze.com/index.html');
  await page.getByRole('link', { name: 'Samsung galaxy s6' }).click();
  const locator = page.locator('div').filter({ hasText: 'Samsung galaxy s6$360 *' }).first();
  await expect(locator).toHaveCSS('display', 'block');
  await expect(locator).toHaveCSS('border-image-repeat', 'stretch');
  await expect(locator).toHaveCSS('color', 'rgb(41, 43, 44)');
});

test('Verify Add to card button', async ({ page }) => {
  await page.goto('https://www.demoblaze.com/index.html');
  await page.getByRole('link', { name: 'Samsung galaxy s6' }).click();
  const locator = page.getByRole('link', { name: 'Add to cart' });
  await expect(locator).toHaveCSS('background-color', 'rgb(52, 168, 83)');
  await expect(locator).toHaveCSS('color', 'rgb(255, 255, 255)');
  await expect(locator).toHaveCSS('padding-bottom', '12px');
  await expect(locator).toHaveCSS('padding-left', '24px');
});
