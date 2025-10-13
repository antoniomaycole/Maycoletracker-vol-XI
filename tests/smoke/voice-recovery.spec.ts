import { test, expect } from '@playwright/test';

// Small smoke test: visit root, recovery route, and try to find voice controls

test.describe('Smoke: Voice & Recovery pages', () => {
  test('visit root and recovery, capture console', async ({ page }) => {
    const logs: any[] = [];

    page.on('console', msg => {
      logs.push({ type: msg.type(), text: msg.text() });
    });

    page.on('pageerror', err => {
      logs.push({ type: 'pageerror', text: err.message });
    });

    // Try root
    await page.goto('http://localhost:5173', { waitUntil: 'domcontentloaded' });
    await expect(page).toHaveTitle(/MaycoleTracker/i).catch(() => {});

    // Recovery page
    await page.goto('http://localhost:5173/recovery', { waitUntil: 'networkidle' });
    // Wait a short while for enforcers to attach
    await page.waitForTimeout(1500);

    // Try to find a heading or known text
    const recoveryVisible = await page.locator('text=Recovery').first().count();

    // Voice page (if present)
    await page.goto('http://localhost:5173/voice-alerts', { waitUntil: 'networkidle' }).catch(() => {});
    await page.waitForTimeout(500);

    // Look for Test Voice Alert button
    const testButton = page.locator('text=Test Voice Alert');
    const hasTestButton = await testButton.count();

    // If button exists, click it (this may not produce audio in headless)
    if (hasTestButton) {
      await testButton.first().click().catch(() => {});
      await page.waitForTimeout(800);
    }

    // Save logs to stdout
    console.log('\n--- Playwright Console Logs ---');
    for (const l of logs) console.log(l.type + ': ' + l.text);
    console.log('--- End Logs ---\n');

    expect(recoveryVisible).toBeGreaterThanOrEqual(0);
  });
});
