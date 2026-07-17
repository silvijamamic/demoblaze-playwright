import { test, expect } from '../fixtures/basePage';

//Open product details
test('Open product details for Samsung galaxy s6', async ({ cartPage, page }) => {
  await cartPage.goto();
  await cartPage.samsungGalaxy.click();
  await expect.soft(cartPage.headingSamsungGalaxy).toBeVisible();
  await expect.soft(cartPage.productDescriptionSamsung).toBeVisible();
  await expect.soft(cartPage.priceSamsung).toBeVisible();
  await expect(cartPage.linkAddToCart).toBeVisible();
});

//Add to cart - successfull
test('Add one product to cart', async ({ cartPage, helpersPage }) => {
  await cartPage.goto();
  await cartPage.addProductToCart(cartPage.samsungGalaxy, cartPage.headingSamsungGalaxy);
  await helpersPage.verfiyAlertMessage('Product added');
  await cartPage.linkAddToCart.click();
});

//Add to cart - more products
test('Add to cart - more products', async ({ cartPage, helpersPage }) => {
  await cartPage.goto();
  await helpersPage.verfiyAlertMessage('Product added');
  await cartPage.addProductToCart(cartPage.samsungGalaxy, cartPage.headingSamsungGalaxy);
  await cartPage.linkAddToCart.click();
  await cartPage.productStore.click();
  await helpersPage.verfiyAlertMessage('Product added');
  await cartPage.addProductToCart(cartPage.nokiaLumia, cartPage.headingNokia);
  await cartPage.linkAddToCart.click();
  await cartPage.cartLink.click();
});

//Delete product from cart
test('Delete products from cart', async ({ cartPage, page }) => {
  await cartPage.goto();
  await cartPage.addProductToCart(cartPage.samsungGalaxy, cartPage.headingSamsungGalaxy);
  await cartPage.linkAddToCart.click();
  await cartPage.cartLink.click();
  await cartPage.productStorePage();
  await cartPage.addProductToCart(cartPage.nokiaLumia, cartPage.headingNokia);
  await cartPage.linkAddToCart.click();
  await cartPage.cartLink.click();

  await cartPage.deleteProductsFromCart();
  await expect(cartPage.deleteLink).not.toBeVisible();
});

test('Verify total amount of added products to Cart', async ({ cartPage, helpersPage }) => {
  await cartPage.goto();
  await cartPage.cartLink.click();
  await expect(cartPage.headingProducts).toBeVisible();

  await cartPage.deleteProductsFromCart();
  await cartPage.productStore.click();
  await cartPage.addProductToCart(cartPage.samsungGalaxy, cartPage.headingSamsungGalaxy);
  await helpersPage.verfiyAlertMessage('Product added');
  await cartPage.linkAddToCart.click();
  await cartPage.cartLink.click();
  await expect(cartPage.headingProducts).toBeVisible();

  await cartPage.productStore.click();
  await cartPage.addProductToCart(cartPage.nokiaLumia, cartPage.headingNokia);
  await helpersPage.verfiyAlertMessage('Product added');
  await cartPage.linkAddToCart.click();
  await cartPage.cartLink.click();
  await expect(cartPage.headingProducts).toBeVisible();

  const price1 = await cartPage.getProductPriceByName('Samsung galaxy s6');
  const price2 = await cartPage.getProductPriceByName('Nokia lumia 1520');
  const expectedTotal = price1 + price2;
  const total = await cartPage.getTotalPrice();
  expect(total).toBe(expectedTotal);
});

//View empty cart screen
test('View empty cart screen', async ({ cartPage }) => {
  await cartPage.goto();
  await expect(cartPage.deleteLink).not.toBeVisible();
});

test('Cart persists after page refresh for logged in user', async ({ page, cartPage }) => {
  await cartPage.goto();
  await cartPage.addProductToCart(cartPage.samsungGalaxy, cartPage.headingSamsungGalaxy);
  await cartPage.linkAddToCart.click();

  await page.reload();

  await cartPage.cartLink.click();
  await expect(cartPage.samsungGalaxyCart).toBeVisible();
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

test('Verify Cart screen UI elements', async ({ page }) => {
  await page.goto('https://www.demoblaze.com/index.html');
  await page.getByRole('link', { name: 'Samsung galaxy s6' }).click();
  await page.getByRole('link', { name: 'Add to cart' }).click();
  await page.getByRole('link', { name: 'Cart', exact: true }).click();
  const locator = page.getByText('Products Pic Title Price x');
  await expect(locator).toHaveCSS('color', 'rgb(41, 43, 44)');
  await expect(locator).toHaveCSS('font-family', 'LatoWeb');
  await expect(locator).toHaveCSS('position', 'relative');
});

test('Verify Place Order button', async ({ page }) => {
  await page.goto('https://www.demoblaze.com/index.html');
  await page.getByRole('link', { name: 'Cart', exact: true }).click();
  const locator = page.getByRole('button', { name: 'Place Order' });
  await expect.soft(locator).toHaveCSS('background-color', 'rgb(52, 168, 83)');
  await expect.soft(locator).toHaveCSS('display', 'inline-block');
  await expect(locator).toHaveCSS('font-family', 'sans-serif');
  await expect(locator).toHaveCSS('font-size', '16px');
});
