import { test, expect } from '@playwright/test';

test('homepage loads and displays Command Center', async ({ page }) => {
  // Navigate to the app
  await page.goto('http://localhost:8080');

  // Verify the main header is visible
  await expect(page.getByText('Command Center')).toBeVisible();

  // Verify a specific metric card is visible
  await expect(page.getByText('Insights')).toBeVisible();

  // Verify a project is visible
  await expect(page.getByText('Nordic Market Entry Strategy')).toBeVisible();
});
