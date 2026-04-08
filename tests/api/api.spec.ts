import { test, expect } from '../fixtures/basePage';

test('API POST - view returns product details', async ({ request }) => {
  const response = await request.post('https://api.demoblaze.com/view', {
    data: { id: '4' },
  });
  expect(response.status()).toBe(200);

  const body = await response.json();
  expect(body.title).toBe('Samsung galaxy s7');
  expect(body.price).toBe(800.0);
  expect(body.cat).toBe('phone');
});

test('API GET - view all products', async ({ request }) => {
  const response = await request.get('https://api.demoblaze.com/entries');

  expect(response.status()).toBe(200);
  const text = await response.text();
  expect(text).toContain('Samsung galaxy s6');
  expect(text).toContain('Nokia lumia 1520');
});

test('API POST - login returns auth token for valid credentials', async ({ request }) => {
  const response = await request.post('https://api.demoblaze.com/login', {
    data: {
      username: 'silvijamamic',
      password: 'cGFzc3dvcmQxMjM=',
    },
  });
  expect(response.status()).toBe(200);

  const body = await response.text();
  expect(body).toContain('Auth_token');
});

test('API POST - Sign up registers new user successfully', async ({ request }) => {
  const response = await request.post('https://api.demoblaze.com/signup', {
    data: {
      username: `silvija_${Date.now()}`,
      password: 'cGFzc3dvcmQxMjM=',
    },
  });
  expect(response.status()).toBe(200);

  const body = await response.text();
  expect(body).toContain('""');
});

test('API POST - pagination returns products for next page', async ({ request }) => {
  const response = await request.post('https://api.demoblaze.com/pagination', {
    data: { id: '9' },
  });

  expect(response.status()).toBe(200);
  const body = await response.json();
  expect(body.Items.length).toBeGreaterThan(0);
  expect(body.Items[0]).toHaveProperty('cat');
  expect(body.Items[0]).toHaveProperty('id');
  expect(body.Items[0]).toHaveProperty('price');
  expect(body.Items[0]).toHaveProperty('title'); //provjerit tip propertyja da je string
});

test('API POST - returns list of products for Phones', async ({ request }) => {
  const response = await request.post('https://api.demoblaze.com/bycat', {
    data: { cat: 'phone' },
  });

  expect(response.status()).toBe(200);
  const body = await response.json();
  expect(body.Items.length).toBeGreaterThan(0);
  expect(body.Items[0]).toHaveProperty('cat');
  expect(body.Items[0]).toHaveProperty('id');
  expect(body.Items[0]).toHaveProperty('price');
  expect(body.Items[0]).toHaveProperty('title');
});
