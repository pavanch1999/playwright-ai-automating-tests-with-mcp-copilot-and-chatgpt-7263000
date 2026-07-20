import { test, expect } from './fixtures/pageObjectFixtures.js';

test('login, create, and close a bug', async ({ loginPage, boardPage, createBugModalPage, editBugModalPage }) => {
  await loginPage.login('buggy', '1970beetle');
  await expect(boardPage.searchInput).toBeVisible();
  
  await boardPage.openCreateBugModal();
  
  const bugTitle = 'Test Bug ' + Date.now();
  await createBugModalPage.createBug({
    title: bugTitle,
    severity: 'high',
    owner: 'buggy',
    description: 'Description'
  });
  
  await boardPage.openBug(bugTitle);
  
  await editBugModalPage.stateSelect.selectOption('Closed');
  await editBugModalPage.saveButton.click();
});
