import { test, expect } from '@playwright/test';

test('should log in and create a new bug', async ({ page }) => {
  // Navigate to login page
  await page.goto('/login');

  // Verify we're on the login page
  await expect(page).toHaveTitle(/BuggyBoard/);
  await expect(page.locator('h1')).toContainText('BuggyBoard');

  // Fill in login credentials from users.json
  await page.fill('#username', 'buggy');
  await page.fill('#password', '1970beetle');

  // Submit login form
  await page.click('button:has-text("Login")');

  // Wait for navigation to board page
  await page.waitForURL('/board');
  await expect(page).toHaveURL(/\/board/);

  // Click the "New Bug" button
  await page.click('button:has-text("New Bug")');

  // Wait for the modal to appear
  await expect(page.locator('text=Create bug')).toBeVisible();

  // Fill in the bug creation form
  // Title field
  await page.fill('#bug-title', 'Login fails with special characters');

  // Severity dropdown - select HIGH
  await page.selectOption('select', 'high');

  // Owner field
  await page.fill('#bug-owner', 'buggy');

  // Description field
  await page.fill('#bug-description', 'When I use < and > in my password, login fails.');

  // Click save button
  await page.click('button:has-text("Save")');

  // Wait for modal to close and bug to be created
  await page.waitForTimeout(1000);

  // Verify we're back on the board
  await expect(page).toHaveURL(/\/board/);

  // Verify the new bug appears in the table
  await expect(page.locator('text=Login fails with special characters')).toBeVisible();
});
