import { test as base } from '@playwright/test';
export { expect } from '@playwright/test';
import { LoginPage } from '../../pages/login';
import { SignUpPage } from '../../pages/signUp';
import { HomePage } from '../../pages/homePage';
import { ContactPage } from '../../pages/contact';
import { AboutUsPage } from '../../pages/aboutUs';
import { CheckoutPage } from '../../pages/checkout';
import { CartPage } from '../../pages/cart';
import { HelpersPage } from '../../pages/helpers';

export const test = base.extend<{
  loginPage: LoginPage;
  signUpPage: SignUpPage;
  homePage: HomePage;
  contactPage: ContactPage;
  checkoutPage: CheckoutPage;
  aboutUsPage: AboutUsPage;
  cartPage: CartPage;
  helpersPage: HelpersPage;
}>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  signUpPage: async ({ page }, use) => {
    await use(new SignUpPage(page));
  },
  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },
  contactPage: async ({ page }, use) => {
    await use(new ContactPage(page));
  },
  checkoutPage: async ({ page }, use) => {
    await use(new CheckoutPage(page));
  },
  aboutUsPage: async ({ page }, use) => {
    await use(new AboutUsPage(page));
  },
  cartPage: async ({ page }, use) => {
    await use(new CartPage(page));
  },
  helpersPage: async ({ page }, use) => {
    await use(new HelpersPage(page));
  },
});
