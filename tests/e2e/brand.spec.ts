import { test, expect } from '@playwright/test';

const BRAND_ICON = '🌱';

test.describe('Brand icon consistency', () => {
  test('header logo uses seedling icon', async ({ page }) => {
    await page.goto('/plant-therapy/');
    const headerBrand = page.locator('header a[href="/plant-therapy/"] span').first();
    await expect(headerBrand).toHaveText(BRAND_ICON);
  });

  test('footer logo uses seedling icon', async ({ page }) => {
    await page.goto('/plant-therapy/');
    const footerBrand = page.locator('footer a[href="/plant-therapy/"] span').first();
    await expect(footerBrand).toHaveText(BRAND_ICON);
  });

  test('hero icon uses seedling icon', async ({ page }) => {
    await page.goto('/plant-therapy/');
    const heroIcon = page.locator('section .text-5xl');
    await expect(heroIcon).toHaveText(BRAND_ICON);
  });

  test('mobile menu logo uses seedling icon', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/plant-therapy/');
    await page.locator('#mobile-menu-open').click();
    const menuBrand = page.locator('#mobile-menu a[href="/plant-therapy/"] span').first();
    await expect(menuBrand).toHaveText(BRAND_ICON);
  });
});
