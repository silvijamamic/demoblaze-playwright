import { test, expect } from '../fixtures/basePage';

test('Home page loads successfully', async ({ page, homePage }) => {
  page.on('response', (response) => {
    if (response.url().includes('index.html')) {
      expect(response.status()).toBe(200);
    }
  });

  await homePage.goto();
  await expect(homePage.productStore).toBeVisible();
});

test('Clicking Next triggers pagination response', async ({ page, homePage }) => {
  await homePage.goto();

  const responsePromise = page.waitForResponse(
    (response) => response.url().includes('/pagination') && response.request().method() === 'POST'
  );

  await homePage.buttonNext.click();
  const response = await responsePromise;
  expect(response.status()).toBe(200);
});

test('Add to cart sends product id', async ({ page, cartPage, homePage, helpersPage }) => {
  page.on('request', (request) => {
    if (request.url().includes('/addtocart') && request.method() === 'POST') {
      const body = request.postDataJSON();

      expect(body).toHaveProperty('prod_id');
      expect(body.flag).toBe(false);
    }
  });

  await cartPage.goto();
  await cartPage.addProductToCart(cartPage.nokiaLumia, cartPage.headingNokia);

  await helpersPage.verfiyAlertMessage('Product added');
  await cartPage.linkAddToCart.click();
});

test('Opening any product details triggers producet details request', async ({
  page,
  homePage,
  cartPage,
}) => {
  const detailsResponse = page.waitForResponse(
    (response) => response.url().includes('/view') && response.ok()
  );

  await homePage.goto();
  await homePage.samsungGalaxy.click();
  await expect(cartPage.linkAddToCart).toBeVisible();
});

test('Clicking Laptops loads laptop products', async ({ page, homePage }) => {
  await homePage.goto();

  const responsePromise = page.waitForResponse(
    (response) => response.url().includes('bycat') && response.request().method() === 'POST'
  );

  await homePage.laptopsCategory.click();
  const response = await responsePromise;
  expect(response.ok()).toBeTruthy;
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
