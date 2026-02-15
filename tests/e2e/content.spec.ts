import { test, expect } from '@playwright/test';

test.describe('Content', () => {
  test('home page has hero section', async ({ page }) => {
    await page.goto('/plant-therapy/');
    await expect(page.locator('h1')).toContainText('every room, every situation');
  });

  test('home page has category grid', async ({ page }) => {
    await page.goto('/plant-therapy/');
    await expect(page.getByText('Browse by Space')).toBeVisible();
  });

  test('category page lists plants', async ({ page }) => {
    await page.goto('/plant-therapy/categories/bedroom/');
    const cards = page.locator('a[class*="rounded-xl"]');
    await expect(cards.first()).toBeVisible();
  });

  test('plant detail has care card on desktop', async ({ page }) => {
    test.skip(page.viewportSize()?.width! < 1024, 'Desktop only');
    await page.goto('/plant-therapy/plants/bedroom/lavender/');
    await expect(page.getByText('Care Guide').first()).toBeAttached();
  });

  test('plant detail has breadcrumbs', async ({ page }) => {
    await page.goto('/plant-therapy/plants/bedroom/lavender/');
    await expect(page.locator('nav[aria-label="Breadcrumb"]')).toBeVisible();
  });

  test('plants index has filter strip', async ({ page }) => {
    await page.goto('/plant-therapy/plants/');
    await expect(page.getByText('All', { exact: true }).first()).toBeVisible();
  });

  test('guide detail page loads', async ({ page }) => {
    await page.goto('/plant-therapy/guides/beginners-guide-to-indoor-plants/');
    await expect(page.locator('h1')).toContainText('First Plant');
  });

  test('guides index has correct h1', async ({ page }) => {
    await page.goto('/plant-therapy/guides/');
    await expect(page.locator('h1')).toHaveText('I Need a Plant For...');
  });

  test('guides index has at least 20 guide cards', async ({ page }) => {
    await page.goto('/plant-therapy/guides/');
    const cards = page.locator('a[class*="rounded-xl"]');
    await expect(cards).toHaveCount(await cards.count());
    expect(await cards.count()).toBeGreaterThanOrEqual(40);
  });

  test('guides index has FAQ section with 5 questions', async ({ page }) => {
    await page.goto('/plant-therapy/guides/');
    const details = page.locator('details');
    await expect(details).toHaveCount(5);
  });

  test('new guide page loads', async ({ page }) => {
    await page.goto('/plant-therapy/guides/bathroom-plants/');
    await expect(page.locator('h1')).toContainText('Bathroom');
  });

  test('first-plant-ever guide page loads', async ({ page }) => {
    await page.goto('/plant-therapy/guides/first-plant-ever/');
    await expect(page.locator('h1')).toContainText('Never Owned a Plant');
  });
});
