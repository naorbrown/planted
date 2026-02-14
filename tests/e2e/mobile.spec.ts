import { test, expect } from '@playwright/test';

test.describe('Mobile', () => {
  test.use({ viewport: { width: 390, height: 844 } });

  test('desktop nav is hidden on mobile', async ({ page }) => {
    await page.goto('/planted/');
    await expect(page.locator('nav[aria-label="Main navigation"]')).toBeHidden();
  });

  test('mobile menu button is visible', async ({ page }) => {
    await page.goto('/planted/');
    await expect(page.locator('#mobile-menu-open')).toBeVisible();
  });

  test('mobile menu opens and closes', async ({ page }) => {
    await page.goto('/planted/');
    await page.locator('#mobile-menu-open').click();
    const menu = page.locator('#mobile-menu');
    await expect(menu).toBeVisible();
    await page.locator('#mobile-menu-close').click();
    await expect(menu).toBeHidden();
  });

  test('mobile search button is visible', async ({ page }) => {
    await page.goto('/planted/');
    await expect(page.locator('#search-open-mobile')).toBeVisible();
  });

  test('no horizontal overflow on home page', async ({ page }) => {
    await page.goto('/planted/');
    const body = page.locator('body');
    const scrollWidth = await body.evaluate((el) => el.scrollWidth);
    const clientWidth = await body.evaluate((el) => el.clientWidth);
    expect(scrollWidth).toBeLessThanOrEqual(clientWidth + 1);
  });

  test('plant cards are visible on mobile', async ({ page }) => {
    await page.goto('/planted/plants/');
    const cards = page.locator('a[class*="rounded-xl"]');
    await expect(cards.first()).toBeVisible();
  });
});
