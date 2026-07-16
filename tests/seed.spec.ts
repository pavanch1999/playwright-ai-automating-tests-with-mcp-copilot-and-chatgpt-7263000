import { test, expect } from '@playwright/test';

test.describe('Test group', () => {
  test('seed', { tag: '@seed' }, async ({ page }) => {
    // Navigate to login page
    await page.goto('/login');

    // Verify we're on the login page
    await expect(page).toHaveTitle(/BuggyBoard/);

    // Fill in login credentials with first user from users.json (buggy / 1970beetle)
    await page.fill('#username', 'buggy');
    await page.fill('#password', '1970beetle');

    // Click login button
    await page.click('button:has-text("Log in")');

    // Wait for navigation to board page and verify successful login
    await page.waitForURL('/board');
    await expect(page).toHaveURL(/\/board/);
  });
});
