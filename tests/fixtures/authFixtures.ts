import { test as base, expect } from './pageObjectFixtures.js';
import type { LoginPage } from '../pages/LoginPage.js';

type AuthFixtures = {
  loggedInLoginPage: LoginPage;
};

export const test = base.extend<AuthFixtures>({
  loggedInLoginPage: async ({ page, loginPage }, use) => {
    await loginPage.login('buggy', '1970beetle');
    await use(loginPage);
  },
});

export { expect };
