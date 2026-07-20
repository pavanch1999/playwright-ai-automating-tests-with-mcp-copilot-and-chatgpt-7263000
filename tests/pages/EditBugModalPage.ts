import { type Locator, type Page } from '@playwright/test';

export class EditBugModalPage {
  constructor(private readonly page: Page) { }

  get dialog(): Locator {
    return this.page.getByRole('dialog', { name: /Edit bug #/i });
  }

  get titleInput(): Locator {
    return this.dialog.locator('#edit-bug-title');
  }

  get severitySelect(): Locator {
    return this.dialog.locator('#edit-bug-severity');
  }

  get stateSelect(): Locator {
    return this.dialog.locator('#edit-bug-state');
  }

  get ownerInput(): Locator {
    return this.dialog.locator('#edit-bug-owner');
  }

  get descriptionTextarea(): Locator {
    return this.dialog.locator('#edit-bug-description');
  }

  get deleteButton(): Locator {
    return this.dialog.getByRole('button', { name: 'Delete' });
  }

  get saveButton(): Locator {
    return this.dialog.getByRole('button', { name: 'Save' });
  }

  async deleteBug() {
    await this.deleteButton.click();
  }

  async closeWithEscape() {
    await this.page.keyboard.press('Escape');
  }
}
