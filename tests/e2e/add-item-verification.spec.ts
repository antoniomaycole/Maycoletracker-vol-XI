import { test, expect } from '@playwright/test';

test('Add item triggers verification and succeeds (opt-out)', async ({ page }) => {
  // Set global opt-out so verification is skipped for automated test
  await page.addInitScript(() => {
    (window as any).MAYCOLE_CONFIG = { skipVerification: true };
  });

  await page.goto('/inventory');
  await page.waitForSelector('text=Add Product');
  await page.click('text=Add Product');

  await page.fill('input[placeholder="Product Name *"]', 'E2E Test Item');
  await page.selectOption('select[aria-label="New product category"]', { label: 'Food Items' });
  await page.fill('input[placeholder="Quantity *"]', '5');

  await page.click('text=Save Product');

  // Since opt-out is enabled, item should be added without verification
  await expect(page.locator('text=E2E Test Item')).toHaveCount(1);
});
