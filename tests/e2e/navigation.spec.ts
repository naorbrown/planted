import { test, expect } from '@playwright/test';

test.describe('Navigation', () => {
  test('home page loads', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('h1')).toBeVisible();
    await expect(page.locator('header')).toBeVisible();
    await expect(page.locator('footer')).toBeVisible();
  });

  test('plants page loads', async ({ page }) => {
    await page.goto('/plants/');
    await expect(page.locator('h1')).toHaveText('All Plants');
  });

  test('categories page loads', async ({ page }) => {
    await page.goto('/categories/');
    await expect(page.locator('h1')).toHaveText('Categories');
  });

  test('guides page loads', async ({ page }) => {
    await page.goto('/guides/');
    await expect(page.locator('h1')).toHaveText('Guides');
  });

  test('about page loads', async ({ page }) => {
    await page.goto('/about/');
    await expect(page.locator('h1')).toHaveText('About Planted');
  });

  test('header has navigation links', async ({ page }) => {
    await page.goto('/');
    const nav = page.locator('nav[aria-label="Main navigation"]');
    await expect(nav.getByText('Plants')).toBeVisible();
    await expect(nav.getByText('Categories')).toBeVisible();
    await expect(nav.getByText('Guides')).toBeVisible();
    await expect(nav.getByText('About')).toBeVisible();
  });

  test('category page loads with plants', async ({ page }) => {
    await page.goto('/categories/bedroom/');
    await expect(page.locator('h1')).toContainText('Bedroom');
  });

  test('plant detail page loads', async ({ page }) => {
    await page.goto('/plants/bedroom/lavender/');
    await expect(page.locator('h1')).toContainText('Lavender');
  });

  test('search button is visible', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('#search-open')).toBeVisible();
  });
});
