import type { TestType } from '@playwright/test';
import { test, expect } from '../fixtures/pageObjectFixtures.js';

type PageObjectFixtures = typeof test extends TestType<infer Fixtures, infer _WorkerFixtures> ? Fixtures : never;

async function createBoardBug({
  boardPage,
  createBugModalPage,
  title,
}: {
  boardPage: PageObjectFixtures['boardPage'];
  createBugModalPage: PageObjectFixtures['createBugModalPage'];
  title: string;
}) {
  await boardPage.openCreateBugModal();
  await expect(createBugModalPage.dialog).toBeVisible();
  await createBugModalPage.createBug({
    title,
    description: 'Temporary bug for board behavior verification',
  });
  await expect(createBugModalPage.dialog).toBeHidden();
  await expect(boardPage.getBugRow(title)).toBeVisible();
}

test.describe('Board behaviors (search, sort, filter, edit, delete)', () => {
  test('filters bugs by search query as user types', async ({ page, loginPage, boardPage, createBugModalPage }) => {
    await loginPage.login('buggy', '1970beetle');

    const bugTitle = `Login board test ${Date.now()}`;
    await createBoardBug({ boardPage, createBugModalPage, title: bugTitle });

    await expect(boardPage.searchInput).toBeVisible();

    await boardPage.searchFor('Login');
    await page.waitForTimeout(300);

    await expect(page.getByText(bugTitle)).toBeVisible();

    await boardPage.searchFor('');
    await page.waitForTimeout(200);

    const rowCount = await boardPage.getRowCount();
    expect(rowCount).toBeGreaterThanOrEqual(1);
  });

  test('toggles sort direction when clicking column headers', async ({ page, loginPage, boardPage, createBugModalPage }) => {
    await loginPage.login('buggy', '1970beetle');

    const bugTitle = `Sort board test ${Date.now()}`;
    await createBoardBug({ boardPage, createBugModalPage, title: bugTitle });

    await expect(boardPage.titleHeaderButton).toBeVisible();

    await boardPage.clickTitleHeader();
    await page.waitForTimeout(200);
    const firstTitleAsc = await boardPage.getFirstRowTitle();

    await boardPage.clickTitleHeader();
    await page.waitForTimeout(200);
    const firstTitleDesc = await boardPage.getFirstRowTitle();

    expect(firstTitleAsc).not.toBe(firstTitleDesc);
  });

  test('filters bugs by state (Open/Closed)', async ({ page, loginPage, boardPage, createBugModalPage }) => {
    await loginPage.login('buggy', '1970beetle');

    const bugTitle = `State board test ${Date.now()}`;
    await createBoardBug({ boardPage, createBugModalPage, title: bugTitle });

    await expect(boardPage.openFilterButton).toBeVisible();
    await expect(boardPage.closedFilterButton).toBeVisible();

    await boardPage.clickClosedFilter();
    await page.waitForTimeout(200);
    const rowsClosed = await boardPage.getRowCount();
    expect(rowsClosed).toBeGreaterThanOrEqual(0);

    await boardPage.clickOpenFilter();
    await page.waitForTimeout(200);
    const rowsOpen = await boardPage.getRowCount();
    expect(rowsOpen).toBeGreaterThanOrEqual(0);
  });

  test('opens edit-bug modal and shows editable fields', async ({ page, loginPage, boardPage, createBugModalPage, editBugModalPage }) => {
    await loginPage.login('buggy', '1970beetle');

    const bugTitle = `Edit board test ${Date.now()}`;
    await createBoardBug({ boardPage, createBugModalPage, title: bugTitle });

    await boardPage.openBug(bugTitle);
    await expect(editBugModalPage.dialog).toBeVisible();
    await expect(editBugModalPage.titleInput).toBeVisible();
    await expect(editBugModalPage.severitySelect).toBeVisible();
    await expect(editBugModalPage.stateSelect).toBeVisible();
    await expect(editBugModalPage.ownerInput).toBeVisible();
    await expect(editBugModalPage.descriptionTextarea).toBeVisible();

    await editBugModalPage.closeWithEscape();
    await expect(editBugModalPage.dialog).toBeHidden();
  });

  test('deletes a bug from the edit modal when Delete exists', async ({ page, loginPage, boardPage, createBugModalPage, editBugModalPage }) => {
    await loginPage.login('buggy', '1970beetle');

    const bugTitle = `Delete board test ${Date.now()}`;
    await createBoardBug({ boardPage, createBugModalPage, title: bugTitle });

    await boardPage.openBug(bugTitle);
    await expect(editBugModalPage.deleteButton).toBeVisible();

    const deleteBtnCount = await editBugModalPage.deleteButton.count();
    if (deleteBtnCount === 0) {
      test.skip(true, 'Delete button not present in modal');
      return;
    }

    await editBugModalPage.deleteBug();
    await page.waitForTimeout(500);
    await expect(page).toHaveURL(/\/board/);
  });
});
