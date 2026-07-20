import { type Locator, type Page } from '@playwright/test';

export class LoginPage {
  constructor(private readonly page: Page) { }

  get usernameInput(): Locator {
    return this.page.locator('#username');
  }

  get passwordInput(): Locator {
    return this.page.locator('#password');
  }

  get loginButton(): Locator {
    return this.page.getByRole('button', { name: 'Login' });
  }

  async login(username: string, password: string) {
    await this.page.goto('/login');
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
    await this.page.waitForURL(/\/board/);
  }
}
