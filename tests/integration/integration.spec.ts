import { SignUpPage } from '../../pages/signUp';
import { test, expect } from '../fixtures/basePage';

test('Next button sends correct payload', async ({ page, homePage }) => {
  await homePage.goto();

  const [request] = await Promise.all([
    page.waitForRequest((req) => req.url().includes('pagination') && req.method() === 'POST'),
    homePage.buttonNext.click(),
  ]);

  const payload = request.postDataJSON();

  expect(payload).toEqual({ id: '' });
});

test('Login sends correct payload', async ({ page, loginPage, homePage }) => {
  await homePage.goto();
  await homePage.loginLink.click();

  const [request] = await Promise.all([
    page.waitForRequest((request) => request.url().includes('login') && request.method() == 'POST'),
    loginPage.loginClick('username', 'password'),
  ]);

  const payload = request.postDataJSON();
  expect(payload).toEqual({
    username: 'username',
    password: btoa('password'),
  });
});

test('Signup sends correct payload', async ({ page, homePage, signUpPage }) => {
  const username = `silvija_${Date.now()}`;

  await homePage.goto();
  await homePage.signUpLink.click();

  const [request] = await Promise.all([
    page.waitForRequest(
      (request) => request.url().includes('signup') && request.method() === 'POST'
    ),
    signUpPage.signUpClick(username, 'password123'),
  ]);

  const payload = request.postDataJSON();

  expect(payload).toEqual({
    username: username,
    password: btoa('password123'),
  });
});

test('Clicking Laptops loads laptop products', async ({ page, homePage }) => {
  await homePage.goto();

  const [request] = await Promise.all([
    page.waitForRequest(
      (request) => request.url().includes('bycat') && request.method() === 'POST'
    ),
    homePage.laptopsCategory.click(),
  ]);

  const payload = request.postDataJSON();

  expect(payload).toEqual({ cat: 'notebook' });
});

test('Clicking Monitors loads monitors products', async ({ page, homePage }) => {
  await homePage.goto();

  const [request] = await Promise.all([
    page.waitForRequest(
      (request) => request.url().includes('bycat') && request.method() === 'POST'
    ),
    homePage.monitorsCategory.click(),
  ]);

  const payload = request.postDataJSON();

  expect(payload).toEqual({ cat: 'monitor' });
});

test('Opening cart sends correct payload', async ({ page, homePage }) => {
  await homePage.goto();

  const [request] = await Promise.all([
    page.waitForRequest(
      (request) => request.url().includes('viewcart') && request.method() === 'POST'
    ),
    homePage.cartLink.click(),
  ]);

  const payload = request.postDataJSON();

  expect.soft(payload).toHaveProperty('cookie');
  expect(payload.flag).toBe(false);
});

test('Add to cart sends correct payload', async ({ page, cartPage, helpersPage }) => {
  await cartPage.goto();
  await cartPage.addProductToCart(cartPage.nokiaLumia, cartPage.headingNokia);

  const [request] = await Promise.all([
    page.waitForRequest(
      (request) => request.url().includes('/addtocart') && request.method() === 'POST'
    ),
    cartPage.linkAddToCart.click(),
  ]);

  const payload = request.postDataJSON();

  expect.soft(payload).toHaveProperty('cookie');
  expect.soft(payload).toHaveProperty('id');
  expect.soft(payload.flag).toBe(false);
  expect(payload.prod_id).toBe(2);

  await helpersPage.verfiyAlertMessage('Product added');
});

//provjerit payload
//dodat soft kod expect

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

  const [request] = await Promise.all([
    page.waitForRequest(
      (request) => request.url().includes('deletecart') && request.method() === 'POST'
    ),
    checkoutPage.buttonPurchase.click(),
  ]);

  const payload = request.postDataJSON();

  expect(payload).toHaveProperty('cookie');
});
