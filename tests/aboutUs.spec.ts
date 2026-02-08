import { test, expect } from '@playwright/test';
import { AboutUsPage } from '../pages/aboutUs';

//About us - open modal
test('About us - open modal', async ({ page }) => {
  const aboutUs = new AboutUsPage(page);

  await aboutUs.goto();
  await aboutUs.aboutUsLink.click();
  await expect.soft(aboutUs.headingAboutUs).toBeVisible();
  await expect.soft(aboutUs.video).toBeVisible();
  await expect(aboutUs.closeAbout).toBeVisible();
});

//About us - play video
test('About us - play video', async ({ page }) => {
  const aboutUs = new AboutUsPage(page);

  await aboutUs.goto();
  await aboutUs.aboutUsLink.click();
  await expect.soft(aboutUs.headingAboutUs).toBeVisible();
  await aboutUs.playVideo.click();
  await aboutUs.closeAbout.click();
});

//About us - close on Close button
test('About us - close on Close button', async ({ page }) => {
  const aboutUs = new AboutUsPage(page);

  await aboutUs.goto();
  await aboutUs.aboutUsLink.click();
  await expect.soft(aboutUs.headingAboutUs).toBeVisible();
  await aboutUs.closeAbout.click();
});

//About us - close on X button
test('About us - close on X button', async ({ page }) => {
  const aboutUs = new AboutUsPage(page);

  await aboutUs.goto();
  await aboutUs.aboutUsLink.click();
  await expect.soft(aboutUs.headingAboutUs).toBeVisible();
  await aboutUs.closeXButtonAbout.click();
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
