import { test, expect } from '../fixtures/basePage';

test('Home page loads successfully', async ({ page, homePage }) => {
  const responsePromise = page.waitForResponse((response) => response.url().includes('index.html'));

  await homePage.goto();

  const response = await responsePromise;
  expect(response.status()).toBe(200);
  await expect(homePage.productStore).toBeVisible();
});

test('Clicking Next loads next page of products', async ({ page, homePage }) => {
  await homePage.goto();

  const responsePromise = page.waitForResponse(
    (response) => response.url().includes('/pagination') && response.request().method() === 'POST',
    { timeout: 60000 }
  );

  await homePage.buttonNext.click();
  await responsePromise;

  await expect(homePage.macBookAir).toBeVisible();
  await expect(homePage.samsungGalaxy).not.toBeVisible();
});

test('Add to cart sends product id', async ({ page, cartPage, helpersPage }) => {
  await cartPage.goto();
  await cartPage.addProductToCart(cartPage.nokiaLumia, cartPage.headingNokia);

  const requestPromise = page.waitForRequest(
    (request) => request.url().includes('/addtocart') && request.method() === 'POST'
  );

  await cartPage.linkAddToCart.click();

  const request = await requestPromise;
  const body = request.postDataJSON();

  expect(body).toHaveProperty('prod_id');
  expect(body.flag).toBe(false);

  await helpersPage.verfiyAlertMessage('Product added');
});

test('Opening any product details triggers product details request', async ({
  page,
  homePage,
  cartPage,
}) => {
  const detailsResponsePromise = page.waitForResponse(
    (response) => response.url().includes('/view') && response.request().method() === 'POST'
  );

  await homePage.goto();
  await homePage.samsungGalaxy.click();

  const detailsResponse = await detailsResponsePromise;
  expect(detailsResponse.ok()).toBeTruthy();
  await expect(cartPage.linkAddToCart).toBeVisible();
});

test('Clicking Laptops loads laptop products', async ({ page, homePage }) => {
  await homePage.goto();

  const responsePromise = page.waitForResponse(
    (response) => response.url().includes('bycat') && response.request().method() === 'POST'
  );

  await homePage.laptopsCategory.click();
  const response = await responsePromise;
  expect(response.ok()).toBeTruthy();
});

test('Opening cart triggers successful response', async ({ page, homePage }) => {
  await homePage.goto();

  const responsePromise = page.waitForResponse(
    (response) => response.url().includes('viewcart') && response.request().method() === 'POST'
  );

  await homePage.cartLink.click();
  const response = await responsePromise;
  expect(response.ok()).toBeTruthy();
});
test('Purchase triggers deletecart request', async ({ page, checkoutPage }) => {
  await checkoutPage.goto();
  await checkoutPage.cartLink.click();
  await checkoutPage.buttonPlaceOrder.click();
  await checkoutPage.fillPlaceOrderForm(
    'Silvija Mamic',
    'Croatia',
    'Zagreb',
    'HR0000',
    'January',
    '2026'
  );

  const requestPromise = page.waitForRequest(
    (request) => request.url().includes('deletecart') && request.method() === 'POST'
  );
  await checkoutPage.buttonPurchase.click();
  const request = await requestPromise;
  expect(request.method()).toBe('POST');
  expect(request.url()).toContain('deletecart');
});

test('Login sends login request', async ({ page, homePage, loginPage }) => {
  await homePage.goto();
  await homePage.loginLink.click();
  await loginPage.login('silvijamamic', 'password123');

  const requestPromise = page.waitForRequest(
    (request) => request.url().includes('login') && request.method() === 'POST'
  );
  await loginPage.loginButton.click();

  const request = await requestPromise;
  expect(request.method()).toBe('POST');
});

test('Singup sends singup request', async ({ page, homePage, signUpPage }) => {
  const username = `silvija_${Date.now()}`;

  await homePage.goto();
  await homePage.signUpLink.click();
  await signUpPage.fillSignUpForm(username, 'password123');
  const requestPromise = page.waitForRequest(
    (request) => request.url().includes('signup') && request.method() === 'POST'
  );

  await signUpPage.buttonSignUp.click();

  const request = await requestPromise;
  expect(request.method()).toBe('POST');
});
