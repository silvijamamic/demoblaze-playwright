//import { test, expect } from '@playwright/test';
import { test, expect } from '../fixtures/basePage';

test('Home page - full page layout', async ({ homePage }) => {
  await homePage.goto();
  await expect(homePage.fullPage).toHaveScreenshot('home-full-page.png');
});

test('Home page - navigation bar should look as expected', async ({ homePage }) => {
  await homePage.goto();
  await expect(homePage.navbar).toHaveScreenshot('navbar.png');
});

test('Home page - Verify footer on Home page', async ({ homePage }) => {
  await homePage.goto();
  await expect(homePage.footer).toHaveScreenshot('footer.png');
});

test('Home page - Carousel navigation buttons visual check', async ({ homePage }) => {
  await homePage.goto();
  await expect(homePage.buttonNextCarousel).toHaveScreenshot('next-carousel.png');
  await expect(homePage.buttonPrevoiusCarousel).toHaveScreenshot('previous-carousel.png');
});

test('Login page - Login modal', async ({ loginPage }) => {
  await loginPage.goto();
  await loginPage.loginLink.click();
  await expect(loginPage.loginModal).toHaveScreenshot('login-modal.png');
});

test('Sign Up page - Sign Up modal', async ({ signUpPage }) => {
  await signUpPage.goto();
  await signUpPage.linkSignUp.click();
  await expect(signUpPage.signUpModal).toHaveScreenshot('signup-modal.png');
});

test('Contact page - Contact modal layout', async ({ contactPage }) => {
  await contactPage.goto();
  await contactPage.contactLink.click();
  await expect(contactPage.contactModal).toHaveScreenshot('contact-modal.png');
});

test('Contact page - Header layout', async ({ contactPage }) => {
  await contactPage.goto();
  await contactPage.contactLink.click();
  await expect(contactPage.contactHeader).toHaveScreenshot('contact-modal-header.png');
});

test('Contact page - Footer layout', async ({ contactPage }) => {
  await contactPage.goto();
  await contactPage.contactLink.click();
  await expect(contactPage.contactFooter).toHaveScreenshot('contact-modal-footer.png');
});

test('About Us page - About Us modal layout', async ({ aboutUsPage }) => {
  await aboutUsPage.goto();
  await aboutUsPage.aboutUsLink.click();
  await expect(aboutUsPage.aboutUsModal).toHaveScreenshot('aboutus-modal.png');
});

test('About Us page - About Us header', async ({ aboutUsPage }) => {
  await aboutUsPage.goto();
  await aboutUsPage.aboutUsLink.click();
  await expect(aboutUsPage.aboutUsHeader).toHaveScreenshot('aboutus-modal-header.png');
});

test('About Us page - About Us footer', async ({ aboutUsPage }) => {
  await aboutUsPage.goto();
  await aboutUsPage.aboutUsLink.click();
  await expect(aboutUsPage.aboutUsFooter).toBeVisible();
  await expect(aboutUsPage.aboutUsFooter).toHaveScreenshot('aboutus-modal-footer.png');
});

test('Cart page - Empty cart visual check', async ({ cartPage }) => {
  await cartPage.goto();
  await cartPage.cartLink.click();
  await expect(cartPage.emptyCart).toHaveScreenshot('empty-cart.png');
});

test('Cart page - product in cart', async ({ cartPage, helpersPage }) => {
  await cartPage.goto();
  await cartPage.addProductToCart(cartPage.samsungGalaxy, cartPage.headingSamsungGalaxy);
  await helpersPage.verfiyAlertMessage('Product added');
  await cartPage.linkAddToCart.click();
  await cartPage.cartLink.click();
  await expect(cartPage.samsungGalaxyCart).toHaveScreenshot('samsungGalaxy-cart.png');
});

test('Cart page - product details for Samsung Galaxy', async ({ cartPage }) => {
  await cartPage.goto();
  await cartPage.addProductToCart(cartPage.samsungGalaxy, cartPage.headingSamsungGalaxy);
  await expect(cartPage.samsungGalaxyDetails).toHaveScreenshot('samsungGalaxy-details.png');
});

test('Cart page - Place Order modal', async ({ cartPage }) => {
  await cartPage.goto();
  await cartPage.cartLink.click();
  await cartPage.buttonPlaceOrder.click();
  await expect(cartPage.placeOrderModal).toHaveScreenshot('placeorder-modal.png');
});
