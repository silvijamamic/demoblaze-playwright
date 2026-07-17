import { test, expect } from '../fixtures/basePage';
import laptops from '../../data/laptops.json';

test.use({ storageState: undefined });

test('Login - error 500', async ({ page, loginPage }) => {
  await page.route('https://api.demoblaze.com/login', async (route) => {
    await route.fulfill({
      status: 500,
      body: 'Internal Server Error',
    });
  });

  await loginPage.goto();
  await loginPage.loginLink.click();
  await loginPage.login('silvijamamic', 'password123');
  await loginPage.loginButton.click();
  await expect(loginPage.loginModal).toBeVisible();
});

test('Login without wifi', async ({ page, loginPage }) => {
  await page.route('https://api.demoblaze.com/login', async (route) => {
    await route.abort();
  });

  await loginPage.goto();
  await loginPage.loginLink.click();
  await loginPage.login('silvijamamic', 'password123');
  await loginPage.loginButton.click();
  await expect(loginPage.loginModal).toBeVisible();
});

test('Add to cart - error 500', async ({ page, cartPage }) => {
  await page.route('https://api.demoblaze.com/addtocart', async (route) => {
    await route.fulfill({
      status: 500,
      body: 'Internal Server Error',
    });
  });

  await page.goto('https://www.demoblaze.com/prod.html?idp_=1');
  await cartPage.linkAddToCart.click();
  await expect(page).toHaveURL(/prod.html/);
});

test('Verify larger amount in cart', async ({ page, cartPage }) => {
  await page.route('https://api.demoblaze.com/viewcart', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        Items: [{ prod_id: 1 }, { prod_id: 2 }],
      }),
    });
  });

  await page.route('https://api.demoblaze.com/view', async (route) => {
    const { id } = route.request().postDataJSON();

    const products: Record<number, unknown> = {
      1: {
        id: 1,
        price: 99999,
        title: 'Samsung galaxy s6',
        cat: 'phone',
        img: 'imgs/galaxy_s6.jpg',
      },
      2: { id: 2, price: 99999, title: 'Nokia Lumia 1520', cat: 'phone', img: 'imgs/nokia.jpg' },
    };

    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(products[id]),
    });
  });

  await page.goto('https://www.demoblaze.com/cart.html');

  await expect(cartPage.totalPrice).toHaveText('199998');
});

test('Verify empty cart', async ({ page, cartPage }) => {
  await page.route('https://api.demoblaze.com/viewcart', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        Items: [],
      }),
    });
  });

  await page.goto('https://www.demoblaze.com/cart.html');
  await expect(cartPage.totalPrice).toHaveText('');
});

test('Verify slow api response in cart', async ({ page, cartPage }) => {
  await page.route('https://api.demoblaze.com/viewcart', async (route) => {
    await new Promise((resolve) => setTimeout(resolve, 3000));

    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        Items: [{ prod_id: 1 }],
      }),
    });
  });

  await page.route('https://api.demoblaze.com/view', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        id: 1,
        title: 'Samsung galaxy s6',
        price: 100,
        cat: 'phone',
        img: 'imgs/galaxy_s6.jpg',
      }),
    });
  });

  await page.goto('https://www.demoblaze.com/cart.html');

  await expect(cartPage.totalPrice).toHaveText('100');
});

test('Verfiy offline network in cart', async ({ page, cartPage }) => {
  await page.route('https://api.demoblaze.com/viewcart', async (route) => {
    await route.abort();
  });

  await page.goto('https://www.demoblaze.com/cart.html');

  await expect(cartPage.totalPrice).toHaveText('');
});

test('Verify total price for one product in cart', async ({ page, cartPage }) => {
  await page.route('https://api.demoblaze.com/viewcart', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        Items: [{ prod_id: 1 }],
      }),
    });
  });

  await page.route('https://api.demoblaze.com/view', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        id: 1,
        title: 'Samsung galaxy s6',
        price: 650,
        cat: 'phone',
        img: 'imgs/galaxy_s6.jpg',
      }),
    });
  });

  await page.goto('https://www.demoblaze.com/cart.html');

  await expect(cartPage.totalPrice).toHaveText('650');
});

test('Verify laptops are displayed', async ({ page, homePage }) => {
  await page.route('https://api.demoblaze.com/bycat', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(laptops),
    });
  });

  await page.goto('https://www.demoblaze.com');

  await homePage.laptopsCategory.click();

  await expect(homePage.sonyVaio).toBeVisible();
  await expect(homePage.macBookAir).toBeVisible();
});

test('Verify that only first laptop is returned', async ({ page, homePage }) => {
  await page.route('https://api.demoblaze.com/bycat', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(laptops.Items[0]),
    });
  });

  await page.goto('https://www.demoblaze.com');

  await homePage.laptopsCategory.click();

  await expect(homePage.sonyVaio).toBeVisible();
  await expect(homePage.macBookAir).not.toBeVisible();
});
