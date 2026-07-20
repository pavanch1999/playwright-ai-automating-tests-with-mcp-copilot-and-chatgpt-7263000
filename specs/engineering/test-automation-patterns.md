# Test automation patterns

This document is the project-wide reference for Playwright test automation patterns. All new and refactored tests must follow these rules.

## Core principle: use the Page Object Model

- Prefer page objects over long, raw page call chains such as `page.locator(...).fill(...).click()`.
- New and refactored tests should delegate UI interaction to page object methods instead of embedding locator chains directly in the test.
- Keep tests focused on behavior and expectations; page objects should own locators and user actions.

## Location and structure

- Place page object classes under `tests/pages/`.
- Create a separate page object class for each page or major screen in the app.
- Limit one page object class per file.
- Name each page object file after the page or feature it represents, for example `tests/pages/LoginPage.ts` or `tests/pages/BoardPage.ts`.

## Playwright POM conventions

- Each page object should accept a Playwright `page` in its constructor.
- Encapsulate selectors and repeated UI interactions inside the class.
- Provide small, descriptive methods such as `login()`, `openCreateBugModal()`, or `searchForBug()`.
- Keep each method focused on one responsibility and make the test flow read naturally.
- Keep assertions in the test unless a simple reusable state check is clearly part of the page object’s responsibility.
- Avoid exposing internal locators directly unless a test truly needs low-level access.

## Test guidelines

- Write tests so they read like user actions: arrange the state, create the page object, perform the step, then assert the outcome.
- Use page objects for login, board navigation, modal workflows, form submission, and other user-facing flows.
- When editing existing tests, refactor raw locator chains into page objects rather than adding more inline chains.
- Reuse page objects across tests instead of duplicating selectors and steps.
- Create a fixture for each page object so the test can request a ready-to-use page object instance.
- All tests should use page object fixtures rather than constructing their own page objects inline with `new SomePage(page)`.
- Keep each page object fixture focused on a single page object and return that instance directly to the test.

## Example

```ts
export class LoginPage {
  constructor(private page: Page) {}

  get emailInput() {
    return this.page.getByLabel('Email');
  }

  get passwordInput() {
    return this.page.getByLabel('Password');
  }

  get submitButton() {
    return this.page.getByRole('button', { name: 'Log in' });
  }

  async login(email: string, password: string) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.submitButton.click();
  }
}
```

Tests should then use the page object directly, for example:

```ts
const loginPage = new LoginPage(page);
await loginPage.login('user@example.com', 'secret');
```

These patterns follow the Playwright Page Object Model guidance at http://playwright.dev/docs/pom.
