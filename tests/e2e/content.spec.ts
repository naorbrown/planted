import { test, expect } from '@playwright/test';

test.describe('Content', () => {
  test('home page has hero section', async ({ page }) => {
    await page.goto('/planted/');
    await expect(page.locator('h1')).toContainText('what you need');
  });

  test('home page has category grid', async ({ page }) => {
    await page.goto('/planted/');
    await expect(page.getByText('Browse by Space')).toBeVisible();
  });

  test('category page lists plants', async ({ page }) => {
    await page.goto('/planted/categories/bedroom/');
    const cards = page.locator('a[class*="rounded-xl"]');
    await expect(cards.first()).toBeVisible();
  });

  test('plant detail has care card on desktop', async ({ page }) => {
    test.skip(page.viewportSize()?.width! < 1024, 'Desktop only');
    await page.goto('/planted/plants/bedroom/lavender/');
    await expect(page.getByText('Care Guide').first()).toBeAttached();
  });

  test('plant detail has breadcrumbs', async ({ page }) => {
    await page.goto('/planted/plants/bedroom/lavender/');
    await expect(page.locator('nav[aria-label="Breadcrumb"]')).toBeVisible();
  });

  test('plants index has filter strip', async ({ page }) => {
    await page.goto('/planted/plants/');
    await expect(page.getByText('All', { exact: true }).first()).toBeVisible();
  });

  test('guide detail page loads', async ({ page }) => {
    await page.goto('/planted/guides/beginners-guide-to-indoor-plants/');
    await expect(page.locator('h1')).toContainText('Beginner');
  });
});
