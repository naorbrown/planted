import { test, expect } from '@playwright/test';

test.describe('Navigation', () => {
  test('home page loads', async ({ page }) => {
    await page.goto('/planted/');
    await expect(page.locator('h1')).toBeVisible();
    await expect(page.locator('header')).toBeVisible();
    await expect(page.locator('footer')).toBeVisible();
  });

  test('plants page loads', async ({ page }) => {
    await page.goto('/planted/plants/');
    await expect(page.locator('h1')).toHaveText('All Plants');
  });

  test('categories page loads', async ({ page }) => {
    await page.goto('/planted/categories/');
    await expect(page.locator('h1')).toHaveText('Categories');
  });

  test('guides page loads', async ({ page }) => {
    await page.goto('/planted/guides/');
    await expect(page.locator('h1')).toHaveText('Guides');
  });

  test('about page loads', async ({ page }) => {
    await page.goto('/planted/about/');
    await expect(page.locator('h1')).toHaveText('About Planted');
  });

  test('header has navigation links', async ({ page }) => {
    test.skip(page.viewportSize()?.width! < 768, 'Desktop only');
    await page.goto('/planted/');
    const nav = page.locator('nav[aria-label="Main navigation"]');
    await expect(nav.getByText('Plants')).toBeVisible();
    await expect(nav.getByText('Categories')).toBeVisible();
    await expect(nav.getByText('Guides')).toBeVisible();
    await expect(nav.getByText('About')).toBeVisible();
  });

  test('category page loads with plants', async ({ page }) => {
    await page.goto('/planted/categories/bedroom/');
    await expect(page.locator('h1')).toContainText('Bedroom');
  });

  test('plant detail page loads', async ({ page }) => {
    await page.goto('/planted/plants/bedroom/lavender/');
    await expect(page.locator('h1')).toContainText('Lavender');
  });

  test('search button is visible', async ({ page }) => {
    test.skip(page.viewportSize()?.width! < 640, 'Desktop only');
    await page.goto('/planted/');
    await expect(page.locator('#search-open')).toBeVisible();
  });
});
