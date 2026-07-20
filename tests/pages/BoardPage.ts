import { type Locator, type Page } from '@playwright/test';

export class BoardPage {
  constructor(private readonly page: Page) { }

  get searchInput(): Locator {
    return this.page.locator('input[placeholder*="Search" i]');
  }

  get titleHeaderButton(): Locator {
    return this.page.getByRole('button', { name: 'Title' });
  }

  get openFilterButton(): Locator {
    return this.page.getByRole('button', { name: 'Open' });
  }

  get closedFilterButton(): Locator {
    return this.page.getByRole('button', { name: 'Closed' });
  }

  get bugRows(): Locator {
    return this.page.locator('table tbody tr');
  }

  getBugRow(title: string): Locator {
    return this.page.getByRole('button', { name: title }).first();
  }

  async openCreateBugModal() {
    await this.page.getByRole('button', { name: 'New Bug' }).click();
  }

  async searchFor(query: string) {
    await this.searchInput.fill(query);
  }

  async clickTitleHeader() {
    await this.titleHeaderButton.click();
  }

  async clickOpenFilter() {
    await this.openFilterButton.click();
  }

  async clickClosedFilter() {
    await this.closedFilterButton.click();
  }

  async openBug(title: string) {
    const row = this.getBugRow(title);
    await row.click();
  }

  async getFirstRowTitle() {
    return this.bugRows.first().locator('td').nth(2).innerText();
  }

  async getRowCount() {
    return this.bugRows.count();
  }
}
