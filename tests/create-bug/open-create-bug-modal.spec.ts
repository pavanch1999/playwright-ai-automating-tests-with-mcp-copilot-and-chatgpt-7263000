import { test, expect } from '../fixtures/pageObjectFixtures.js';

test('should open the create-bug modal from the board', async ({ page, loginPage, boardPage, createBugModalPage }) => {
  await loginPage.login('buggy', '1970beetle');

  await expect(page).toHaveURL(/\/board/);
  await boardPage.openCreateBugModal();

  await expect(createBugModalPage.dialog).toBeVisible();
  await expect(createBugModalPage.titleInput).toBeVisible();
  await expect(createBugModalPage.severitySelect).toBeVisible();
  await expect(createBugModalPage.ownerInput).toBeVisible();
  await expect(createBugModalPage.descriptionTextarea).toBeVisible();
  await expect(createBugModalPage.saveButton).toBeVisible();
  await expect(createBugModalPage.cancelButton).toBeVisible();
});
