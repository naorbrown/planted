import { test, expect } from '@playwright/test';

test.describe('OG meta tags', () => {
  test('homepage has og:image with absolute URL', async ({ page }) => {
    await page.goto('/plant-therapy/');
    const content = await page.locator('meta[property="og:image"]').getAttribute('content');
    expect(content).toBe('https://naorbrown.github.io/plant-therapy/og/default.png');
  });

  test('homepage og:title is not duplicated', async ({ page }) => {
    await page.goto('/plant-therapy/');
    const content = await page.locator('meta[property="og:title"]').getAttribute('content');
    expect(content).toBe('Plant Therapy');
  });

  test('homepage og:type is website', async ({ page }) => {
    await page.goto('/plant-therapy/');
    const content = await page.locator('meta[property="og:type"]').getAttribute('content');
    expect(content).toBe('website');
  });

  test('plant page uses plant og:image', async ({ page }) => {
    await page.goto('/plant-therapy/plants/bedroom/snake-plant/');
    const content = await page.locator('meta[property="og:image"]').getAttribute('content');
    expect(content).toContain('/og/plant.png');
  });

  test('plant page og:type is article', async ({ page }) => {
    await page.goto('/plant-therapy/plants/bedroom/snake-plant/');
    const content = await page.locator('meta[property="og:type"]').getAttribute('content');
    expect(content).toBe('article');
  });

  test('guide page uses guide og:image', async ({ page }) => {
    await page.goto('/plant-therapy/guides/sleep-better-naturally/');
    const content = await page.locator('meta[property="og:image"]').getAttribute('content');
    expect(content).toContain('/og/guide.png');
  });

  test('guide page og:type is article', async ({ page }) => {
    await page.goto('/plant-therapy/guides/sleep-better-naturally/');
    const content = await page.locator('meta[property="og:type"]').getAttribute('content');
    expect(content).toBe('article');
  });

  test('all pages have twitter:card summary_large_image', async ({ page }) => {
    await page.goto('/plant-therapy/');
    const content = await page.locator('meta[name="twitter:card"]').getAttribute('content');
    expect(content).toBe('summary_large_image');
  });

  test('og:url is absolute and correct', async ({ page }) => {
    await page.goto('/plant-therapy/about/');
    const content = await page.locator('meta[property="og:url"]').getAttribute('content');
    expect(content).toBe('https://naorbrown.github.io/plant-therapy/about/');
  });

  test('og:site_name is Plant Therapy', async ({ page }) => {
    await page.goto('/plant-therapy/');
    const content = await page.locator('meta[property="og:site_name"]').getAttribute('content');
    expect(content).toBe('Plant Therapy');
  });

  test('about page og:title includes suffix', async ({ page }) => {
    await page.goto('/plant-therapy/about/');
    const content = await page.locator('meta[property="og:title"]').getAttribute('content');
    expect(content).toContain('Plant Therapy');
    expect(content).toContain('About');
  });
});
