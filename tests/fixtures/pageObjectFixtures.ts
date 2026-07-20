import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage.js';
import { BoardPage } from '../pages/BoardPage.js';
import { CreateBugModalPage } from '../pages/CreateBugModalPage.js';
import { EditBugModalPage } from '../pages/EditBugModalPage.js';

type PageObjectFixtures = {
  loginPage: LoginPage;
  boardPage: BoardPage;
  createBugModalPage: CreateBugModalPage;
  editBugModalPage: EditBugModalPage;
};

export const test = base.extend<PageObjectFixtures>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  boardPage: async ({ page }, use) => {
    await use(new BoardPage(page));
  },
  createBugModalPage: async ({ page }, use) => {
    await use(new CreateBugModalPage(page));
  },
  editBugModalPage: async ({ page }, use) => {
    await use(new EditBugModalPage(page));
  },
});

export { expect } from '@playwright/test';
