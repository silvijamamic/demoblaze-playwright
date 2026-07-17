//import { test, expect } from '@playwright/test';
import { test, expect } from '../fixtures/basePage';

//About us - open modal
test('About us - open modal', async ({ aboutUsPage }) => {
  //const aboutUs = new AboutUsPage(page);

  await aboutUsPage.goto();
  await aboutUsPage.aboutUsLink.click();
  await expect.soft(aboutUsPage.headingAboutUs).toBeVisible();
  await expect.soft(aboutUsPage.video).toBeVisible();
  await expect(aboutUsPage.closeAbout).toBeVisible();
});

//About us - play video
test('About us - play video', async ({ aboutUsPage }) => {
  await aboutUsPage.goto();
  await aboutUsPage.aboutUsLink.click();
  await expect.soft(aboutUsPage.headingAboutUs).toBeVisible();
  await aboutUsPage.playVideo.click();
  await aboutUsPage.closeAbout.click();
});

//About us - close on Close button
test('About us - close on Close button', async ({ aboutUsPage }) => {
  await aboutUsPage.goto();
  await aboutUsPage.aboutUsLink.click();
  await expect.soft(aboutUsPage.headingAboutUs).toBeVisible();
  await aboutUsPage.closeAbout.click();
});

//About us - close on X button
test('About us - close on X button', async ({ aboutUsPage }) => {
  await aboutUsPage.goto();
  await aboutUsPage.aboutUsLink.click();
  await expect.soft(aboutUsPage.headingAboutUs).toBeVisible();
  await aboutUsPage.closeXButtonAbout.click();
});

test('Verify About us modal UI elements', async ({ page }) => {
  await page.goto('https://www.demoblaze.com/index.html');
  await page.getByRole('link', { name: 'About us' }).click();
  const locator = page.getByText('About us × Video Player is');
  await expect(locator).toHaveCSS('display', 'flex');
  await expect(locator).toHaveCSS('position', 'relative');
  await expect(locator).toHaveCSS('font-family', 'LatoWeb');
  await expect(locator).toHaveCSS('font-size', '14.6667px');
  await expect(locator).toHaveCSS('box-sizing', 'border-box');
});
