import { test, expect } from '@playwright/test';

test('should open the create-bug modal from the board', async ({ page }) => {
  await page.goto('/login');
  await page.fill('#username', 'buggy');
  await page.fill('#password', '1970beetle');
  await page.click('button:has-text("Login")');

  await page.waitForURL('/board');
  await expect(page).toHaveURL(/\/board/);

  await page.click('button:has-text("New Bug")');

  await expect(page.getByText('Create bug')).toBeVisible();
  await expect(page.locator('#bug-title')).toBeVisible();
  await expect(page.locator('select')).toBeVisible();
  await expect(page.locator('#bug-owner')).toBeVisible();
  await expect(page.locator('#bug-description')).toBeVisible();
  await expect(page.getByRole('button', { name: 'Save' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Cancel' })).toBeVisible();
});
