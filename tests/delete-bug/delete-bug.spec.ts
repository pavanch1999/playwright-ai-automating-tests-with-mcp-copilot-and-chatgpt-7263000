import { test, expect } from '../fixtures/authFixtures.js';
import type { Page } from '@playwright/test';
import type { BoardPage } from '../pages/BoardPage.js';
import type { CreateBugModalPage } from '../pages/CreateBugModalPage.js';
import type { EditBugModalPage } from '../pages/EditBugModalPage.js';

let createdBugTitle: string | null = null;

async function createBug(boardPage: BoardPage, createBugModalPage: CreateBugModalPage, title: string) {
  await boardPage.openCreateBugModal();
  await expect(createBugModalPage.dialog).toBeVisible();
  await createBugModalPage.createBug({ title, description: 'Temporary bug for delete-flow verification' });
  await expect(createBugModalPage.dialog).toBeHidden();
}

async function deleteBug(boardPage: BoardPage, editBugModalPage: EditBugModalPage, page: Page, title: string) {
  if ((await page.getByText(title).count()) === 0) {
    return;
  }

  await boardPage.openBug(title);
  await expect(editBugModalPage.dialog).toBeVisible();
  await editBugModalPage.deleteBug();

  await expect(editBugModalPage.dialog).toBeHidden();
  await expect(page.getByText(title)).toHaveCount(0);
}

test.beforeEach(async ({ page, loggedInLoginPage, boardPage, createBugModalPage }) => {
  createdBugTitle = `Delete Me - ${Date.now()}`;
  await createBug(boardPage, createBugModalPage, createdBugTitle);
  await expect(page.getByText(createdBugTitle)).toBeVisible();
});

test.afterEach(async ({ page, boardPage, editBugModalPage }) => {
  if (!createdBugTitle) {
    return;
  }

  try {
    await deleteBug(boardPage, editBugModalPage, page, createdBugTitle);
  } catch {
    // Ignore cleanup failures when the bug was already removed.
  }

  createdBugTitle = null;
});

test('deletes a freshly created bug from the edit modal', async ({ page, boardPage, editBugModalPage }) => {
  if (!createdBugTitle) {
    throw new Error('Expected a bug to be created in beforeEach');
  }

  await boardPage.openBug(createdBugTitle);
  await expect(editBugModalPage.dialog).toBeVisible();
  await expect(editBugModalPage.deleteButton).toBeVisible();

  await editBugModalPage.deleteBug();

  await expect(editBugModalPage.dialog).toBeHidden();
  await expect(page.getByText(createdBugTitle)).toHaveCount(0);
});
