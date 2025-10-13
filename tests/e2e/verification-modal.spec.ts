import { test, expect } from '@playwright/test';

test('Verification modal appears when adding', async ({ page }) => {
  // Ensure verification not skipped for this test
  await page.addInitScript(() => {
    (window as any).MAYCOLE_CONFIG = { skipVerification: false };
  });

  await page.goto('/inventory');
  await page.click('text=Add Product');

  await page.fill('input[placeholder="Product Name *"]', 'Modal Test Item');
  await page.selectOption('select[aria-label="New product category"]', { label: 'Food Items' });
  await page.fill('input[placeholder="Quantity *"]', '2');

  await page.click('text=Save Product');

  // Verification dialog should appear
  await expect(page.locator('text=Verification Required')).toHaveCount(1);
});
